/**
 * Reusable premium panel surface for cards, dashboards, and section shells.
 */
import type * as React from "react";

import { PanelFrame } from "@/components/visual/panel-frame";

export function Panel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <PanelFrame className={className} {...props} />;
}
