import { CommandDefinition } from "@/utils/command-registry";

/**
 * Analytics stats response interface
 */
interface AnalyticsStats {
  totalSessions: number;
  uniqueVisitors: number;
  dailyViews: Array<{ date: string; count: number }>;
  topCommands: Array<{ command: string; count: number; percentage: number }>;
  topCountries: Array<{
    countryCode: string;
    countryName: string;
    count: number;
    percentage: number;
  }>;
  avgSessionDuration: number;
}

/**
 * Format duration in seconds to human-readable format
 */
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (minutes === 0) {
    return `${secs}s`;
  }
  return `${minutes}m ${secs}s`;
}

/**
 * Create ASCII bar chart
 */
function createBarChart(
  data: Array<{ label: string; value: number; max: number }>
): string {
  const maxBarLength = 40;
  let output = "";

  data.forEach((item) => {
    const barLength = Math.round((item.value / item.max) * maxBarLength);
    const bar = "█".repeat(barLength) + "░".repeat(maxBarLength - barLength);
    const label = item.label.padEnd(20);
    const value = item.value.toString().padStart(6);

    output += `\r\n  ${label} \x1b[1;36m${bar}\x1b[0m ${value}`;
  });

  return output;
}

/**
 * Create ASCII world map with India highlighted
 */
function createWorldMap(): string {
  // Simple ASCII representation focusing on Asia
  const map = `
  \x1b[1;33m                 VISITOR LOCATIONS\x1b[0m
  ┌────────────────────────────────────────────────────┐
  │                                                    │
  │                      \x1b[1;32m●\x1b[0m Russia                  │
  │                                                    │
  │          Europe    \x1b[1;32m●\x1b[0m China                   │
  │            \x1b[1;32m●\x1b[0m          ┃                        │
  │                      ┃   \x1b[1;31m⬤ INDIA\x1b[0m              │
  │                      ┃                            │
  │          Africa      ┗━━━━━━━━━━━┓               │
  │            \x1b[1;32m●\x1b[0m                    ┃               │
  │                                 ┃  SEA           │
  │                                 ┃   \x1b[1;32m●\x1b[0m            │
  │                              Australia            │
  │                                  \x1b[1;32m●\x1b[0m               │
  └────────────────────────────────────────────────────┘
`;

  return map;
}

/**
 * Format analytics stats into terminal output
 */
export function formatAnalyticsOutput(stats: AnalyticsStats): string {
  // Build output
  let output = "\r\n";
  output +=
    "\x1b[1;36m╔════════════════════════════════════════════════════════╗\x1b[0m\r\n";
  output +=
    "\x1b[1;36m║\x1b[0m          \x1b[1;32mPORTFOLIO ANALYTICS DASHBOARD\x1b[0m                 \x1b[1;36m║\x1b[0m\r\n";
  output +=
    "\x1b[1;36m╚════════════════════════════════════════════════════════╝\x1b[0m\r\n";
  output += "\r\n";

  // Summary stats
  output += "\x1b[1;33m📊 OVERVIEW (Last 90 Days)\x1b[0m\r\n";
  output += "─".repeat(56) + "\r\n";
  output += `  Total Sessions:       \x1b[1;32m${stats.totalSessions}\x1b[0m\r\n`;
  output += `  Unique Visitors:      \x1b[1;32m${stats.uniqueVisitors}\x1b[0m\r\n`;
  output += `  Avg Session Duration: \x1b[1;32m${formatDuration(
    stats.avgSessionDuration
  )}\x1b[0m\r\n`;
  output += "\r\n";

  // Daily views chart (last 7 days)
  output += "\x1b[1;33m📈 DAILY VIEWS (Last 7 Days)\x1b[0m\r\n";
  output += "─".repeat(56) + "\r\n";

  const last7Days = stats.dailyViews.slice(-7);
  const maxViews = Math.max(...last7Days.map((d) => d.count), 1);

  const chartData = last7Days.map((day) => ({
    label: new Date(day.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: day.count,
    max: maxViews,
  }));

  output += createBarChart(chartData);
  output += "\r\n\r\n";

  // Top commands
  output += "\x1b[1;33m⚡ TOP COMMANDS\x1b[0m\r\n";
  output += "─".repeat(56) + "\r\n";

  const topCommandsData = stats.topCommands.slice(0, 10).map((cmd) => ({
    label: cmd.command,
    value: cmd.count,
    max: stats.topCommands[0]?.count || 1,
  }));

  output += createBarChart(topCommandsData);
  output += "\r\n\r\n";

  // Geographic distribution
  output += "\x1b[1;33m🌍 GEOGRAPHIC DISTRIBUTION\x1b[0m\r\n";
  output += "─".repeat(56) + "\r\n";

  if (stats.topCountries.length > 0) {
    output += createWorldMap();
    output += "\r\n";

    output += "\x1b[1;33m  Top Countries:\x1b[0m\r\n";
    stats.topCountries.slice(0, 5).forEach((country, index) => {
      const flag = country.countryCode === "IN" ? "🇮🇳" : "🌐";
      const highlight = country.countryCode === "IN" ? "\x1b[1;32m" : "\x1b[0m";
      output += `    ${index + 1}. ${flag} ${highlight}${
        country.countryName
      }\x1b[0m - ${country.count} visits (${country.percentage.toFixed(
        1
      )}%)\r\n`;
    });
  } else {
    output += "\x1b[2m  No location data available\x1b[0m\r\n";
  }

  output += "\r\n";
  output += "\x1b[2m  Data refreshes every 5 minutes\x1b[0m\r\n";
  output += "\r\n";

  return output;
}

/**
 * Analytics command - password protected dashboard
 */
export const analyticsCommand: CommandDefinition = {
  name: "analytics",
  description: "View portfolio analytics (password protected)",
  aliases: ["stats"],
  async execute() {
    // This command is now handled specially in Terminal.tsx
    // to support password input mode
    return {
      output:
        "\r\n\x1b[2mThis command requires password authentication\x1b[0m\r\n",
    };
  },
};
