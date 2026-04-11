import Link from "next/link";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const docsLinks = [
  { label: "Introduction", href: "/docs/introduction" },
  { label: "Quick Start", href: "/docs/quick_start" },
  { label: "Installation", href: "/docs/installation" },
  { label: "HTTP Tunnels", href: "/docs/http_tunnels" },
  { label: "TLS / HTTPS", href: "/docs/tls" },
  { label: "TCP Tunnels", href: "/docs/tcp" },
];

const sdkLinks = [
  { label: "JavaScript SDK", href: "/docs/js" },
  { label: "Python SDK", href: "/docs/python" },
  { label: "Rust SDK", href: "/docs/rust" },
  { label: "CLI Reference", href: "/docs/cli" },
  { label: "Self-Hosting", href: "/docs/provider" },
  { label: "Troubleshooting", href: "/docs/troubleshooting" },
];

export function DocsFooter() {
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-16">

          {/* Brand column */}
          <div className="space-y-4 md:max-w-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">binboi</span>
              <span className="rounded border border-white/[0.09] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/35">
                docs
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/70">
              Self-hosted tunnels for developers. Expose local services to the
              internet with automatic HTTPS — your data, your server.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/Miransas/binboi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Binboi on GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white/75"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/miransas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Miransas on X"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white/75"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Docs links */}
          <div className="space-y-3">
            <p className="text-md font-semibold uppercase tracking-widest text-white/80">
              Docs
            </p>
            <ul className="space-y-2.5">
              {docsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SDK + reference links */}
          <div className="space-y-3">
            <p className="text-md  font-semibold uppercase tracking-widest text-white/60">
              Reference
            </p>
            <ul className="space-y-2.5">
              {sdkLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Binboi. All rights reserved.
          </p>

          {/* Miransas attribution */}
          <a
            href="https://miransas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/55"
          >
            Built by
            <span className="font-semibold text-white/45 group-hover:text-white/70 transition-colors">
              Miransas
            </span>
            <span className="text-white/15">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
