import type { Metadata } from "next";
import { DocsShell } from "@/components/docs/docs-shell";

export const metadata: Metadata = {
  title: {
    template: "%s — Binboi Docs",
    default: "Binboi Docs",
  },
  description: "Self-hosted tunnels for developers. Expose local services to the internet with automatic HTTPS.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
