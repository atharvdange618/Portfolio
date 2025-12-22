import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/**
 * GET /api/analytics/last-session
 * Fetch the most recent session for display in welcome message
 */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Get the most recent completed session
    // (one that has been inactive for at least 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const lastSession = await db
      .collection("sessions")
      .find({
        lastActivity: { $lt: fiveMinutesAgo },
      })
      .sort({ lastActivity: -1 })
      .limit(1)
      .toArray();

    if (lastSession.length === 0) {
      return NextResponse.json({ lastSession: null });
    }

    return NextResponse.json({
      lastSession: {
        lastActivity: lastSession[0].lastActivity,
        ipHash: lastSession[0].ipHash,
        location: lastSession[0].location || null,
      },
    });
  } catch (error) {
    console.error("Error fetching last session:", error);
    return NextResponse.json(
      { error: "Failed to fetch last session" },
      { status: 500 }
    );
  }
}
