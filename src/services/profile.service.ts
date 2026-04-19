import { applyRateLimit } from "@/lib/rateLimit";
import { Repo } from "@/types/user";

export const fetchProfile = async (token: string) => {
  await applyRateLimit("profile", 5000, 3600);

  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data: Repo[] = await res.json();

  const recentRepos = [...data]
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 6);

  const languageCounts: Record<string, number> = {};

  data.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);

  const responseData = { topLanguages, recentRepos };

  return responseData;
};
