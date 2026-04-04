"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookKey,
  Cable,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  PlugZap,
  Settings,
  Terminal,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DASHBOARD_LINKS } from "@/constants";
import type { DashboardSessionProfile } from "@/lib/auth/session-profile";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "/dashboard": LayoutDashboard,
  "/dashboard/install": Terminal,
  "/dashboard/tunnels": Cable,
  "/dashboard/tokens": BookKey,
  "/dashboard/usage": Activity,
  "/dashboard/log": FileText,
  "/dashboard/integrations": PlugZap,
  "/dashboard/billing": CircleDollarSign,
  "/dashboard/settings": Settings,
};

type DashboardSidebarProps = {
  profile: DashboardSessionProfile;
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapsed: () => void;
};

export function DashboardSidebar({
  profile,
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full min-h-0 flex-col border-r border-white/[0.08] bg-black/95 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all duration-300",
          collapsed ? "w-[96px]" : "w-[288px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="border-b border-white/[0.08] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className={cn(
                "group flex min-w-0 items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-white/[0.03]",
                collapsed && "justify-center px-0",
              )}
              onClick={onCloseMobile}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#24406b] bg-[#0a1424] text-sm font-semibold text-[#6ca3ff]">
                B
              </span>
              {!collapsed ? (
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                    Binboi
                  </span>
                  <span className="block truncate text-sm text-white/82">
                    Dashboard
                  </span>
                </span>
              ) : null}
            </Link>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="hidden lg:inline-flex"
                onClick={onToggleCollapsed}
              >
                {collapsed ? ">" : "<"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={onCloseMobile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "mt-4 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#050505] transition-all",
              collapsed ? "px-2 py-3" : "px-4 py-4",
            )}
          >
            <div className={cn("flex items-start gap-3", collapsed && "justify-center")}>
              <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#6ca3ff] shadow-[0_0_18px_rgba(108,163,255,0.45)]" />
              {!collapsed ? (
                <div className="min-w-0 space-y-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/38">
                      Workspace
                    </p>
                    <p className="mt-2 truncate text-sm font-medium text-white">
                      {profile.workspace.name}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-[#24406b] bg-[#0a1424] text-[#6ca3ff] shadow-none">
                      {profile.workspace.plan || "starter"}
                    </Badge>
                    {profile.workspace.role ? (
                      <Badge className="border-white/[0.08] bg-[#0a0a0a] text-white/70 shadow-none">
                        {profile.workspace.role}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4" data-native-scroll="true">
          <p
            className={cn(
              "px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/32",
              collapsed && "text-center",
            )}
          >
            {collapsed ? "Nav" : "Product areas"}
          </p>
          <nav className="space-y-1.5">
            {DASHBOARD_LINKS.map((link) => {
              const Icon = ICON_MAP[link.href] ?? LayoutDashboard;
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sm text-white/62 transition-all hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white",
                    active &&
                      "border-[#24406b] bg-[#0a1424] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-[#6ca3ff]" : "text-white/52",
                    )}
                  />
                  {!collapsed ? (
                    <div className="min-w-0 flex-1">
                      <p className="truncate">{link.label}</p>
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/[0.08] bg-black/20 px-4 py-4">
          <div className={cn("flex items-start gap-3", collapsed && "justify-center")}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
              {(profile.user.name || profile.user.email).charAt(0).toUpperCase()}
            </span>
            {!collapsed ? (
              <div className="min-w-0 space-y-2">
                <div>
                  <p className="truncate text-sm font-medium text-white">
                    {profile.user.name || "Workspace user"}
                  </p>
                  <p className="truncate text-xs text-white/48">
                    {profile.user.email}
                  </p>
                </div>
                <p className="text-xs text-white/52">{profile.auth.state}</p>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
