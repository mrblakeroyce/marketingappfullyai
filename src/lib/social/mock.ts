import type { PublishRequest, PublishResult, SocialProvider } from "./types";

export class MockSocialProvider implements SocialProvider {
  provider = "mock" as const;

  async createAuthUrl() {
    return "/accounts?mockConnected=true";
  }

  async exchangeCode() {
    return {
      providerAccountId: `mock_${Date.now()}`,
      displayName: "Demo Local Business",
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      scopes: ["publish", "profile"],
    };
  }

  async publish(request: PublishRequest): Promise<PublishResult> {
    return {
      ok: true,
      provider: "mock",
      providerPostId: `mock_post_${request.postId}_${Date.now()}`,
      publishedAt: new Date().toISOString(),
      permalink: `https://example.com/mock-social-post/${request.postId}`,
    };
  }
}
