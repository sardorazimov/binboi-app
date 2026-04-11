/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/docs/navbar";
import { Sidebar } from "@/components/docs/docs-sidebar";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { cn } from "@/lib/utils";
import { TableOfContents } from "./docs-toc";
import { DocsFooter } from "./docs-footer";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = window.localStorage.getItem("binboi-docs-sidebar-collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(
      "binboi-docs-sidebar-collapsed",
      String(collapsed)
    );
  }, [collapsed, mounted]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div
        className={cn(
          "mx-auto grid max-w-[1600px] gap-10 px-4 transition-all duration-300 md:px-6",
          collapsed
            ? "md:grid-cols-[88px_minmax(0,1fr)] xl:grid-cols-[88px_minmax(0,1fr)_240px]"
            : "md:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_240px]"
        )}
      >
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-hidden md:block">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>

        <main className="min-w-0 py-8">
          <article className="max-w-4xl min-w-0">
            <DocPageHeader />
            {children}
          </article>

          <div className="max-w-4xl">
            <DocsPagination />
          </div>
        </main>

        <aside className="hidden xl:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto py-8">
            <TableOfContents />
          </div>
        </aside>
      </div>

      <DocsFooter />
    </div>
  );
}
