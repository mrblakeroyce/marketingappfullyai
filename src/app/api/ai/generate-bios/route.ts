import { NextResponse } from "next/server";

import { createMockBios } from "@/lib/ai/generator";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const business = body.business ?? "Your business";
  const industry = body.industry ?? "local business";
  const city = body.city ?? "your city";

  return NextResponse.json({
    bios: createMockBios(String(business), String(industry), String(city)),
  });
}
