"use client";

/**
 * Reusable showcase section that keeps imagery slots aligned with the shared product panel language.
 */
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { CardSurface, SectionGlow, SurfaceShell } from "@/components/visual";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ImageRevealShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  detail?: string;
  children?: ReactNode;
  className?: string;
};

function ImageRevealFallback() {
  return (
    <div className="grid h-full gap-5 p-6 sm:p-7">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/42">
        <span>Visual slot</span>
        <span>Ready for asset</span>
      </div>

      <div className="grid flex-1 gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <CardSurface accent="blue" className="rounded-[26px]">
          <div className="h-3 w-24 rounded-full bg-white/8" />
          <div className="mt-5 grid gap-3">
            <CardSurface strength="strong" className="rounded-[20px]" />
            <div className="grid gap-3 sm:grid-cols-2">
              <CardSurface className="rounded-[20px]" />
              <CardSurface className="rounded-[20px]" />
            </div>
          </div>
        </CardSurface>

        <div className="grid gap-4">
          <CardSurface className="rounded-[24px]">
            <div className="h-3 w-[4.5rem] rounded-full bg-white/8" />
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-[16px] bg-white/6" />
              <div className="h-10 rounded-[16px] bg-white/6" />
              <div className="h-10 rounded-[16px] bg-white/[0.08]" />
            </div>
          </CardSurface>
          {/* Only the local media placeholder keeps tiny status accents; the panel itself stays neutral. */}
          <CardSurface className="rounded-[24px]">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff9f5a]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            </div>
            <CardSurface strength="strong" className="mt-5 rounded-[20px]" />
          </CardSurface>
        </div>
      </div>
    </div>
  );
}

export function ImageRevealShell({
  children,
  className,
  description,
  detail,
  eyebrow,
  title,
}: ImageRevealShellProps) {
  return (
    <SurfaceShell
      glow="blue"
      className={cn(
        "relative overflow-hidden rounded-[36px] p-0",
        className,
      )}
    >
      {/* The section shell gets a cool accent only; the warmer note stays inside the media stage. */}
      <div className="relative grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div className="space-y-5 lg:max-w-xl">
            <Badge>{eyebrow}</Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="text-base leading-8 text-foreground/66">{description}</p>
            </div>
          </div>

          {detail ? (
            <CardSurface className="rounded-[24px] px-5 py-4">
              <p className="text-sm leading-7 text-foreground/54">{detail}</p>
            </CardSurface>
          ) : null}
        </div>

        <div className="p-4 pt-0 sm:p-6 sm:pt-0 lg:p-6 lg:pl-0 lg:pr-6 lg:pb-6">
          <motion.div
            className="surface-panel-strong relative min-h-[280px] overflow-hidden rounded-[32px] border border-white/[0.08] lg:min-h-[520px]"
            initial={{ opacity: 0, clipPath: "inset(0 0 12% 0 round 32px)", scale: 0.985 }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 32px)", scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionGlow tone="dual" />
            {/* Dual-tone lighting is limited to the media stage so the full section stays readable. */}
            <div className="relative h-full">{children ?? <ImageRevealFallback />}</div>
          </motion.div>
        </div>
      </div>
    </SurfaceShell>
  );
}
