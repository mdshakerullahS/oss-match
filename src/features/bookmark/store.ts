import { BookmarkItem } from "@/types/bookmark";
import { create } from "zustand";

interface BookmarkStore {
  bookmarks: BookmarkItem[];
  setBookmarks: (bookmarks: BookmarkItem[]) => void;

  isBookmarking: boolean;
  setIsBookmarking: (isBookmarking: boolean) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),

  isBookmarking: false,
  setIsBookmarking: (isBookmarking) => set({ isBookmarking }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  error: null,
  setError: (error) => set({ error }),

  isDeleting: false,
  setIsDeleting: (isDeleting) => set({ isDeleting }),
}));
