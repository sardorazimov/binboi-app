/**
 * Compact metric card that shares the same blue-led panel treatment as the public product cards.
 */
import { Panel } from "@/components/ui/panel";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ detail, label, value }: MetricCardProps) {
  return (
    <Panel className="space-y-4 rounded-[20px] border border-white/[0.08] bg-[#050505] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6ca3ff]">
        {label}
      </p>
      <div className="space-y-2">
        <p className="text-3xl font-semibold tracking-tight text-white sm:text-[2.4rem]">
          {value}
        </p>
        <p className="text-sm leading-6 text-white/58">{detail}</p>
      </div>
    </Panel>
  );
}
