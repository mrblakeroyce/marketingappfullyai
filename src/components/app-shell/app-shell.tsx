"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  Home,
  LayoutGrid,
  Palette,
  PlusCircle,
  Settings,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/create", label: "Create", icon: PlusCircle, primary: true },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/brand", label: "Brand", icon: Palette },
  { href: "/accounts", label: "Socials", icon: Share2 },
  { href: "/scheduled", label: "Scheduled", icon: LayoutGrid },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

const mobileItems = navItems.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-ink">
      <aside className="fixed left-5 top-5 z-40 hidden h-[calc(100vh-40px)] w-72 rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur-2xl lg:block">
        <Link href="/" className="mb-7 flex items-center gap-3 px-2 pt-2">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white shadow-glow">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight">LocalSpark</p>
            <p className="text-xs font-semibold text-ink/45">AI employee</p>
          </div>
        </Link>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-ink/55 transition-all duration-200 hover:bg-white hover:text-ink",
                  active && "bg-ink text-white shadow-soft hover:bg-ink hover:text-white",
                  item.primary && !active && "bg-brand-lime/60 text-ink",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] bg-ink p-4 text-white">
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-brand-lime" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
              Pro mode
            </span>
          </div>
          <p className="text-sm font-bold">Weekly auto content is ready when you upgrade.</p>
        </div>
      </aside>

      <main className="pb-28 lg:ml-80 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{children}</div>
      </main>

      <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-[1.75rem] border border-white/80 bg-white/85 p-2 shadow-soft backdrop-blur-2xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-[11px] font-black text-ink/45 transition",
                  active && "bg-ink text-white",
                  item.primary && !active && "bg-brand-lime text-ink",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
