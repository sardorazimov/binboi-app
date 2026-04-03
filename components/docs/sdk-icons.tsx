"use client"

import { cn } from "@/lib/utils"

const sdks = [
  { name: "Next.js", icon: "N", active: false },
  { name: "React", icon: "⚛", active: true },
  { name: "Vue", icon: "V", active: false },
  { name: "Svelte", icon: "S", active: false },
  { name: "Astro", icon: "A", active: false },
  { name: "Nuxt", icon: "N", active: false },
  { name: "Remix", icon: "R", active: false },
  { name: "Express", icon: "E", active: false },
  { name: "Fastify", icon: "F", active: false },
  { name: "Hono", icon: "H", active: false },
  { name: "Python", icon: "Py", active: false },
  { name: "Go", icon: "Go", active: false },
]

export function SDKIcons() {
  return (
    <div className="sticky top-40 hidden w-56 xl:block">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 text-sm font-medium text-foreground">Available in other SDKs</h4>
        <div className="grid grid-cols-5 gap-2">
          {sdks.map((sdk) => (
            <button
              key={sdk.name}
              title={sdk.name}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                sdk.active
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              {sdk.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
