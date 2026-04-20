"use client";

import Link from "next/link";
import { FileQuestion, GitBranch, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
        <div className="relative bg-card border border-border p-8 rounded-3xl shadow-2xl">
          <FileQuestion size={80} className="text-primary mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
            <GitBranch size={16} />
            <span>404_NOT_FOUND</span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        Lost in the Source?
      </h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
        The issue or repository you&apos;re looking for seems to have been
        archived, deleted, or never existed in this branch.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
        >
          <Home size={18} />
          Back to Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-muted border border-border px-6 py-3 rounded-xl font-bold transition-all hover:bg-accent active:scale-95"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}
