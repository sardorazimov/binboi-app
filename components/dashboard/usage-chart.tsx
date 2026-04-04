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
    <Panel className="rounded-[20px] border border-white/[0.08] bg-[#050505] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Request trend</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            Compact daily trend for the current reporting period.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {usage.series.map((point) => (
          <div key={point.date} className="space-y-3">
            <div className="flex h-40 items-end rounded-[20px] border border-white/[0.08] bg-[#080808] p-3">
              <div
                className="w-full rounded-full bg-[linear-gradient(180deg,rgba(108,163,255,0.95),rgba(108,163,255,0.35))]"
                style={{
                  height: `${Math.max((point.requests / maxRequests) * 100, 6)}%`,
                }}
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                {point.date}
              </p>
              <p className="text-sm text-white">{formatNumber(point.requests)}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
