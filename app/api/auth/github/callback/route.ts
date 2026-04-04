import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { findOrCreateGitHubUser, isDatabaseAuthReady } from "@/lib/auth/db";
import { createAppSessionCookie } from "@/lib/auth/session";
import { env } from "@/lib/env";

const GITHUB_STATE_COOKIE_NAME = "binboi_github_oauth_state";

type GitHubTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type GitHubUserResponse = {
  id: number;
  login: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
};

type GitHubEmailResponse = {
  email: string;
  primary: boolean;
  verified: boolean;
};

function redirectToLogin(error: string) {
  return NextResponse.redirect(new URL(`/login?error=${error}`, env.appUrl));
}

export async function GET(request: NextRequest) {
  if (!isDatabaseAuthReady()) {
    return redirectToLogin("github_requires_database");
  }

  if (!env.githubClientId || !env.githubClientSecret) {
    return redirectToLogin("github_not_configured");
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const cookieStore = await cookies();
  const savedState = cookieStore.get(GITHUB_STATE_COOKIE_NAME)?.value ?? "";

  if (!code || !state || !savedState || state !== savedState) {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin("github_state_mismatch");
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Binboi",
    },
    body: JSON.stringify({
      client_id: env.githubClientId,
      client_secret: env.githubClientSecret,
      code,
      redirect_uri: new URL("/api/auth/github/callback", env.appUrl).toString(),
      state,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin("github_token_exchange_failed");
  }

  const tokenPayload = (await tokenResponse.json()) as GitHubTokenResponse;

  if (!tokenPayload.access_token) {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin(tokenPayload.error || "github_token_missing");
  }

  const githubHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${tokenPayload.access_token}`,
    "User-Agent": "Binboi",
  };

  const [profileResponse, emailResponse] = await Promise.all([
    fetch("https://api.github.com/user", {
      headers: githubHeaders,
      cache: "no-store",
    }),
    fetch("https://api.github.com/user/emails", {
      headers: githubHeaders,
      cache: "no-store",
    }),
  ]);

  if (!profileResponse.ok || !emailResponse.ok) {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin("github_profile_fetch_failed");
  }

  const profile = (await profileResponse.json()) as GitHubUserResponse;
  const emails = (await emailResponse.json()) as GitHubEmailResponse[];
  const primaryVerifiedEmail =
    emails.find((entry) => entry.primary && entry.verified)?.email ??
    emails.find((entry) => entry.verified)?.email ??
    profile.email ??
    "";

  if (!primaryVerifiedEmail) {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin("github_email_missing");
  }

  let result;

  try {
    result = await findOrCreateGitHubUser({
      accountId: String(profile.id),
      email: primaryVerifiedEmail,
      name:
        profile.name?.trim() ||
        profile.login ||
        primaryVerifiedEmail.split("@")[0] ||
        "Binboi User",
      avatarUrl: profile.avatar_url ?? null,
      accessToken: tokenPayload.access_token,
      refreshToken: tokenPayload.refresh_token ?? null,
      tokenType: tokenPayload.token_type ?? null,
      scope: tokenPayload.scope ?? null,
      expiresAt: tokenPayload.expires_in
        ? new Date(Date.now() + tokenPayload.expires_in * 1000)
        : null,
      emailVerified: emails.some(
        (entry) => entry.email === primaryVerifiedEmail && entry.verified,
      ),
    });
  } catch {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin("database_not_ready");
  }

  if (!result.ok || !result.identity) {
    cookieStore.delete(GITHUB_STATE_COOKIE_NAME);
    return redirectToLogin("github_account_link_failed");
  }

  await createAppSessionCookie(result.identity);
  cookieStore.delete(GITHUB_STATE_COOKIE_NAME);

  return NextResponse.redirect(new URL("/dashboard", env.appUrl));
}
