/**
 * Compact badge for section eyebrows and status chips across the product shell.
 */
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.08] bg-[linear-gradient(180deg,rgba(18,22,31,0.92),rgba(11,13,18,0.9))] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/76 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_0_0_1px_rgba(76,121,255,0.08)]",
        className,
      )}
      {...props}
    />
  );
}
