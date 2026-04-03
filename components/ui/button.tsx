"use client";

/**
 * Base button primitive used across the Binboi product experience.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          /* Primary CTA keeps the reference-style blue/orange edge energy but only around the button frame. */
          "border border-white/12 bg-[linear-gradient(180deg,rgba(17,20,27,0.98),rgba(10,12,16,0.97))] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(76,121,255,0.12),0_16px_34px_-24px_rgba(255,143,77,0.46)] hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(20,24,31,0.98),rgba(12,14,18,0.97))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(76,121,255,0.18),0_18px_36px_-24px_rgba(255,143,77,0.56)]",
        secondary:
          "border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,24,0.92),rgba(10,12,16,0.94))] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(18,21,28,0.92),rgba(12,14,18,0.94))]",
        ghost: "text-foreground/78 hover:bg-white/[0.055] hover:text-foreground",
        danger:
          "border border-red-500/30 bg-red-500/10 text-red-100 hover:bg-red-500/20",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
}
