"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={100}>
      <div className="h-full border-r border-white/5">
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex h-14 items-center border-b border-white/5",
              collapsed ? "justify-center px-2" : "justify-between px-4"
            )}
          >
            {!collapsed && (
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Docs
              </div>
            )}

            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/[0.02] text-white/55 transition-colors hover:bg-white/[0.05] hover:text-white"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-8 px-2">
              {docsConfig.map((section) => (
                <div key={section.title}>
                  {!collapsed ? (
                    <h4 className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                      {section.title}
                    </h4>
                  ) : (
                    <div className="mb-3 flex justify-center">
                      <div className="h-px w-8 bg-white/8" />
                    </div>
                  )}

                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== "/docs" && pathname.startsWith(item.href + "/"));
                      const Icon = item.icon;

                      const link = (
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex items-center rounded-xl text-sm transition-all duration-200",
                            collapsed
                              ? "justify-center px-2 py-2.5"
                              : "gap-3 px-3 py-2.5",
                            active
                              ? "bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
                              : "text-white/50 hover:bg-white/[0.04] hover:text-white/85"
                          )}
                        >
                          {Icon ? (
                            <Icon className="h-4 w-4 shrink-0" />
                          ) : (
                            <div className="h-4 w-4 shrink-0 rounded-full bg-white/10" />
                          )}

                          {!collapsed && <span className="truncate">{item.title}</span>}
                        </Link>
                      );

                      if (!collapsed) return <div key={item.href}>{link}</div>;

                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{link}</TooltipTrigger>
                          <TooltipContent
                            side="right"
                            sideOffset={12}
                            className="border-white/10 bg-[#0b0b0b] text-white"
                          >
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}