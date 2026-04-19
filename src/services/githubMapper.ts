import { GitHubIssue } from "@/types/issue";

export function mapGitHubIssue(i: any): GitHubIssue {
  const repoName = i.repository_url.replace(
    "https://api.github.com/repos/",
    "",
  );

  return {
    id: i.id,
    title: i.title,
    html_url: i.html_url,
    repoName,
    repository_url: `https://github.com/${repoName}`,
    labels:
      i.labels?.map((l: any) => ({
        name: l.name,
        color: l.color,
      })) || [],
    user: {
      login: i.user.login,
      avatar_url: i.user.avatar_url,
    },
    created_at: i.created_at,
    updated_at: i.updated_at,
    body: i.body,
    comments: i.comments || 0,
  };
}
