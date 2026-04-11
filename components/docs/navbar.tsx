"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { DocsSearchModal } from "@/components/docs/docs-search-modal";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-white/[0.06] bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 md:px-6">

          {/* Left — brand */}
          <div className="flex items-center gap-6">
            <Link href="/docs" className="flex items-center gap-2.5">
              {/* Wordmark */}
              <span className="font-semibold tracking-tight text-white">
                binboi
              </span>
              <span className="hidden rounded-md border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40 sm:inline">
                docs
              </span>
            </Link>

            {/* Divider */}
            <span className="hidden h-4 w-px bg-white/[0.1] md:block" aria-hidden="true" />

            {/* Miransas attribution */}
            <a
              href="https://miransas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 md:flex"
            >
              <span className="text-xs text-white/30 hover:text-white/55 transition-colors">
                by{" "}
                <span className="font-medium text-white/45 hover:text-white/70">
                  Miransas
                </span>
              </span>
            </a>

            {/* Nav links */}
            <nav className="hidden items-center gap-5 md:flex">
              <Link
                href="/showcase"
                className="text-sm text-white/50 transition-colors hover:text-white/85"
              >
                Showcase
              </Link>
              <a
                href="https://github.com/Miransas/binboi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/35 transition-colors hover:text-white/70"
              >
                GitHub
              </a>
            </nav>
          </div>

          {/* Right — search + actions */}
          <div className="flex items-center gap-2">
            {/* Search button — desktop */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-8 items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.03] pl-3 pr-2 text-sm text-white/40 transition-colors hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/65 md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="mr-1">Search</span>
              <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-white/[0.1] bg-white/[0.04] px-1.5 font-mono text-[10px] text-white/30">
                <span className="text-[11px]">⌘</span>K
              </kbd>
            </button>

            {/* Search icon — mobile */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search docs"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.03] text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/80 md:hidden"
            >
              <Search className="h-4 w-4" />
            </button>

            <Link
              href="https://binboi.com/dashboard"
              className="inline-flex h-8 items-center rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 text-sm text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              Dashboard
            </Link>

            <div className="hidden pl-2 text-[11px] text-white/25 xl:block">
              v1.0.4-beta
            </div>
          </div>
        </div>
      </header>

      <DocsSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
