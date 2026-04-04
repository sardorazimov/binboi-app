/**
 * Auth layout that keeps login and recovery flows visually aligned with the product site.
 */
import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(217,249,157,0.08),transparent_24rem),radial-gradient(circle_at_bottom_left,rgba(97,147,255,0.12),transparent_30rem),linear-gradient(180deg,rgba(255,255,255,0.01),rgba(0,0,0,0))]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-foreground"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(217,249,157,0.9),rgba(23,27,35,0.22)_45%,rgba(97,147,255,0.58)_100%)]" />
            <span>BINBOI</span>
          </Link>
          <Link href="/docs" className="text-sm text-foreground/62 hover:text-foreground">
            Documentation
          </Link>
        </div>

        <div className="grid flex-1 gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,249,157,0.1),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(97,147,255,0.14),transparent_32%)]" />
            <div className="relative space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
                  Access Binboi
                </p>
                <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-foreground">
                  Sign in to manage tunnels, inspect traffic, and keep workspace access clean.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-foreground/66">
                  This area stays intentionally simple. Get into the product, connect your
                  workspace, and move straight into the tunnel and request flows.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Auth",
                    body: "Login, recovery, and workspace membership in one path.",
                  },
                  {
                    title: "Traffic",
                    body: "Open a tunnel and inspect the requests that actually arrived.",
                  },
                  {
                    title: "Control",
                    body: "Rotate tokens and keep environment access explicit.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-5"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/58">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
