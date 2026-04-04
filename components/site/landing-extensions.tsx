"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Cable,
  Globe,
  Radar,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Webhook,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const platformFeatures = [
  {
    title: "Expose localhost without drama",
    description:
      "Turn a local app into a shareable URL quickly, then keep the same path as the project moves into staging.",
    icon: Globe,
  },
  {
    title: "See the traffic you care about",
    description:
      "Inspect requests, headers, and delivery details before a webhook issue turns into guessing.",
    icon: Activity,
  },
  {
    title: "Keep access scoped",
    description:
      "Workspace-aware auth and tokens help teams share environments without losing control of who can do what.",
    icon: ShieldCheck,
  },
  {
    title: "Grow from solo dev to team staging",
    description:
      "Use the same product surface for one engineer's laptop, a shared staging tunnel, or an internal demo flow.",
    icon: Cable,
  },
];

const workflowHighlights = [
  {
    title: "Webhook debugging",
    body: "Capture provider traffic, confirm signatures, and inspect the exact payload that triggered the issue.",
    icon: Webhook,
  },
  {
    title: "CLI-first operations",
    body: "Start with one command, then move into repeatable config and automation when the workflow grows up.",
    icon: TerminalSquare,
  },
  {
    title: "Regions and observability",
    body: "Choose where traffic enters, then connect requests, logs, and latency-sensitive debugging in one place.",
    icon: Radar,
  },
];

const testimonials = [
  {
    quote:
      "Binboi made our webhook debugging flow finally feel like a product instead of a bag of flags.",
    person: "Mert A.",
    role: "Product Engineer",
  },
  {
    quote:
      "The request visibility is the difference. We stopped arguing about whether traffic arrived and started fixing the real issue.",
    person: "Zeynep T.",
    role: "Platform Lead",
  },
  {
    quote:
      "We went from ad hoc localhost sharing to named staging tunnels the whole team could actually trust.",
    person: "Onur K.",
    role: "Founding Engineer",
  },
];

const animatedPaths = [
  {
    id: "path-a",
    d: "M64 84 C180 84 184 164 300 164 S438 84 560 84 S648 144 708 144",
    duration: 5.4,
    points: [
      { x: 64, y: 84 },
      { x: 168, y: 92 },
      { x: 300, y: 164 },
      { x: 462, y: 88 },
      { x: 560, y: 84 },
      { x: 708, y: 144 },
    ],
  },
  {
    id: "path-b",
    d: "M84 240 C180 240 216 156 312 156 S452 258 560 258 S656 198 708 198",
    duration: 6.2,
    points: [
      { x: 84, y: 240 },
      { x: 176, y: 234 },
      { x: 312, y: 156 },
      { x: 442, y: 236 },
      { x: 560, y: 258 },
      { x: 708, y: 198 },
    ],
  },
  {
    id: "path-c",
    d: "M84 330 C180 330 200 284 308 284 S434 330 556 330 S648 302 712 302",
    duration: 7.1,
    points: [
      { x: 84, y: 330 },
      { x: 176, y: 324 },
      { x: 308, y: 284 },
      { x: 448, y: 324 },
      { x: 556, y: 330 },
      { x: 712, y: 302 },
    ],
  },
];

