import { getSocialProvider } from "@/lib/social";
import type { SocialPostInput } from "@/lib/social/types";

export type ScheduledPostRecord = {
  id: string;
  provider?: string | null;
  platforms?: string[] | null;
  caption: string;
  hashtags?: string[] | null;
  image_url?: string | null;
  scheduled_for?: string | null;
};

export async function publishScheduledPost(post: ScheduledPostRecord) {
  const platform = post.provider ?? post.platforms?.[0] ?? "mock";
  const provider = getSocialProvider(platform);
  const input: SocialPostInput = {
    caption: post.caption,
    hashtags: post.hashtags ?? [],
    imageUrl: post.image_url ?? undefined,
    platforms: post.platforms ?? [platform],
  };

  return provider.publish(input);
}
