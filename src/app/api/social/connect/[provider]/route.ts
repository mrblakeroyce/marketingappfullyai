import { NextRequest, NextResponse } from "next/server";

import { getSocialProvider } from "@/lib/social";
import { supportedProviders, type SocialProviderName } from "@/lib/social/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;

  if (!supportedProviders.includes(provider as SocialProviderName)) {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 404 });
  }

  const state = crypto.randomUUID();
  const adapter = getSocialProvider(provider as SocialProviderName);

  return NextResponse.redirect(adapter.getAuthorizationUrl(state));
}
