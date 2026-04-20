"use client";

import IssueCard from "./issueCard";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, Inbox, Search } from "lucide-react";
import { signIn } from "next-auth/react";
import { useIssueStore } from "@/features/issue/store";
import { getIssues } from "@/features/issue/fetch";

export default function SearchIssues() {
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const pathname = usePathname();

  const {
    issues,
    totalIssues,
    isLoading,
    isLoadingMore,
    error,
    page,
    hasMore,
    isSearched,
    setPage,
    setCurrentParamsString,
  } = useIssueStore();

  useEffect(() => {
    if (paramsString) {
      setCurrentParamsString(paramsString);
      setPage(1);
      getIssues(paramsString, 1);
    }
  }, [paramsString, setCurrentParamsString, setPage, getIssues]);

  const handleLoadMore = async () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      const success = await getIssues(paramsString, nextPage);

      if (!success) {
        setPage(page);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-4 bg-card/50 rounded-xl border border-dashed border-border">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            Scanning GitHub
          </p>
          <p className="text-xs">Finding the best issues for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Search Stats */}
      {isSearched && !error && totalIssues > 0 && (
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-sm font-semibold text-foreground">
            Results{" "}
            <span className="text-muted-foreground font-normal ml-1">
              ({totalIssues.toLocaleString()})
            </span>
          </h2>
        </div>
      )}

      {/* Error Handlers */}
      {error === "No token provided" && (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">
            Please{" "}
            <button
              onClick={() =>
                signIn("github", { callbackUrl: pathname + "?" + paramsString })
              }
              className="underline font-bold hover:opacity-80 transition-opacity"
            >
              Sign in
            </button>{" "}
            to access the GitHub API.
          </p>
        </div>
      )}

      {error === "Rate limit exceeded" && (
        <div className="flex flex-col items-center text-center p-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 gap-2">
          <AlertCircle className="w-8 h-8" />
          <p className="font-bold">Rate Limit Hit</p>
          <p className="text-sm">
            GitHub is taking a breather. Please try again in a few minutes.
          </p>
        </div>
      )}

      {/* Empty States */}
      {!isSearched && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground opacity-60">
          <Search className="w-12 h-12 mb-4 stroke-[1.5]" />
          <p className="text-sm font-medium">
            Adjust filters to start your search
          </p>
        </div>
      )}

      {isSearched && !issues.length && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Inbox className="w-12 h-12 mb-4 stroke-[1.5]" />
          <p className="text-sm font-medium">
            No issues matched your criteria.
          </p>
        </div>
      )}

      {/* Issue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {issues?.map((i) => (
          <IssueCard key={i.id} issue={i} />
        ))}
      </div>

      {/* Infinite Load / Footer Info */}
      <div className="py-10">
        {!isLoading && issues.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="btn-primary px-8 py-3 rounded-full flex items-center gap-3 transition-transform active:scale-95 disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Show More Issues"
                )}
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-20 bg-border" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  End of results
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
