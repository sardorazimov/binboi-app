"use client";

import { motion } from "framer-motion";
import { Users, ShoppingCart, Zap, MessageSquare } from "lucide-react";
import { useDashboard } from "../../app/(site)/docs/provider/docs-provider";


// ─── Data ─────────────────────────────────────────────────────────────────────
const notifications = [
  { icon: Users,         label: "56 New users registered", time: "Just now"        },
  { icon: ShoppingCart,  label: "132 Orders placed",       time: "59 Minutes ago"  },
  { icon: Zap,           label: "Funds have been updated", time: "12 Hours ago"    },
  { icon: MessageSquare, label: "5 Unread messages",       time: "Today, 11:59 PM" },
];

const activities = [
  { label: "Changed the style theme",      time: "Just now"    },
  { label: "177 New products added",       time: "47 min ago"  },
  { label: "11 Products have been sold",   time: "1 Day ago"   },
  { label: 'Page "Toys" has been updated', time: "Feb 2, 2024" },
];

const contacts = [
  "Daniel Craig",
  "Kate Morrison",
  "Nataniel Donov",
  "Elisabeth Wayne",
  "Felicia Raspet",
];

// ─── RightPanel ───────────────────────────────────────────────────────────────
export function RightPanel() {
  const { theme } = useDashboard();
  const dark    = theme === "dark";
  const heading = dark ? "text-white"     : "text-gray-900";
  const bodyTxt = dark ? "text-white/70"  : "text-gray-600";
  const sub     = dark ? "text-white/30"  : "text-gray-400";
  const iconBg  = dark
    ? "bg-white/5 border border-white/10"
    : "bg-black/4 border border-black/8";
  const dotBg   = dark
    ? "bg-[#161b1f] border-white/10"
    : "bg-white border-black/10";
  const lineBg  = dark ? "before:bg-white/5" : "before:bg-black/5";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-60 flex-shrink-0 flex flex-col gap-7"
    >
      {/* Notifications */}
      <div>
        <p className={`text-base font-bold mb-4 ${heading}`}>Notifications</p>
        <ul className="space-y-3.5">
          {notifications.map((n, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <n.icon className="w-3 h-3 text-[#9eff00]" />
              </div>
              <div>
                <p className={`text-xs leading-snug ${bodyTxt}`}>{n.label}</p>
                <p className={`text-[10px] mt-0.5 ${sub}`}>{n.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Activities */}
      <div>
        <p className={`text-base font-bold mb-4 ${heading}`}>Activities</p>
        <ul
          className={`space-y-3 relative before:absolute before:left-3.5 before:top-0 before:h-full before:w-px ${lineBg}`}
        >
          {activities.map((a, i) => (
            <li key={i} className="flex items-start gap-3 pl-1">
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 z-10 ${dotBg}`}
              />
              <div>
                <p className={`text-xs leading-snug ${bodyTxt}`}>{a.label}</p>
                <p className={`text-[10px] mt-0.5 ${sub}`}>{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Contacts */}
      <div>
        <p className={`text-base font-bold mb-4 ${heading}`}>Contacts</p>
        <ul className="space-y-1.5">
          {contacts.map((c, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors ${
                i === 2
                  ? "bg-[#9eff00]/10 border border-[#9eff00]/20"
                  : dark
                    ? "hover:bg-white/4"
                    : "hover:bg-black/3"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  dark ? "bg-white/10 text-white/50" : "bg-black/8 text-gray-600"
                }`}
              >
                {c.split(" ").map((w) => w[0]).join("")}
              </div>
              <span
                className={`text-xs ${
                  i === 2 ? "text-[#9eff00] font-semibold" : bodyTxt
                }`}
              >
                {c}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}