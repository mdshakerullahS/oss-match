import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user || null;
}

export async function getGithubAccessToken() {
  const session = await getCurrentSession();
  return session?.githubAccessToken || null;
}
