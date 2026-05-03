import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("space-y-2", className)}>
      {label ? <p className="text-sm font-bold text-ink">{label}</p> : null}
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-950 transition-all duration-700 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
