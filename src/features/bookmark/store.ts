import { BookmarkItem } from "@/types/bookmark";
import { create } from "zustand";

interface BookmarkStore {
  bookmarks: BookmarkItem[];
  setBookmarks: (bookmarks: BookmarkItem[]) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  error: null,
  setError: (error) => set({ error }),
}));
