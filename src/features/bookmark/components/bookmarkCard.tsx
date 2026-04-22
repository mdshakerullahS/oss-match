"use client";

import { deleteBookmark } from "@/features/bookmark/fetch";
import { useBookmarkStore } from "@/features/bookmark/store";
import { BookmarkItem } from "@/types/bookmark";
import {
  MessageSquare,
  ExternalLink,
  Calendar,
  Trash2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookmarkCard({ bookmark }: { bookmark: BookmarkItem }) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formattedDate = new Date(bookmark.created_at).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    deleteBookmark(bookmark.id);
    setShowConfirm(false);
  };

  const cancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Remove Bookmark
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to remove this bookmark? This action
                cannot be undone.
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={cancelRemove}
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card flex flex-col h-full p-5 hover:border-destructive/30 hover:shadow-md group transition-all duration-200 border border-border rounded-xl bg-card">
        {/* Header: User & Repo Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image
              src={bookmark.avatar_url}
              height={24}
              width={24}
              alt={bookmark.user}
              className="w-6 h-6 rounded-full border border-border shadow-sm"
            />
            <div className="flex flex-col min-w-0">
              <Link
                href={`https://github.com/${bookmark.repoName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-foreground hover:text-primary transition-colors truncate"
              >
                {bookmark.repoName}
              </Link>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar size={10} />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body: Title */}
        <div className="mb-4 grow">
          <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            <Link
              href={bookmark.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-1"
            >
              {bookmark.title}
              <ExternalLink
                size={14}
                className="opacity-0 group-hover:opacity-40 shrink-0 mt-1 transition-opacity"
              />
            </Link>
          </h3>
        </div>

        {/* Labels Section */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {bookmark.labels?.slice(0, 3).map((label) => (
            <span
              key={label.name}
              className="px-2 py-0.5 text-[10px] font-bold rounded-md border"
              style={{
                backgroundColor: `#${label.color}15`,
                borderColor: `#${label.color}40`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
          {bookmark.labels && bookmark.labels.length > 3 && (
            <span className="text-[10px] text-muted-foreground font-medium self-center">
              +{bookmark.labels.length - 3}
            </span>
          )}
        </div>

        {/* Footer: Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MessageSquare className="w-3.5 h-3.5 text-primary/60" />
            <span>
              {bookmark.comments}{" "}
              {bookmark.comments === 1 ? "comment" : "comments"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Delete Button */}
            <button
              onClick={handleRemove}
              disabled={isDeleting}
              title="Remove bookmark"
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 lg:opacity-0 lg:group-hover:opacity-100 transition-all disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* External View Link */}
            <Link
              href={bookmark.html_url}
              target="_blank"
              className="text-[11px] font-bold text-primary uppercase tracking-tighter lg:opacity-0 lg:group-hover:opacity-100 transition-all bg-primary/5 px-2 py-1 rounded"
            >
              View Issue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
