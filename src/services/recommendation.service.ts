import { parseDateValue } from "@/utils/queryParser";
import { GitHubIssue } from "@/types/issue";
import { fetchIssues } from "./github.service";

export async function fetchRecommendations(
  token: string,
  languages: string[],
): Promise<GitHubIssue[]> {
  const queries = languages.map(
    (lang) =>
      `language:${lang} is:issue is:open label:"good first issue","help wanted" archived:false created:>${parseDateValue("90")} comments:1..10`,
  );

  const results = await Promise.all(
    queries.map((q) =>
      fetchIssues(q, "&sort=created&order=desc&per_page=5", 1, token),
    ),
  );

  return results.flatMap((res) => res.issues);
}
