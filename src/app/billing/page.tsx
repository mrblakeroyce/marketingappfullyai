import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans } from "@/lib/data";

export default function BillingPage() {
  return (
    <AppShell>
      <section className="grid gap-6">
        <div>
          <Badge tone="emerald">Billing / Plans</Badge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            Plans with real limits, not fake unlimited.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Pick the amount of AI work your social media employee should handle.
            Every plan includes captions, images, templates, brand memory, and
            account management.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.featured
                  ? "border-emerald-300 bg-emerald-50/70 shadow-2xl shadow-emerald-200/50"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                      {plan.name}
                    </p>
                    <h2 className="mt-2 text-4xl font-black text-slate-950">
                      ${plan.price}
                      <span className="text-base font-bold text-slate-500">
                        /mo
                      </span>
                    </h2>
                  </div>
                  {plan.featured ? <Badge>Best fit</Badge> : null}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm font-semibold text-slate-700">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-2xl bg-white/70 px-4 py-3"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <form action="/api/billing/checkout" method="post">
                  <input type="hidden" name="plan" value={plan.name.toLowerCase()} />
                  <Button className="mt-6 w-full" type="submit">
                    Start {plan.name}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-950 text-white">
          <CardContent className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-lg font-black">Already subscribed?</p>
              <p className="mt-1 text-sm text-white/65">
                Manage invoices, payment methods, cancellations, and plan
                upgrades through Stripe customer portal.
              </p>
            </div>
            <form action="/api/billing/portal" method="post">
              <Button variant="secondary" type="submit">
                Open customer portal
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
