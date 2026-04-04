/**
 * Pure token helpers for signed app sessions. Safe to use from Proxy and server code.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const APP_SESSION_COOKIE_NAME = "binboi_app_session";

const DEV_SESSION_SECRET = "binboi-local-auth-secret";

export type AppUserSession = {
  userId?: string;
  workspaceId?: string;
  role?: string;
  email: string;
  name?: string;
  issuedAt: number;
  expiresAt: number;
};

function getSessionSecret() {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  return process.env.NODE_ENV === "production" ? "" : DEV_SESSION_SECRET;
}

function sign(value: string) {
  const secret = getSessionSecret();

  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

/**
 * Encodes and signs a session payload into the cookie format used by the app.
 */
export function encodeSessionToken(session: AppUserSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = sign(payload);

  if (!signature) {
    return "";
  }

  return `${payload}.${signature}`;
}

/**
 * Verifies a raw cookie value and returns the decoded user session when valid.
 */
export function readSessionFromCookieValue(cookieValue?: string | null) {
  if (!cookieValue) {
    return null;
  }

  const [payload, signature] = cookieValue.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = sign(payload);

  if (!expectedSignature) {
    return null;
  }

  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AppUserSession;

    if (!parsed.email || parsed.expiresAt <= Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
