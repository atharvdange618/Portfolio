/**
 * Fetch GitHub user stats
 */
export async function fetchGitHubStats(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("Failed to fetch GitHub stats");
    const data = await response.json();

    return {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      createdAt: data.created_at,
      avatarUrl: data.avatar_url,
      bio: data.bio,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}

/**
 * Fetch total stars across all user repositories
 */
export async function fetchTotalStars(username: string): Promise<number> {
  try {
    let totalStars = 0;
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
      );

      if (!response.ok) throw new Error("Failed to fetch repositories");

      const repos = await response.json();

      if (repos.length === 0) break;

      totalStars += repos.reduce(
        (sum: number, repo: { stargazers_count: number }) =>
          sum + repo.stargazers_count,
        0
      );

      // If we got less than perPage, we're done
      if (repos.length < perPage) break;

      page++;
    }

    return totalStars;
  } catch (error) {
    console.error("Error fetching total stars:", error);
    return 0;
  }
}

/**
 * Fetch GitHub repository stats
 */
export async function fetchRepoStats(username: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}`
    );
    if (!response.ok) throw new Error("Failed to fetch repo stats");
    const data = await response.json();

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      openIssues: data.open_issues_count,
      language: data.language,
      updatedAt: data.updated_at,
      description: data.description,
    };
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    return null;
  }
}

/**
 * Fetch NPM package download stats
 */
export async function fetchNpmDownloads(packageName: string) {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${packageName}`
    );
    if (!response.ok) throw new Error("Failed to fetch NPM stats");
    const data = await response.json();

    return {
      downloads: data.downloads,
      package: data.package,
      start: data.start,
      end: data.end,
    };
  } catch (error) {
    console.error("Error fetching NPM downloads:", error);
    return null;
  }
}

/**
 * Fetch NPM package info
 */
export async function fetchNpmPackageInfo(packageName: string) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!response.ok) throw new Error("Failed to fetch NPM package info");
    const data = await response.json();

    const latestVersion = data["dist-tags"].latest;
    const versionData = data.versions[latestVersion];

    return {
      name: data.name,
      version: latestVersion,
      description: data.description,
      license: versionData.license,
      dependencies: versionData.dependencies || {},
      keywords: data.keywords || [],
      repository: data.repository?.url,
    };
  } catch (error) {
    console.error("Error fetching NPM package info:", error);
    return null;
  }
}

/**
 * Fetch GitHub language statistics
 */
export async function fetchGitHubLanguages(username: string) {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
    const repos = await reposResponse.json();

    const languageStats: { [key: string]: number } = {};

    for (const repo of repos) {
      if (repo.fork) continue; // Skip forked repos

      try {
        const langResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/languages`
        );
        if (langResponse.ok) {
          const languages = await langResponse.json();
          for (const [lang, bytes] of Object.entries(languages)) {
            languageStats[lang] =
              (languageStats[lang] || 0) + (bytes as number);
          }
        }
      } catch (err) {
        continue;
      }
    }

    const totalBytes = Object.values(languageStats).reduce(
      (sum, bytes) => sum + bytes,
      0
    );

    const languagePercentages = Object.entries(languageStats)
      .map(([lang, bytes]) => ({
        language: lang,
        percentage: ((bytes / totalBytes) * 100).toFixed(1),
        bytes,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 5);

    return languagePercentages;
  } catch (error) {
    console.error("Error fetching GitHub languages:", error);
    return null;
  }
}

/**
 * Fetch GitHub events for contribution activity
 */
export async function fetchGitHubEvents(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`
    );
    if (!response.ok) throw new Error("Failed to fetch GitHub events");
    const events = await response.json();

    const contributions: { [key: string]: number } = {};
    const now = new Date();
    const weeks = 52;

    for (let i = 0; i < weeks * 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      contributions[dateStr] = 0;
    }

    events.forEach((event: { created_at: string }) => {
      const date = event.created_at.split("T")[0];
      if (contributions[date] !== undefined) {
        contributions[date]++;
      }
    });

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub events:", error);
    return null;
  }
}
