import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scheduledPosts } from "@/lib/data";
import { cn } from "@/lib/utils";

const days = Array.from({ length: 30 }, (_, index) => index + 1);
const postDays = new Set([3, 6, 10, 14, 18, 22, 27]);

export default function CalendarPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge>May content calendar</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Your social feed, planned.
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                Drag your marketing week into shape with simple scheduled cards
                made for busy local owners.
              </p>
            </div>
            <Button>Schedule new post</Button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card>
            <CardHeader>
              <CardTitle>Month view</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div key={`${day}-${index}`}>{day}</div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <div
                    key={day}
                    className={cn(
                      "min-h-24 rounded-3xl border border-slate-100 bg-slate-50 p-3 text-left text-sm font-bold text-slate-800",
                      postDays.has(day) && "border-emerald-200 bg-emerald-50",
                      day === 14 && "ring-4 ring-slate-950/10",
                    )}
                  >
                    <span>{day}</span>
                    {postDays.has(day) ? (
                      <div className="mt-3 rounded-2xl bg-white px-2 py-2 text-[0.68rem] font-bold leading-tight text-emerald-700 shadow-sm">
                        AI post ready
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.title}
                    className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-black text-slate-950">{post.title}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {post.platforms.join(" • ")}
                    </p>
                    <p className="mt-3 text-xs font-bold text-emerald-700">
                      {post.time}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-950 text-white">
              <CardContent className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                  Weekly auto mode
                </p>
                <h3 className="mt-2 text-xl font-black">Let AI fill gaps.</h3>
                <p className="mt-2 text-sm font-medium text-white/65">
                  Pro plans can approve a weekly queue generated from your brand
                  calendar, seasonal offers, and local events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
