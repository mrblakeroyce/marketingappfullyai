import type { PublishPayload, PublishResult, SocialAccount, SocialProvider } from "./types";

export class MockSocialProvider implements SocialProvider {
  provider = "mock" as const;
  name = "mock" as const;

  getAuthorizationUrl() {
    return "/accounts?mockConnected=true";
  }

  async exchangeCode(): Promise<SocialAccount> {
    return {
      id: "mock-account",
      provider: "mock",
      providerAccountId: `mock_${Date.now()}`,
      displayName: "Demo Local Business",
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      scopes: ["publish", "profile"],
    };
  }

  async publish(request: PublishPayload): Promise<PublishResult> {
    return {
      provider: "mock",
      success: true,
      remotePostId: `mock_post_${request.postId}_${Date.now()}`,
      providerPostId: `mock_post_${request.postId}_${Date.now()}`,
      publishedAt: new Date().toISOString(),
      statusUrl: `https://example.com/mock-social-post/${request.postId}`,
      permalink: `https://example.com/mock-social-post/${request.postId}`,
    };
  }
}
