import {
  MessageSquare,
  Calendar,
  Star,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface MockIssueProps {
  repo: string;
  title: string;
  date: string;
  comments: number;
  active?: boolean;
}

const MockIssueCard = ({
  title,
  repo,
  date,
  comments,
  active = false,
}: MockIssueProps) => (
  <div
    className={`p-4 rounded-xl border transition-all duration-500 bg-card ${
      active
        ? "scale-105 shadow-xl border-primary/40 z-10 relative"
        : "opacity-40 blur-[0.5px] border-border scale-95"
    }`}
  >
    {/* Header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-5 h-5 rounded-full bg-muted border border-border shrink-0" />
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold truncate">{repo}</span>
        <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
          <Calendar size={8} />
          <span>{date}</span>
        </div>
      </div>
    </div>

    {/* Title */}
    <h4 className="text-xs font-bold mb-3 line-clamp-1 flex items-start gap-1">
      {title}
      {active && <ExternalLink size={10} className="opacity-40" />}
    </h4>

    {/* Footer */}
    <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
      <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
        <MessageSquare size={10} className="text-primary/60" />
        <span>{comments} comments</span>
      </div>
      <div
        className={`p-1 rounded-md bg-primary/5 ${active ? "text-primary" : "text-muted-foreground"}`}
      >
        <Star size={10} className={active ? "fill-primary" : ""} />
      </div>
    </div>
  </div>
);

export const ProcessVisual = () => {
  return (
    <div className="flex-1 w-full bg-muted/20 border border-border rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

      {/* Browser Dots */}
      <div className="flex items-center gap-1.5 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
      </div>

      {/* Mockup Stack */}
      <div className="relative -space-y-5">
        <MockIssueCard
          repo="facebook/react"
          title="Fix: Concurrent mode edge case"
          date="Oct 12"
          comments={12}
        />
        <MockIssueCard
          active={true}
          repo="vercel/next.js"
          title="Improve: Middleware performance"
          date="Just now"
          comments={3}
        />
        <MockIssueCard
          repo="prisma/prisma"
          title="Feat: Add support for new driver"
          date="Oct 10"
          comments={8}
        />
      </div>

      {/* Floating Success Badge */}
      <div className="absolute bottom-6 left-6 bg-background border border-border p-3 rounded-xl shadow-2xl hidden md:block group-hover:-translate-y-2 transition-transform duration-500">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-1.5 rounded-full animate-pulse">
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <span className="text-sm font-bold tracking-tight">
            Matched for you!
          </span>
        </div>
      </div>
    </div>
  );
};
