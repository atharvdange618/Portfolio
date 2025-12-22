import { ObjectId } from "mongodb";

/**
 * Command statistics for monthly aggregation
 */
export interface CommandStats {
  commandName: string;
  count: number;
}

/**
 * Country statistics for monthly aggregation
 */
export interface CountryStats {
  countryCode: string;
  countryName: string;
  count: number;
}

/**
 * Monthly statistics document in MongoDB
 */
export interface MonthlyStats {
  _id?: ObjectId;
  month: number; // 1-12
  year: number;
  totalSessions: number;
  uniqueVisitors: number;
  topCommands: CommandStats[];
  topCountries: CountryStats[];
  avgDuration: number; // in seconds
  createdAt: Date;
}

/**
 * Collection name for monthly stats
 */
export const MONTHLY_STATS_COLLECTION = "monthly_stats";

/**
 * MongoDB indexes for MonthlyStats collection
 */
export const MONTHLY_STATS_INDEXES = [
  { key: { year: -1, month: -1 }, name: "year_month_idx", unique: true },
  { key: { createdAt: -1 }, name: "createdAt_idx" },
];
