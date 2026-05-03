import { MetaProvider } from "./meta";
import { MockSocialProvider } from "./mock";
import { TikTokProvider } from "./tiktok";
import type { SocialProviderName } from "./types";

export function getSocialProvider(provider: SocialProviderName) {
  if (provider === "facebook" || provider === "instagram") {
    return new MetaProvider(provider);
  }

  if (provider === "tiktok") {
    return new TikTokProvider();
  }

  return new MockSocialProvider();
}

export const supportedSocialProviders: SocialProviderName[] = [
  "instagram",
  "facebook",
  "tiktok",
  "mock",
];
