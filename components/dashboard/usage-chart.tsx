/**
 * Lightweight bar chart for usage reporting without adding a chart dependency.
 */
import { Panel } from "@/components/ui/panel";
import type { UsageSummary } from "@/lib/backend/contracts";
import { formatNumber } from "@/lib/formatters";

type UsageChartProps = {
  usage: UsageSummary;
};

export function UsageChart({ usage }: UsageChartProps) {
  const maxRequests =
    usage.series.reduce((max, point) => Math.max(max, point.requests), 0) || 1;

  return (
    <Panel>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Request trend</h2>
          <p className="mt-2 text-sm leading-7 text-foreground/62">
            Compact daily trend for the current reporting period.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {usage.series.map((point) => (
          <div key={point.date} className="space-y-3">
            <div className="flex h-40 items-end rounded-3xl border border-white/8 bg-black/25 p-3">
              <div
                className="w-full rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.28))]"
                style={{
                  height: `${Math.max((point.requests / maxRequests) * 100, 6)}%`,
                }}
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.18em] text-foreground/40">
                {point.date}
              </p>
              <p className="text-sm text-foreground">{formatNumber(point.requests)}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
