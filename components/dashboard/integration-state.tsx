/**
 * Shared integration callout that uses the dual-tone shell only for system-level status emphasis.
 */
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";

type IntegrationStateProps = {
  configured: boolean;
  ok?: boolean;
  title: string;
  description: string;
  error?: string;
};

export function IntegrationState({
  configured,
  description,
  error,
  ok = true,
  title,
}: IntegrationStateProps) {
  const statusLabel = !configured ? "Config needed" : ok ? "Connected" : "Attention";
  const statusTone = !configured
    ? "bg-[#f59e0b]"
    : ok
      ? "bg-[#6ca3ff]"
      : "bg-[#f97316]";

  return (
    <Panel className="flex flex-col gap-5 rounded-[20px] border border-white/[0.08] bg-[#050505] p-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${statusTone}`} />
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-white/64">
          {error ?? description}
        </p>
      </div>
      <Badge
        className={
          configured && ok
            ? "border-[#24406b] bg-[#0a1424] text-[#6ca3ff] shadow-none"
            : "border-white/[0.08] bg-[#0a0a0a] text-white/62 shadow-none"
        }
      >
        {statusLabel}
      </Badge>
    </Panel>
  );
}
