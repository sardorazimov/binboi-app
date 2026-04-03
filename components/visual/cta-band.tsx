/**
 * Reusable CTA band that gives call-to-action sections one shared layout and shell.
 */
import type { ReactNode } from "react";

import { SurfaceShell } from "@/components/visual/surface-shell";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  lead: ReactNode;
  support?: ReactNode;
  className?: string;
  glow?: "blue" | "dual";
};

export function CtaBand({
  className,
  glow = "dual",
  lead,
  support,
}: CtaBandProps) {
  return (
    <SurfaceShell glow={glow} className={cn("rounded-[36px] p-0", className)}>
      <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div className="space-y-4">{lead}</div>
        {support ? <div>{support}</div> : null}
      </div>
    </SurfaceShell>
  );
}

