/**
 * Smaller inset surface for nested cards and supporting content blocks.
 */
import type * as React from "react";

import { SectionGlow } from "@/components/visual/section-glow";
import { cn } from "@/lib/utils";

type CardSurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: "none" | "blue" | "dual";
  strength?: "default" | "strong";
};

const strengthClasses = {
  default: "surface-inset",
  strong: "surface-panel-strong",
} as const;

export function CardSurface({
  accent = "none",
  children,
  className,
  strength = "default",
  ...props
}: CardSurfaceProps) {
  return (
    <div
      className={cn(
        "relative rounded-[24px] border border-white/[0.07] p-5",
        strengthClasses[strength],
        className,
      )}
      {...props}
    >
      {accent !== "none" ? <SectionGlow tone={accent} /> : null}
      <div className="relative">{children}</div>
    </div>
  );
}

