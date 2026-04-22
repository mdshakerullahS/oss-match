import toast from "react-hot-toast";
import { useBookmarkStore } from "./store";

export const getBookmarks = async () => {
  const { setIsLoading, setBookmarks, setError } = useBookmarkStore.getState();
  try {
    setIsLoading(true);
    const res = await fetch("/api/bookmarks");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch bookmarks");
    }
    setBookmarks(data.bookmarks);
    setError(null);
  } catch {
    const message = "Something went wrong";
    setError(message);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};
