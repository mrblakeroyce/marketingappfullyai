import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/field";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfce7,transparent_35%),#f8fafc] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <Card className="w-full border-white/80 bg-white/85 shadow-2xl shadow-emerald-950/10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-3xl bg-slate-950 text-emerald-300">
              <Sparkles className="size-6" />
            </div>
            <CardTitle className="text-3xl">Welcome back</CardTitle>
            <p className="text-sm text-slate-500">
              Sign in to keep your AI marketing employee running.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Email" type="email" placeholder="owner@business.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button className="w-full" asChild>
              <Link href="/dashboard">Continue to app</Link>
            </Button>
            <Button className="w-full" variant="secondary" asChild>
              <Link href="/onboarding">Create new account</Link>
            </Button>
            <p className="text-center text-xs text-slate-500">
              Demo-ready UI now. Supabase auth wiring is included in the backend foundation.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
