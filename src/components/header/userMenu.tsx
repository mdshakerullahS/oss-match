"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, LogOut, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(dropdownRef, () => setIsOpen(false));

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-10 w-10">
        <Loader2 className="animate-spin text-muted-foreground" size={20} />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/dashboard/for-you" })}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 border border-border rounded-full pl-1.5 pr-3 py-1.5 bg-background hover:bg-accent transition-all"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt="Avatar"
            width={28}
            height={28}
            className="rounded-full border border-border"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User size={14} />
          </div>
        )}

        <span className="max-w-25 truncate hidden sm:block text-sm font-medium">
          {session.user.name || "User"}
        </span>

        <ChevronDown size={14} className="text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 border border-border rounded-lg bg-popover text-popover-foreground shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <p className="text-sm font-semibold">{session.user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/dashboard/profile");
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent w-full text-left transition-colors"
            >
              <User size={16} /> Profile
            </button>
          </div>

          <div className="border-t border-border py-1">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full text-left transition-colors font-medium"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
