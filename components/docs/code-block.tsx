"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split("\n")

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-card">
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
          <span className="text-sm text-muted-foreground">{filename}</span>
          <button
            onClick={copyToClipboard}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={`language-${language}`}>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">
                  <HighlightedLine line={line} language={language} />
                </span>
              </div>
            ))}
          </code>
        </pre>
        {!filename && (
          <button
            onClick={copyToClipboard}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
}

function HighlightedLine({ line, language }: { line: string; language: string }) {
  if (language === "bash" || language === "terminal") {
    const parts = line.split(" ")
    return (
      <>
        {parts.map((part, i) => {
          if (i === 0 && (part === "npm" || part === "pnpm" || part === "yarn" || part === "npx" || part === "cd")) {
            return (
              <span key={i} className="text-primary">
                {part}{" "}
              </span>
            )
          }
          if (part.startsWith("@") || part.startsWith("--")) {
            return (
              <span key={i} className="text-yellow-400">
                {part}{" "}
              </span>
            )
          }
          if (part.includes("/") || part.includes(".")) {
            return (
              <span key={i} className="text-green-400">
                {part}{" "}
              </span>
            )
          }
          return <span key={i}>{part} </span>
        })}
      </>
    )
  }

  if (language === "typescript" || language === "javascript" || language === "tsx" || language === "jsx") {
    return <span className="text-foreground">{line}</span>
  }

  return <span>{line}</span>
}

interface TerminalBlockProps {
  commands: string[]
  title?: string
}

export function TerminalBlock({ commands, title = "terminal" }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(commands.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <button
          onClick={copyToClipboard}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>
          {commands.map((command, index) => (
            <div key={index} className="flex">
              <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground">
                {index + 1}
              </span>
              <span className="flex-1">
                {command.split(" ").map((part, i) => {
                  if (i === 0 && ["npm", "pnpm", "yarn", "npx", "cd", "git"].includes(part)) {
                    return (
                      <span key={i} className="text-primary">
                        {part}{" "}
                      </span>
                    )
                  }
                  if (part.startsWith("@") || part.startsWith("--")) {
                    return (
                      <span key={i} className="text-yellow-400">
                        {part}{" "}
                      </span>
                    )
                  }
                  if (part.includes("/") || part.includes(".")) {
                    return (
                      <span key={i} className="text-green-400">
                        {part}{" "}
                      </span>
                    )
                  }
                  return <span key={i}>{part} </span>
                })}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

interface PackageManagerTabsProps {
  npm: string[]
  pnpm: string[]
  yarn: string[]
  bun?: string[]
}

export function PackageManagerTabs({ npm, pnpm, yarn, bun }: PackageManagerTabsProps) {
  const [activeTab, setActiveTab] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm")

  const tabs = [
    { id: "npm" as const, label: "npm", commands: npm },
    { id: "pnpm" as const, label: "pnpm", commands: pnpm },
    { id: "yarn" as const, label: "yarn", commands: yarn },
    ...(bun ? [{ id: "bun" as const, label: "bun", commands: bun }] : []),
  ]

  const activeCommands = tabs.find((t) => t.id === activeTab)?.commands || npm

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-1 border-b border-border bg-secondary/50 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TerminalBlock commands={activeCommands} />
    </div>
  )
}
