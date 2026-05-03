import { ArrowRight, Check, Palette, PlugZap, Sparkles, Store } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { brandVoiceOptions, industryModes, platformOptions } from "@/lib/data";

const steps = [
  { label: "Business basics", icon: Store },
  { label: "Brand style", icon: Palette },
  { label: "AI employee", icon: Sparkles },
  { label: "Connect socials", icon: PlugZap },
];

export default function OnboardingPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Badge variant="gold" className="w-fit">
            4 minute setup
          </Badge>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                Teach your AI employee your business.
              </h1>
              <p className="mt-3 max-w-2xl text-base text-ink-500 md:text-lg">
                Add the basics once. LocalSpark keeps every post, bio, schedule, and template
                consistent with your brand.
              </p>
            </div>
            <Button asChild size="lg" className="mt-2 md:mt-0">
              <Link href="/dashboard">
                Save profile <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card variant="glass" className="overflow-hidden">
          <CardContent className="grid gap-3 p-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-[1.4rem] bg-white/65 p-4 ring-1 ring-ink-900/5"
              >
                <div className="grid size-11 place-items-center rounded-2xl bg-ink-950 text-cream-50">
                  {index === 0 ? <Check className="size-5 text-mint-300" /> : <step.icon className="size-5" />}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink-400">
                    Step {index + 1}
                  </p>
                  <p className="font-semibold text-ink-900">{step.label}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader
                eyebrow="Business basics"
                title="What should your AI know?"
                description="This powers local language, calls-to-action, captions, and visuals."
              />
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Field label="Business name" placeholder="Example: Royce Auto Care" />
                <Select label="Industry mode" defaultValue="Auto shop mode">
                  {industryModes.map((mode) => (
                    <option key={mode.name}>{mode.name}</option>
                  ))}
                </Select>
                <Field label="Cities served" placeholder="Phoenix, Scottsdale, Tempe" />
                <Field label="Phone" placeholder="(555) 123-4567" />
                <Field label="Email" placeholder="hello@yourbusiness.com" />
                <Field label="Website" placeholder="https://yourbusiness.com" />
                <div className="md:col-span-2">
                  <Textarea
                    label="Services / menu / specialties"
                    placeholder="Oil changes, brake repair, fleet maintenance, AC diagnostics..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                eyebrow="Brand style"
                title="Make every post look like you."
                description="Choose colors and upload logo assets later through Supabase storage."
              />
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Field label="Primary color" placeholder="#111827" />
                <Field label="Accent color" placeholder="#f2c14e" />
                <Field label="Logo URL" placeholder="Paste logo URL or upload after Supabase setup" />
                <Select label="Brand voice" defaultValue="Friendly expert">
                  {brandVoiceOptions.map((voice) => (
                    <option key={voice}>{voice}</option>
                  ))}
                </Select>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-5">
            <Card variant="dark">
              <CardHeader
                eyebrow="AI employee profile"
                title="Local business expert, not generic influencer."
                description="Your assistant remembers services, locations, offers, colors, and the way your customers talk."
              />
              <CardContent className="space-y-4">
                {industryModes.map((mode) => (
                  <div key={mode.name} className="rounded-[1.4rem] bg-white/8 p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{mode.name}</p>
                        <p className="text-sm text-white/62">{mode.description}</p>
                      </div>
                      <Badge variant="dark">Brain</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                eyebrow="Socials"
                title="Connect now or skip."
                description="Demo mode works without credentials. Official posting unlocks after API setup and platform approvals."
              />
              <CardContent className="space-y-3">
                {platformOptions.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between rounded-[1.2rem] bg-cream-100 p-4"
                  >
                    <div>
                      <p className="font-semibold text-ink-900">{platform.name}</p>
                      <p className="text-sm text-ink-500">{platform.description}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
