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

export const deleteBookmark = async (id: number) => {
  const { setIsDeleting, setBookmarks, bookmarks } =
    useBookmarkStore.getState();
  try {
    setIsDeleting(true);
    const res = await fetch(`/api/bookmarks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Bookmark removed");
    } else {
      toast.error("Failed to remove bookmark");
    }
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  } catch {
    toast.error("Connection error");
  } finally {
    setIsDeleting(false);
  }
};
