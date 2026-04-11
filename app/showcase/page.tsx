"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Webhook,
  Users,
  MonitorPlay,
  Cpu,
  Server,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Zap,
  Globe,
  Lock,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/docs/navbar";
import { DocsFooter } from "@/components/docs/docs-footer";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = { label: string; code: string };
type UseCase = {
  id: string;
  icon: React.ElementType;
  badge?: string;
  title: string;
  description: string;
  highlights: string[];
  tabs: Tab[];
  wide?: boolean;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const useCases: UseCase[] = [
  {
    id: "webhooks",
    icon: Webhook,
    badge: "Most popular",
    title: "Webhook Testing",
    description:
      "Receive GitHub, Stripe, Slack, or any other webhook payload on your local machine — no ngrok account, no config files, no surprises.",
    highlights: [
      "Inspect every payload in the local dashboard",
      "Replay any request with one command",
      "Verify HMAC signatures end-to-end",
    ],
    wide: true,
    tabs: [
      {
        label: "Start tunnel",
        code: `# Start a tunnel with a stable subdomain
$ binboi http 3000 --subdomain stripe-hooks

  Tunnel started
  Public URL  https://stripe-hooks.binboi.dev
  Forwarding  https://stripe-hooks.binboi.dev → localhost:3000
  Status      online

# Register this URL in your Stripe dashboard as the webhook endpoint
# → https://stripe-hooks.binboi.dev/webhook`,
      },
      {
        label: "Inspect & replay",
        code: `# Replay the last captured webhook
$ binboi replay last

# Replay a specific request by ID
$ binboi replay req_abc123

# Replay with a header override (e.g. to re-test signature logic)
$ binboi replay req_abc123 \\
    --header "Stripe-Signature: t=new_ts,v1=new_sig"`,
      },
      {
        label: "Node.js handler",
        code: `import express from 'express';
import Stripe from 'stripe';

const app = express();
app.use(express.raw({ type: 'application/json' }));

app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(\`Webhook error: \${err.message}\`);
  }

  if (event.type === 'payment_intent.succeeded') {
    console.log('Payment succeeded:', event.data.object.id);
  }

  res.json({ received: true });
});

app.listen(3000);`,
      },
    ],
  },
  {
    id: "team-sharing",
    icon: Users,
    title: "Team Preview Links",
    description:
      "Share your local branch with a teammate for review — no deploy, no staging env required.",
    highlights: [
      "Stable subdomain per branch or PR",
      "Works behind corporate firewalls",
      "Zero setup for the reviewer",
    ],
    tabs: [
      {
        label: "Share a PR",
        code: `# Name the tunnel after your PR number
$ binboi http 3000 --subdomain pr-review-42

  Tunnel started
  Public URL  https://pr-review-42.binboi.dev
  Status      online

# Share the URL with your team — they can open it in
# any browser without any Binboi account or setup.`,
      },
      {
        label: "SDK (Node.js)",
        code: `import { Binboi } from '@binboi/sdk';

const client = new Binboi();
const prNumber = process.env.PR_NUMBER ?? 'dev';

const tunnel = await client.http({
  addr: 3000,
  subdomain: \`pr-review-\${prNumber}\`,
});

console.log(\`Share this URL: \${tunnel.url}\`);`,
      },
    ],
  },
  {
    id: "demos",
    icon: MonitorPlay,
    title: "Live Demos",
    description:
      "Give a live demo directly from your laptop — no deploy pipeline, no staging environment, just a tunnel.",
    highlights: [
      "Use any reserved subdomain for your demo",
      "Attendees see changes in real time",
      "Stop with Ctrl+C when done",
    ],
    tabs: [
      {
        label: "Start demo",
        code: `# Reserve a clean, professional-looking subdomain
$ binboi http 8080 --subdomain acme-demo --region eu-west

  Tunnel started
  Public URL  https://acme-demo.binboi.dev
  Region      eu-west  (latency: ~18ms)
  Status      online

# Open https://acme-demo.binboi.dev on the projector.
# Every code change you make is visible immediately.`,
      },
    ],
  },
  {
    id: "iot",
    icon: Cpu,
    title: "IoT & Raspberry Pi",
    description:
      "Expose a Node-RED dashboard, home automation UI, or sensor API running on a Pi or edge device from anywhere.",
    highlights: [
      "Works on ARM64 and ARMv7",
      "Runs as a systemd service",
      "No port forwarding on the router",
    ],
    tabs: [
      {
        label: "Raspberry Pi setup",
        code: `# On the Raspberry Pi (arm64 binary)
$ curl -fsSL https://dl.binboi.dev/install.sh | sh
$ binboi login --server https://tunnel.example.com

# Expose the Node-RED dashboard on port 1880
$ binboi http 1880 --subdomain home-pi

# Or run as a systemd service (auto-restart on reboot)
$ sudo systemctl enable --now binboi-tunnel`,
      },
      {
        label: "systemd unit",
        code: `# /etc/systemd/system/binboi-tunnel.service
[Unit]
Description=Binboi Tunnel — Node-RED
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/binboi http 1880 --subdomain home-pi
Restart=on-failure
RestartSec=5
User=pi
Environment=HOME=/home/pi

[Install]
WantedBy=multi-user.target`,
      },
    ],
  },
  {
    id: "selfhosted",
    icon: Server,
    title: "Self-hosted Services",
    description:
      "Reach your local Postgres, Gitea, Nextcloud, or any TCP service remotely — without opening firewall ports.",
    highlights: [
      "TCP tunnels with fixed remote ports",
      "IP allowlist restricts access",
      "Works with any database or server",
    ],
    tabs: [
      {
        label: "Remote Postgres",
        code: `# Expose local Postgres on a fixed remote port
$ binboi tcp 5432 --remote-port 15432 \\
    --allow-cidr 203.0.113.0/24

  TCP endpoint  tunnel.example.com:15432
  Forwarding    tunnel.example.com:15432 → localhost:5432
  Status        online

# Connect from anywhere
$ psql -h tunnel.example.com -p 15432 -U myuser mydb`,
      },
      {
        label: "Remote SSH",
        code: `# Expose local SSH server
$ binboi tcp 22 --subdomain my-macbook

  TCP endpoint  my-macbook.binboi.dev:<port>
  Status        online

# Connect from any machine
$ ssh -p <port> user@my-macbook.binboi.dev`,
      },
    ],
  },
];

const stats = [
  { value: "< 2s", label: "Tunnel start time" },
  { value: "HTTPS", label: "Auto certificate on every tunnel" },
  { value: "0", label: "Firewall rules required" },
  { value: "3", label: "SDK languages" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CodeBlock({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden">
      {/* Tab bar */}
      {tabs.length > 1 && (
        <div className="flex items-center gap-1 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <span className="mr-2 size-2 rounded-full bg-[#ff5f57]" />
          <span className="mr-3 size-2 rounded-full bg-[#febc2e]" />
          <span className="mr-4 size-2 rounded-full bg-[#28c840]" />
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                i === active
                  ? "bg-white/[0.08] text-white/80"
                  : "text-white/30 hover:text-white/55"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {tabs.length === 1 && (
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-white/25">
            {tabs[0].label}
          </span>
        </div>
      )}

      {/* Code content */}
      <pre className="overflow-x-auto p-4 font-mono text-[0.78rem] leading-[1.8] text-white/70">
        <CodeLines code={tabs[active].code} />
      </pre>
    </div>
  );
}

function CodeLines({ code }: { code: string }) {
  return (
    <>
      {code.split("\n").map((line, i) => {
        // Comment lines
        if (line.trimStart().startsWith("#")) {
          return (
            <div key={i} className="text-white/30">
              {line}
            </div>
          );
        }
        // $ prompt lines
        if (line.startsWith("$")) {
          const rest = line.slice(1).trim();
          const parts = rest.split(" ");
          const cmd = parts[0]; // e.g. "binboi"
          const args = parts.slice(1);

          return (
            <div key={i}>
              <span className="text-lime-400/60">$ </span>
              <span className="text-white/90">{cmd} </span>
              <FlaggedArgs args={args} />
            </div>
          );
        }
        // Output lines — key=value style
        if (/^\s+(Tunnel|Public|Forwarding|Status|Region|TCP|Warning|Error)/.test(line)) {
          const colonIdx = line.indexOf("  ");
          if (colonIdx > -1) {
            const label = line.slice(0, colonIdx + 2);
            const value = line.slice(colonIdx + 2).trim();
            const isStatus = label.includes("Status");
            return (
              <div key={i}>
                <span className="text-white/30">{label}</span>
                {isStatus ? (
                  <span className="text-lime-400">{value}</span>
                ) : (
                  <span className="text-white/60">{value}</span>
                )}
              </div>
            );
          }
        }
        // Blank lines
        if (line.trim() === "") return <div key={i} className="h-3" />;
        // Everything else (config / code)
        return (
          <div key={i} className="text-white/60">
            {line}
          </div>
        );
      })}
    </>
  );
}

function FlaggedArgs({ args }: { args: string[] }) {
  const parts: React.ReactNode[] = [];
  let i = 0;
  while (i < args.length) {
    const token = args[i];
    if (token.startsWith("--") || token.startsWith("-")) {
      parts.push(
        <span key={i} className="text-sky-400/70">
          {token}{" "}
        </span>
      );
    } else if (token === "\\") {
      parts.push(
        <span key={i} className="text-white/25">
          {"\\"}{"\n"}

        </span>
      );
    } else {
      parts.push(
        <span key={i} className="text-lime-300/80">
          {token}{" "}
        </span>
      );
    }
    i++;
  }
  return <>{parts}</>;
}

function UseCaseCard({ uc }: { uc: UseCase }) {
  const Icon = uc.icon;

  return (
    <div
      className={`group relative flex flex-col gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.035] transition-colors ${
        uc.wide ? "lg:col-span-2" : ""
      }`}
    >
      {/* Subtle corner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 0%, oklch(0.92 0.16 125 / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Card header */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex size-10 items-center justify-center rounded-xl border border-lime-400/15 bg-lime-400/[0.07]">
            <Icon className="size-5 text-lime-400" />
          </div>
          {uc.badge && (
            <span className="inline-flex items-center gap-1 rounded-full border border-lime-400/20 bg-lime-400/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-lime-400/80">
              <Zap className="size-2.5" />
              {uc.badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white">
          {uc.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {uc.description}
        </p>

        {/* Highlights */}
        <ul className="mt-4 space-y-1.5">
          {uc.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-white/45">
              <CheckCircle2 className="size-3.5 shrink-0 text-lime-400/60" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Code block */}
      <div className="relative z-10 flex-1">
        <CodeBlock tabs={uc.tabs} />
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/[0.06] px-4 pb-20 pt-20 md:px-6 md:pt-28">
          {/* Background glow blobs */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.92 0.16 125 / 0.35) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-5xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/50">
              <Globe className="size-3.5 text-lime-400" />
              Real-world use cases
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-white sm:text-6xl md:text-[5rem]">
              Built with
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.18 125) 0%, oklch(0.8 0.14 130) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Binboi
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
              From webhook testing to IoT devices — see how developers use
              Binboi to ship faster without touching production.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/quick_start"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-lime-300 transition-colors"
              >
                Start for free
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs/introduction"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.07] hover:text-white transition-colors"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────────────────────── */}
        <section className="border-b border-white/[0.06]">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 px-6 py-7 text-center"
              >
                <span className="font-mono text-2xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-white/35">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Feature pills ─────────────────────────────────────── */}
        <section className="border-b border-white/[0.06] px-4 py-5 md:px-6">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2">
            {[
              { icon: Zap, label: "Instant setup" },
              { icon: Lock, label: "Auto HTTPS" },
              { icon: Search, label: "Request inspector" },
              { icon: Terminal, label: "CLI & SDKs" },
              { icon: Globe, label: "Multi-region" },
              { icon: Server, label: "Self-hosted" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-white/45"
              >
                <Icon className="size-3 text-lime-400/70" />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* ── Use cases grid ─────────────────────────────────────── */}
        <section className="px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Use cases
              </h2>
              <p className="mt-2 text-sm text-white/40">
                Five ways developers use Binboi every day.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {useCases.map((uc) => (
                <UseCaseCard key={uc.id} uc={uc} />
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section className="border-t border-white/[0.06] px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                How it works
              </h2>
              <p className="mt-2 text-sm text-white/40">
                Three commands from zero to public URL.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Install",
                  desc: "One command — works on macOS, Linux, and Windows.",
                  code: "npm install -g @binboi/cli",
                },
                {
                  step: "02",
                  title: "Login",
                  desc: "Authenticate against your self-hosted server.",
                  code: "binboi login --server https://tunnel.example.com",
                },
                {
                  step: "03",
                  title: "Expose",
                  desc: "Get a public HTTPS URL pointing to your local port.",
                  code: "binboi http 3000",
                },
              ].map(({ step, title, desc, code }) => (
                <div
                  key={step}
                  className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
                >
                  <div className="mb-4 font-mono text-xs font-semibold text-lime-400/50">
                    {step}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mb-4 text-sm text-white/45">{desc}</p>
                  <div className="rounded-lg border border-white/[0.07] bg-[#0a0a0a] px-4 py-3 font-mono text-[0.75rem] text-white/60">
                    <span className="text-lime-400/50">$ </span>
                    {code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="px-4 pb-20 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center md:p-14">
              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.92 0.16 125 / 0.12) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
                  Ready to try it?
                </h2>
                <p className="mt-3 text-base text-white/45">
                  Install the CLI and get a public URL in under two minutes.
                  <br className="hidden sm:block" />
                  No account required for self-hosted setups.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/docs/quick_start"
                    className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black hover:bg-lime-300 transition-colors"
                  >
                    Quick Start
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/docs/installation"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/[0.07] hover:text-white transition-colors"
                  >
                    Installation guide
                  </Link>
                </div>

                {/* Mini terminal */}
                <div className="mx-auto mt-8 max-w-sm rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-4 text-left font-mono text-sm">
                  <div className="flex gap-1.5 mb-3">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div>
                    <span className="text-lime-400/60">$ </span>
                    <span className="text-white/80">binboi http 3000</span>
                  </div>
                  <div className="mt-1 text-white/30">
                    {"  "}Public URL{" "}
                    <span className="text-lime-400">
                      https://abc123.binboi.dev
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-white/30">
                    {"  "}Status{"     "}
                    <span className="inline-flex items-center gap-1 text-lime-400">
                      <span className="size-1.5 rounded-full bg-lime-400" />
                      online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DocsFooter />
    </div>
  );
}
