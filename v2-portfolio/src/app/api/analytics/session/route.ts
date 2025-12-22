import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { Session, SessionLocation, SESSION_COLLECTION } from "@/models/Session";
import rateLimiter from "@/lib/rate-limiter";
import crypto from "crypto";

/**
 * Geolocated.io API response
 */
interface GeolocatedResponse {
  cityName?: string;
  countryName?: string;
  countryCode?: string;
  timeZone?: string;
  latitude?: number;
  longitude?: number;
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
 * Hash IP address with secret salt
 */
function hashIp(ip: string): string {
  const secret = process.env.ANALYTICS_SECRET || "default-secret";
  return crypto
    .createHash("sha256")
    .update(ip + secret)
    .digest("hex");
}

/**
 * Fetch geolocation data from geolocated.io
 */
async function fetchGeolocation(ip: string): Promise<SessionLocation | null> {
  try {
    const apiKey = process.env.GEOLOCATED_API_KEY;
    const endpoint = process.env.GEOLOCATED_ENDPOINT;

    if (!apiKey || !endpoint) {
      console.warn("Geolocated.io API credentials not configured");
      return null;
    }

    // Skip localhost and private IPs
    if (
      ip === "unknown" ||
      ip === "::1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.") ||
      ip.startsWith("172.")
    ) {
      console.log(`Skipping geolocation for local IP: ${ip}`);
      return null;
    }

    const url = `${endpoint}/ip/${ip}?api-key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `Geolocated.io API error: ${response.status} for IP: ${ip}`
      );
      return null;
    }

    const data: GeolocatedResponse = await response.json();
    console.log("Geolocated.io API response:", JSON.stringify(data, null, 2));

    // Extract required fields - allow partial data
    if (
      !data.cityName ||
      !data.countryName ||
      !data.countryCode ||
      !data.timeZone ||
      data.latitude === undefined ||
      data.longitude === undefined
    ) {
      console.warn("Incomplete geolocation data from API:", {
        cityName: data.cityName,
        countryName: data.countryName,
        countryCode: data.countryCode,
        timeZone: data.timeZone,
        latitude: data.latitude,
        longitude: data.longitude,
      });
      return null;
    }

    return {
      cityName: data.cityName,
      countryName: data.countryName,
      countryCode: data.countryCode,
      timeZone: data.timeZone,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return null;
  }
}

/**
 * Initialize MongoDB indexes
 */
async function ensureIndexes() {
  try {
    const db = await getDatabase();
    const collection = db.collection(SESSION_COLLECTION);

    // Create indexes
    await collection.createIndex({ createdAt: -1 }, { name: "createdAt_idx" });
    await collection.createIndex({ ipHash: 1 }, { name: "ipHash_idx" });
    await collection.createIndex(
      { "location.countryCode": 1 },
      { name: "countryCode_idx" }
    );
    await collection.createIndex(
      { lastActivity: -1 },
      { name: "lastActivity_idx" }
    );
    await collection.createIndex(
      { sessionId: 1 },
      { name: "sessionId_idx", unique: true }
    );
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
}

/**
 * POST /api/analytics/session
 * Start a new analytics session
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
    const body = await request.json();
    const { userAgent, screenResolution } = body;

    if (!userAgent || !screenResolution) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash IP for privacy
    const ipHash = hashIp(clientIp);

    // Fetch geolocation (gracefully handle failures)
    const location = await fetchGeolocation(clientIp);

    // Generate unique session ID
    const sessionId = crypto.randomUUID();

    // Create session document
    const now = new Date();
    const session: Session = {
      sessionId,
      ipHash,
      location,
      startTime: now,
      lastActivity: now,
      endTime: null,
      totalCommands: 0,
      userAgent,
      screenResolution,
      createdAt: now,
    };

    // Ensure indexes exist
    await ensureIndexes();

    // Save to MongoDB
    const db = await getDatabase();
    await db.collection<Session>(SESSION_COLLECTION).insertOne(session);

    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/analytics/session
 * Update session activity
 */
export async function PATCH(request: NextRequest) {
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
    const body = await request.json();
    const { sessionId, endTime, commandCount } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    // Update session
    const db = await getDatabase();
    const updateData: Partial<Session> = {
      lastActivity: new Date(),
    };

    if (endTime) {
      updateData.endTime = new Date(endTime);
    }

    if (commandCount !== undefined) {
      updateData.totalCommands = commandCount;
    }

    const result = await db
      .collection<Session>(SESSION_COLLECTION)
      .updateOne({ sessionId }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
