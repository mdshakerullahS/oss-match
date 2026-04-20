import { create } from "zustand";
import { GitHubIssue } from "@/types/issue";

interface RecommendationState {
  recommendations: GitHubIssue[];
  setRecommendations: (recommendations: GitHubIssue[]) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  recommendations: [],
  setRecommendations: (recommendations) => set({ recommendations }),

  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),

  error: null,
  setError: (error) => set({ error }),
}));
