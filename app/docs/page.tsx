"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Code2,
  Command,
  Search,
  Shield,
  Waypoints,
  Webhook,
} from "lucide-react";

const featuredLinks = [
  {
    title: "Quick Start",
    description: "Get your first Binboi tunnel running in minutes.",
    href: "/docs/quick-start",
    icon: ChevronRight,
  },
  {
    title: "Installation",
    description: "Install the CLI and prepare your local environment.",
    href: "/docs/installation",
    icon: Command,
  },
  {
    title: "Authentication",
    description: "Login, tokens, API keys, and secure access.",
    href: "/docs/authentication",
    icon: Shield,
  },
  {
    title: "HTTP Tunnels",
    description: "Expose your local apps with clean tunnel workflows.",
    href: "/docs/http-tunnels",
    icon: Waypoints,
  },
  {
    title: "Webhooks",
    description: "Debug incoming requests and inspect webhook traffic.",
    href: "/docs/webhooks",
    icon: Webhook,
  },
  {
    title: "JavaScript SDK",
    description: "Use Binboi with Node.js and modern JS apps.",
    href: "/docs/sdk/javascript",
    icon: Code2,
  },
];

const quickStats = [
  { label: "CLI-first", value: "Fast setup" },
  { label: "Request Debugging", value: "Built in" },
  { label: "Docs Search", value: "Cmd + K" },
];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function DocsHomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px]" />
        <div className="absolute left-[10%] top-[25%] h-[220px] w-[220px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <section className="relative border-b border-white/5 pb-14 pt-8 md:pt-12">
        <FadeUp>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/50">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Binboi Documentation</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Ship tunnels faster,
              <br />
              debug with confidence.
            </h1>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
            Binboi Docs helps you get from installation to production workflows
            without friction. Explore tunnels, auth, webhooks, logs, and SDKs
            in one clean place.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs/quick-start"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white transition-colors hover:bg-white/[0.08]"
            >
              Start with Quick Start
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white/65 transition-colors hover:bg-white/[0.03] hover:text-white"
            >
              <Search className="h-4 w-4" />
              Search Docs
              <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35">
                ⌘K
              </span>
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white/85">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      <section className="border-b border-white/5 py-12">
        <FadeUp>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Install
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Get started in one command
              </h2>
            </div>

            <Link
              href="/docs/installation"
              className="hidden text-sm text-white/45 transition-colors hover:text-white md:inline-flex"
            >
              View installation
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="group relative mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#0b0b0b]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-white/30">Terminal</span>
            </div>

            <div className="overflow-x-auto px-5 py-5 font-mono text-sm leading-8 text-white/85">
              <div className="text-white/35">$ npm install -g @binboi/cli</div>
              <div className="text-white/35">$ binboi login</div>
              <div className="text-white/35">$ binboi http 3000</div>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="py-12">
        <FadeUp>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Explore
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Jump into the docs
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Start with the basics or go directly into tunnels, auth, webhooks,
              and language SDKs.
            </p>
          </div>
        </FadeUp>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeUp key={item.href} delay={0.04 * index}>
                <Link
                  href={item.href}
                  className="group block rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-black text-white/70 transition-colors group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ArrowRight className="mt-1 h-4 w-4 text-white/20 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/45" />
                  </div>

                  <h3 className="mt-5 text-lg font-medium tracking-tight text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {item.description}
                  </p>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </div>
  );
}