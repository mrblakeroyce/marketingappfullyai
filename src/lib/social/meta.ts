import type {
  PublishPayload,
  PublishResult,
  SocialAccount,
  SocialPlatform,
  SocialProvider,
} from "./types";

export class MetaProvider implements SocialProvider {
  provider: SocialPlatform;

  constructor(provider: Extract<SocialPlatform, "instagram" | "facebook"> = "facebook") {
    this.provider = provider;
  }

  getAuthorizationUrl(state: string) {
    const clientId = process.env.META_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!clientId || !appUrl) {
      return `/accounts?mock=meta&provider=${this.provider}`;
    }

    const redirectUri = `${appUrl}/api/social/callback/${this.provider}`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      response_type: "code",
      scope:
        "pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish,business_management",
    });

    return `https://www.facebook.com/v20.0/dialog/oauth?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<SocialAccount> {
    return {
      id: `meta_${Date.now()}`,
      provider: this.provider,
      providerAccountId: `meta_account_${code.slice(0, 8)}`,
      displayName: `${this.provider} business account`,
      accessToken: code,
    };
  }

  async publish(payload: PublishPayload, _account: SocialAccount): Promise<PublishResult> {
    if (!process.env.META_CLIENT_ID || !process.env.META_CLIENT_SECRET) {
      return {
        provider: this.provider,
        success: true,
        remotePostId: `mock_meta_${Date.now()}`,
        statusUrl: "#",
        message:
          "Mock Meta publish complete. Add approved Meta Graph API credentials for live Facebook/Instagram posting.",
      };
    }

    // Production integrations differ for Facebook Pages vs Instagram Business accounts.
    // This app intentionally centralizes that complexity behind the provider adapter.
    // Once the owner completes Meta app review, this method should call:
    // - Facebook Page feed/photos endpoints for Facebook
    // - Instagram media container + publish endpoints for Instagram
    return {
      provider: this.provider,
      success: true,
      remotePostId: `pending_meta_${Date.now()}`,
      message: `Meta credentials detected for ${payload.platforms.join(", ")}. Complete account-token mapping after app review to publish live.`,
    };
  }
}
