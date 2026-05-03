import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const providers = [
  {
    name: "Instagram",
    state: "Ready to connect",
    detail: "Requires Instagram professional account connected to a Facebook Page.",
    accent: "from-fuchsia-500 to-orange-400",
  },
  {
    name: "Facebook",
    state: "Ready to connect",
    detail: "Post to business pages through Meta Graph API after permissions review.",
    accent: "from-blue-600 to-sky-400",
  },
  {
    name: "TikTok",
    state: "Sandbox mode",
    detail: "Content Posting API needs TikTok developer approval for production.",
    accent: "from-slate-950 to-cyan-500",
  },
];

export default function AccountsPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <Badge>Social accounts</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Connect once. Let the AI employee publish everywhere.
          </h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.name} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${provider.accent}`} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{provider.name}</CardTitle>
                  <Badge variant="soft">{provider.state}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {provider.detail}
                </p>
                <Button className="w-full">Connect {provider.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Production approval checklist</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm font-semibold text-slate-600 md:grid-cols-2">
            {[
              "Meta developer app with OAuth redirect URLs",
              "Instagram business/professional account",
              "Facebook Page publishing permissions",
              "TikTok Content Posting API approval",
              "Encrypted token storage enabled",
              "Mock mode fallback for demos and local testing",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
