"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPrevNextDocs } from "@/lib/docs-config";
import { cn } from "@/lib/utils";

export function DocsPagination() {
  const pathname = usePathname();
  const { prev, next } = getPrevNextDocs(pathname);

  if (!prev && !next) return null;

  return (
    <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
      <div>
        {prev ? (
          <Link
            href={prev.href}
            className={cn(
              "group flex h-full min-h-[88px] flex-col rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
            )}
          >
            <span className="mb-2 flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-white/35">
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </span>
            <span className="text-sm font-medium text-white/85">{prev.title}</span>
          </Link>
        ) : null}
      </div>

      <div>
        {next ? (
          <Link
            href={next.href}
            className={cn(
              "group flex h-full min-h-[88px] flex-col rounded-xl border border-white/8 bg-white/[0.02] p-4 text-right transition-colors hover:bg-white/[0.04]"
            )}
          >
            <span className="mb-2 flex items-center justify-end gap-1 text-xs uppercase tracking-[0.18em] text-white/35">
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium text-white/85">{next.title}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}