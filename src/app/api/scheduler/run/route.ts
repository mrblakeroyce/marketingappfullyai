import { NextResponse } from "next/server";

import { getMockDuePosts, markMockPostPosted } from "@/lib/scheduler/posts";
import { getSocialProvider } from "@/lib/social";
import type { Platform } from "@/lib/social/types";

function authorized(request: Request) {
  const secret = process.env.SCHEDULER_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized scheduler request" }, { status: 401 });
  }

  const duePosts = getMockDuePosts();
  const results = [];

  for (const post of duePosts) {
    for (const platform of post.platforms) {
      const provider = getSocialProvider(platform as Platform);
      const result = await provider.post({
        accountId: `mock-${platform}-account`,
        caption: post.caption,
        imageUrl: post.imageUrl,
        hashtags: post.hashtags,
        platform: platform as Platform,
      });
      results.push({ postId: post.id, platform, result });
    }
    markMockPostPosted(post.id);
  }

  return NextResponse.json({
    processed: duePosts.length,
    results,
    mode: "mock-scheduler",
  });
}
