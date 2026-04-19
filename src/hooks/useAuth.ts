"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user ?? null;
  const token = session?.githubAccessToken ?? null;

  const isAuthLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return {
    user,
    token,
    session,
    isAuthLoading,
    isAuthenticated,
    signIn,
    signOut,
  };
}
