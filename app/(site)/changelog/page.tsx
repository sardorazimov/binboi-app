/**
 * Public changelog page for product updates and release narrative.
 */
import { Panel } from "@/components/ui/panel";
import { CHANGELOG_ENTRIES } from "@/constants";
import { formatDate } from "@/lib/formatters";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Changelog",
  description: "Recent product updates across docs, dashboard, tokens, and billing readiness.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <div className="space-y-14">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
          Changelog
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Product updates that show how Binboi is getting more useful over time.
        </h1>
        <p className="max-w-2xl text-sm leading-8 text-foreground/64 sm:text-base">
          This page is for concrete product progress: what changed, why it matters,
          and which workflows are getting more solid.
        </p>
      </section>

      <div className="space-y-6">
        {CHANGELOG_ENTRIES.map((entry) => (
          <Panel
            key={entry.version}
            className="relative overflow-hidden rounded-[32px] border-white/[0.07] p-0"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/22 to-transparent" />
            <div className="grid gap-6 px-6 py-6 lg:grid-cols-[190px_minmax(0,1fr)] lg:px-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/54">
                  {entry.version}
                </p>
                <p className="text-sm text-foreground/48">{formatDate(entry.date)}</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {entry.title}
                  </h2>
                  <p className="text-sm leading-7 text-foreground/64">{entry.summary}</p>
                </div>

                <ul className="space-y-3 text-sm leading-7 text-foreground/66">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(76,122,255,1),rgba(255,135,74,0.92))]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
