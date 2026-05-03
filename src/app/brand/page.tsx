import {
  ArrowRight,
  Check,
  ImageIcon,
  Palette,
  UploadCloud,
  Wand2,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/field";
import { brandBioIdeas, industryModes, sampleBusinessProfile } from "@/lib/data";

export default function BrandPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-5">
          <div>
            <Badge variant="gold">Brand profile</Badge>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Teach the AI your business once.
            </h1>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
              Logo, services, cities, tone, colors, and contact details stay consistent
              across every image, caption, bio, and scheduled post.
            </p>
          </div>

          <Card>
            <CardHeader
              eyebrow="Business details"
              title="Core information"
              description="Everything the AI needs to write like a real local marketer."
            />
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Business name" defaultValue={sampleBusinessProfile.businessName} />
                <Select label="Industry brain" defaultValue={sampleBusinessProfile.industry}>
                  {industryModes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </Select>
              </div>
              <Textarea
                label="Services"
                defaultValue={sampleBusinessProfile.services.join(", ")}
                hint="Separate services with commas."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Cities served" defaultValue={sampleBusinessProfile.cities.join(", ")} />
                <Input label="Website" defaultValue={sampleBusinessProfile.website} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Phone" defaultValue={sampleBusinessProfile.phone} />
                <Input label="Email" defaultValue={sampleBusinessProfile.email} />
              </div>
              <Textarea
                label="Brand voice"
                defaultValue={sampleBusinessProfile.brandVoice}
                hint="Example: friendly, premium, direct, neighborhood expert."
              />
              <Button className="w-full sm:w-fit">Save brand profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              eyebrow="Profile optimization"
              title="Make every account look professional"
              description="Generate platform-specific bios and profile photo recommendations."
            />
            <CardContent className="grid gap-4">
              {brandBioIdeas.map((bio) => (
                <div
                  key={bio.platform}
                  className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-slate-950">{bio.platform}</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                        {bio.bio}
                      </p>
                    </div>
                    <Button variant="soft" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="dark" className="w-full">
                <Wand2 className="h-4 w-4" />
                Regenerate bios
              </Button>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-5">
          <Card variant="dark">
            <CardHeader
              eyebrow="Logo optimizer"
              title="One logo, every platform"
              description="Upload a logo and LocalSpark prepares profile crops, transparent versions, and square thumbnails."
            />
            <CardContent>
              <div className="rounded-[2rem] border border-dashed border-white/25 bg-white/10 p-8 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-slate-950 shadow-glow">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <p className="mt-5 text-lg font-black text-white">Drop logo here</p>
                <p className="mt-2 text-sm font-medium text-slate-300">
                  PNG, JPG, or SVG. We’ll create Instagram, Facebook, TikTok, and favicon
                  versions.
                </p>
                <Button className="mt-5 w-full" variant="secondary">
                  Upload logo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              eyebrow="Colors"
              title="Brand palette"
              description="Used automatically in generated post graphics."
            />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {sampleBusinessProfile.colors.map((color) => (
                  <div key={color} className="rounded-3xl border border-slate-200 bg-white p-3">
                    <div
                      className="h-24 rounded-2xl"
                      style={{ backgroundColor: color }}
                    />
                    <p className="mt-2 text-center text-xs font-black text-slate-500">{color}</p>
                  </div>
                ))}
              </div>
              <Button variant="soft" className="w-full">
                <Palette className="h-4 w-4" />
                Update palette
              </Button>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardHeader
              eyebrow="Brand consistency system"
              title="AI rules"
              description="Every generation follows these guardrails."
            />
            <CardContent className="space-y-3">
              {[
                "Always mention service area when helpful",
                "Use direct calls to action",
                "Keep captions friendly, never corporate",
                "Match graphics to brand colors",
              ].map((rule) => (
                <div key={rule} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-bold text-slate-700">{rule}</p>
                </div>
              ))}
              <Button variant="dark" className="w-full">
                Edit AI rules
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-amber-100 text-amber-700">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-black text-slate-950">Next: visual style packs</p>
                <p className="text-sm font-medium text-slate-500">
                  Seasonal, premium, bold sale, hiring, and community templates.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
