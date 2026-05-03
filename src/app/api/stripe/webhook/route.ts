import { NextResponse } from "next/server";

import { serverEnv } from "@/lib/config";
import { getStripe } from "@/lib/billing/stripe";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = serverEnv.stripeWebhookSecret;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    const supabase = getServiceSupabase();

    if (!supabase) {
      return NextResponse.json({ received: true, persisted: false });
    }

    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object;
      const userId = subscription.metadata.user_id;
      const plan = subscription.metadata.plan ?? "starter";

      if (userId) {
        await (supabase.from("subscriptions" as never).upsert as never)(
          {
            user_id: userId,
            stripe_customer_id:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer?.id,
            stripe_subscription_id: subscription.id,
            plan,
            status: subscription.status,
            current_period_end: null,
          },
          { onConflict: "stripe_subscription_id" },
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to verify Stripe webhook.",
      },
      { status: 400 },
    );
  }
}
