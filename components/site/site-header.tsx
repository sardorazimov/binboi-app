"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Lock,
  Menu,
  X,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { navLinks, toolsMenu, workflowItems } from "@/components/site/site-nav-data"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isDocs = pathname?.startsWith("/docs")

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <nav aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between bg-black backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2" aria-label="Binboi home">
            <Zap className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden="true" />
            <span
              className="font-[family-name:var(--font-pt-mono)] text-base font-bold text-foreground sm:text-lg"
              style={{ letterSpacing: "-0.05em" }}
            >
              Binboi
            </span>
          </Link>

          {isDocs ? (
            <div className="hidden items-center gap-8 lg:flex">
              <span className="text-sm font-medium text-foreground/88">Documentation</span>
              <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Pricing
              </Link>
              <Link href="/support" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Support
              </Link>
              <Link href="/changelog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Changelog
              </Link>
            </div>
          ) : (
            <div className="hidden items-center gap-8 lg:flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground">
                  Tools
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[480px] max-w-[calc(100vw-2rem)] border-border bg-card/95 p-4 backdrop-blur-xl"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <DropdownMenuLabel className="mb-2 flex items-center gap-2 font-semibold text-primary">
                        Foundations
                      </DropdownMenuLabel>
                      {toolsMenu.foundations.map((category) => (
                        <div key={category.category} className="mb-3">
                          <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {category.category}
                          </div>
                          {category.items.map((item) => (
                            <DropdownMenuItem key={item.href} asChild className="group">
                              <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                                <item.icon
                                  className="h-4 w-4 text-primary transition-colors group-data-[highlighted]:text-primary"
                                  aria-hidden="true"
                                />
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div>
                      <DropdownMenuLabel className="mb-2 flex items-center gap-2 font-semibold text-primary">
                        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                        Operations
                      </DropdownMenuLabel>
                      {toolsMenu.operations.map((category) => (
                        <div key={category.category} className="mb-3">
                          <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {category.category}
                          </div>
                          {category.items.map((item) => (
                            <DropdownMenuItem key={item.href} asChild className="group">
                              <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                                <item.icon
                                  className="h-4 w-4 text-primary transition-colors group-data-[highlighted]:text-primary"
                                  aria-hidden="true"
                                />
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground">
                  Workflows
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 border-border bg-card/95 backdrop-blur-xl">
                  {workflowItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="group">
                      <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                        <item.icon
                          className="h-4 w-4 text-primary transition-colors group-data-[highlighted]:text-primary"
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <Link href="/register">
                Get Started
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 left-0 top-0 z-40 flex h-dvh w-dvw flex-col bg-background lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between border-b border-border/50 bg-background px-6 py-4">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span
                    className="font-[family-name:var(--font-pt-mono)] text-base font-bold text-foreground"
                    style={{ letterSpacing: "-0.05em" }}
                  >
                    Binboi
                  </span>
                </Link>
                <button
                  type="button"
                  className="p-2 text-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-4 pt-4">
                {isDocs ? (
                  <>
                    <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary">
                      Documentation
                    </div>
                    <Link
                      href="/docs"
                      className="block rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Overview
                    </Link>
                    <div className="my-3 border-t border-border/50" />
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary">
                      Foundations
                    </div>
                    {toolsMenu.foundations.map((category) => (
                      <div key={category.category}>
                        <div className="px-4 py-1 text-xs text-muted-foreground">{category.category}</div>
                        {category.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center gap-2 rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon
                              className="h-5 w-5 text-primary transition-colors group-hover:text-primary"
                              aria-hidden="true"
                            />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}

                    <div className="flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary">
                      <Lock className="h-3 w-3" aria-hidden="true" />
                      Operations
                    </div>
                    {toolsMenu.operations.map((category) => (
                      <div key={category.category}>
                        <div className="px-4 py-1 text-xs text-muted-foreground">{category.category}</div>
                        {category.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center gap-2 rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon
                              className="h-5 w-5 text-primary transition-colors group-hover:text-primary"
                              aria-hidden="true"
                            />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}

                    <div className="my-3 border-t border-border/50" />
                    <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Workflows
                    </div>
                    {workflowItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-2 rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon
                          className="h-5 w-5 text-primary transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    ))}
                    <div className="my-3 border-t border-border/50" />
                  </>
                )}

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-border/50 bg-background px-6 py-4">
                <Button asChild variant="ghost" className="w-full justify-center py-6 text-base">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button asChild className="w-full py-6 text-base">
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  )
}
