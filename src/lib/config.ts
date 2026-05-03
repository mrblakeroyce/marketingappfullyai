export const appConfig = {
  name: "LocalSpark AI",
  description:
    "An AI social media employee that creates and schedules branded local business content in seconds.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    description: "For owners who want consistent, professional posts.",
    monthlyPosts: 40,
    features: [
      "40 AI posts per month",
      "Caption, hashtag, and image ideas",
      "Brand profile",
      "Manual approval before posting",
      "Mock/demo social posting",
    ],
    stripePriceEnv: "STRIPE_STARTER_PRICE_ID",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$99",
    description: "For busy teams ready to plan ahead.",
    monthlyPosts: 120,
    features: [
      "120 AI posts per month",
      "Scheduling calendar",
      "Platform-specific versions",
      "Saved templates",
      "Bio optimization",
    ],
    stripePriceEnv: "STRIPE_GROWTH_PRICE_ID",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    description: "For businesses that want the AI to run the week.",
    monthlyPosts: 250,
    features: [
      "250 AI posts per month with fair-use limits",
      "Weekly auto content mode",
      "Higher image generation limits",
      "Priority brand strategy",
      "Multi-location support ready",
    ],
    stripePriceEnv: "STRIPE_PRO_PRICE_ID",
  },
] as const;

export const industryModes = [
  {
    id: "auto-shop",
    label: "Auto shop",
    description: "Repairs, oil changes, tires, fleet accounts, inspections.",
    examples: ["Free oil change Saturday", "Accepting fleet accounts", "Brake special"],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    description: "Daily specials, catering, happy hour, seasonal menus.",
    examples: ["5:00 happy hour", "Taco Tuesday", "Weekend brunch"],
  },
  {
    id: "barbershop",
    label: "Barbershop",
    description: "Cuts, fades, appointments, walk-ins, grooming products.",
    examples: ["Walk-ins welcome", "Back to school cuts", "Beard trim deal"],
  },
  {
    id: "general",
    label: "Local business",
    description: "Promos, hiring, updates, reviews, services, announcements.",
    examples: ["Now hiring", "New hours", "Book today"],
  },
] as const;

export const platforms = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok" },
] as const;

export type PlanId = (typeof plans)[number]["id"];
export type IndustryMode = (typeof industryModes)[number]["id"];
export type PlatformId = (typeof platforms)[number]["id"];
