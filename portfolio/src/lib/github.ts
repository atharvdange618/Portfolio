interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  homepageUrl: string | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
}

interface GraphQLResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: PinnedRepo[];
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export interface GitHubPinnedProject {
  id: string;
  name: string;
  status: string;
  description: string;
  techStack: string[];
  github: string;
  live: string | null;
  stars: number;
  forks: number;
  language: string;
}

/**
 * Fetch pinned repositories from GitHub using GraphQL API
 */
export async function fetchPinnedRepos(
  username: string,
): Promise<GitHubPinnedProject[]> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token not found in environment variables");
    return [];
  }

  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              homepageUrl
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return [];
    }

    return result.data.user.pinnedItems.nodes.map((repo, index) => ({
      id: (index + 1).toString(),
      name: repo.name,
      status: "Active",
      description: repo.description || "No description available",
      techStack: repo.repositoryTopics.nodes
        .map((t) => t.topic.name)
        .filter((name) => !name.includes("-"))
        .slice(0, 6) || [repo.primaryLanguage?.name || ""],
      github: repo.url,
      live: repo.homepageUrl,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching pinned repos:", error);
    return [];
  }
}
