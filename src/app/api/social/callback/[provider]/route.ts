import { NextResponse } from "next/server";

import { appConfig, serverEnv } from "@/lib/config";

type Params = {
  params: Promise<{ provider: string }>;
};

export async function GET(request: Request, { params }: Params) {
  const { provider } = await params;
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const appUrl = appConfig.url;

  if (error) {
    return NextResponse.redirect(
      `${appUrl}/accounts?provider=${provider}&status=error&message=${encodeURIComponent(error)}`,
    );
  }

  const configured =
    provider === "meta"
      ? Boolean(serverEnv.metaClientId && serverEnv.metaClientSecret)
      : provider === "tiktok"
        ? Boolean(serverEnv.tiktokClientId && serverEnv.tiktokClientSecret)
        : false;

  if (!configured || !code) {
    return NextResponse.redirect(
      `${appUrl}/accounts?provider=${provider}&status=mock-connected`,
    );
  }

  // Production implementation should exchange the code for tokens, encrypt them,
  // and persist the provider account in Supabase after OAuth app review approval.
  return NextResponse.redirect(
    `${appUrl}/accounts?provider=${provider}&status=connected`,
  );
}
