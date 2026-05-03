-- LocalSpark AI initial schema
-- Run with Supabase CLI or paste into the SQL editor. RLS is enabled for all
-- user-owned tables so business owners can only read/write their own records.

create extension if not exists "pgcrypto";

create table if not exists public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_name text not null,
  industry text not null default 'general',
  description text,
  logo_url text,
  brand_colors jsonb not null default '[]'::jsonb,
  cities text[] not null default '{}',
  services text[] not null default '{}',
  phone text,
  email text,
  website text,
  brand_voice text,
  target_customer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('instagram', 'facebook', 'tiktok')),
  provider_account_id text,
  display_name text,
  avatar_url text,
  access_token_encrypted text,
  refresh_token_encrypted text,
  expires_at timestamptz,
  scopes text[] not null default '{}',
  status text not null default 'disconnected',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.generated_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_profile_id uuid references public.business_profiles(id) on delete set null,
  prompt text not null,
  industry_mode text not null default 'general',
  platforms text[] not null default '{}',
  caption text,
  hashtags text[] not null default '{}',
  image_prompt text,
  image_url text,
  status text not null default 'draft',
  scheduled_for timestamptz,
  posted_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.post_variants (
  id uuid primary key default gen_random_uuid(),
  generated_post_id uuid not null references public.generated_posts(id) on delete cascade,
  platform text not null,
  caption text not null,
  hashtags text[] not null default '{}',
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  industry text not null default 'general',
  name text not null,
  prompt_template text not null,
  style text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null default 'starter',
  status text not null default 'inactive',
  current_period_end timestamptz,
  monthly_post_limit integer not null default 30,
  monthly_image_limit integer not null default 30,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  quantity integer not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.scheduled_jobs (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.generated_posts(id) on delete cascade,
  run_at timestamptz not null,
  status text not null default 'pending',
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists business_profiles_user_id_idx on public.business_profiles(user_id);
create index if not exists social_accounts_user_provider_idx on public.social_accounts(user_id, provider);
create index if not exists generated_posts_user_status_idx on public.generated_posts(user_id, status);
create index if not exists generated_posts_schedule_idx on public.generated_posts(scheduled_for) where scheduled_for is not null;
create index if not exists post_variants_post_idx on public.post_variants(generated_post_id);
create index if not exists usage_events_user_created_idx on public.usage_events(user_id, created_at);
create index if not exists scheduled_jobs_due_idx on public.scheduled_jobs(run_at, status);

alter table public.business_profiles enable row level security;
alter table public.social_accounts enable row level security;
alter table public.generated_posts enable row level security;
alter table public.post_variants enable row level security;
alter table public.templates enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_events enable row level security;
alter table public.scheduled_jobs enable row level security;

create policy "business profiles are owned by user"
  on public.business_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "social accounts are owned by user"
  on public.social_accounts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "generated posts are owned by user"
  on public.generated_posts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "post variants follow post ownership"
  on public.post_variants for all
  using (
    exists (
      select 1 from public.generated_posts
      where generated_posts.id = post_variants.generated_post_id
      and generated_posts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.generated_posts
      where generated_posts.id = post_variants.generated_post_id
      and generated_posts.user_id = auth.uid()
    )
  );

create policy "templates are owned by user"
  on public.templates for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "subscriptions are owned by user"
  on public.subscriptions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "usage events are owned by user"
  on public.usage_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "scheduled jobs follow post ownership"
  on public.scheduled_jobs for all
  using (
    exists (
      select 1 from public.generated_posts
      where generated_posts.id = scheduled_jobs.post_id
      and generated_posts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.generated_posts
      where generated_posts.id = scheduled_jobs.post_id
      and generated_posts.user_id = auth.uid()
    )
  );
