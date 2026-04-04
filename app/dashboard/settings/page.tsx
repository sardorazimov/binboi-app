/**
 * Settings page describing workspace configuration areas and live environment readiness.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Panel } from "@/components/ui/panel";
import { SETTINGS_SECTIONS } from "@/constants";
import { env, hasEnvValues } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Settings",
  description: "Workspace defaults, notification paths, and environment readiness.",
  path: "/dashboard/settings",
});

export default function SettingsPage() {
  const readiness = [
    {
      label: "Database",
      ready: hasEnvValues(env.databaseUrl),
    },
    {
      label: "Auth",
      ready: hasEnvValues(env.authBaseUrl, env.authSecret),
    },
    {
      label: "Email",
      ready: hasEnvValues(env.emailProvider, env.emailApiKey),
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Settings"
        title="Keep configuration understandable as the app grows"
        description="Settings should help operators understand what belongs to the app, what belongs to external services, and which production dependencies are still missing."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {readiness.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.ready ? "Ready" : "Missing"}
            detail="Environment-level readiness for this configuration area."
          />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {SETTINGS_SECTIONS.map((section) => (
          <Panel
            key={section.title}
            className="space-y-3 rounded-[20px] border border-white/[0.08] bg-[#050505] p-6"
          >
            <h2 className="text-xl font-semibold text-white">{section.title}</h2>
            <p className="text-sm leading-7 text-white/62">{section.description}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
