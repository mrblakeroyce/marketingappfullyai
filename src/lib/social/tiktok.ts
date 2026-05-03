import { appConfig, serverEnv } from "@/lib/config";
import type {
  PublishPayload,
  PublishResult,
  SocialAccount,
  SocialProvider,
} from "@/lib/social/types";

export class TikTokProvider implements SocialProvider {
  provider = "tiktok" as const;
  displayName = "TikTok";

  getAuthorizationUrl(state: string): string {
    if (!serverEnv.tiktokClientId || !appConfig.url) {
      return `/accounts?mock=1&provider=tiktok&state=${encodeURIComponent(state)}`;
    }

    const params = new URLSearchParams({
      client_key: serverEnv.tiktokClientId,
      response_type: "code",
      scope: "user.info.basic,video.publish,video.upload",
      redirect_uri: `${appConfig.url}/api/social/callback/tiktok`,
      state,
    });

    return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<SocialAccount> {
    if (!serverEnv.tiktokClientId || !serverEnv.tiktokClientSecret || !appConfig.url) {
      return {
        id: `mock-tiktok-${Date.now()}`,
        provider: this.provider,
        providerAccountId: `mock-tiktok-${Date.now()}`,
        displayName: "TikTok demo account",
        accessToken: `mock-code-${code}`,
        scopes: ["video.publish", "video.upload"],
      };
    }

    const body = new URLSearchParams({
      client_key: serverEnv.tiktokClientId,
      client_secret: serverEnv.tiktokClientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${appConfig.url}/api/social/callback/tiktok`,
    });

    const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      throw new Error(`TikTok OAuth failed: ${await response.text()}`);
    }

    const token = (await response.json()) as {
      access_token: string;
      open_id: string;
      expires_in?: number;
      scope?: string;
    };

    return {
      id: token.open_id,
      provider: this.provider,
      providerAccountId: token.open_id,
      displayName: "TikTok business account",
      accessToken: token.access_token,
      expiresAt: token.expires_in
        ? new Date(Date.now() + token.expires_in * 1000).toISOString()
        : undefined,
      scopes: token.scope?.split(",") ?? ["video.publish", "video.upload"],
    };
  }

  async publish(payload: PublishPayload): Promise<PublishResult> {
    if (!serverEnv.tiktokClientId) {
      return {
        provider: this.provider,
        success: true,
        remotePostId: `mock-tiktok-post-${Date.now()}`,
        statusUrl: "https://www.tiktok.com/",
      };
    }

    if (!payload.imageUrl) {
      return {
        provider: this.provider,
        success: false,
        error:
          "TikTok posting requires video/media upload workflow. This adapter is ready for approved Content Posting API credentials.",
      };
    }

    return {
      provider: this.provider,
      success: false,
      error:
        "TikTok direct publishing needs the approved upload-init and publish flow for the connected account.",
    };
  }
}
