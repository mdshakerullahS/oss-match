import { applyRateLimit } from "@/lib/rateLimit";
import { GitHubIssue } from "@/types/issue";
import { mapGitHubIssue } from "./githubMapper";

export async function fetchIssues(
  githubQuery: string,
  sortParams: string,
  page: number,
  token: string,
) {
  await applyRateLimit("github:search", 10, 60);

  const res = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(
      githubQuery,
    )}${sortParams}&page=${page}&per_page=30`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("GitHub API Error");
  }

  const data = await res.json();

  const issues: GitHubIssue[] = data.items.map(mapGitHubIssue);

  return {
    issues,
    total: data.total_count,
    page,
  };
}
