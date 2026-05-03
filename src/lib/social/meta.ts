import type { PublishResult, SocialProvider, SocialPostPayload } from "./types";

export class MetaProvider implements SocialProvider {
  name = "meta" as const;

  async getAuthUrl(state: string) {
    const clientId = process.env.META_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!clientId || !appUrl) {
      return "/accounts?mock=meta";
    }

    const redirectUri = `${appUrl}/api/social/callback/meta`;
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

  async publish(payload: SocialPostPayload): Promise<PublishResult> {
    if (!process.env.META_CLIENT_ID || !process.env.META_CLIENT_SECRET) {
      return {
        provider: "meta",
        providerPostId: `mock_meta_${Date.now()}`,
        status: "posted",
        permalink: "#",
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
      provider: "meta",
      providerPostId: `pending_meta_${Date.now()}`,
      status: "queued",
      message: `Meta credentials detected for ${payload.platforms.join(", ")}. Complete account-token mapping after app review to publish live.`,
    };
  }
}
