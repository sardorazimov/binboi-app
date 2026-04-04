/**
 * Usage reporting page that consumes the normalized usage response model.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { IntegrationState } from "@/components/dashboard/integration-state";
import { MetricCard } from "@/components/dashboard/metric-card";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { Panel } from "@/components/ui/panel";
import { getUsageSummary } from "@/lib/backend/control-plane";
import { formatNumber, formatPercent } from "@/lib/formatters";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Usage",
  description: "Usage totals, trendlines, and top routes sourced from the backend adapter.",
  path: "/dashboard/usage",
});

export default async function UsagePage() {
  const usageResult = await getUsageSummary();
  const usage = usageResult.data;

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Usage"
        title="Usage reporting aligned to backend response models"
        description="This page expects current-period totals, a short daily series, and route-level highlights so usage can later align with alerting and billing."
      />

      <IntegrationState
        configured={usageResult.configured}
        ok={usageResult.ok}
        title="Usage data source"
        description="The UI is ready for live usage data as soon as the control plane exposes the expected payload shape."
        error={usageResult.error}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard
          label="Period"
          value={usage?.periodLabel ?? "Current period"}
          detail="Human-readable label for the active reporting window."
        />
        <MetricCard
          label="Requests"
          value={formatNumber(usage?.requests ?? 0)}
          detail="Total requests observed in the current usage payload."
        />
        <MetricCard
          label="Error rate"
          value={formatPercent((usage?.errorRate ?? 0) > 1 ? (usage?.errorRate ?? 0) / 100 : usage?.errorRate ?? 0)}
          detail="Current error ratio returned by the usage backend."
        />
      </div>

      {usage ? <UsageChart usage={usage} /> : null}

      <Panel className="space-y-4 rounded-[20px] border border-white/[0.08] bg-[#050505] p-6">
        <h2 className="text-xl font-semibold text-white">Top routes</h2>
        <div className="grid gap-3">
          {usage?.topRoutes.length ? (
            usage.topRoutes.map((route) => (
              <div
                key={route.route}
                className="flex items-center justify-between rounded-[18px] border border-white/[0.08] bg-[#080808] px-4 py-4 text-sm"
              >
                <span className="text-white">{route.route}</span>
                <span className="text-white/58">{formatNumber(route.requests)}</span>
              </div>
            ))
          ) : (
            <div className="rounded-[18px] border border-white/[0.08] bg-[#080808] px-4 py-10 text-center text-sm text-white/46">
              No route-level usage returned yet.
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}
