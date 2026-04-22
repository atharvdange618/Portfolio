import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  owner: {
    login: string;
  };
}

const fetchStarredProjects = async (): Promise<GithubRepo[]> => {
  const { data } = await axios.get<GithubRepo[]>(
    "https://api.github.com/users/atharvdange618/starred",
  );

  const filtered = data.filter((repo) => repo.owner.login === "atharvdange618");
  return filtered.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
};

export function useGithubProjects() {
  return useQuery({
    queryKey: ["github-projects", "starred"],
    queryFn: fetchStarredProjects,
    staleTime: 1000 * 60 * 5,
  });
}
