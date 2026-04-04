/**
 * Signed session-cookie helpers for the Binboi app. This keeps the current upstream auth API
 * flow while giving the Next.js product surface a stable local session boundary.
 */
import { cookies } from "next/headers";

import { env } from "@/lib/env";
import {
  APP_SESSION_COOKIE_NAME,
  type AppUserSession,
  encodeSessionToken,
  readSessionFromCookieValue,
} from "@/lib/auth/session-token";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Reads the current signed session from the request cookies inside server code.
 */
export async function getCurrentAppSession() {
  const cookieStore = await cookies();
  return readSessionFromCookieValue(
    cookieStore.get(APP_SESSION_COOKIE_NAME)?.value ?? null,
  );
}

/**
 * Persists a signed session cookie after a successful upstream auth response.
 */
export async function createAppSessionCookie(input: {
  userId?: string;
  workspaceId?: string;
  role?: string;
  email: string;
  name?: string;
}) {
  const cookieStore = await cookies();
  const issuedAt = Date.now();
  const session: AppUserSession = {
    userId: input.userId,
    workspaceId: input.workspaceId,
    role: input.role,
    email: input.email,
    name: input.name,
    issuedAt,
    expiresAt: issuedAt + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const value = encodeSessionToken(session);

  if (!value) {
    throw new Error(
      "AUTH_SECRET is required in production to create signed app sessions.",
    );
  }

  cookieStore.set(APP_SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    priority: "high",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" || env.appUrl.startsWith("https://"),
  });

  return session;
}

/**
 * Clears the current signed session cookie.
 */
export async function clearAppSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(APP_SESSION_COOKIE_NAME);
}
