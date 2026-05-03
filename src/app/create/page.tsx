"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Clock,
  ImageIcon,
  Instagram,
  Loader2,
  Megaphone,
  RefreshCw,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { demoBusinessProfile, examplePrompts, industryModes, platformOptions } from "@/lib/data";

type GeneratedPost = {
  caption: string;
  hashtags: string[];
  imagePrompt: string;
  suggestedTime: string;
  platformVariants: Record<string, string>;
  creativeDirection: string;
};

export default function CreatePostPage() {
  const [prompt, setPrompt] = useState("5:00 happy hour");
  const [industry, setIndustry] = useState("restaurant");
  const [platforms, setPlatforms] = useState(["instagram", "facebook"]);
  const [result, setResult] = useState<GeneratedPost | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedMode = useMemo(
    () => industryModes.find((mode) => mode.id === industry) ?? industryModes[0],
    [industry],
  );

  function togglePlatform(platform: string) {
    setPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  }

  function generatePost() {
    startTransition(async () => {
      const response = await fetch("/api/ai/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          industryMode: industry,
          platforms,
          businessProfile: demoBusinessProfile,
        }),
      });
      const payload = (await response.json()) as { post: GeneratedPost };
      setResult(payload.post);
    });
  }

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="overflow-hidden">
            <CardHeader>
              <Badge tone="ai" className="w-fit">
                <Wand2 className="h-3.5 w-3.5" />
                Create Post
              </Badge>
              <CardTitle className="text-3xl sm:text-4xl">
                Tell your AI employee what to post.
              </CardTitle>
              <p className="text-base leading-7 text-muted">
                Plain English is perfect. Type “free oil change Saturday,” “now hiring,”
                or “accepting fleet accounts” and approve the finished post.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <Textarea
                label="What do you want to promote?"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={5}
                placeholder="Example: 5:00 happy hour"
              />
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="rounded-full border border-border bg-white/80 px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300"
                  >
                    {example}
                  </button>
                ))}
              </div>
              <Select
                label="Industry brain"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
              >
                {industryModes.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.name}
                  </option>
                ))}
              </Select>
              <div className="rounded-[28px] border border-border bg-white/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <Sparkles className="h-4 w-4 text-brand-700" />
                  {selectedMode.name} will focus on
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMode.brain.map((item) => (
                    <Badge key={item} tone="neutral">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-bold">Platforms</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {platformOptions.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`rounded-[24px] border p-4 text-left transition ${
                        platforms.includes(platform.id)
                          ? "border-brand-400 bg-brand-100 shadow-soft"
                          : "border-border bg-white/75"
                      }`}
                    >
                      <platform.icon className="mb-3 h-5 w-5" />
                      <p className="text-sm font-extrabold">{platform.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <Button size="xl" className="w-full" onClick={generatePost} disabled={!prompt || isPending}>
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                {isPending ? "Creating everything..." : "Generate image, caption & hashtags"}
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-ink-950 text-white">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-500/25 to-transparent" />
            <CardHeader className="relative">
              <Badge tone="dark" className="w-fit border-white/15 bg-white/10 text-white">
                <ImageIcon className="h-3.5 w-3.5" />
                AI Output
              </Badge>
              <CardTitle className="text-white">Ready-to-post creative</CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-brand-200 via-warm-100 to-accent-200 p-5 text-ink-950 shadow-glow">
                <div className="rounded-[28px] bg-white/72 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-ink-950 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white">
                      {demoBusinessProfile.businessName}
                    </div>
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div className="py-12 text-center">
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-800">
                      {result ? "Fresh Campaign" : "Preview"}
                    </p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight">
                      {result ? prompt : "5:00 Happy Hour"}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xs text-sm font-semibold text-ink-600">
                      {result?.creativeDirection ??
                        "Warm lighting, bold offer, brand colors, clear call-to-action."}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-ink-950 p-4 text-center text-white">
                    <p className="font-black">Tap to approve • AI handles the rest</p>
                  </div>
                </div>
              </div>

              {result ? (
                <div className="space-y-4">
                  <div className="rounded-[28px] border border-white/10 bg-white/8 p-4">
                    <p className="mb-2 text-sm font-black text-white/60">Caption</p>
                    <textarea
                      className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none"
                      defaultValue={result.caption}
                    />
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/8 p-4">
                    <p className="mb-3 text-sm font-black text-white/60">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Button variant="secondary" className="bg-white text-ink-950 hover:bg-white/90">
                      <Send className="h-4 w-4" />
                      Post Now
                    </Button>
                    <Button variant="ghost" className="border-white/15 text-white hover:bg-white/10">
                      <CalendarClock className="h-4 w-4" />
                      Schedule
                    </Button>
                    <Button variant="ghost" className="border-white/15 text-white hover:bg-white/10" onClick={generatePost}>
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {[
                    ["AI writes the caption", Megaphone],
                    ["AI designs the post graphic", ImageIcon],
                    ["AI chooses the best posting time", Clock],
                    ["You approve in one tap", Check],
                  ].map(([label, Icon]) => (
                    <div key={label as string} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 p-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-brand-200" />
                        <span className="font-bold">{label as string}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/50" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
