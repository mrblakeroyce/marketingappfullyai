import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  labelClassName?: string;
}

export function Input({ className, label, hint, id, labelClassName, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label
      className={cn("grid gap-2 text-sm font-semibold text-slate-800", labelClassName)}
      htmlFor={inputId}
    >
      {label}
      <input
        id={inputId}
        className={cn(
          "h-13 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs font-medium text-slate-500">{hint}</span> : null}
    </label>
  );
}

export const Field = Input;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export function Textarea({ className, label, hint, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800" htmlFor={inputId}>
      {label}
      <textarea
        id={inputId}
        className={cn(
          "min-h-32 w-full resize-none rounded-3xl border border-slate-200 bg-white/80 p-4 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs font-medium text-slate-500">{hint}</span> : null}
    </label>
  );
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
}

export function Select({ className, label, hint, id, children, ...props }: SelectProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800" htmlFor={inputId}>
      {label}
      <select
        id={inputId}
        className={cn(
          "h-13 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 text-base text-slate-950 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <span className="text-xs font-medium text-slate-500">{hint}</span> : null}
    </label>
  );
}
