/**
 * Small orb accent used for the product mark and lightweight visual punctuation.
 */
import { cn } from "@/lib/utils";

type AccentOrbProps = {
  className?: string;
  size?: "sm" | "md";
  tone?: "blue" | "dual";
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
} as const;

const toneClasses = {
  blue:
    "bg-[radial-gradient(circle_at_30%_30%,rgba(88,154,255,0.8),rgba(22,28,40,0.22)_52%,rgba(7,8,10,0.96)_100%)]",
  dual:
    "bg-[radial-gradient(circle_at_30%_30%,rgba(88,154,255,0.8),rgba(22,28,40,0.22)_45%,rgba(255,143,77,0.58)_100%)]",
} as const;

export function AccentOrb({
  className,
  size = "md",
  tone = "dual",
}: AccentOrbProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
    />
  );
}

