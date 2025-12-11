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
