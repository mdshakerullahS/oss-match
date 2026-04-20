import { NextRequest, NextResponse } from "next/server";
import { GitHubIssue } from "@/types/issue";
import { getCached, setCached } from "@/lib/cache";
import { fetchIssues } from "@/services/github.service";
import { buildGitHubQuery } from "@/utils/githubQueryBuilder";
import { getGithubAccessToken } from "@/lib/auth";

interface CachedData {
  issues: GitHubIssue[];
  total: number;
  page: number;
}

export async function GET(req: NextRequest) {
  try {
    const token = await getGithubAccessToken();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = req.nextUrl;

    const sortedParams = new URLSearchParams(searchParams);
    sortedParams.sort();

    const cacheKey = `issues:${sortedParams.toString() || "all"}`;

    const cached = await getCached<CachedData>(cacheKey);

    if (cached) {
      return NextResponse.json(
        {
          success: true,
          issues: cached.issues,
          total: cached.total,
          page: cached.page,
          source: "Cache",
        },
        { status: 200 },
      );
    }

    const { githubQuery, sortParams, page } = buildGitHubQuery(searchParams);

    const data = await fetchIssues(githubQuery, sortParams, page, token);

    const ttl = searchParams.get("q") ? 120 : 300;
    await setCached<CachedData>(cacheKey, data, ttl);

    return NextResponse.json(
      { success: true, ...data, source: "API" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
