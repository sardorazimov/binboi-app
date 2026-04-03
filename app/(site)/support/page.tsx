/**
 * Public support page for help channels, response paths, and self-serve guidance.
 */
import Link from "next/link";

import { Reveal, RevealGroup } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/HeroBinboiEngine";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SUPPORT_CHANNELS } from "@/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Support",
  description: "Ways to get help with docs, billing questions, and product rollout support.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <div className="space-y-14">
      <Reveal>
        <SectionHeading
          eyebrow="Support"
          title="Clear paths for help, handoff, and rollout questions"
          description="Binboi support should feel like a real product operation: self-serve when it can be, direct when context matters, and honest about what still depends on external services."
        />
      </Reveal>

      <RevealGroup className="grid gap-5 xl:grid-cols-3">
        {SUPPORT_CHANNELS.map((channel) => (
          <Panel
            key={channel.title}
            className="surface-panel surface-panel-blue relative overflow-hidden rounded-[30px] border-white/[0.07] p-6"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {channel.title}
            </h2>
            <p className="text-sm leading-7 text-foreground/62">{channel.description}</p>
            <Button asChild variant="secondary">
              <Link href={channel.href}>{channel.ctaLabel}</Link>
            </Button>
          </Panel>
        ))}
      </RevealGroup>

      <Reveal delay={0.08}>
        <Panel className="surface-panel surface-panel-dual relative overflow-hidden rounded-[34px] border-white/[0.08] p-0">
          <div className="relative grid gap-6 px-6 py-7 lg:grid-cols-2 lg:px-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                What to include when you ask for help
              </h2>
              <p className="text-sm leading-7 text-foreground/62">
                Mention the workspace, environment, affected tunnel or token, and
                whether the issue is blocked on control plane, auth, or billing
                configuration.
              </p>
            </div>
            <div className="grid gap-3 text-sm leading-7 text-foreground/66">
              <p>1. The route or feature you are working on.</p>
              <p>2. Whether local env vars are already configured.</p>
              <p>3. The exact failure mode or missing data you expected to see.</p>
            </div>
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
