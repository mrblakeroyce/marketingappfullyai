import { NextResponse } from "next/server";

import { generateMarketingPost } from "@/lib/ai/generator";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.prompt || typeof payload.prompt !== "string") {
    return NextResponse.json({ error: "A post prompt is required." }, { status: 400 });
  }

  const result = await generateMarketingPost({
    prompt: payload.prompt,
    industryMode: payload.industryMode ?? "general",
    platforms: payload.platforms ?? ["instagram", "facebook"],
    businessProfile: payload.businessProfile,
  });

  return NextResponse.json({ post: result });
}
