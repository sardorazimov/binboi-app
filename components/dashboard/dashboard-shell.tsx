"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  BookOpen,
  LifeBuoy,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Rocket,
  ShieldCheck,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/auth/actions";
import type { DashboardSessionProfile } from "@/lib/auth/session-profile";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  profile: DashboardSessionProfile;
};

const SIDEBAR_STORAGE_KEY = "binboi-dashboard-sidebar-collapsed";

export function DashboardShell({ children, profile }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-black transition-[padding] duration-300",
        collapsed ? "lg:pl-[112px]" : "lg:pl-[304px]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(108,163,255,0.4),transparent)]" />

      <DashboardSidebar
        profile={profile}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />

      <div className="relative px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-screen max-w-[1380px] flex-col gap-6">
          <header className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#050505] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6ca3ff]">
                    Workspace control
                  </p>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {profile.workspace.name}
                    </h1>
                    <p className="text-sm text-white/58">
                      {profile.user.name || profile.user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-[#24406b] bg-[#0a1424] text-[#6ca3ff] shadow-none">
                  {profile.auth.state}
                </Badge>
                <Badge className="border-white/[0.08] bg-[#0a0a0a] text-white/70 shadow-none">
                  {profile.workspace.plan || "starter"} plan
                </Badge>
                {profile.workspace.role ? (
                  <Badge className="border-white/[0.08] bg-[#0a0a0a] text-white/70 shadow-none">
                    {profile.workspace.role}
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/56">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0a0a0a] px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#6ca3ff]" />
                  <span>{profile.user.email}</span>
                </span>
                {profile.auth.providers.map((provider) => (
                  <span
                    key={provider}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0a0a0a] px-3 py-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6ca3ff]" />
                    <span>{provider}</span>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/docs">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Docs
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard/install">
                    <Rocket className="mr-2 h-4 w-4" />
                    Install
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/support">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    Support
                  </Link>
                </Button>
                <form action={logoutAction}>
                  <Button size="sm" variant="secondary" type="submit">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </form>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="hidden lg:inline-flex"
                  onClick={() => setCollapsed((value) => !value)}
                >
                  {collapsed ? (
                    <PanelLeftOpen className="h-4 w-4" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </header>

          <div className="min-h-[60vh] min-w-0 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
