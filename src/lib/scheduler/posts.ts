import { getSocialProvider } from "@/lib/social";
import type { PublishPayload, SocialProviderName } from "@/lib/social/types";

export type ScheduledPostRecord = {
  id: string;
  provider?: string | null;
  platforms?: string[] | null;
  caption: string;
  hashtags?: string[] | null;
  image_url?: string | null;
  scheduled_for?: string | null;
};

export type DemoScheduledPost = {
  id: string;
  userId: string;
  businessProfileId?: string;
  prompt: string;
  caption: string;
  hashtags: string[];
  imageUrl?: string;
  platforms: SocialProviderName[];
  scheduledFor: string;
  status: "scheduled" | "posted";
};

const demoScheduledPosts: DemoScheduledPost[] = [];

export async function schedulePost(input: {
  userId: string;
  businessProfileId?: string;
  prompt: string;
  caption: string;
  hashtags: string[];
  imageUrl?: string;
  platforms: string[];
  scheduledFor: string;
}) {
  if (!input.scheduledFor) {
    throw new Error("scheduledFor is required");
  }

  const scheduledPost: DemoScheduledPost = {
    id: `demo-scheduled-${Date.now()}`,
    userId: input.userId,
    businessProfileId: input.businessProfileId,
    prompt: input.prompt,
    caption: input.caption,
    hashtags: input.hashtags,
    imageUrl: input.imageUrl,
    platforms: input.platforms.filter(Boolean) as SocialProviderName[],
    scheduledFor: input.scheduledFor,
    status: "scheduled",
  };

  demoScheduledPosts.push(scheduledPost);
  return { scheduledPost };
}

export function getMockDuePosts() {
  const now = Date.now();
  return demoScheduledPosts.filter(
    (post) => post.status === "scheduled" && new Date(post.scheduledFor).getTime() <= now,
  );
}

export function markMockPostPosted(postId: string) {
  const post = demoScheduledPosts.find((item) => item.id === postId);
  if (post) post.status = "posted";
}

export async function publishScheduledPost(post: ScheduledPostRecord) {
  const platform = (post.provider ?? post.platforms?.[0] ?? "mock") as SocialProviderName;
  const provider = getSocialProvider(platform);
  const input: PublishPayload = {
    postId: post.id,
    caption: post.caption,
    hashtags: post.hashtags ?? [],
    imageUrl: post.image_url ?? undefined,
    platforms: (post.platforms ?? [platform]) as SocialProviderName[],
  };

  return provider.publish(input, {
    id: "scheduler-demo-account",
    provider: provider.provider,
    displayName: "Scheduler demo account",
  });
}
