/**
 * Integration planning page for CI, webhooks, and observability hookups.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Panel } from "@/components/ui/panel";
import { INTEGRATION_CARDS } from "@/constants";
import { env, hasEnvValues } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Integrations",
  description: "See where Binboi connects into CI, auth, observability, and billing systems.",
  path: "/dashboard/integrations",
});

export default function IntegrationsPage() {
  const integrationStatus = [
    {
      label: "Auth",
      ready: hasEnvValues(env.authBaseUrl),
    },
    {
      label: "Control plane",
      ready: hasEnvValues(env.controlPlaneApiUrl),
    },
    {
      label: "Billing",
      ready: hasEnvValues(env.billingApiUrl, env.paddleApiKey),
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Integrations"
        title="Connect Binboi to the rest of your operating stack"
        description="This page maps the highest-signal integrations first: CI, webhooks, observability, auth, and billing."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {integrationStatus.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.ready ? "Configured" : "Pending"}
            detail="Environment-based readiness check for the current workspace deployment."
          />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {INTEGRATION_CARDS.map((card) => (
          <Panel
            key={card.name}
            className="space-y-3 rounded-[20px] border border-white/[0.08] bg-[#050505] p-6"
          >
            <h2 className="text-xl font-semibold text-white">{card.name}</h2>
            <p className="text-sm leading-7 text-white/62">{card.summary}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
