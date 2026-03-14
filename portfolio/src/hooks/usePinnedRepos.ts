import { useState, useEffect } from "react";
import { fetchPinnedRepos, type GitHubPinnedProject } from "@/lib/github";

const GITHUB_USERNAME = "atharvdange618";

export function usePinnedRepos() {
  const [projects, setProjects] = useState<GitHubPinnedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPinnedRepos() {
      try {
        setLoading(true);
        setError(null);
        const repos = await fetchPinnedRepos(GITHUB_USERNAME);
        setProjects(repos);
      } catch (err) {
        console.error("Failed to load pinned repos:", err);
        setError("Failed to load projects from GitHub");
      } finally {
        setLoading(false);
      }
    }

    loadPinnedRepos();
  }, []);

  return { projects, loading, error };
}
