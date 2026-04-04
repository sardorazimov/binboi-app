/**
 * Public pricing page with plan comparison and billing clarifications.
 */
import Link from "next/link";

import { PricingPlanCard } from "@/components/site/pricing-plan-card";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PRICING_FAQS, PRICING_PLANS } from "@/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Straightforward pricing for Binboi workspaces, usage, and support.",
  path: "/pricing",
});

const PRICING_PRINCIPLES = [
  {
    title: "Start simple",
    description: "Begin with a clean free path while the team is still validating the workflow.",
  },
  {
    title: "Upgrade with intent",
    description: "Move up when shared staging, traffic visibility, and support become operational needs.",
  },
  {
    title: "Keep billing legible",
    description: "Make plan limits and commercial decisions easy for both engineering and finance to read.",
  },
];

const PRICING_CTA_POINTS = [
  "Starter is for getting a tunnel and request flow working quickly.",
  "Team fits the point where visibility and shared ownership become normal work.",
  "Enterprise is for rollout, support, and policy requirements that need direct alignment.",
];

export default function PricingPage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
            Pricing
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Clear plans for teams exposing apps, debugging webhooks, and sharing staging safely.
          </h1>
          <p className="max-w-2xl text-sm leading-8 text-foreground/64 sm:text-base">
            Binboi pricing should stay easy to read. Start free while the workflow is
            small, then upgrade when collaboration, support, and operational visibility
            become part of daily work.
          </p>
        </div>

        <div className="grid gap-4 rounded-[34px] border border-white/8 bg-white/[0.03] p-6 sm:grid-cols-3 sm:p-7">
          {PRICING_PRINCIPLES.map((principle) => (
            <div key={principle.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/54">
                {principle.title}
              </p>
              <p className="text-sm leading-7 text-foreground/62">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <PricingPlanCard key={plan.name} plan={plan} />
        ))}
      </section>

      <Panel className="overflow-hidden rounded-[36px] border-white/[0.08] p-0">
        <div className="grid gap-6 border-b border-white/8 px-6 py-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/54">
              Billing clarity
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Questions teams usually ask before turning billing on
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-foreground/62">
            Pricing should answer a small set of practical questions fast: can we start
            free, when do we need team features, and when do we need direct support.
          </p>
        </div>

        <div className="grid gap-4 px-6 py-6 lg:grid-cols-3 lg:px-8">
          {PRICING_FAQS.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[26px] border border-white/[0.07] bg-white/[0.025] p-5"
            >
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/62">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Panel>

      <section className="grid gap-6 rounded-[36px] border border-white/[0.08] bg-white/[0.03] px-6 py-7 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
            Need help choosing a plan
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
            Pick the plan that matches your stage, then grow into shared operations.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-foreground/64 sm:text-base">
            The goal is simple: one clear path for self-serve teams and one clear path
            for companies that need rollout, support, or commercial context.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">Start free</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/support">Talk to support</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {PRICING_CTA_POINTS.map((point) => (
            <div
              key={point}
              className="flex gap-3 rounded-[22px] border border-white/[0.07] bg-white/[0.025] px-4 py-4"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(76,122,255,1),rgba(255,135,74,0.92))]" />
              <p className="text-sm leading-7 text-foreground/62">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
