export type SocialProviderName = "instagram" | "facebook" | "tiktok" | "mock";
export type SocialPlatform = SocialProviderName;

export type SocialAccount = {
  id: string;
  provider: SocialPlatform;
  providerAccountId?: string;
  displayName: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  scopes?: string[];
  status?: "connected" | "mock" | "error";
};

export type SocialConnection = SocialAccount;

export type PublishPayload = {
  postId?: string;
  accountId?: string;
  businessName?: string;
  caption: string;
  hashtags: string[];
  imageUrl?: string;
  platforms: SocialPlatform[];
  scheduledFor?: string | null;
};

export type PublishRequest = PublishPayload;
export type SocialPostPayload = PublishPayload;

export type PublishResult = {
  provider: SocialPlatform;
  status?: "posted" | "queued" | "mocked" | "failed";
  success: boolean;
  ok?: boolean;
  remotePostId?: string;
  providerPostId?: string;
  statusUrl?: string;
  permalink?: string;
  url?: string;
  message?: string;
  publishedAt?: string;
  error?: string;
};

export interface SocialProvider {
  provider: SocialProviderName;
  id?: SocialProviderName;
  name?: SocialProviderName;
  displayName?: string;
  getAuthorizationUrl(state: string): string;
  exchangeCode(code: string): Promise<SocialAccount>;
  publish(payload: PublishPayload, account?: SocialAccount): Promise<PublishResult>;
  publishPost?(payload: PublishPayload, account?: SocialAccount): Promise<PublishResult>;
}

export const supportedProviders = ["instagram", "facebook", "tiktok", "mock"] as const;
