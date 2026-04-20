"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home, Terminal } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if you have one (e.g., Sentry)
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Visual Indicator */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-destructive/20 blur-[60px] rounded-full" />
        <div className="relative bg-card border border-destructive/20 p-8 rounded-3xl shadow-2xl">
          <AlertCircle size={80} className="text-destructive mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 text-destructive font-mono text-sm font-bold">
            <Terminal size={16} />
            <span>RUNTIME_ERROR</span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Something went sideways.
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          The application encountered an unexpected error. This usually happens
          when we can&apos;t reach the GitHub API or a component failed to
          render.
        </p>

        {/* Error Digest (Optional/Dev friendly) */}
        {error.digest && (
          <div className="inline-block px-3 py-1 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border">
            ID: {error.digest}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 w-full sm:w-auto justify-center"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 bg-card border border-border px-8 py-3 rounded-xl font-bold transition-all hover:bg-muted active:scale-95 w-full sm:w-auto justify-center"
        >
          <Home size={18} />
          Return Home
        </Link>
      </div>

      {/* Helpful Hint */}
      <p className="mt-12 text-xs text-muted-foreground/60 italic">
        Tip: Checking your internet connection or re-logging often fixes this.
      </p>
    </div>
  );
}
