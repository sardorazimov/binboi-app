/**
 * Public pricing plan card with restrained highlight handling for the commercial tiers.
 */
import Link from "next/link";

import { CardSurface, PanelFrame, SectionGlow } from "@/components/visual";
import { Button } from "@/components/ui/button";
import type { PricingPlan } from "@/constants";
import { cn } from "@/lib/utils";

type PricingPlanCardProps = {
  plan: PricingPlan;
};

export function PricingPlanCard({ plan }: PricingPlanCardProps) {
  return (
    <PanelFrame
      className={cn(
        "relative h-full overflow-hidden rounded-[32px] p-0",
        plan.highlight ? "border-white/[0.1]" : "border-white/[0.07]",
      )}
    >
      {/* The highlight tier gets the only dual-tone treatment; other tiers stay primarily blue-led. */}
      <SectionGlow tone={plan.highlight ? "dual" : "blue"} />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      {plan.highlight ? (
        <div className="absolute right-6 top-6 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/72">
          Most used
        </div>
      ) : null}

      <div className="relative flex h-full flex-col gap-6 p-6 sm:p-7">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/58">
              {plan.name}
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground">
              {plan.price}
              {plan.price.startsWith("$") ? (
                <span className="ml-2 text-base font-normal text-foreground/48">
                  / month
                </span>
              ) : null}
            </h2>
            <p className="max-w-sm text-sm leading-7 text-foreground/62">
              {plan.description}
            </p>
          </div>

          <CardSurface className="p-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
            {plan.footnote}
          </CardSurface>
        </div>

        <ul className="space-y-3 text-sm leading-7 text-foreground/68">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="mt-auto w-full"
          variant={plan.highlight ? "primary" : "secondary"}
        >
          <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
        </Button>
      </div>
    </PanelFrame>
  );
}
