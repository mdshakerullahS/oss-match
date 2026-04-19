import { prisma } from "@/lib/prisma";
import { BookmarkItem } from "@/types/bookmark";

export async function createBookmark(
  data: Omit<BookmarkItem, "id">,
  userEmail: string,
) {
  return prisma.bookmark.create({
    data: {
      userId: userEmail,
      issueId: BigInt(data.issueId),
      title: data.title,
      html_url: data.html_url,
      repoName: data.repoName,
      user: data.user,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
      comments: data.comments,
      labels: data.labels,
    },
  });
}

export async function getUserBookmarks(userEmail: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: userEmail },
    orderBy: { createdAt: "desc" },
  });

  return bookmarks.map((b) => ({
    ...b,
    issueId: b.issueId.toString(),
  }));
}

export async function deleteBookmark(id: string) {
  return prisma.bookmark.delete({
    where: { id },
  });
}
