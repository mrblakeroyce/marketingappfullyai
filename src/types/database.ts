export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type IndustryMode = "auto" | "restaurant" | "barbershop" | "general";
export type PostStatus =
  | "draft"
  | "generated"
  | "scheduled"
  | "posting"
  | "posted"
  | "failed";
export type SocialProvider = "instagram" | "facebook" | "tiktok";
export type PlanName = "starter" | "growth" | "pro";

export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  industry: IndustryMode;
  description: string | null;
  logo_url: string | null;
  brand_colors: string[];
  cities: string[];
  services: string[];
  phone: string | null;
  email: string | null;
  website: string | null;
  brand_voice: string | null;
  created_at: string;
  updated_at: string;
}

export interface GeneratedPost {
  id: string;
  user_id: string;
  business_profile_id: string | null;
  prompt: string;
  industry_mode: IndustryMode;
  platforms: SocialProvider[];
  caption: string;
  hashtags: string[];
  image_prompt: string;
  image_url: string | null;
  status: PostStatus;
  scheduled_for: string | null;
  posted_at: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
}

export interface PostVariant {
  id: string;
  generated_post_id: string;
  platform: SocialProvider;
  caption: string;
  hashtags: string[];
  image_url: string | null;
  metadata: Json;
  created_at: string;
}
