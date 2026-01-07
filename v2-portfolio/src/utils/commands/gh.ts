import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import {
  fetchGitHubStats,
  fetchRepoStats,
  fetchTotalStars,
  fetchGitHubLanguages,
  fetchGitHubEvents,
} from "@/utils/api";

const USERNAME = "atharvdange618";

// gh command - GitHub CLI simulation
export const ghCommand: CommandDefinition = {
  name: "gh",
  description: "GitHub CLI - View GitHub stats and info",
  usage: "gh [user|repos|repo <name>|stats]",
  execute: async (context: CommandContext): Promise<CommandResponse> => {
    const subcommand = context.args[0] || "user";

    switch (subcommand.toLowerCase()) {
      case "user":
      case "profile":
        return await showUserStats();

      case "repos":
      case "repositories":
        return await showRepositories();

      case "repo":
      case "repository":
        if (!context.args[1]) {
          return {
            output: `\x1b[1;31mError:\x1b[0m Missing repository name\nUsage: gh repo <name>\n`,
            exitCode: 1,
          };
        }
        return await showRepoDetails(context.args[1]);

      case "stats":
      case "activity":
        return await showActivityStats();

      default:
        return {
          output: `\x1b[1;31mError:\x1b[0m Unknown subcommand '${subcommand}'\nUsage: gh [user|repos|repo <name>|stats]\n`,
          exitCode: 1,
        };
    }
  },
};

