import { getCurrentUser } from "@/lib/auth";
import { deleteBookmark } from "@/services/bookmark.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    await deleteBookmark(id);

    return NextResponse.json(
      { success: true, message: "Bookmark deleted successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete bookmark" },
      { status: 500 },
    );
  }
}
