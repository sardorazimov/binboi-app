/**
 * Shared navigation definitions for marketing, docs, auth, and dashboard surfaces.
 */
import type { IconName } from "./icons";
import { DOCS_ARTICLES } from "./site-content";

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
  { label: "Changelog", href: "/changelog" },
  { label: "Support", href: "/support" },
  { label: "Terms", href: "/terms", icon: "terms" },
];

export const AUTH_LINKS: NavItem[] = [
  { label: "Login", href: "/login", icon: "login" },
  { label: "Register", href: "/register", icon: "register" },
  { label: "Forgot Password", href: "/forgot-password", icon: "support" },
  { label: "Check Email", href: "/check-email", icon: "docs" },
  { label: "Verify Email", href: "/verify-email", icon: "auth" },
  { label: "Accept Invite", href: "/accept-invite", icon: "register" },
];

export const DASHBOARD_LINKS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "dashboard" },
  { label: "Install", href: "/dashboard/install", icon: "cli" },
  { label: "Tunnels", href: "/dashboard/tunnels", icon: "tunnels" },
  { label: "Tokens", href: "/dashboard/tokens", icon: "tokens" },
  { label: "Usage", href: "/dashboard/usage", icon: "usage" },
  { label: "Logs", href: "/dashboard/log", icon: "logs" },
  { label: "Integrations", href: "/dashboard/integrations", icon: "integrations" },
  { label: "Billing", href: "/dashboard/billing", icon: "billing" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];
export const DACS_LINKS: NavItem[] = [
  { label: "Overview", href: "/docs", icon: "dashboard" },
  { label: "Install", href: "/docs/install", icon: "cli" },
  { label: "Tunnels", href: "/docs/tunnels", icon: "tunnels" },
  { label: "Tokens", href: "/docs/tokens", icon: "tokens" },
  { label: "Usage", href: "/docs/usage", icon: "usage" },
  { label: "Logs", href: "/docs/log", icon: "logs" },
  { label: "Integrations", href: "/docs/integrations", icon: "integrations" },
  { label: "Billing", href: "/docs/billing", icon: "billing" },
  { label: "Settings", href: "/docs/settings", icon: "settings" },
];

export const DASHBOARD_SECONDARY_LINKS: NavItem[] = [
  { label: "Legacy token route", href: "/dashboard/api", icon: "tokens" },
  { label: "Legacy usage route", href: "/dashboard/total_requests", icon: "activity" },
];


