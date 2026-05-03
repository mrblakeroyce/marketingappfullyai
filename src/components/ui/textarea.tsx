import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[132px] w-full resize-none rounded-[28px] border border-white/10 bg-white/[0.06] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/60 focus:bg-white/[0.09] focus:ring-4 focus:ring-cyan-300/10",
        className,
      )}
      {...props}
    />
  );
}
