import { NextResponse } from "next/server";

import { generateMarketingPost } from "@/lib/ai/generator";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.prompt || typeof payload.prompt !== "string") {
    return NextResponse.json({ error: "A post prompt is required." }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const result = await generateMarketingPost({
    prompt: payload.prompt,
    industryMode: payload.industryMode ?? profile?.industry ?? "general",
    platforms: payload.platforms ?? ["instagram", "facebook"],
    businessProfile: profile
      ? {
          businessName: profile.business_name,
          industry: profile.industry,
          cities: profile.cities ?? [],
          services: profile.services ?? [],
          brandColors: profile.brand_colors ?? [],
          brandVoice: profile.brand_voice ?? "Friendly, clear, local, professional",
          phone: profile.phone ?? undefined,
          website: profile.website ?? undefined,
        }
      : payload.businessProfile,
  });

  if (user && profile) {
    await supabase.from("generated_posts").insert({
      user_id: user.id,
      business_profile_id: profile.id,
      prompt: payload.prompt,
      industry_mode: payload.industryMode ?? profile.industry ?? "general",
      platforms: payload.platforms ?? ["instagram", "facebook"],
      caption: result.caption,
      hashtags: result.hashtags,
      image_prompt: result.imagePrompt,
      image_url: result.imageUrl,
      status: "draft",
      metadata: {
        cta: result.cta,
        suggestedPostTime: result.suggestedPostTime,
        platformVariants: result.platformVariants,
        complianceNotes: result.complianceNotes,
      },
    });
  }

  return NextResponse.json(result);
}
