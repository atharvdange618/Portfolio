import { ObjectId } from "mongodb";

/**
 * Location data from geolocated.io API
 */
export interface SessionLocation {
  cityName: string;
  countryName: string;
  countryCode: string;
  timeZone: string;
  latitude: number;
  longitude: number;
}

/**
 * Session document in MongoDB
 */
export interface Session {
  _id?: ObjectId;
  sessionId: string;
  ipHash: string;
  location: SessionLocation | null;
  startTime: Date;
  lastActivity: Date;
  endTime: Date | null;
  totalCommands: number;
  userAgent: string;
  screenResolution: string;
  createdAt: Date;
}

/**
 * Collection name for sessions
 */
export const SESSION_COLLECTION = "sessions";

/**
 * MongoDB indexes for Session collection
 */
export const SESSION_INDEXES = [
  { key: { createdAt: -1 } as const, name: "createdAt_idx" },
  { key: { ipHash: 1 } as const, name: "ipHash_idx" },
  { key: { "location.countryCode": 1 } as const, name: "countryCode_idx" },
  { key: { lastActivity: -1 } as const, name: "lastActivity_idx" },
  { key: { sessionId: 1 } as const, name: "sessionId_idx", unique: true },
];
