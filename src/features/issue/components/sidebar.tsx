"use client";

import { useIssueStore } from "@/features/issue/store";
import { Filter, Search, RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchFilters } from "@/types/issue";
import { labels } from "@/constants/labels";
import { languages } from "@/constants/languages";
import { getIssues } from "@/features/issue/fetch";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<SearchFilters>({
    defaultValues: {
      sort: "created",
      unassigned: false,
    },
  });
  const { setIsSearched } = useIssueStore();

  const onSubmit: SubmitHandler<SearchFilters> = (data) => {
    const params = new URLSearchParams();

    if (data.keywords?.trim()) params.set("q", data.keywords);
    if (data.language) params.set("language", data.language);
    if (data.label) params.set("label", data.label);
    if (data.sort) params.set("sort", data.sort);
    if (data.updated) params.set("updated", data.updated);
    if (data.comments) params.set("comments", data.comments);
    if (data.unassigned) params.set("unassigned", "true");

    const newParamsString = params.toString();
    router.push(`${pathname}?${newParamsString}`);
    setIsSearched(true);
    getIssues(newParamsString, 1);

    if (onClose) onClose();
  };

  const handleReset = () => {
    reset();
    router.push(pathname);
    setIsSearched(false);
    if (onClose) onClose();
  };

  return (
    <aside className="flex flex-col h-full bg-card lg:border lg:border-border lg:rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Search Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Filter size={18} className="text-primary" />
              <span>Filters</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>

          {/* Keyword Search */}
          <div className="group flex w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm items-center gap-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <Search
              size={16}
              className="text-muted-foreground group-focus-within:text-primary"
            />
            <input
              placeholder="Search issues..."
              type="text"
              {...register("keywords")}
              className="w-full bg-transparent placeholder:text-muted-foreground outline-none"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 gap-5">
            {[
              {
                label: "Language",
                name: "language",
                options: languages,
                placeholder: "All Languages",
              },
              {
                label: "Label",
                name: "label",
                options: labels,
                placeholder: "Any Label",
              },
              {
                label: "Sort By",
                name: "sort",
                customOptions: (
                  <>
                    <option value="created">Newest First</option>
                    <option value="created-asc">Oldest First</option>
                    <option value="comments">Most Commented</option>
                  </>
                ),
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                  {field.label}
                </label>
                <select
                  {...register(field.name as keyof SearchFilters)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  {field.placeholder && (
                    <option value="">{field.placeholder}</option>
                  )}
                  {field.customOptions
                    ? field.customOptions
                    : field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                </select>
              </div>
            ))}

            {/* Range Filters Group */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                  Updated
                </label>
                <select
                  {...register("updated")}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  <option value="">Any Time</option>
                  <option value=">30">30 Days</option>
                  <option value=">7">7 Days</option>
                  <option value=">1">24 Hours</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                  Comments
                </label>
                <select
                  {...register("comments")}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  <option value="">Any</option>
                  <option value="0">None</option>
                  <option value="1..10">1 - 10</option>
                  <option value=">10">10+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 border-t border-border">
            <label className="flex items-center gap-3 text-sm text-foreground font-medium cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  {...register("unassigned")}
                  className="peer w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none border-2 checked:bg-primary checked:border-primary"
                />
                <svg
                  className="absolute w-5 h-5 p-1 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="group-hover:text-primary transition-colors">
                Unassigned Only
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all font-semibold"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </aside>
  );
}
