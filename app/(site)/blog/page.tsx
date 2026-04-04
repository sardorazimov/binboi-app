/**
 * Lightweight placeholder for future editorial content without leaving a raw stub route.
 */
import { Panel } from "@/components/ui/panel";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Journal",
  description: "Editorial notes and product-writing space for Binboi.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
          Blog
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Writing can come after the product and docs settle.
        </h1>
        <p className="max-w-2xl text-sm leading-8 text-foreground/64 sm:text-base">
          This page will hold product notes, workflow breakdowns, and customer stories.
          Right now the priority is shipping the core Binboi surface cleanly.
        </p>
      </section>
      <Panel>
        <p className="text-sm leading-7 text-foreground/62">
          Use the changelog for shipping updates today. This route stays quiet until we
          have real stories worth publishing.
        </p>
      </Panel>
    </div>
  );
}
