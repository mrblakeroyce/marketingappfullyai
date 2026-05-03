import { NextResponse } from "next/server";

import { appConfig } from "@/lib/config";
import { getPlanById, getStripePriceId } from "@/lib/billing/plans";
import { getStripe } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { plan?: string; email?: string };
    const plan = getPlanById(body.plan ?? "growth");
    const priceId = getStripePriceId(plan.id);
    const stripe = getStripe();

    if (!priceId || !stripe) {
      return NextResponse.json(
        {
          mode: "demo",
          message:
            "Stripe price ID is not configured. Add the plan price IDs to enable checkout.",
          plan,
        },
        { status: 200 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: body.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appConfig.url}/billing?checkout=success&plan=${plan.id}`,
      cancel_url: `${appConfig.url}/billing?checkout=cancelled`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          plan: plan.id,
        },
      },
      metadata: {
        plan: plan.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to create checkout session",
      },
      { status: 500 },
    );
  }
}
