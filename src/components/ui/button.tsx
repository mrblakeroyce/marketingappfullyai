import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0",
  secondary:
    "border border-ink/10 bg-white/80 text-ink shadow-sm hover:-translate-y-0.5 hover:bg-white",
  ghost: "text-ink hover:bg-ink/5",
  danger: "bg-red-500 text-white shadow-sm hover:bg-red-600",
  dark: "bg-white text-ink shadow-soft hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-300/40 disabled:pointer-events-none disabled:opacity-50";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} type={type} {...props} />;
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} href={href} {...props}>
      {children}
    </Link>
  );
}
