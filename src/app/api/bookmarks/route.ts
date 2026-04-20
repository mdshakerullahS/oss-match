import { getCurrentUser } from "@/lib/auth";
import { createBookmark, getUserBookmarks } from "@/services/bookmark.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const zodError = { error: "Invalid Data" };
const bookmarkSchema = z.object({
  issueId: z.number(zodError),
  title: z.string(zodError),
  repoName: z.string(zodError),
  html_url: z.string(zodError),
  user: z.string(zodError),
  avatar_url: z.string(zodError),
  created_at: z.string(zodError),
  comments: z.number(zodError),
  labels: z.array(
    z.object({
      name: z.string(zodError),
      color: z.string(zodError),
    }),
  ),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const data = bookmarkSchema.parse(body);

    createBookmark(data, user.email);

    return NextResponse.json(
      { success: true, message: "Bookmark created successfully" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create bookmark" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const bookmarks = await getUserBookmarks(user.email);

    return NextResponse.json({ success: true, bookmarks }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookmarks" },
      { status: 500 },
    );
  }
}
