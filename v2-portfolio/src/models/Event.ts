import { ObjectId } from "mongodb";

/**
 * Event document in MongoDB
 */
export interface Event {
  _id?: ObjectId;
  sessionId: string;
  commandName: string;
  args: string[];
  timestamp: Date;
  createdAt: Date;
}

/**
 * Collection name for events
 */
export const EVENT_COLLECTION = "events";

/**
 * MongoDB indexes for Event collection
 */
export const EVENT_INDEXES = [
  { key: { sessionId: 1 }, name: "sessionId_idx" },
  { key: { timestamp: -1 }, name: "timestamp_idx" },
  { key: { commandName: 1 }, name: "commandName_idx" },
];
