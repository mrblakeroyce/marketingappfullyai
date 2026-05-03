import { plans, type PlanId } from "@/lib/config";

export function getPlan(planId: string | null | undefined) {
  return plans.find((plan) => plan.id === planId);
}

export function getStripePriceId(planId: PlanId) {
  const envKey = `NEXT_PUBLIC_STRIPE_${planId.toUpperCase()}_PRICE_ID`;
  return process.env[envKey];
}

export function getMonthlyPostLimit(planId: PlanId | "demo" | null | undefined) {
  if (!planId || planId === "demo") {
    return 10;
  }

  return getPlan(planId)?.monthlyPosts ?? 10;
}

