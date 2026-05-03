import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "dark" | "gradient";

const cardVariants: Record<CardVariant, string> = {
  default: "card",
  glass: "card bg-white/60 backdrop-blur-xl",
  dark: "border border-white/10 bg-ink-950 text-white shadow-soft",
  gradient:
    "border border-brand-200/80 bg-gradient-to-br from-brand-100 via-white to-warm-100 shadow-soft",
};

export function Card({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  return <div className={cn(cardVariants[variant], className)} {...props} />;
}

export function CardHeader({
  className,
  eyebrow,
  title,
  description,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className={cn("space-y-2 p-5 sm:p-6", className)} {...props}>
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-700">{eyebrow}</p>
      ) : null}
      {title ? <CardTitle>{title}</CardTitle> : null}
      {description ? <CardDescription>{description}</CardDescription> : null}
      {children}
    </div>
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold tracking-tight text-ink", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-6 text-ink-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
}
