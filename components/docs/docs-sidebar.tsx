"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
 PanelLeftClose, PanelLeftOpen,BookOpen, Rocket, Download, Key, 
  Terminal, Share2, Activity, Webhook, 
  ShieldCheck, FileText, Globe, LifeBuoy
} from "lucide-react";

// Nav config aynı kalıyor...
const navSections = [
 {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        icon: BookOpen,
        description: "What Binboi is, why teams use it, and how the platform fits together.",
      },
      {
        title: "Quick Start",
        href: "/docs/quick_start",
        icon: Rocket,
        description: "Install, log in, and ship your first public URL in a few steps.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: Download,
        description: "Homebrew, npm wrapper direction, direct binaries, and contributor setup.",
      },
      {
        title: "Authentication",
        href: "/docs/authentication",
        icon: Key,
        description: "Access tokens, dashboard token creation, login, and security notes.",
      },
    ],
  },
  {
    title: "Using Binboi",
    items: [
      {
        title: "CLI",
        href: "/docs/cli",
        icon: Terminal,
        description: "Commands, examples, and what is implemented versus planned.",
      },
      {
        title: "HTTP Tunnels",
        href: "/docs/http_tunnels",
        icon: Share2,
        description: "How Binboi forwards HTTP traffic and common local development patterns.",
      },
      {
        title: "Requests",
        href: "/docs/requests",
        icon: Activity,
        description: "Request inspection, metadata, response previews, and error classifications.",
      },
    ],
  },
  {
    title: "Debugging",
    items: [
      {
        title: "Webhooks",
        href: "/docs/webhooks",
        icon: Webhook,
        description: "Clerk, Neon, Supabase, Stripe, GitHub, and Linear debugging workflows.",
      },
      {
        title: "API Keys",
        href: "/docs/api",
        icon: ShieldCheck,
        description: "Create, review, revoke, and safely operate CLI credentials.",
      },
      {
        title: "Logs",
        href: "/docs/logs",
        icon: FileText,
        description: "Raw relay logs, activity events, and tunnel lifecycle visibility.",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Regions",
        href: "/docs/regions",
        icon: Globe,
        description: "Regions, nodes, latency, and selection guidance for self-hosted teams.",
      },
      {
        title: "Troubleshooting",
        href: "/docs/troubleshooting",
        icon: LifeBuoy,
        description: "Invalid token, tunnel offline, forwarding failures, and webhook confusion.",
      },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  theme?: "dark" | "light";
}

export function Sidebar({ collapsed, setCollapsed, theme = "dark" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const dark = theme === "dark";
  const bg = dark ? "bg-[#000000]" : "bg-white";
  const border = dark ? "border-white/10" : "border-black/6";
  const dimText = dark ? "text-white/70" : "text-gray-200";

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={`fixed top-0 left-0 h-screen mt-18 ${bg} border-r ${border} flex flex-col z-40 select-none overflow-y-auto`}
    >
      {/* Avatar + Toggle */}
      <div className={`flex items-center px-4 py-5 border-b ${border} gap-3 min-h-[68px]`}>
        {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9eff00] to-emerald-600 flex items-center justify-center text-xs font-black text-black flex-shrink-0">
          GH
        </div> */}
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className={`text-sm font-semibold whitespace-nowrap ${dark ? "text-white/90" : "text-gray-800"}`}
            >
             Collaps
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`ml-auto flex-shrink-0 ${dimText} hover:text-[#9eff00] transition-colors`}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav items ve diğer kısımlar (Geri kalan kodun aynı, sadece context yerine prop kullanıyor) */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-5">
        {navSections.map((section) => (
          <div key={section.title}>
             {!collapsed && (
                <p className={`text-[9px] font-black tracking-widest px-2 mb-1.5 cursor-pointer ${dimText}`}>
                  {section.title}
                </p>
             )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.title}>
                    <button
                      onClick={() => router.push(item.href)}
                      className={`relative w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm transition-all duration-150 group cursor-pointer hover:bg-lime-600 ${collapsed ? "justify-center" : ""}`}
                    >
                      {isActive && (
                        <motion.span layoutId="sidebar-pill" className="absolute inset-0 bg-[#9eff00] text-white rounded-xl" />
                      )}
                      <item.icon className={`relative z-10 w-4 h-4 flex-shrink-0 ${isActive ? "text-black" : dimText}`} />
                      {!collapsed && <span className={`relative z-10 font-medium ${isActive ? "text-black" : ""}`}>{item.title}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </motion.aside>
  );
}
