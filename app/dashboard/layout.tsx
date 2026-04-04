/**
 * Dashboard layout with docs-inspired black and lime workspace chrome.
 */
import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAuthenticatedAppUser } from "@/lib/auth/guards";
import { getDashboardSessionProfile } from "@/lib/auth/session-profile";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuthenticatedAppUser();
  const profile = await getDashboardSessionProfile(session);

  return <DashboardShell profile={profile}>{children}</DashboardShell>;
}
