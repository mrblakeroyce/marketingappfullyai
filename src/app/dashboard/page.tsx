import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockPosts, plans, promptExamples } from "@/lib/data";
import { ArrowUpRight, CalendarClock, CheckCircle2, Clock, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <section className="overflow-hidden rounded-[2rem] bg-charcoal p-5 text-white shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge className="border-white/15 bg-white/10 text-white">Auto shop mode</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">What should we post today?</h1>
              <p className="mt-2 max-w-xl text-sm text-white/70">
                Type one simple idea and your AI employee turns it into a branded post, caption, hashtags,
                and platform variants.
              </p>
            </div>
            <div className="hidden rounded-3xl bg-white/10 p-4 sm:block">
              <Sparkles className="size-8 text-sun" />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-2xl bg-white/10 p-4 text-white/80">Try: “Free oil change Saturday”</div>
            <Button asChild size="lg" className="bg-sun text-charcoal hover:bg-sun/90">
              <Link href="/create">Create Post</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div>
                <p className="text-sm font-semibold text-muted">This week</p>
                <h2 className="text-xl font-bold">Your AI marketing plan</h2>
              </div>
              <Badge>4 posts ready</Badge>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {promptExamples.slice(0, 4).map((example) => (
                <div key={example} className="rounded-3xl border border-border bg-cream/70 p-4">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Zap className="size-5 text-gold" />
                  </div>
                  <p className="font-semibold">{example}</p>
                  <p className="mt-1 text-sm text-muted">Ready for Instagram, Facebook, and TikTok.</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <p className="text-sm font-semibold text-muted">Growth plan</p>
                <h2 className="text-xl font-bold">Usage</h2>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={42} label="21 of 50 posts used" />
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Scheduling enabled
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Brand consistency active
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gold" />
                  Auto mode available on Pro
                </div>
              </div>
              <Button asChild variant="secondary" className="mt-5 w-full">
                <Link href="/billing">Manage plan</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <Card>
            <CardHeader>
              <div>
                <p className="text-sm font-semibold text-muted">Recent posts</p>
                <h2 className="text-xl font-bold">Post history</h2>
              </div>
              <Link href="/scheduled" className="flex items-center gap-1 text-sm font-semibold text-charcoal">
                View all <ArrowUpRight className="size-4" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-3 rounded-3xl border border-border p-3">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-cream text-xl">
                    {post.image}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{post.title}</p>
                    <p className="text-sm text-muted">{post.date}</p>
                  </div>
                  <Badge variant={post.status === "Scheduled" ? "warning" : "success"}>{post.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-cream/70">
            <CardHeader>
              <div>
                <p className="text-sm font-semibold text-muted">Next up</p>
                <h2 className="text-xl font-bold">Scheduled queue</h2>
              </div>
              <CalendarClock className="size-5 text-gold" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-muted">Today · 5:00 PM</p>
                <p className="mt-1 font-semibold">Happy hour reminder for Instagram + Facebook</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-muted">Tomorrow · 9:00 AM</p>
                <p className="mt-1 font-semibold">Fleet account CTA for local contractors</p>
              </div>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/calendar">Open calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardContent className="pt-6">
                <p className="text-sm font-semibold text-muted">{plan.name}</p>
                <p className="mt-2 text-2xl font-bold">{plan.price}</p>
                <p className="mt-2 text-sm text-muted">{plan.posts}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
