import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { Session, SESSION_COLLECTION } from "@/models/Session";
import { Event, EVENT_COLLECTION } from "@/models/Event";

/**
 * Stats cache
 */
interface StatsCache {
  data: AnalyticsStats;
  timestamp: number;
}

let statsCache: StatsCache | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Daily view stats
 */
interface DailyView {
  date: string;
  count: number;
}

/**
 * Command stats
 */
interface CommandStat {
  command: string;
  count: number;
  percentage: number;
}

/**
 * Country stats
 */
interface CountryStat {
  countryCode: string;
  countryName: string;
  count: number;
  percentage: number;
}

/**
 * Analytics stats response
 */
interface AnalyticsStats {
  totalSessions: number;
  uniqueVisitors: number;
  dailyViews: DailyView[];
  topCommands: CommandStat[];
  topCountries: CountryStat[];
  avgSessionDuration: number; // in seconds
}

/**
 * GET /api/analytics/stats
 * Get analytics statistics (password protected)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify password from Authorization header
    const authHeader = request.headers.get("authorization");
    const password = process.env.ANALYTICS_PASSWORD;

    if (!password || !authHeader || authHeader !== `Bearer ${password}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check cache
    const now = Date.now();
    if (statsCache && now - statsCache.timestamp < CACHE_DURATION) {
      return NextResponse.json(statsCache.data, { status: 200 });
    }

    // Calculate date 90 days ago
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const db = await getDatabase();
    const sessionsCollection = db.collection<Session>(SESSION_COLLECTION);
    const eventsCollection = db.collection<Event>(EVENT_COLLECTION);

    // Get total sessions (last 90 days)
    const totalSessions = await sessionsCollection.countDocuments({
      createdAt: { $gte: ninetyDaysAgo },
    });

    // Get unique visitors (distinct ipHash)
    const uniqueVisitors = await sessionsCollection.distinct("ipHash", {
      createdAt: { $gte: ninetyDaysAgo },
    });

    // Get daily views (last 30 days for better visualization)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyViewsAgg = await sessionsCollection
      .aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    const dailyViews: DailyView[] = dailyViewsAgg.map((item) => ({
      date: item._id as string,
      count: item.count,
    }));

    // Get top 10 commands
    const topCommandsAgg = await eventsCollection
      .aggregate([
        {
          $match: {
            timestamp: { $gte: ninetyDaysAgo },
          },
        },
        {
          $group: {
            _id: "$commandName",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .toArray();

    const totalCommands = topCommandsAgg.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const topCommands: CommandStat[] = topCommandsAgg.map((item) => ({
      command: item._id as string,
      count: item.count,
      percentage: totalCommands > 0 ? (item.count / totalCommands) * 100 : 0,
    }));

    // Get top countries
    const topCountriesAgg = await sessionsCollection
      .aggregate([
        {
          $match: {
            createdAt: { $gte: ninetyDaysAgo },
            "location.countryCode": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: {
              countryCode: "$location.countryCode",
              countryName: "$location.countryName",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .toArray();

    const totalCountrySessions = topCountriesAgg.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const topCountries: CountryStat[] = topCountriesAgg.map((item) => ({
      countryCode: item._id.countryCode as string,
      countryName: item._id.countryName as string,
      count: item.count,
      percentage:
        totalCountrySessions > 0
          ? (item.count / totalCountrySessions) * 100
          : 0,
    }));

    // Calculate average session duration
    const sessionsWithDuration = await sessionsCollection
      .find({
        createdAt: { $gte: ninetyDaysAgo },
        endTime: { $ne: null },
      })
      .toArray();

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

      avgDuration = totalDuration / sessionsWithDuration.length;
    }

    // Build stats response
    const stats: AnalyticsStats = {
      totalSessions,
      uniqueVisitors: uniqueVisitors.length,
      dailyViews,
      topCommands,
      topCountries,
      avgSessionDuration: Math.round(avgDuration),
    };

    // Update cache
    statsCache = {
      data: stats,
      timestamp: now,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
