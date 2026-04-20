"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { themes } from "@/constants/themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(0);
  }, []);

  if (!mounted) return null;

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  const Icon = currentTheme.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center p-2.5 border rounded-md bg-background hover:bg-accent"
      >
        <Icon size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 border rounded-lg bg-popover shadow-lg">
          {themes.map((t) => {
            const ThemeIcon = t.icon;

            return (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm"
              >
                <ThemeIcon size={16} />
                {t.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
