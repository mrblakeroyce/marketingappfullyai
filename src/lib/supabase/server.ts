import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

import { env, serverEnv } from "@/lib/config";
import type { Database } from "@/types/database";

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2];
};

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server components cannot set cookies; route handlers can.
          }
        },
      },
    },
  );
}

export function createServiceSupabaseClient() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !serverEnv.supabaseServiceRoleKey) {
    return null;
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, serverEnv.supabaseServiceRoleKey);
}

export const getServiceSupabase = createServiceSupabaseClient;

