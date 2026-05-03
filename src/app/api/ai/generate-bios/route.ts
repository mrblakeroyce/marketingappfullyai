import { NextResponse } from "next/server";

import { generatePlatformBios } from "@/lib/ai/generator";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const business = body.business ?? "Your business";
  const industry = body.industry ?? "local business";
  const city = body.city ?? "your city";

  const bios = await generatePlatformBios({
    prompt: "Optimize social media bios",
    business: {
      name: String(business),
      industry: String(industry),
      cities: [String(city)],
      services: ["local service", "customer care"],
      colors: ["#111827", "#34d399"],
      brandVoice: "Friendly, direct, professional",
    },
    platforms: ["instagram", "facebook", "tiktok"],
  });

  return NextResponse.json({ bios });
}
