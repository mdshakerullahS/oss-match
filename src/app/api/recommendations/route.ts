import { getGithubAccessToken, getCurrentUser } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { fetchProfile } from "@/services/profile.service";
import { GitHubIssue } from "@/types/issue";
import { Repo } from "@/types/user";
import { NextResponse } from "next/server";
import { fetchRecommendations } from "@/services/recommendation.service";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const token = await getGithubAccessToken();

    if (!user?.email || !token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const cacheKey = `recommendations:${user.email}`;
    const cached = await redis.get<GitHubIssue[]>(cacheKey);

    if (cached) {
      return NextResponse.json(
        { success: true, recommendations: cached, source: "Cache" },
        { status: 200 },
      );
    }

    const repoCacheKey = `repos:${user.email}`;
    let repoCache = await redis.get<{
      topLanguages: string[];
      recentRepos: Repo[];
    }>(repoCacheKey);

    if (!repoCache) {
      repoCache = await fetchProfile(token);
      await redis.set(repoCacheKey, repoCache, 60 * 60 * 24);
    }

    if (!repoCache.topLanguages) {
      return NextResponse.json(
        {
          success: false,
          error: "No profile data found to generate recommendations",
        },
        { status: 404 },
      );
    }

    const recommendations = await fetchRecommendations(
      token,
      repoCache.topLanguages,
    );

    await redis.set(cacheKey, recommendations, 60 * 60 * 24);

    return NextResponse.json(
      { success: true, recommendations, source: "API" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch recommendations" },
      { status: 500 },
    );
  }
}
