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

export type Database = {
  public: {
    Tables: {
      business_profiles: {
        Row: BusinessProfile;
        Insert: Partial<BusinessProfile> & {
          user_id: string;
          business_name: string;
        };
        Update: Partial<BusinessProfile>;
      };
      generated_posts: {
        Row: GeneratedPost;
        Insert: Partial<GeneratedPost> & {
          user_id: string;
          prompt: string;
          caption: string;
        };
        Update: Partial<GeneratedPost>;
      };
      post_variants: {
        Row: PostVariant;
        Insert: Partial<PostVariant> & {
          generated_post_id: string;
          platform: SocialProvider;
          caption: string;
        };
        Update: Partial<PostVariant>;
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: PlanName;
          status: string;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: PlanName;
          status?: string;
          current_period_end?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
