import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { fetchGitHubStats, fetchRepoStats, fetchTotalStars } from "@/utils/api";

const USERNAME = "atharvdange618";

// gh command - GitHub CLI simulation
export const ghCommand: CommandDefinition = {
  name: "gh",
  description: "GitHub CLI - View GitHub stats and info",
  usage: "gh [user|repos|repo <name>]",
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

      default:
        return {
          output: `\x1b[1;31mError:\x1b[0m Unknown subcommand '${subcommand}'\nUsage: gh [user|repos|repo <name>]\n`,
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
  // Hardcoded key repos for now - can be enhanced with API call
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
