import { NextResponse } from "next/server";

import { env } from "@/lib/config";
import { createBillingPortalUrl } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: "customerId is required" }, { status: 400 });
    }

    if (!env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        mode: "demo",
        url: `${env.NEXT_PUBLIC_APP_URL}/billing?demo=portal`,
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
