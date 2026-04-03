/**
 * Reusable hero composition that pairs copy on the left with a framed stage on the right.
 */
import type { ReactNode } from "react";

import { SurfaceShell } from "@/components/visual/surface-shell";
import { cn } from "@/lib/utils";

type HeroStageProps = {
  content: ReactNode;
  stage: ReactNode;
  className?: string;
  stageClassName?: string;
  stageGlow?: "blue" | "dual";
};

export function HeroStage({
  className,
  content,
  stage,
  stageClassName,
  stageGlow = "dual",
}: HeroStageProps) {
  return (
    <div className={cn("grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center", className)}>
      <div>{content}</div>
      <SurfaceShell
        glow={stageGlow}
        className={cn("rounded-[36px] p-0", stageClassName)}
      >
        {stage}
      </SurfaceShell>
    </div>
  );
}

