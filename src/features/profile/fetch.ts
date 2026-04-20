import { useProfileStore } from "./store";

export const getProfile = async () => {
  const { setLoading, setTopLanguages, setRecentRepos, setError } =
    useProfileStore.getState();

  try {
    setLoading(true);
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.success) {
      setTopLanguages(data.topLanguages);
      setRecentRepos(data.recentRepos);
    } else {
      setError(data.error || "Failed to fetch profile");
    }
  } catch {
    setError("An error occurred while fetching profile");
  } finally {
    setLoading(false);
  }
};
