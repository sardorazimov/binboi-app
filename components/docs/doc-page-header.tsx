"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDocByHref, getSectionForHref } from "@/lib/docs-config";

export function DocPageHeader() {
  const pathname = usePathname();
  const doc = getDocByHref(pathname);
  const section = getSectionForHref(pathname);

  // Keep browser tab title in sync during client-side navigation
  useEffect(() => {
    if (doc?.title) {
      document.title = `${doc.title} — Binboi Docs`;
    }
  }, [doc]);

  if (!doc || !section) return null;

  return (
    <div className="mb-8 flex items-center gap-2 text-xs text-white/30">
      <span>Binboi Docs</span>
      <span className="text-white/15">/</span>
      <span className="text-white/45">{section.title}</span>
      <span className="text-white/15">/</span>
      <span className="text-white/60">{doc.title}</span>
    </div>
  );
}
