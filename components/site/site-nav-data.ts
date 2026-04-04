import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Bot,
  Cable,
  CloudCog,
  KeyRound,
  LifeBuoy,
  MapPinned,
  PanelsTopLeft,
  Radar,
  Route,
  ShieldCheck,
  TerminalSquare,
  Webhook,
} from "lucide-react";

export const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
  { href: "/changelog", label: "Changelog" },
];

export const workflowItems = [
  { href: "/docs/quick_start", label: "Local previews", icon: PanelsTopLeft },
  { href: "/docs/webhooks", label: "Webhook debugging", icon: Webhook },
  { href: "/docs/http_tunnels", label: "Shared staging tunnels", icon: Cable },
  { href: "/docs/api", label: "Control plane automation", icon: CloudCog },
];

export const toolsMenu = {
  foundations: [
    {
      category: "Access",
      items: [
        { href: "/docs/authentication", label: "Auth and tokens", icon: KeyRound },
        { href: "/docs/api", label: "API operations", icon: ShieldCheck },
      ],
    },
    {
      category: "Traffic",
      items: [
        { href: "/docs/http_tunnels", label: "HTTP tunnels", icon: Route },
        { href: "/docs/requests", label: "Request inspector", icon: Activity },
      ],
    },
  ],
  operations: [
    {
      category: "Operate",
      items: [
        { href: "/docs/logs", label: "Relay logs", icon: Radar },
        { href: "/docs/regions", label: "Regions and latency", icon: MapPinned },
      ],
    },
    {
      category: "Learn",
      items: [
        { href: "/docs/cli", label: "CLI guide", icon: TerminalSquare },
        { href: "/docs/troubleshooting", label: "Troubleshooting", icon: LifeBuoy },
      ],
    },
  ],
};

export const footerLinks = {
  Product: [
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
    { name: "Support", href: "/support" },
  ],
  Platform: [
    { name: "Quick Start", href: "/docs/quick_start" },
    { name: "HTTP Tunnels", href: "/docs/http_tunnels" },
    { name: "Requests", href: "/docs/requests" },
    { name: "API", href: "/docs/api" },
  ],
  Workflows: [
    { name: "Webhooks", href: "/docs/webhooks" },
    { name: "Logs", href: "/docs/logs" },
    { name: "Regions", href: "/docs/regions" },
    { name: "Troubleshooting", href: "/docs/troubleshooting" },
  ],
  Company: [
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Terms", href: "/terms" },
    { name: "Status", href: "/docs/bugs" },
  ],
};

export const footerSocialLinks = [
  { name: "Docs", icon: BookOpen, href: "/docs" },
  { name: "API", icon: Bot, href: "/docs/api" },
  { name: "Support", icon: LifeBuoy, href: "/support" },
  { name: "Pricing", icon: ArrowUpRight, href: "/pricing" },
];
