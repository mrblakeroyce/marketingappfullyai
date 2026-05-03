# LocalSpark AI

An AI-powered marketing app for local businesses. Business owners can type a short request like “5:00 happy hour,” “Free oil change Saturday,” or “Now hiring,” then get a branded social post image concept, caption, hashtags, platform copy, and post/schedule actions.

## What is included

- Premium mobile-first SaaS interface built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.
- Full screen set:
  - Landing page
  - Login
  - Onboarding
  - Dashboard
  - Create Post / AI Generator
  - Brand Profile
  - Content Calendar
  - Scheduled Posts
  - Social Accounts
  - Billing / Plans
  - Settings
- Industry AI modes:
  - Auto shop
  - Restaurant
  - Barbershop
  - General local business
- AI generation API routes with OpenAI integration and polished mock fallback.
- Supabase database schema with RLS policies for profiles, posts, social accounts, subscriptions, usage, templates, and jobs.
- Stripe checkout, customer portal, and webhook scaffolding.
- Social posting provider abstraction with mock, Meta, and TikTok adapters.
- Scheduler endpoint for due scheduled posts.

## Local development

Install dependencies:

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

> This repository was scaffolded in an environment without Node.js installed, so dependency installation and build verification should be run after Node 20+ is available.

## Environment variables

See `.env.example` for the complete list. The most important values are:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`
- `META_CLIENT_ID`
- `META_CLIENT_SECRET`
- `TIKTOK_CLIENT_ID`
- `TIKTOK_CLIENT_SECRET`
- `TOKEN_ENCRYPTION_SECRET`
- `SCHEDULER_SECRET`

## Supabase setup

1. Create a Supabase project.
2. Run the SQL in `supabase/migrations/001_initial_schema.sql`.
3. Add the project URL and keys to `.env.local`.
4. Configure auth providers and redirect URLs for your deployment domain.

The schema enables row-level security so users can only access their own business profiles, generated posts, templates, subscriptions, usage events, scheduled jobs, and social account records.

## Stripe setup

Create three recurring monthly prices:

- Starter — $49/month
- Growth — $99/month
- Pro — $149/month

Add the price IDs to:

- `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`

Configure a Stripe webhook pointing to:

```text
https://your-domain.com/api/stripe/webhook
```

Listen for at least:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## OpenAI setup

Add `OPENAI_API_KEY` to enable live AI output. Without it, the app returns high-quality demo content so the product flow still works.

Text generation uses `OPENAI_TEXT_MODEL` and image generation uses `OPENAI_IMAGE_MODEL`.

## Social posting setup

The product includes provider adapters, but live posting requires official platform setup and approval.

### Meta / Facebook / Instagram

You need:

- Meta developer account
- Meta app credentials
- Facebook Page connected to an Instagram professional account
- OAuth redirect URL:
  - `/api/social/callback/meta`
- Approved publishing permissions through Meta app review
- Business verification for production use

### TikTok

You need:

- TikTok developer account
- TikTok app credentials
- OAuth redirect URL:
  - `/api/social/callback/tiktok`
- Content Posting API access and approval

Until credentials and approvals are ready, the app can use the mock provider to simulate posting.

## Deployment

Recommended hosting: Vercel.

1. Import the GitHub repository into Vercel.
2. Add all environment variables.
3. Configure Supabase auth redirect URLs.
4. Configure Stripe webhook endpoint.
5. Configure social OAuth redirect URLs.
6. Add a scheduled cron call to `/api/scheduler/run` with `Authorization: Bearer $SCHEDULER_SECRET`.

## Product principle

The app is intentionally designed around the simplest local-business workflow:

```text
Open app → type what you want → AI creates everything → approve → post or schedule
```
# marketingappfullyai
