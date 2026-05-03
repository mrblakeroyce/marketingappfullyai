import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }

  return new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
}

export async function createBillingPortalUrl(customerId: string) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/billing`,
  });

  return session.url;
}
