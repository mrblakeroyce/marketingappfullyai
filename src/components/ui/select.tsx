import { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
};

export function Select({ className, label, hint, id, children, ...props }: SelectProps) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      {label ? <span className="text-sm font-semibold text-slate-800">{label}</span> : null}
      <select
        id={id}
        className={cn(
          "h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}
