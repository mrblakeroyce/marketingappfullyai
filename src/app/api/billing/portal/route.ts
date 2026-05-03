import { NextResponse } from "next/server";

import { appConfig, serverEnv } from "@/lib/config";
import { createBillingPortalUrl } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: "customerId is required" }, { status: 400 });
    }

    if (!serverEnv.stripeSecretKey) {
      return NextResponse.json({
        mode: "demo",
        url: `${appConfig.url}/billing?demo=portal`,
        message: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to enable the customer portal.",
      });
    }

    const url = await createBillingPortalUrl(customerId);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to open billing portal" },
      { status: 500 },
    );
  }
}
