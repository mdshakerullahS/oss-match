import { useRecommendationStore } from "./store";

export const getRecommendations = async () => {
  const { setRecommendations, setError, setIsLoading } =
    useRecommendationStore();
  try {
    setIsLoading(true);
    const res = await fetch("/api/recommendations");
    const data = await res.json();
    if (data.success) {
      setRecommendations(data.recommendations);
    } else {
      setError(data.error || "Failed to fetch recommendations");
    }
  } catch {
    setError("An error occurred while fetching recommendations");
  } finally {
    setIsLoading(false);
  }
};