async function showUserStats(): Promise<CommandResponse> {
  const stats = await fetchGitHubStats(USERNAME);

  if (!stats) {
    return {
      output: `\x1b[1;31mError:\x1b[0m Failed to fetch GitHub stats\n`,
      exitCode: 1,
    };
  }

  const joinedDate = new Date(stats.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Fetch total stars (async, so we show it updating)
  const totalStarsPromise = fetchTotalStars(USERNAME);

  let output = `\x1b[1;32m@${USERNAME}\x1b[0m\n`;
  output += `\x1b[0m${stats.bio || "Full Stack Developer"}\x1b[0m\n\n`;
  output += `\x1b[1;37mGitHub Statistics:\x1b[0m\n`;
  output += `  \x1b[1;36m📦\x1b[0m Public Repos:  \x1b[1;33m${stats.publicRepos}\x1b[0m\n`;

  // Get total stars and update the line
  const totalStars = await totalStarsPromise;
  output += `  \x1b[1;33m⭐\x1b[0m Total Stars:   \x1b[1;33m${totalStars}\x1b[0m\n`;

  output += `  \x1b[1;34m👥\x1b[0m Followers:     \x1b[1;33m${stats.followers}\x1b[0m\n`;
  output += `  \x1b[1;35m👤\x1b[0m Following:     \x1b[1;33m${stats.following}\x1b[0m\n`;
  output += `  \x1b[1;32m📅\x1b[0m Joined:        \x1b[1;33m${joinedDate}\x1b[0m\n\n`;
  output += `\x1b[0mProfile: \x1b[4;36mhttps://github.com/${USERNAME}\x1b[0m\n`;

  return { output };
}

async function showRepositories(): Promise<CommandResponse> {
  const repos = [
    {
      name: "reiatsu",
      description: "Zero-dependency TypeScript web framework",
    },
    { name: "telemetry", description: "Privacy-first analytics platform" },
    { name: "Archive", description: "Personal digital sanctuary" },
    { name: "Minty", description: "Smart expense tracking app" },
    { name: "Recon", description: "Bug tracking intelligence system" },
    {
      name: "xml-sitemap-generator",
      description: "SEO-optimized sitemap generator",
    },
  ];

  let output = `\x1b[1;37mFeatured Repositories:\x1b[0m\n\n`;

  for (const repo of repos) {
    const stats = await fetchRepoStats(USERNAME, repo.name);
    const stars = stats
      ? `\x1b[1;33m⭐ ${stats.stars}\x1b[0m`
      : "\x1b[1;33m⭐ -\x1b[0m";
    const language = stats ? stats.language : "TypeScript";

    output += `\x1b[1;32m${repo.name}\x1b[0m\n`;
    output += `  \x1b[0m${repo.description}\x1b[0m\n`;
    output += `  ${stars}  \x1b[0;36m${language}\x1b[0m\n\n`;
  }

  output += `\x1b[0mView all: \x1b[4;36mhttps://github.com/${USERNAME}?tab=repositories\x1b[0m\n`;

  return { output };
}

async function showRepoDetails(repoName: string): Promise<CommandResponse> {
  const stats = await fetchRepoStats(USERNAME, repoName);

  if (!stats) {
    return {
      output: `\x1b[1;31mError:\x1b[0m Repository '${repoName}' not found or failed to fetch\n`,
      exitCode: 1,
    };
  }

  const updatedDate = new Date(stats.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let output = `\x1b[1;32m${USERNAME}/${repoName}\x1b[0m\n`;
  if (stats.description) {
    output += `\x1b[0m${stats.description}\x1b[0m\n\n`;
  } else {
    output += `\n`;
  }
  output += `\x1b[1;37mRepository Stats:\x1b[0m\n`;
  output += `  \x1b[1;33m⭐\x1b[0m Stars:         \x1b[1;33m${stats.stars}\x1b[0m\n`;
  output += `  \x1b[1;35m🔱\x1b[0m Forks:         \x1b[1;33m${stats.forks}\x1b[0m\n`;
  output += `  \x1b[1;36m👀\x1b[0m Watchers:      \x1b[1;33m${stats.watchers}\x1b[0m\n`;
  output += `  \x1b[1;31m🐛\x1b[0m Open Issues:   \x1b[1;33m${stats.openIssues}\x1b[0m\n`;
  output += `  \x1b[1;34m💻\x1b[0m Language:      \x1b[1;33m${stats.language}\x1b[0m\n`;
  output += `  \x1b[1;32m📅\x1b[0m Last Updated:  \x1b[1;33m${updatedDate}\x1b[0m\n\n`;
  output += `\x1b[0mView on GitHub: \x1b[4;36mhttps://github.com/${USERNAME}/${repoName}\x1b[0m\n`;

  return { output };
}

async function showActivityStats(): Promise<CommandResponse> {
  let output = `\x1b[1;36m📊 GitHub Activity Overview - @${USERNAME}\x1b[0m\n\n`;

  const stats = await fetchGitHubStats(USERNAME);

  if (!stats) {
    output += `\x1b[1;31mError:\x1b[0m Failed to fetch GitHub stats. Please try again later.\n`;
    output += `\x1b[2mThis might be due to GitHub API rate limiting.\x1b[0m\n\n`;
    output += `\x1b[0mView profile directly: \x1b[4;36mhttps://github.com/${USERNAME}\x1b[0m\n`;
    return { output, exitCode: 1 };
  }

  const totalStars = await fetchTotalStars(USERNAME);
  const languages = await fetchGitHubLanguages(USERNAME);
  const events = await fetchGitHubEvents(USERNAME);

  const joinedDate = new Date(stats.createdAt);
  const now = new Date();
  const yearsOnGitHub = (
    (now.getTime() - joinedDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365)
  ).toFixed(1);

  output += `\x1b[1;37mProfile Statistics:\x1b[0m\n`;
  output += `  Total Repositories:  \x1b[1;33m${stats.publicRepos}\x1b[0m\n`;
  output += `  Total Stars Earned:  \x1b[1;33m${totalStars}\x1b[0m ⭐\n`;
  output += `  Followers:           \x1b[1;33m${stats.followers}\x1b[0m\n`;
  output += `  Years on GitHub:     \x1b[1;33m${yearsOnGitHub}\x1b[0m years\n\n`;

  if (events) {
    const weeks = 52;
    output += `\x1b[1;37mContribution Activity (Last year):\x1b[0m\n`;
    output += `\x1b[2m(Note: Based on recent public events - GitHub API limitation)\x1b[0m\n`;

    const contributionGrid: number[][] = [];
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - weeks * 7);

    for (let day = 0; day < 7; day++) {
      contributionGrid[day] = [];
      for (let week = 0; week < weeks; week++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + week * 7 + day);
        const dateStr = date.toISOString().split("T")[0];
        const count = events[dateStr] || 0;
        contributionGrid[day][week] = count;
      }
    }

    const maxContributions = Math.max(
      ...contributionGrid.flat().filter((c) => c > 0),
      1
    );

    // Month labels - pre-calculate to match grid width exactly
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Build month label row that matches grid width (52 weeks × 2 chars = 104 chars)
    const gridWidth = weeks * 2; // Each week is 2 chars wide (██)
    const monthLabelRow = new Array(gridWidth).fill(" ");

    // Place month labels at the start of each month
    let lastMonth = -1;
    for (let week = 0; week < weeks; week++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + week * 7);
      const month = date.getMonth();

      // Place month name at the beginning of new months
      if (month !== lastMonth) {
        const position = week * 2; // 2 chars per week
        const monthName = monthNames[month];
        // Insert month name into the array
        for (let i = 0; i < monthName.length && position + i < gridWidth; i++) {
          monthLabelRow[position + i] = monthName[i];
        }
        lastMonth = month;
      }
    }

    output += `  \x1b[2m  ${monthLabelRow.join("")}\x1b[0m\n`;

    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let day = 0; day < 7; day++) {
      if (day === 0 || day === 2 || day === 4) {
        output += `\x1b[2m${dayLabels[day]}\x1b[0m `;
      } else {
        output += `    `;
      }

      for (let week = 0; week < weeks; week++) {
        const count = contributionGrid[day][week];
        const char = "█";
        let color = "\x1b[38;5;235m"; // Very dark for 0

        if (count > 0) {
          const intensity = count / maxContributions;
          if (intensity >= 0.75) {
            color = "\x1b[38;5;46m"; // Bright green (level 4)
          } else if (intensity >= 0.5) {
            color = "\x1b[38;5;34m"; // Medium green (level 3)
          } else if (intensity >= 0.25) {
            color = "\x1b[38;5;28m"; // Light green (level 2)
          } else {
            color = "\x1b[38;5;22m"; // Very light green (level 1)
          }
        }

        output += `${color}${char}${char}\x1b[0m`; // Double width for better visibility
      }
      output += "\n";
    }

    output += `\n`;
    output += `  \x1b[2mLess \x1b[38;5;235m██\x1b[0m \x1b[38;5;22m██\x1b[0m \x1b[38;5;28m██\x1b[0m \x1b[38;5;34m██\x1b[0m \x1b[38;5;46m██\x1b[0m More\x1b[0m\n\n`;

    const totalContributions = Object.values(events).reduce(
      (sum, count) => sum + count,
      0
    );
    output += `  \x1b[2mRecent public activity: \x1b[1;33m${totalContributions}\x1b[0m contributions (last 90 days)\x1b[0m\n`;
    output += `  \x1b[2mFull year data requires GitHub GraphQL API - view profile for complete stats\x1b[0m\n\n`;
  } else {
    output += `\x1b[2mContribution data temporarily unavailable (API rate limit).\x1b[0m\n\n`;
  }

  if (languages && languages.length > 0) {
    output += `\x1b[1;37mTop Languages:\x1b[0m\n`;

    const languageColors: { [key: string]: string } = {
      TypeScript: "\x1b[38;5;75m", // Light blue
      JavaScript: "\x1b[38;5;227m", // Yellow
      Python: "\x1b[38;5;41m", // Green
      Java: "\x1b[38;5;208m", // Orange
      CSS: "\x1b[38;5;207m", // Pink
      HTML: "\x1b[38;5;208m", // Orange
      Go: "\x1b[38;5;87m", // Cyan
      Rust: "\x1b[38;5;208m", // Orange
      C: "\x1b[38;5;246m", // Gray
      "C++": "\x1b[38;5;204m", // Pink
      EJS: "\x1b[38;5;113m", // Light green
    };

    const maxBarWidth = 40;

    languages.forEach((lang) => {
      const color = languageColors[lang.language] || "\x1b[38;5;246m";
      const percentage = parseFloat(lang.percentage);
      const barLength = Math.round((percentage / 100) * maxBarWidth);
      const bar = "█".repeat(barLength);

      output += `  ${color}${bar.padEnd(
        maxBarWidth
      )}\x1b[0m  ${lang.language.padEnd(15)} \x1b[2m(${
        lang.percentage
      }%)\x1b[0m\n`;
    });
    output += `\n`;
  } else {
    output += `\x1b[2mLanguage data temporarily unavailable (API rate limit).\x1b[0m\n\n`;
  }

  output += `\x1b[0mView full profile: \x1b[4;36mhttps://github.com/${USERNAME}\x1b[0m\n`;

  return { output };
}
