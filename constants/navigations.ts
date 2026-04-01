import type { IconName } from "./icons";

export type NavItem = {
  label: string;
  href: string;
  icon?: IconName;
  badge?: string;
  children?: NavItem[];
};

export const SITE_HEADER_LINKS: NavItem[] = [
  { label: "Docs", href: "/docs", icon: "docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog", icon: "changelog" },
  { label: "Support", href: "/support", icon: "support" },
];

export const SITE_FOOTER_LINKS: NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog", icon: "blog" },
  { label: "Changelog", href: "/changelog" },
  { label: "Support", href: "/support" },
  { label: "Terms", href: "/terms", icon: "terms" },
];

export const AUTH_LINKS: NavItem[] = [
  { label: "Login", href: "/login", icon: "login" },
  { label: "Register", href: "/register", icon: "register" },
  { label: "Forgot Password", href: "/forgot-password" },
  { label: "Check Email", href: "/check-email" },
  { label: "Verify Email", href: "/verify-email" },
  { label: "Accept Invite", href: "/accept-invite" },
];

export const DASHBOARD_LINKS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "dashboard" },
  { label: "Install", href: "/dashboard/install", icon: "cli" },
  { label: "Tunnels", href: "/dashboard/tunnels", icon: "tunnels" },
  { label: "Usage", href: "/dashboard/usage", icon: "usage" },
  { label: "Logs", href: "/dashboard/log", icon: "logs" },
  { label: "Integrations", href: "/dashboard/integrations", icon: "integrations" },
  { label: "Billing", href: "/dashboard/billing", icon: "billing" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export const DASHBOARD_SECONDARY_LINKS: NavItem[] = [
  { label: "Tokens", href: "/dashboard/api", icon: "tokens" },
  { label: "Total Requests", href: "/dashboard/total_requests", icon: "activity" },
];

export const DOCS_LINKS: NavItem[] = [
  {
    label: "Getting Started",
    href: "/docs",
    children: [
      { label: "Introduction", href: "/docs/introduction", icon: "home" },
      { label: "Quick Start", href: "/docs/quick_start", icon: "docs" },
      { label: "Authentication", href: "/docs/authentication", icon: "auth" },
      { label: "CLI", href: "/docs/cli", icon: "cli" },
      { label: "HTTP Tunnels", href: "/docs/http_tunnels", icon: "globe" },
      { label: "Requests", href: "/docs/requests", icon: "activity" },
      { label: "Debugging", href: "/docs/Debugging", icon: "bugs" },
      { label: "Bugs", href: "/docs/bugs", icon: "bugs" },
    ],
  },
];