import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { Session, SESSION_COLLECTION } from "@/models/Session";
import { Event, EVENT_COLLECTION } from "@/models/Event";
import {
  MonthlyStats,
  MONTHLY_STATS_COLLECTION,
  CommandStats,
  CountryStats,
} from "@/models/MonthlyStats";

/**
 * GET /api/analytics/cleanup
 * Clean up stale sessions and aggregate old data
 * Should be called daily via cron job
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();
    const sessionsCollection = db.collection<Session>(SESSION_COLLECTION);
    const eventsCollection = db.collection<Event>(EVENT_COLLECTION);
    const statsCollection = db.collection<MonthlyStats>(
      MONTHLY_STATS_COLLECTION
    );

    const now = new Date();
    const cleanupSummary = {
      staleSessionsClosed: 0,
      oldSessionsAggregated: 0,
      oldEventsDeleted: 0,
      monthlyStatsCreated: 0,
    };

    // 1. Close stale sessions (inactive for 30+ minutes with no endTime)
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

    const staleSessionsResult = await sessionsCollection.updateMany(
      {
        lastActivity: { $lt: thirtyMinutesAgo },
        endTime: null,
      },
      {
        $set: {
          endTime: thirtyMinutesAgo,
        },
      }
    );

    cleanupSummary.staleSessionsClosed = staleSessionsResult.modifiedCount;

    // 2. Aggregate sessions older than 90 days into monthly stats
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Get all months that need aggregation
    const oldSessions = await sessionsCollection
      .find({
        createdAt: { $lt: ninetyDaysAgo },
      })
      .toArray();

    if (oldSessions.length > 0) {
      // Group sessions by month
      const sessionsByMonth = new Map<
        string,
        {
          year: number;
          month: number;
          sessions: Session[];
        }
      >();

      oldSessions.forEach((session) => {
        const date = new Date(session.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 1-12
        const key = `${year}-${month}`;

        if (!sessionsByMonth.has(key)) {
          sessionsByMonth.set(key, {
            year,
            month,
            sessions: [],
          });
        }

        sessionsByMonth.get(key)!.sessions.push(session);
      });

      // Aggregate each month
      for (const [, monthData] of sessionsByMonth) {
        const { year, month, sessions } = monthData;

        // Get unique visitors
        const uniqueIpHashes = new Set(sessions.map((s) => s.ipHash));

        // Get events for these sessions
        const sessionIds = sessions.map((s) => s.sessionId);
        const events = await eventsCollection
          .find({
            sessionId: { $in: sessionIds },
          })
          .toArray();

        // Calculate top commands
        const commandCounts = new Map<string, number>();
        events.forEach((event) => {
          const count = commandCounts.get(event.commandName) || 0;
          commandCounts.set(event.commandName, count + 1);
        });

        const topCommands: CommandStats[] = Array.from(commandCounts.entries())
          .map(([commandName, count]) => ({ commandName, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Calculate top countries
        const countryCounts = new Map<
          string,
          { countryName: string; count: number }
        >();
        sessions.forEach((session) => {
          if (session.location?.countryCode) {
            const existing = countryCounts.get(session.location.countryCode);
            if (existing) {
              existing.count++;
            } else {
              countryCounts.set(session.location.countryCode, {
                countryName: session.location.countryName,
                count: 1,
              });
            }
          }
        });

        const topCountries: CountryStats[] = Array.from(countryCounts.entries())
          .map(([countryCode, data]) => ({
            countryCode,
            countryName: data.countryName,
            count: data.count,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Calculate average duration
        const sessionsWithDuration = sessions.filter((s) => s.endTime !== null);
        let avgDuration = 0;
        if (sessionsWithDuration.length > 0) {
          const totalDuration = sessionsWithDuration.reduce((sum, session) => {
            if (session.endTime) {
              const duration =
                session.endTime.getTime() - session.startTime.getTime();
              return sum + duration / 1000; // Convert to seconds
            }
            return sum;
          }, 0);
          avgDuration = Math.round(totalDuration / sessionsWithDuration.length);
        }

        // Create or update monthly stats
        const monthlyStats: MonthlyStats = {
          month,
          year,
          totalSessions: sessions.length,
          uniqueVisitors: uniqueIpHashes.size,
          topCommands,
          topCountries,
          avgDuration,
          createdAt: new Date(),
        };

        await statsCollection.updateOne(
          { year, month },
          { $set: monthlyStats },
          { upsert: true }
        );

        cleanupSummary.monthlyStatsCreated++;
      }

      // 3. Delete old sessions
      const deleteSessionsResult = await sessionsCollection.deleteMany({
        createdAt: { $lt: ninetyDaysAgo },
      });

      cleanupSummary.oldSessionsAggregated = deleteSessionsResult.deletedCount;

      // 4. Delete old events
      const deleteEventsResult = await eventsCollection.deleteMany({
        timestamp: { $lt: ninetyDaysAgo },
      });

      cleanupSummary.oldEventsDeleted = deleteEventsResult.deletedCount;
    }

    return NextResponse.json(
      {
        success: true,
        timestamp: now.toISOString(),
        summary: cleanupSummary,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in cleanup job:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
