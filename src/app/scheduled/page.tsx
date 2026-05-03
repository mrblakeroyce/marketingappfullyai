import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scheduledPosts } from "@/lib/data";

const statusStyles = {
  scheduled: "success",
  draft: "warning",
  posted: "default",
} as const;

export default function ScheduledPage() {
  return (
    <AppShell>
      <div className="mx-auto grid w-full max-w-4xl gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Queue</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Scheduled posts
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Review every upcoming post, reschedule in seconds, or post early
              when business gets busy.
            </p>
          </div>
          <Button>Schedule a new post</Button>
        </div>

        <div className="grid gap-4">
          {scheduledPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="flex gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-slate-950 text-2xl">
                    {post.image}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-black text-slate-950">{post.title}</h2>
                      <Badge variant={statusStyles[post.status]}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {post.platforms.join(" · ")}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{post.caption}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <p className="text-sm font-black text-slate-950">{post.date}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                    {post.time}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <Button size="sm">Post now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-dashed border-emerald-200 bg-emerald-50/70">
          <CardHeader>
            <CardTitle>Weekly auto mode</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="text-sm leading-6 text-emerald-950/70">
              Pro plan can draft a full week of posts automatically every Sunday.
              You approve the queue before anything goes live.
            </p>
            <Button variant="dark">Turn on auto mode</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
