import { create } from "zustand";
import { Repo } from "@/types/user";

interface ProfileStore {
  topLanguages: string[];
  setTopLanguages: (topLanguages: string[]) => void;

  recentRepos: Repo[];
  setRecentRepos: (recentRepos: Repo[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  topLanguages: [],
  setTopLanguages: (topLanguages) => set({ topLanguages }),

  recentRepos: [],
  setRecentRepos: (recentRepos) => set({ recentRepos }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),
}));
