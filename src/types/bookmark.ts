export interface BookmarkItem {
  id: number;
  issueId: number;
  title: string;
  html_url: string;
  repoName: string;
  user: string;
  avatar_url: string;
  created_at: string;
  comments: number;
  labels: { name: string; color: string }[];
}