function AnimatedSignalMesh() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,11,15,0.96),rgba(8,9,12,0.98))] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,249,157,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(80,120,255,0.16),transparent_28%)]" />
      <svg
        viewBox="0 0 760 420"
        className="relative z-10 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="meshStroke" x1="0" y1="0" x2="760" y2="420">
            <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#76a7ff" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#ff8f4d" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d9f99d" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {animatedPaths.map((path, index) => (
          <g key={path.id}>
            <path
              d={path.d}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.path
              d={path.d}
              stroke="url(#meshStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="18 20"
              filter="url(#softGlow)"
              initial={{ strokeDashoffset: 0, opacity: 0.55 }}
              animate={{ strokeDashoffset: [-220, 0], opacity: [0.45, 0.95, 0.45] }}
              transition={{
                duration: path.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.circle
              r="5.5"
              fill="#d9f99d"
              filter="url(#softGlow)"
              initial={path.points[0]}
              animate={{
                cx: path.points.map((point) => point.x),
                cy: path.points.map((point) => point.y),
                opacity: [0, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: path.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                times: [0, 0.12, 0.34, 0.56, 0.78, 1],
                delay: index * 0.4,
              }}
            />
          </g>
        ))}

        {[
          { x: 84, y: 84, label: "Developer laptop" },
          { x: 312, y: 156, label: "Binboi edge" },
          { x: 560, y: 258, label: "Workspace tunnel" },
          { x: 708, y: 198, label: "Request inspector" },
        ].map((node, index) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="28" fill="url(#nodeGlow)" />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="#d9f99d"
              filter="url(#softGlow)"
              animate={{ scale: [1, 1.18, 1] }}
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.3,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <text
              x={node.x + 18}
              y={node.y - 14}
              fill="rgba(255,255,255,0.66)"
              fontSize="12"
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function LandingExtensions() {
  return (
    <div className="space-y-14 pb-8">
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[34px] border border-white/8 bg-white/[0.03] p-7 sm:p-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Built for ingress and debugging
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Public URLs, request visibility, and workspace access in one product surface.
              </h2>
              <p className="max-w-2xl text-sm leading-8 text-foreground/64 sm:text-base">
                Binboi helps teams expose local apps, debug webhook deliveries, and keep
                staging access cleaner without bouncing between unrelated tools.
              </p>
            </div>
          </div>

          <AnimatedSignalMesh />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {platformFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[30px] border border-white/[0.08] bg-white/[0.03] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/62">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[34px] border border-white/[0.08] bg-white/[0.03]">
          <div className="grid gap-0 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="border-b border-white/8 px-6 py-7 lg:border-b-0 lg:border-r lg:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Workflow fit
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                One product that still makes sense from localhost to shared staging.
              </h2>
              <p className="mt-4 text-sm leading-8 text-foreground/62 sm:text-base">
                Start with a single tunnel on your laptop, then keep the same language as
                your team adds logs, request inspection, regions, and API automation.
              </p>
            </div>
            <div className="grid gap-4 px-6 py-7 sm:grid-cols-3 lg:px-8">
              {workflowHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/[0.07] bg-white/[0.025] p-5"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/60">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Small teams want tunnel tooling that feels like a product.
            </h2>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-foreground/58 lg:flex">
            <Sparkles className="h-4 w-4 text-primary" />
            Feedback from product and platform teams
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.quote}
              className="rounded-[30px] border border-white/[0.08] bg-white/[0.03] p-6"
            >
              <p className="text-base leading-8 text-foreground/72">"{item.quote}"</p>
              <div className="mt-6 border-t border-white/8 pt-5">
                <p className="text-sm font-semibold text-foreground">{item.person}</p>
                <p className="text-sm text-foreground/52">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 rounded-[36px] border border-white/[0.08] bg-white/[0.03] px-6 py-7 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
              Ready to launch
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
              Start with one tunnel, then grow into a team-readable control surface.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-foreground/62 sm:text-base">
              Get a working public URL quickly, then harden the workflow with tokens,
              request visibility, and operational docs that do not feel bolted on later.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">
                  Create workspace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/docs/quick_start">Read quick start</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-6">
            <div className="space-y-4">
              {[
                "Fast route from install to live tunnel.",
                "Scoped credentials and cleaner access hygiene.",
                "Request evidence for webhooks, demos, and shared staging.",
              ].map((point) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-[22px] border border-white/[0.07] bg-white/[0.025] px-4 py-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(217,249,157,1),rgba(97,147,255,0.82))]" />
                  <p className="text-sm leading-7 text-foreground/62">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
