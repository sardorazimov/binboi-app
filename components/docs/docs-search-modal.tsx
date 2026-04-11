/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, FileText } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { allDocsPages } from "@/lib/docs-config";
import { cn } from "@/lib/utils";

type DocsSearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function scoreDoc(query: string, doc: (typeof allDocsPages)[number]) {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(doc.title);
  const href = normalize(doc.href);
  const desc = normalize(doc.description ?? "");
  const keywords = (doc.keywords ?? []).map(normalize);

  let score = 0;

  if (title === q) score += 200;
  if (title.startsWith(q)) score += 120;
  if (title.includes(q)) score += 80;

  if (href.includes(q)) score += 40;
  if (desc.includes(q)) score += 30;

  for (const keyword of keywords) {
    if (keyword === q) score += 100;
    else if (keyword.includes(q)) score += 40;
  }

  return score;
}

export function DocsSearchModal({
  open,
  onOpenChange,
}: DocsSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) {
      return allDocsPages.slice(0, 8);
    }

    return [...allDocsPages]
      .map((doc) => ({ doc, score: scoreDoc(query, doc) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.doc)
      .slice(0, 10);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const hotkey = isMac ? e.metaKey : e.ctrlKey;

      if (hotkey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }

      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, Math.max(results.length - 1, 0))
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter") {
        const selected = results[selectedIndex];
        if (selected) {
          e.preventDefault();
          router.push(selected.href);
          onOpenChange(false);
          setQuery("");
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange, results, selectedIndex, router]);

  function handleSelect(href: string) {
    router.push(href);
    onOpenChange(false);
    setQuery("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="overflow-hidden p-0"
      >
        <div className="border-b border-white/8">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-white/35" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs..."
              className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
            <div className="hidden rounded border border-white/10 px-2 py-1 text-[10px] text-white/30 sm:block">
              ESC
            </div>
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item, index) => {
                const Icon = item.icon ?? FileText;
                const active = index === selectedIndex;

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      active
                        ? "bg-white/[0.06]"
                        : "hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-white/60" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <ArrowRight className="h-4 w-4 shrink-0 text-white/20" />
                      </div>

                      {item.description ? (
                        <p className="mt-1 line-clamp-1 text-xs text-white/45">
                          {item.description}
                        </p>
                      ) : null}

                      <p className="mt-1 text-[11px] text-white/25">
                        {item.href}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-white/50">No results found.</p>
              <p className="mt-1 text-xs text-white/30">
                Try another keyword like installation, auth, webhook, or quick start.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/8 px-4 py-3 text-[11px] text-white/28">
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>Enter open</span>
          </div>
          <span>Binboi Docs Search</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}