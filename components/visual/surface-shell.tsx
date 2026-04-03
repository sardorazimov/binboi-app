/**
 * Section-level container that keeps the base surface and optional accent lighting separate.
 */
import type * as React from "react";

import { PanelFrame } from "@/components/visual/panel-frame";
import { SectionGlow } from "@/components/visual/section-glow";
import { cn } from "@/lib/utils";

type SurfaceShellProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: "none" | "blue" | "dual";
  strength?: "base" | "strong";
};

export function SurfaceShell({
  children,
  className,
  glow = "none",
  strength = "base",
  ...props
}: SurfaceShellProps) {
  return (
    <PanelFrame
      strength={strength}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {glow !== "none" ? <SectionGlow tone={glow} /> : null}
      <div className="relative">{children}</div>
    </PanelFrame>
  );
}

