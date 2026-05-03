import OpenAI from "openai";

import { serverEnv } from "@/lib/config";
import { buildMarketingPrompt, type GeneratePostInput } from "@/lib/ai/prompt";

export type GeneratedVariant = {
  platform: string;
  caption: string;
  hashtags: string[];
  notes: string;
};

export type GeneratedPostPayload = {
  headline: string;
  caption: string;
  hashtags: string[];
  imagePrompt: string;
  imageUrl: string;
  suggestedTime: string;
  cta: string;
  platformVariants: Record<string, { caption: string; hashtags: string[] }>;
  variants: GeneratedVariant[];
};

const fallbackHashtags: Record<string, string[]> = {
  auto: ["#AutoShop", "#CarCare", "#LocalMechanic", "#OilChange", "#DriveSafe"],
  restaurant: ["#LocalEats", "#DinnerPlans", "#HappyHour", "#FreshFood", "#SupportLocal"],
  barbershop: ["#FreshCut", "#BarberLife", "#MensGrooming", "#BookNow", "#LocalBarber"],
  general: ["#ShopLocal", "#SmallBusiness", "#LocalBusiness", "#Community", "#SupportLocal"],
};

function normalizeBusiness(input: GeneratePostInput) {
  const profile = input.businessProfile;
  return {
    name: profile?.business_name ?? profile?.businessName ?? "Your Business",
    industry: input.industryMode ?? profile?.industry ?? "general",
    cities: profile?.cities ?? ["your area"],
    services: profile?.services ?? ["what you do best"],
    colors: profile?.brand_colors ?? profile?.brandColors ?? ["#111827", "#22c55e"],
    brandVoice: profile?.brand_voice ?? profile?.brandVoice ?? "Friendly, clear, local, professional",
    phone: profile?.phone ?? undefined,
    website: profile?.website ?? undefined,
  };
}

function createFallbackGeneration(input: GeneratePostInput): GeneratedPostPayload {
  const business = normalizeBusiness(input);
  const industry = business.industry;
  const city = business.cities[0] ?? "your area";
  const service = business.services[0] ?? "what you do best";
  const platformList = input.platforms?.length ? input.platforms : ["instagram", "facebook"];
  const hashtags = fallbackHashtags[industry] ?? fallbackHashtags.general;
  const caption = `${input.prompt} — made easy by ${business.name}. If you're near ${city}, stop in or message us today for ${service}.`;
  const variants = platformList.map((platform) => ({
    platform,
    caption:
      platform === "tiktok"
        ? `${input.prompt}. Quick, clear, and local — ${business.name} is ready for you.`
        : caption,
    hashtags: platform === "facebook" ? hashtags.slice(0, 3) : hashtags,
    notes:
      platform === "instagram"
        ? "Use as feed post or story with a booking sticker."
        : platform === "tiktok"
          ? "Pair with a 7-second before/after clip."
          : "Add phone number and page CTA button.",
  }));

  return {
    headline: input.prompt,
    caption,
    hashtags,
    imagePrompt: `Premium square social post for ${business.name}, a ${industry} business in ${city}. Use ${business.colors.join(
      " and ",
    )} brand colors, clean typography, warm local-business photography, bold readable headline: "${input.prompt}".`,
    imageUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
    suggestedTime: "Today at 5:30 PM",
    cta: "Message us to book now.",
    platformVariants: Object.fromEntries(
      variants.map((variant) => [variant.platform, { caption: variant.caption, hashtags: variant.hashtags }]),
    ),
    variants,
  };
}

function safeJsonParse(content: string): GeneratedPostPayload | null {
  try {
    const parsed = JSON.parse(content) as GeneratedPostPayload;
    if (!parsed.caption || !Array.isArray(parsed.hashtags)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function generateMarketingPost(
  input: GeneratePostInput,
): Promise<GeneratedPostPayload> {
  if (!serverEnv.openaiApiKey) {
    return createFallbackGeneration(input);
  }

  const openai = new OpenAI({ apiKey: serverEnv.openaiApiKey });
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_TEXT_MODEL ?? "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an elite social media manager for local businesses. Return only valid JSON matching the requested schema.",
      },
      {
        role: "user",
        content: buildMarketingPrompt(input),
      },
    ],
    temperature: 0.78,
  });

  const content = completion.choices[0]?.message.content;
  if (!content) return createFallbackGeneration(input);

  return safeJsonParse(content) ?? createFallbackGeneration(input);
}

export async function generatePlatformBios(input: AiGenerationInput) {
  const base = createFallbackGeneration(input);

  if (!appConfig.openai.apiKey) {
    return {
      instagram: `${input.business.name} • ${input.business.industry} in ${
        input.business.cities[0] ?? "your city"
      } ✨ ${input.business.services.slice(0, 2).join(" • ")}. DM to book.`,
      facebook: `${input.business.name} helps local customers with ${input.business.services.join(
        ", ",
      )}. Call ${input.business.phone ?? "today"} or message us for fast, friendly service.`,
      tiktok: `${input.business.name} | Local ${input.business.industry} tips, deals, and behind-the-scenes.`,
    };
  }

  const openai = new OpenAI({ apiKey: appConfig.openai.apiKey });
  const completion = await openai.chat.completions.create({
    model: appConfig.openai.textModel,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "Return JSON with instagram, facebook, and tiktok bio strings only.",
      },
      {
        role: "user",
        content: `Create optimized social bios for this local business. Business: ${JSON.stringify(
          input.business,
        )}. Current campaign context: ${base.caption}`,
      },
    ],
  });

  return JSON.parse(completion.choices[0]?.message.content ?? "{}") as Record<string, string>;
}
