import { demoBusinessProfile, industries } from "@/lib/data";

export type GeneratePostInput = {
  prompt: string;
  industryMode?: string;
  platforms?: string[];
  businessProfile?: {
    business_name?: string | null;
    businessName?: string | null;
    industry?: string | null;
    cities?: string[] | null;
    services?: string[] | null;
    brand_colors?: string[] | null;
    brandColors?: string[] | null;
    brand_voice?: string | null;
    brandVoice?: string | null;
    phone?: string | null;
    website?: string | null;
  } | null;
};

export type GeneratedPost = {
  caption: string;
  hashtags: string[];
  imagePrompt: string;
  imageUrl: string;
  suggestedTime: string;
  cta: string;
  platformVariants: Record<string, { caption: string; hashtags: string[] }>;
};

const industryInstructions: Record<string, string> = {
  auto: "Use practical, trust-building language. Mention maintenance urgency, convenience, fleet or family safety when relevant.",
  restaurant: "Use appetizing sensory language, clear hours, friendly local hospitality, and a simple dine-in or order-now CTA.",
  barbershop: "Use confident style-forward language, booking urgency, clean-cut visuals, and neighborhood trust.",
  general: "Use clear local-business language, a concise offer, and a simple call to action.",
};

export function buildMarketingPrompt(input: GeneratePostInput) {
  const profile = input.businessProfile ?? demoBusinessProfile;
  const mode = input.industryMode ?? profile.industry ?? "general";
  const platforms = input.platforms?.length ? input.platforms : ["Instagram", "Facebook"];

  return `You are an expert local-business social media manager.

Business:
- Name: ${profile.business_name ?? demoBusinessProfile.business_name}
- Industry mode: ${mode}
- Cities: ${(profile.cities ?? demoBusinessProfile.cities).join(", ")}
- Services: ${(profile.services ?? demoBusinessProfile.services).join(", ")}
- Brand voice: ${profile.brand_voice ?? demoBusinessProfile.brand_voice}
- Colors: ${(profile.brand_colors ?? demoBusinessProfile.brand_colors).join(", ")}
- Phone: ${profile.phone ?? demoBusinessProfile.phone}
- Website: ${profile.website ?? demoBusinessProfile.website}

Owner request: "${input.prompt}"
Platforms: ${platforms.join(", ")}

Industry guidance: ${industryInstructions[mode] ?? industryInstructions.general}

Create a professional local-business social post. Keep it simple, useful, non-cringe, and action oriented. Return JSON with caption, hashtags array, imagePrompt, suggestedTime, cta, and platformVariants object keyed by platform.`;
}

export function getFallbackGeneratedPost(input: GeneratePostInput): GeneratedPost {
  const profile = input.businessProfile ?? demoBusinessProfile;
  const businessName = profile.business_name ?? demoBusinessProfile.business_name;
  const city = (profile.cities ?? demoBusinessProfile.cities)[0] ?? "your area";
  const request = input.prompt || "fresh local offer";
  const mode = input.industryMode ?? profile.industry ?? "general";
  const platforms = input.platforms?.length ? input.platforms : ["Instagram", "Facebook"];
  const colors = profile.brand_colors ?? demoBusinessProfile.brand_colors;
  const industry = industries.find((item) => item.id === mode)?.label ?? "Local Business";

  const caption = `${businessName} update: ${request}. We made it simple for ${city} customers to take advantage today. Call, stop by, or send us a message and we’ll take care of the rest.`;
  const hashtags = [
    `#${city.replace(/\s+/g, "")}`,
    "#LocalBusiness",
    `#${industry.replace(/\s+/g, "")}`,
    "#ShopLocal",
    "#CommunityFirst",
  ];

  return {
    caption,
    hashtags,
    imagePrompt: `Premium square social media graphic for ${businessName}, a ${industry.toLowerCase()} in ${city}, promoting "${request}". Use bold clean typography, warm lighting, modern SaaS-inspired layout, colors ${colors.join(" and ")}, branded local-business feel, no clutter.`,
    imageUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
    suggestedTime: "Today at 5:30 PM",
    cta: "Message us to claim it",
    platformVariants: Object.fromEntries(
      platforms.map((platform) => [
        platform,
        {
          caption:
            platform === "TikTok"
              ? `${request} at ${businessName}. Quick, local, and easy. Come see us in ${city}.`
              : caption,
          hashtags: platform === "Facebook" ? hashtags.slice(0, 3) : hashtags,
        },
      ]),
    ),
  };
}
