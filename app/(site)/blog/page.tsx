/**
 * Lightweight placeholder for future editorial content without leaving a raw stub route.
 */
import { SectionHeading } from "@/components/site/HeroBinboiEngine";
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
      <SectionHeading
        eyebrow="Journal"
        title="Product notes are coming soon"
        description="The main product pages and docs are prioritized first. This route stays intentional until editorial content is ready."
      />
      <Panel>
        <p className="text-sm leading-7 text-foreground/62">
          Use the changelog for shipping updates today. Longer-form writing can live here
          once the product narrative and customer stories are ready.
        </p>
      </Panel>
    </div>
  );
}
