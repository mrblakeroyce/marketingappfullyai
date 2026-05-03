import { NextResponse } from "next/server";

import { schedulePost } from "@/lib/scheduler/posts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = body.post ?? body;
    const result = await schedulePost({
      userId: body.userId ?? "demo-user",
      businessProfileId: body.businessProfileId,
      prompt: post.prompt ?? "",
      caption: post.caption ?? "",
      hashtags: post.hashtags ?? [],
      imageUrl: post.imageUrl,
      platforms: post.platforms ?? ["instagram"],
      scheduledFor: body.scheduledFor,
      industryMode: post.industryMode,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to schedule post",
      },
      { status: 400 },
    );
  }
}
