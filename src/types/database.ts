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

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: PlanName;
  status: string;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface UsageEvent {
  id: string;
  user_id: string;
  event_type: string;
  quantity: number;
  metadata: Json;
  created_at: string;
}

export interface SocialAccount {
  id: string;
  user_id: string;
  provider: SocialProvider;
  provider_account_id: string | null;
  display_name: string;
  avatar_url: string | null;
  access_token_encrypted: string | null;
  refresh_token_encrypted: string | null;
  expires_at: string | null;
  scopes: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduledJob {
  id: string;
  post_id: string;
  run_at: string;
  status: string;
  attempts: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
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
        Relationships: [];
      };
      generated_posts: {
        Row: GeneratedPost;
        Insert: Partial<GeneratedPost> & {
          user_id: string;
          prompt: string;
          caption: string;
        };
        Update: Partial<GeneratedPost>;
        Relationships: [];
      };
      post_variants: {
        Row: PostVariant;
        Insert: Partial<PostVariant> & {
          generated_post_id: string;
          platform: SocialProvider;
          caption: string;
        };
        Update: Partial<PostVariant>;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: {
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: PlanName;
          status?: string;
          current_period_end?: string | null;
        };
        Update: Partial<Subscription>;
        Relationships: [];
      };
      usage_events: {
        Row: UsageEvent;
        Insert: {
          user_id: string;
          event_type: string;
          quantity?: number;
          metadata?: Json;
        };
        Update: Partial<UsageEvent>;
        Relationships: [];
      };
      social_accounts: {
        Row: SocialAccount;
        Insert: Partial<SocialAccount> & {
          user_id: string;
          provider: SocialProvider;
          display_name: string;
        };
        Update: Partial<SocialAccount>;
        Relationships: [];
      };
      scheduled_jobs: {
        Row: ScheduledJob;
        Insert: {
          post_id: string;
          run_at: string;
          status?: string;
          attempts?: number;
          last_error?: string | null;
        };
        Update: Partial<ScheduledJob>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
