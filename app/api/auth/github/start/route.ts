import { randomBytes } from "node:crypto";

import { NextResponse } from "next/server";

import { env } from "@/lib/env";

const GITHUB_STATE_COOKIE_NAME = "binboi_github_oauth_state";
const GITHUB_STATE_MAX_AGE_SECONDS = 60 * 10;

function redirectToLogin(error: string) {
  return NextResponse.redirect(new URL(`/login?error=${error}`, env.appUrl));
}

export async function GET() {
  if (!env.databaseUrl) {
    return redirectToLogin("github_requires_database");
  }

  if (!env.githubClientId || !env.githubClientSecret) {
    return redirectToLogin("github_not_configured");
  }

  const authorizeUrl = new URL(
    env.githubOauthUrl || "https://github.com/login/oauth/authorize",
  );
  const state = randomBytes(24).toString("base64url");

  authorizeUrl.searchParams.set("client_id", env.githubClientId);
  authorizeUrl.searchParams.set(
    "redirect_uri",
    new URL("/api/auth/github/callback", env.appUrl).toString(),
  );
  authorizeUrl.searchParams.set("scope", "read:user user:email");
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(GITHUB_STATE_COOKIE_NAME, state, {
    httpOnly: true,
    maxAge: GITHUB_STATE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production" || env.appUrl.startsWith("https://"),
  });

  return response;
}
