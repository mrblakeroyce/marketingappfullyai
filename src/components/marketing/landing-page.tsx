"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Check, Sparkles, Wand2, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { industryModes, pricingPlans, promptExamples } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-10">
        <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-black tracking-tight">
            <span className="grid size-9 place-items-center rounded-2xl bg-ink text-cream shadow-soft">
              <Sparkles className="size-4 text-gold" />
            </span>
            LocalSpark AI
          </Link>
          <div className="hidden items-center gap-6 text-sm font-semibold text-ink/60 md:flex">
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#features">Features</a>
          </div>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/onboarding">Start free demo</Link>
          </Button>
        </nav>

        <div className="grid items-center gap-8 pt-4 lg:grid-cols-[1.02fr_0.98fr] lg:pt-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge className="rounded-full border-gold/30 bg-gold/15 px-4 py-2 text-ink">
                Built for restaurants, auto shops, barbers, salons, gyms, and local pros
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="max-w-4xl font-display text-5xl font-black leading-[0.92] tracking-[-0.06em] text-ink sm:text-7xl lg:text-8xl"
            >
              Your AI social media employee.
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-lg font-medium leading-8 text-ink/65 sm:text-xl">
              Type “5:00 happy hour” or “Free oil change Saturday” and instantly get a branded post image,
              caption, hashtags, bios, and a ready-to-schedule campaign.
            </motion.p>
            <motion.div variants={fadeUp} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="xl" className="rounded-3xl">
                <Link href="/create">
                  Create a post <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="soft" className="rounded-3xl">
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} className="grid w-full gap-3 sm:grid-cols-3">
              {["60-second setup", "Mock posting demo", "Official API ready"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/55 px-4 py-3 text-sm font-bold text-ink/70">
                  <Check className="size-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-gold/40 blur-3xl" />
            <div className="absolute -right-10 bottom-16 h-56 w-56 rounded-full bg-rose-300/35 blur-3xl" />
            <div className="glass-panel relative mx-auto max-w-md rounded-[2.2rem] p-4 shadow-premium sm:p-5">
              <div className="rounded-[1.8rem] bg-ink p-4 text-cream shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream/45">AI Generator</p>
                    <h2 className="font-display text-2xl font-black">Create Post</h2>
                  </div>
                  <div className="grid size-12 place-items-center rounded-2xl bg-cream/10">
                    <Wand2 className="size-5 text-gold" />
                  </div>
                </div>
                <div className="rounded-3xl bg-cream p-4 text-ink">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/40">User typed</p>
                  <p className="mt-2 font-display text-3xl font-black tracking-tight">5:00 happy hour</p>
                  <div className="mt-4 h-56 rounded-[1.5rem] bg-[radial-gradient(circle_at_20%_20%,#ffd166,transparent_32%),linear-gradient(135deg,#22223b,#8a5cf6_55%,#ff6b6b)] p-4 text-white">
                    <div className="flex h-full flex-col justify-between">
                      <Badge className="w-fit bg-white/20 text-white">Today only</Badge>
                      <div>
                        <p className="text-5xl font-black leading-none">HAPPY HOUR</p>
                        <p className="mt-2 text-lg font-bold">5–7 PM • $6 bites • Local draft specials</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-ink/65">
                    Kick off tonight with our 5 PM happy hour — cold drinks, fresh plates, and the best seat
                    in town waiting for you.
                  </p>
                  <p className="mt-3 text-sm font-black text-violet-700">#HappyHour #LocalEats #TonightOnly</p>
                  <Button className="mt-4 w-full rounded-2xl">Approve & schedule</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how" className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3">
        {[
          ["1", "Create your brand", "Add your name, logo, colors, city, services, and voice once."],
          ["2", "Type one sentence", "Tell the AI what you want in normal words — no marketing skill needed."],
          ["3", "Approve or schedule", "Edit, regenerate, post now, or schedule across connected accounts."],
        ].map(([step, title, copy]) => (
          <Card key={step} className="rounded-[2rem]">
            <CardHeader>
              <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-ink font-display text-xl font-black text-gold">
                {step}
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm font-medium leading-6 text-ink/60">{copy}</CardContent>
          </Card>
        ))}
      </section>

      <section id="features" className="mx-auto mt-16 max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Badge className="rounded-full bg-violet-100 text-violet-800">Industry brains</Badge>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink">Made for local business reality.</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-ink/60">
            No bloated enterprise dashboard. Just practical content systems for shops that need customers this week.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {industryModes.map((mode) => (
            <Card key={mode.id} className="rounded-[2rem]">
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl">{mode.emoji}</div>
                <h3 className="font-display text-xl font-black">{mode.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink/60">{mode.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="rounded-[2rem] bg-ink text-cream">
          <CardContent className="flex h-full flex-col justify-between gap-10 p-8">
            <div>
              <Badge className="bg-cream/10 text-cream">Prompt examples</Badge>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight">Tiny prompts. Big campaigns.</h2>
            </div>
            <div className="grid gap-3">
              {promptExamples.slice(0, 6).map((prompt) => (
                <div key={prompt} className="rounded-2xl border border-cream/10 bg-cream/5 px-4 py-3 font-bold">
                  “{prompt}”
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            [Zap, "Auto captions + hashtags", "Professional copy that sounds like your business, not a robot."],
            [CalendarClock, "Scheduling + autoposting", "Post now or schedule through official provider adapters."],
            [Sparkles, "Logo and bio optimization", "Resize profile images and improve bios for every platform."],
            [Wand2, "Weekly auto mode", "Pro plan content queue built around your business calendar."],
          ] as Array<[LucideIcon, string, string]>).map(([Icon, title, copy]) => (
            <Card key={String(title)} className="rounded-[2rem]">
              <CardContent className="p-6">
                <Icon className="mb-5 size-7 text-violet-700" />
                <h3 className="font-display text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink/60">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto mt-16 max-w-7xl pb-16">
        <div className="mb-6 text-center">
          <Badge className="rounded-full bg-gold/20 text-ink">Simple pricing</Badge>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink">No fake unlimited plans.</h2>
          <p className="mt-2 text-sm font-semibold text-ink/60">Fair-use limits keep AI costs predictable and quality high.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.highlighted ? "rounded-[2rem] border-ink bg-ink text-cream" : "rounded-[2rem]"}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="font-display text-4xl font-black">
                  ${plan.price}
                  <span className="text-base font-bold opacity-50">/mo</span>
                </div>
                <p className="text-sm font-semibold opacity-65">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-2 text-sm font-bold">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button asChild className="mt-6 w-full rounded-2xl" variant={plan.highlighted ? "secondary" : "primary"}>
                  <Link href="/billing">Choose {plan.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
