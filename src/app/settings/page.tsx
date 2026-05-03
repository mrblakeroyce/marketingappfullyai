import { Bell, Download, KeyRound, LifeBuoy, ShieldCheck, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/field";

const settingsSections = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Weekly plans, post approvals, failed posting alerts, and billing reminders.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description: "Manage sessions, team roles, and encrypted social token storage.",
  },
  {
    icon: Download,
    title: "Export",
    description: "Download your posts, captions, brand profile, usage, and connected account logs.",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Get onboarding help with Meta/TikTok approvals and content strategy.",
  },
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="grid gap-6">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft">
          <Badge className="border-white/10 bg-white/10 text-white">Settings</Badge>
          <h1 className="mt-5 text-3xl font-black tracking-tight">Keep the AI employee under control.</h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/65">
            Manage account details, notification preferences, security, data exports, and support.
          </p>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Account profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input label="Owner name" defaultValue="Alex Morgan" />
              <Input label="Email" defaultValue="owner@localspark.demo" />
              <Input label="Phone" defaultValue="(555) 101-8844" />
              <Select label="Default timezone" defaultValue="America/New_York">
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </Select>
              <Button>Save settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App controls</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {settingsSections.map((section) => (
                <div
                  key={section.title}
                  className="flex gap-3 rounded-3xl border border-slate-100 bg-white/80 p-4"
                >
                  <div className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white">
                    <section.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-black text-slate-950">{section.title}</p>
                    <p className="mt-1 text-sm font-medium leading-5 text-slate-500">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>API readiness</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm font-semibold text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="flex items-center gap-2">
                  <KeyRound className="size-4 text-emerald-600" /> OpenAI key
                </span>
                <Badge variant="success">Configured in env</Badge>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span>Meta app review</span>
                <Badge variant="warning">Required for live</Badge>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span>TikTok Content Posting API</span>
                <Badge variant="warning">Required for live</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-100 bg-rose-50/70">
            <CardHeader>
              <CardTitle>Danger zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-semibold leading-6 text-rose-700">
                Export data before deleting the account. This will remove brand profiles, generated content,
                schedules, and connected account tokens.
              </p>
              <Button variant="secondary" className="border-rose-200 text-rose-700">
                <Trash2 className="size-4" /> Delete account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
