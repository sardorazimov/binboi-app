"use client";

import { Link2, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type HeadingLinkProps = {
  id: string;
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function HeadingLink({
  id,
  children,
  as = "h2",
  className,
  ...props
}: HeadingLinkProps) {
  const [copied, setCopied] = useState(false);

  const Tag = as;

  async function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      console.error("Failed to copy heading link", error);
    }
  }

  return (
    <Tag
      id={id}
      className={cn("group scroll-m-20", className)}
      {...props}
    >
      <span className="flex items-center gap-2">
        <a
          href={`#${id}`}
          className="transition-colors hover:text-white"
        >
          {children}
        </a>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy heading link"
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/8 bg-white/[0.02] text-white/25 opacity-0 transition-all duration-200",
            "hover:border-white/12 hover:bg-white/[0.05] hover:text-white",
            "group-hover:opacity-100 group-focus-within:opacity-100",
            copied && "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 opacity-100"
          )}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Link2 className="h-3.5 w-3.5" />
          )}
        </button>
      </span>
    </Tag>
  );
}