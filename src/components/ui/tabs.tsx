"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  defaultValue,
}: {
  tabs: Array<{ value: string; label: string; content: React.ReactNode }>;
  defaultValue?: string;
}) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value);

  return (
    <div className="space-y-4">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto rounded-full border border-white/70 bg-white/55 p-1 shadow-soft backdrop-blur">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              "min-h-10 rounded-full px-5 text-sm font-semibold transition",
              active === tab.value
                ? "bg-ink text-white shadow-soft"
                : "text-ink/60 hover:bg-white hover:text-ink",
            )}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.find((tab) => tab.value === active)?.content}
    </div>
  );
}
