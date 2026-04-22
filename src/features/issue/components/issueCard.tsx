"use client";

import {
  MessageSquare,
  ExternalLink,
  Calendar,
  Star,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { GitHubIssue } from "@/types/issue";
import { useState } from "react";

export default function IssueCard({ issue }: { issue: GitHubIssue }) {
  const [isBookmarking, setIsBookmarking] = useState<boolean>(false);

  const formattedDate = new Date(issue.created_at).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const handleBookMark = async (e: React.MouseEvent) => {
    e.preventDefault();

    setIsBookmarking(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issueId: issue.id,
          repoName: issue.repoName,
          title: issue.title,
          html_url: issue.html_url,
          user: issue.user.login,
          avatar_url: issue.user.avatar_url,
          created_at: issue.created_at,
          comments: issue.comments,
          labels: issue.labels,
        }),
      });

      if (res.ok) {
        toast.success("Saved to bookmarks");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to bookmark");
      }
    } catch {
      toast.error("Connection error");
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div className="card flex flex-col h-full p-5 hover:border-primary/50 hover:shadow-md group transition-all duration-200 border border-border rounded-xl bg-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Image
            src={issue.user.avatar_url}
            height={24}
            width={24}
            alt={issue.user.login}
            className="w-6 h-6 rounded-full border border-border"
          />
          <div className="flex flex-col min-w-0">
            <Link
              href={`https://github.com/${issue.repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-foreground hover:text-primary transition-colors truncate"
            >
              {issue.repoName}
            </Link>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar size={10} />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-4 grow">
        <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
          <Link
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1"
          >
            {issue.title}
            <ExternalLink
              size={14}
              className="opacity-0 group-hover:opacity-40 shrink-0 mt-1 transition-opacity"
            />
          </Link>
        </h3>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {issue.labels?.slice(0, 3).map((label) => (
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
        {issue.labels && issue.labels.length > 3 && (
          <span className="text-[10px] text-muted-foreground font-medium self-center">
            +{issue.labels.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}

      {/* Footer: Interaction Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <MessageSquare className="w-3.5 h-3.5 text-primary/60" />
          <span>
            {issue.comments} {issue.comments === 1 ? "comment" : "comments"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Bookmark Button: Always visible on mobile, hover-only on lg screens */}
          <button
            onClick={handleBookMark}
            disabled={isBookmarking}
            title="Bookmark issue"
            className="p-1.5 rounded-md bg-primary/5 text-primary lg:opacity-0 lg:group-hover:opacity-100 transition-all disabled:opacity-50"
          >
            {isBookmarking ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Star className="w-3.5 h-3.5 lg:hover:fill-primary transition-colors" />
            )}
          </button>

          {/* View Link: Always visible on mobile, hover-only on lg screens */}
          <Link
            href={issue.html_url}
            target="_blank"
            className="text-[11px] font-bold text-primary uppercase tracking-tighter lg:opacity-0 lg:group-hover:opacity-100 transition-all bg-primary/5 px-2 py-1 rounded"
          >
            View Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
