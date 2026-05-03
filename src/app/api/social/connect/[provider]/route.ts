import { NextRequest, NextResponse } from "next/server";

import { getSocialProvider } from "@/lib/social";
import { supportedProviders } from "@/lib/social/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;

  if (!supportedProviders.includes(provider as (typeof supportedProviders)[number])) {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;
  const callbackUrl = `${origin}/api/social/callback/${provider}`;
  const state = crypto.randomUUID();
  const adapter = getSocialProvider(provider);

  return NextResponse.redirect(adapter.getAuthorizationUrl(state, callbackUrl));
}
