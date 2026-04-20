import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import { Repo } from "@/types/user";
import { getGithubAccessToken, getCurrentUser } from "@/lib/auth";
import { fetchProfile } from "@/services/profile.service";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const token = await getGithubAccessToken();

    if (!user || !token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const cacheKey = `repos:${user.email}`;

    const cached = await redis.get<{
      topLanguages: string[];
      recentRepos: Repo[];
    }>(cacheKey);
    if (cached) {
      return NextResponse.json(
        {
          success: true,
          topLanguages: cached.topLanguages,
          recentRepos: cached.recentRepos,
          source: "Cache",
        },
        { status: 200 },
      );
    }

    const responseData = await fetchProfile(token);

    await redis.set(cacheKey, responseData, 60 * 60 * 24);

    return NextResponse.json({ success: true, ...responseData, source: "API" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}
