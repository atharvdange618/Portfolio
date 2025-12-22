import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { Event, EVENT_COLLECTION } from "@/models/Event";
import { Session, SESSION_COLLECTION } from "@/models/Session";
import rateLimiter from "@/lib/rate-limiter";

/**
 * Event data from client
 */
interface EventData {
  sessionId: string;
  commandName: string;
  args: string[];
  timestamp: string;
}

/**
 * Get client IP address from request headers
 */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Initialize MongoDB indexes for events
 */
async function ensureIndexes() {
  try {
    const db = await getDatabase();
    const collection = db.collection(EVENT_COLLECTION);

    // Create indexes
    await collection.createIndex({ sessionId: 1 }, { name: "sessionId_idx" });
    await collection.createIndex({ timestamp: -1 }, { name: "timestamp_idx" });
    await collection.createIndex(
      { commandName: 1 },
      { name: "commandName_idx" }
    );
  } catch (error) {
    console.error("Error creating event indexes:", error);
  }
}

/**
 * POST /api/analytics/track
 * Track batched events
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP and apply rate limiting
    const clientIp = getClientIp(request);
    if (!rateLimiter.check(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { events } = body;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid events array" },
        { status: 400 }
      );
    }

    // Validate events
    const validEvents: EventData[] = events.filter(
      (event: EventData) =>
        event.sessionId &&
        event.commandName &&
        Array.isArray(event.args) &&
        event.timestamp
    );

    if (validEvents.length === 0) {
      return NextResponse.json(
        { error: "No valid events to track" },
        { status: 400 }
      );
    }

    // Ensure indexes exist
    await ensureIndexes();

    // Prepare events for insertion
    const now = new Date();
    const eventsToInsert: Event[] = validEvents.map((event) => ({
      sessionId: event.sessionId,
      commandName: event.commandName,
      args: event.args,
      timestamp: new Date(event.timestamp),
      createdAt: now,
    }));

    // Insert events into MongoDB
    const db = await getDatabase();
    await db.collection<Event>(EVENT_COLLECTION).insertMany(eventsToInsert);

    // Update session lastActivity and totalCommands
    if (validEvents.length > 0) {
      const sessionId = validEvents[0].sessionId;
      await db.collection<Session>(SESSION_COLLECTION).updateOne(
        { sessionId },
        {
          $set: { lastActivity: now },
          $inc: { totalCommands: validEvents.length },
        }
      );
    }

    return NextResponse.json(
      { success: true, tracked: validEvents.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error tracking events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
