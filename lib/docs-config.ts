import {
  Apple,
  BookOpen,
  Bug,
  ChevronRight,
  Code2,
  Cpu,
  FileText,
  Globe,
  HardDrive,
  Layout,
  Lock,
  Monitor,
  Network,
  Search,
  Server,
  Shield,
  Terminal,
  Waypoints,
  Webhook,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type DocsItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  keywords?: string[];
  description?: string;
};

export type DocsSection = {
  title: string;
  items: DocsItem[];
};

export const docsConfig: DocsSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/introduction",
        icon: BookOpen,
        keywords: ["intro", "overview", "start", "binboi", "what is"],
        description: "What Binboi is, how it works, and why you'd use it.",
      },
      {
        title: "Quick Start",
        href: "/docs/quick_start",
        icon: Zap,
        keywords: ["quick", "start", "setup", "first tunnel", "3000", "expose"],
        description: "Get a public HTTPS URL in under two minutes.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: HardDrive,
        keywords: ["install", "setup", "cli", "download", "npm", "brew", "homebrew"],
        description: "Install the Binboi CLI on macOS, Linux, or Windows.",
      },
    ],
  },
  {
    title: "Platform Guides",
    items: [
      {
        title: "macOS",
        href: "/docs/mac",
        icon: Apple,
        keywords: ["mac", "macos", "apple", "homebrew", "gatekeeper", "launchd"],
        description: "Install and run Binboi on macOS, including background services.",
      },
      {
        title: "Linux",
        href: "/docs/linux",
        icon: Terminal,
        keywords: ["linux", "ubuntu", "debian", "fedora", "systemd", "apt", "rpm"],
        description: "Install and run Binboi on Linux with systemd integration.",
      },
      {
        title: "Windows",
        href: "/docs/windows",
        icon: Monitor,
        keywords: ["windows", "winget", "scoop", "powershell", "nssm"],
        description: "Install and run Binboi on Windows 10 and 11.",
      },
    ],
  },
  {
    title: "Tunnels",
    items: [
      {
        title: "HTTP Tunnels",
        href: "/docs/http_tunnels",
        icon: Waypoints,
        keywords: ["http", "tunnel", "forwarding", "port", "subdomain", "routing"],
        description: "Expose local HTTP services with automatic HTTPS.",
      },
      {
        title: "TLS / HTTPS",
        href: "/docs/tls",
        icon: Lock,
        keywords: ["tls", "ssl", "https", "certificate", "acme", "lets encrypt", "mtls"],
        description: "Automatic certificates, mTLS, and TLS passthrough.",
      },
      {
        title: "TCP Tunnels",
        href: "/docs/tcp",
        icon: Network,
        keywords: ["tcp", "database", "postgres", "mysql", "ssh", "redis", "raw"],
        description: "Forward raw TCP traffic — databases, SSH, game servers.",
      },
      {
        title: "Regions",
        href: "/docs/regions",
        icon: Globe,
        keywords: ["region", "edge", "latency", "us-east", "eu-west", "asia"],
        description: "Route tunnel traffic through the closest server region.",
      },
    ],
  },
  {
    title: "Monitoring",
    items: [
      {
        title: "Request Inspection",
        href: "/docs/requests",
        icon: Search,
        keywords: ["requests", "inspect", "traffic", "replay", "headers", "body", "dashboard", "4040"],
        description: "Inspect, filter, and replay live HTTP traffic.",
      },
      {
        title: "Logs",
        href: "/docs/logs",
        icon: FileText,
        keywords: ["logs", "logging", "output", "json", "debug", "level"],
        description: "Control log verbosity, format, and output destination.",
      },
      {
        title: "Webhooks",
        href: "/docs/webhooks",
        icon: Webhook,
        keywords: ["webhook", "github", "stripe", "slack", "replay", "signature", "hmac"],
        description: "Capture, inspect, and replay webhook payloads.",
      },
    ],
  },
  {
    title: "SDKs",
    items: [
      {
        title: "JavaScript / Node.js",
        href: "/docs/js",
        icon: Code2,
        keywords: ["javascript", "js", "node", "nodejs", "typescript", "express", "sdk"],
        description: "Open tunnels programmatically from Node.js applications.",
      },
      {
        title: "Python",
        href: "/docs/python",
        icon: Code2,
        keywords: ["python", "flask", "fastapi", "django", "asyncio", "sdk"],
        description: "Use Binboi with Flask, FastAPI, and other Python frameworks.",
      },
      {
        title: "Rust",
        href: "/docs/rust",
        icon: Cpu,
        keywords: ["rust", "tokio", "axum", "cargo", "sdk"],
        description: "Embed Binboi tunnels in Rust applications with Tokio.",
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        title: "CLI Reference",
        href: "/docs/cli",
        icon: Terminal,
        keywords: ["cli", "commands", "reference", "flags", "options"],
        description: "Complete Binboi CLI command and flag reference.",
      },
      {
        title: "Authentication",
        href: "/docs/authentication",
        icon: Shield,
        keywords: ["auth", "login", "token", "apikey", "oauth", "credentials"],
        description: "Log in, manage auth tokens, and configure access.",
      },
      {
        title: "Dashboard Layout",
        href: "/docs/layout",
        icon: Layout,
        keywords: ["dashboard", "ui", "panel", "requests feed", "team"],
        description: "Navigate the Binboi web dashboard.",
      },
    ],
  },
  {
    title: "Self-Hosting",
    items: [
      {
        title: "Provider Setup",
        href: "/docs/provider",
        icon: Server,
        keywords: ["provider", "self-host", "server", "docker", "systemd", "config", "deploy"],
        description: "Run your own Binboi server on any VPS or cloud instance.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        title: "Troubleshooting",
        href: "/docs/troubleshooting",
        icon: Wrench,
        keywords: ["troubleshoot", "fix", "error", "502", "504", "timeout", "connection refused"],
        description: "Common errors and how to resolve them.",
      },
      {
        title: "Debugging",
        href: "/docs/debugging",
        icon: Wrench,
        keywords: ["debug", "inspect", "diagnose", "verbose"],
        description: "Debug tunnel, auth, and request issues.",
      },
      {
        title: "Bug Reports",
        href: "/docs/bugs",
        icon: Bug,
        keywords: ["bugs", "issues", "report", "github"],
        description: "Report and track known issues.",
      },
    ],
  },
];

export const allDocsPages = docsConfig.flatMap((section) => section.items);

export function getDocByHref(href: string) {
  // strip trailing slash for robustness
  const normalized = href.replace(/\/$/, "");
  return allDocsPages.find((item) => item.href === normalized);
}

export function getSectionForHref(href: string): DocsSection | null {
  const normalized = href.replace(/\/$/, "");
  return (
    docsConfig.find((section) =>
      section.items.some((item) => item.href === normalized)
    ) ?? null
  );
}

export function getPrevNextDocs(href: string) {
  const normalized = href.replace(/\/$/, "");
  const index = allDocsPages.findIndex((item) => item.href === normalized);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? allDocsPages[index - 1] : null,
    next: index < allDocsPages.length - 1 ? allDocsPages[index + 1] : null,
  };
}
