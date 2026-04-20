import { useIssueStore } from "./store";
import toast from "react-hot-toast";

export const getIssues = async (paramsString: string, currentPage: number) => {
  const {
    issues,
    totalIssues,
    setIssues,
    setIsLoading,
    setIsLoadingMore,
    setTotalIssues,
    setHasMore,
    setIsSearched,
    setError,
  } = useIssueStore();
  try {
    if (currentPage === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    const res = await fetch(`/api/issues?${paramsString}&page=${currentPage}`);
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch issues");
    }

    const updatedIssues =
      currentPage === 1 ? data.issues : [...issues, ...data.issues];
    const updatedTotal = currentPage === 1 ? data.total : totalIssues;
    setIssues(updatedIssues);
    setTotalIssues(updatedTotal);
    setHasMore(updatedIssues.length < updatedTotal);
    setIsSearched(true);
    setError(null);

    return true;
  } catch (err: any) {
    const message = err.message || "Something went wrong";
    setError(message);
    toast.error(message);
    return false;
  } finally {
    setIsLoading(false);
    setIsLoadingMore(false);
  }
};
