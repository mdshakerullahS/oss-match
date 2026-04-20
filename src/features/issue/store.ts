import { GitHubIssue } from "@/types/issue";
import { create } from "zustand";

interface IssueStore {
  issues: GitHubIssue[];
  setIssues: (issues: GitHubIssue[]) => void;

  totalIssues: number;
  setTotalIssues: (totalIssues: number) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  isLoadingMore: boolean;
  setIsLoadingMore: (isLoadingMore: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  page: number;
  setPage: (page: number) => void;

  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;

  currentParamsString: string;
  setCurrentParamsString: (currentParamsString: string) => void;

  isSearched: boolean;
  setIsSearched: (isSearched: boolean) => void;
}

export const useIssueStore = create<IssueStore>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),

  totalIssues: 0,
  setTotalIssues: (totalIssues) => set({ totalIssues }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  isLoadingMore: false,
  setIsLoadingMore: (isLoadingMore) => set({ isLoadingMore }),

  error: null,
  setError: (error) => set({ error }),

  page: 1,
  setPage: (page) => set({ page }),

  hasMore: true,
  setHasMore: (hasMore) => set({ hasMore }),

  currentParamsString: "",
  setCurrentParamsString: (currentParamsString) => set({ currentParamsString }),

  isSearched: false,
  setIsSearched: (isSearched) => set({ isSearched }),
}));
