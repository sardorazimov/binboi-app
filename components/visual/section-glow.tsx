/**
 * Decorative section lighting layer kept intentionally subtle and localized.
 */
import { cn } from "@/lib/utils";

type SectionGlowProps = {
  tone?: "blue" | "dual";
  className?: string;
};

const toneClasses = {
  blue:
    "bg-[radial-gradient(circle_at_14%_-2%,rgba(88,154,255,0.14),transparent_26%)]",
  dual:
    "bg-[radial-gradient(circle_at_14%_-2%,rgba(88,154,255,0.15),transparent_26%),radial-gradient(circle_at_100%_0%,rgba(255,143,77,0.12),transparent_18%)]",
} as const;

export function SectionGlow({
  tone = "blue",
  className,
}: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", toneClasses[tone], className)}
    />
  );
}

