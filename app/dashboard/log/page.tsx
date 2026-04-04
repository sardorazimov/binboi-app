/**
 * Log page that explains the intended audit stream shape without faking backend data.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { Panel } from "@/components/ui/panel";
import { LOG_VIEW_PRESETS } from "@/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Logs",
  description: "Audit and event log expectations for the Binboi dashboard.",
  path: "/dashboard/log",
});

export default function LogPage() {
  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Logs"
        title="Audit surfaces without inventing activity"
        description="No synthetic log feed is rendered here. Instead, the page explains the views the product expects once a real event stream is connected."
      />

      <Panel className="space-y-4 rounded-[20px] border border-white/[0.08] bg-[#050505] p-6">
        <h2 className="text-xl font-semibold text-white">Suggested log views</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {LOG_VIEW_PRESETS.map((preset) => (
            <div
              key={preset}
              className="rounded-[18px] border border-white/[0.08] bg-[#080808] px-4 py-4 text-sm text-white/68"
            >
              {preset}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
