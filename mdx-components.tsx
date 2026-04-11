/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { Pre } from "@/components/docs/pre";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-ğüşöçıİĞÜŞÖÇ]/g, "")
    .replace(/\s+/g, "-");
}

function extractText(children: any): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children?.props?.children) return extractText(children.props.children);
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: any) => (
      <h1
        className={cn(
          "mt-2 mb-4 scroll-m-20 text-[2.25rem] font-bold tracking-[-0.02em] leading-tight text-white",
          className
        )}
        {...props}
      />
    ),

    h2: ({ className, children, id, ...props }: any) => {
      const generatedId = id ?? slugify(extractText(children));
      return (
        <h2
          id={generatedId}
          className={cn(
            "mt-12 mb-3 scroll-m-20 border-b border-white/[0.08] pb-2.5",
            "text-[1.375rem] font-semibold tracking-[-0.015em] leading-snug text-white first:mt-0",
            className
          )}
          {...props}
        >
          {children}
        </h2>
      );
    },

    h3: ({ className, children, id, ...props }: any) => {
      const generatedId = id ?? slugify(extractText(children));
      return (
        <h3
          id={generatedId}
          className={cn(
            "mt-8 mb-2 scroll-m-20 text-base font-semibold tracking-[-0.01em] leading-snug text-white/95",
            className
          )}
          {...props}
        >
          {children}
        </h3>
      );
    },

    h4: ({ className, children, id, ...props }: any) => {
      const generatedId = id ?? slugify(extractText(children));
      return (
        <h4
          id={generatedId}
          className={cn(
            "mt-6 mb-1.5 scroll-m-20 text-sm font-semibold uppercase tracking-wider text-white/60",
            className
          )}
          {...props}
        >
          {children}
        </h4>
      );
    },

    p: ({ className, ...props }: any) => (
      <p
        className={cn(
          "text-[0.9375rem] leading-[1.75] text-white/65 [&:not(:first-child)]:mt-5",
          className
        )}
        {...props}
      />
    ),

    ul: ({ className, ...props }: any) => (
      <ul
        className={cn(
          "my-5 ml-5 list-disc space-y-1.5 text-[0.9375rem] leading-[1.75] text-white/65",
          "[&>li]:pl-1",
          className
        )}
        {...props}
      />
    ),

    ol: ({ className, ...props }: any) => (
      <ol
        className={cn(
          "my-5 ml-5 list-decimal space-y-1.5 text-[0.9375rem] leading-[1.75] text-white/65",
          "[&>li]:pl-1",
          className
        )}
        {...props}
      />
    ),

    li: ({ className, ...props }: any) => (
      <li className={cn("text-white/65", className)} {...props} />
    ),

    a: ({ className, ...props }: any) => (
      <a
        className={cn(
          "font-medium text-lime-400 underline decoration-lime-400/40 underline-offset-[3px]",
          "hover:text-lime-300 hover:decoration-lime-300/60 transition-colors",
          className
        )}
        {...props}
      />
    ),

    blockquote: ({ className, ...props }: any) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 border-lime-400/30 pl-5 text-[0.9375rem] leading-[1.75]",
          "italic text-white/50",
          className
        )}
        {...props}
      />
    ),

    hr: (props: any) => (
      <hr className="my-10 border-white/[0.08]" {...props} />
    ),

    // Tables
    table: ({ className, ...props }: any) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-white/[0.08]">
        <table
          className={cn("w-full text-sm text-left", className)}
          {...props}
        />
      </div>
    ),

    thead: ({ className, ...props }: any) => (
      <thead
        className={cn("border-b border-white/[0.08] bg-white/[0.02]", className)}
        {...props}
      />
    ),

    tbody: ({ className, ...props }: any) => (
      <tbody
        className={cn("[&>tr:not(:last-child)]:border-b [&>tr]:border-white/[0.05]", className)}
        {...props}
      />
    ),

    tr: ({ className, ...props }: any) => (
      <tr
        className={cn("hover:bg-white/[0.02] transition-colors", className)}
        {...props}
      />
    ),

    th: ({ className, ...props }: any) => (
      <th
        className={cn(
          "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/40",
          className
        )}
        {...props}
      />
    ),

    td: ({ className, ...props }: any) => (
      <td
        className={cn("px-4 py-3 text-[0.9rem] text-white/60", className)}
        {...props}
      />
    ),

    pre: Pre,

    code: ({ className, ...props }: any) => (
      <code
        className={cn(
          "relative rounded-md border border-white/[0.08] bg-white/[0.06]",
          "px-[0.35em] py-[0.15em] font-mono text-[0.85em] text-lime-300",
          className
        )}
        {...props}
      />
    ),

    ...components,
  };
}
