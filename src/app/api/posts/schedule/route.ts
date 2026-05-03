import { NextResponse } from "next/server";

import { schedulePost } from "@/lib/scheduler/posts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await schedulePost({
      userId: body.userId ?? "demo-user",
      businessProfileId: body.businessProfileId,
      prompt: body.prompt ?? "",
      caption: body.caption ?? "",
      hashtags: body.hashtags ?? [],
      imageUrl: body.imageUrl,
      platforms: body.platforms ?? ["instagram"],
      scheduledFor: body.scheduledFor,
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
