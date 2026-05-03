import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "muted"
  | "glow"
  | "gold"
  | "soft"
  | "dark"
  | "ai"
  | "neutral"
  | "emerald";

const variants: Record<BadgeVariant, string> = {
  default: "border-slate-200 bg-white text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  muted: "border-white/10 bg-white/10 text-white/75",
  glow: "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-soft",
  gold: "border-gold-300/60 bg-gold-100 text-ink-900",
  soft: "border-brand-200 bg-brand-50 text-brand-800",
  dark: "border-white/10 bg-ink-950 text-white",
  ai: "border-brand-200 bg-brand-100 text-brand-800 shadow-sm",
  neutral: "border-ink-950/10 bg-white/80 text-ink-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function Badge({
  className,
  variant = "default",
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant; tone?: BadgeVariant }) {
  const resolvedVariant = tone ?? variant;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variants[resolvedVariant],
        className,
      )}
      {...props}
    />
  );
}
