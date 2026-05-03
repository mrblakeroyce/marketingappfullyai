import { NextResponse } from "next/server";

import { mockBusinessProfile } from "@/lib/data";
import { getSocialProvider } from "@/lib/social";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const providerName = String(body.provider ?? "mock");
  const provider = getSocialProvider(providerName);

  const result = await provider.publish({
    accountId: String(body.accountId ?? "demo-account"),
    businessName: String(body.businessName ?? mockBusinessProfile.businessName),
    caption: String(body.caption ?? "Fresh post from LocalSpark AI."),
    hashtags: Array.isArray(body.hashtags) ? body.hashtags : ["#LocalBusiness"],
    imageUrl: body.imageUrl,
    platforms: Array.isArray(body.platforms) ? body.platforms : ["instagram"],
    scheduledFor: body.scheduledFor,
  });

  return NextResponse.json({ provider: provider.name, result });
}
