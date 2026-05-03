import { NextResponse } from "next/server";

import { demoBusinessProfile } from "@/lib/data";
import { getSocialProvider } from "@/lib/social";
import type { SocialAccount } from "@/lib/social/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const providerName = String(body.provider ?? "mock");
  const provider = getSocialProvider(providerName);
  const post = body.post ?? body;
  const account: SocialAccount = {
    id: String(body.accountId ?? "demo-account"),
    provider: provider.provider,
    displayName: "Demo account",
  };

  const result = await provider.publish(
    {
      postId: String(post.postId ?? crypto.randomUUID()),
      businessName: String(body.businessName ?? demoBusinessProfile.businessName),
      caption: String(post.caption ?? "Fresh post from LocalSpark AI."),
      hashtags: Array.isArray(post.hashtags) ? post.hashtags : ["#LocalBusiness"],
      imageUrl: post.imageUrl,
      platforms: Array.isArray(post.platforms) ? post.platforms : ["instagram"],
      scheduledFor: post.scheduledFor,
    },
    account,
  );

  return NextResponse.json({ provider: provider.provider, result });
}
