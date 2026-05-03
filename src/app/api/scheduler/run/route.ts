import { NextResponse } from "next/server";

import { getMockDuePosts, markMockPostPosted, publishScheduledPost } from "@/lib/scheduler/posts";

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
    const result = await publishScheduledPost({
      id: post.id,
      provider: "mock",
      platforms: post.platforms,
      caption: post.caption,
      hashtags: post.hashtags,
      image_url: post.imageUrl,
      scheduled_for: post.scheduledFor,
    });
    results.push({ postId: post.id, result });
    markMockPostPosted(post.id);
  }

  return NextResponse.json({
    processed: duePosts.length,
    results,
    mode: "mock-scheduler",
  });
}
