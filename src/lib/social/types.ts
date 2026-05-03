export type SocialPlatform = "instagram" | "facebook" | "tiktok";

export type SocialAccount = {
  id: string;
  provider: SocialPlatform;
  providerAccountId?: string;
  displayName: string;
  accessToken?: string;
  refreshToken?: string;
};

export type PublishPayload = {
  postId: string;
  caption: string;
  hashtags: string[];
  imageUrl?: string;
  platforms: SocialPlatform[];
  scheduledFor?: string | null;
};

export type PublishResult = {
  provider: SocialPlatform;
  success: boolean;
  remotePostId?: string;
  statusUrl?: string;
  error?: string;
};

export interface SocialProvider {
  provider: SocialPlatform;
  getAuthorizationUrl(state: string): string;
  exchangeCode(code: string): Promise<SocialAccount>;
  publish(payload: PublishPayload, account: SocialAccount): Promise<PublishResult>;
}
