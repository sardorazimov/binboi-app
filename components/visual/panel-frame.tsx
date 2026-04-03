/**
 * Shared framed dark panel primitive for larger shells, cards, and workspace panels.
 */
import type * as React from "react";

import { cn } from "@/lib/utils";

type PanelFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  strength?: "base" | "strong" | "rail";
};

const strengthClasses = {
  base: "surface-panel",
  strong: "surface-panel-strong",
  rail: "surface-rail",
} as const;

export function PanelFrame({
  strength = "base",
  className,
  ...props
}: PanelFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-[28px] border border-white/[0.07] p-6",
        strengthClasses[strength],
        className,
      )}
      {...props}
    />
  );
}

