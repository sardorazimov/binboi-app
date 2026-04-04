import { DEFAULT_APP_URL } from "@/constants";

/**
 * Centralized access to runtime configuration used by the product app.
 */
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_APP_URL;
const isProduction = process.env.NODE_ENV === "production";
const DEV_INTERNAL_SECRET = "binboi-local-internal-secret";

function devServiceBase(path: string, explicitValue?: string) {
  if (explicitValue) {
    return explicitValue;
  }

  if (isProduction) {
    return "";
  }

  return new URL(path, appUrl).toString();
}

export const env = {
  appUrl,
  databaseUrl: process.env.DATABASE_URL ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
  authBaseUrl: devServiceBase("/api/dev/auth", process.env.AUTH_API_URL),
  authApiSecret: process.env.AUTH_API_SECRET ?? "",
  githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  githubOauthUrl: process.env.GITHUB_OAUTH_AUTHORIZE_URL ?? "",
  paddleEnvironment: process.env.PADDLE_ENVIRONMENT ?? "sandbox",
  paddleApiKey: process.env.PADDLE_API_KEY ?? "",
  paddleWebhookSecret: process.env.PADDLE_WEBHOOK_SECRET ?? "",
  paddlePriceStarter: process.env.PADDLE_PRICE_STARTER ?? "",
  paddlePriceTeam: process.env.PADDLE_PRICE_TEAM ?? "",
  paddlePriceEnterprise: process.env.PADDLE_PRICE_ENTERPRISE ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  emailProvider:
    process.env.EMAIL_PROVIDER ??
    (process.env.RESEND_API_KEY ? "resend" : ""),
  emailApiKey:
    process.env.EMAIL_API_KEY ??
    process.env.RESEND_API_KEY ??
    "",
  emailFrom: process.env.EMAIL_FROM ?? "",
  emailReplyTo: process.env.EMAIL_REPLY_TO ?? "",
  controlPlaneApiUrl: devServiceBase(
    "/api/dev/control-plane",
    process.env.CONTROL_PLANE_API_URL,
  ),
  controlPlaneApiKey: process.env.CONTROL_PLANE_API_KEY ?? "",
  controlPlaneInternalApiUrl:
    process.env.CONTROL_PLANE_INTERNAL_API_URL ??
    process.env.INTERNAL_API_URL ??
    (isProduction ? "" : appUrl),
  controlPlaneInternalSecret:
    process.env.CONTROL_PLANE_INTERNAL_SECRET ??
    process.env.INTERNAL_API_SECRET ??
    (isProduction ? "" : DEV_INTERNAL_SECRET),
  engineApiUrl: devServiceBase("/api/dev/engine", process.env.ENGINE_API_URL),
  engineApiKey: process.env.ENGINE_API_KEY ?? "",
  engineHealthPath: process.env.ENGINE_HEALTH_PATH ?? "/v1/health",
  engineTunnelsPath: process.env.ENGINE_TUNNELS_PATH ?? "/v1/tunnels",
  engineSessionsPath: process.env.ENGINE_SESSIONS_PATH ?? "/v1/sessions",
  engineConnectPath: process.env.ENGINE_CONNECT_PATH ?? "/v1/connect",
  internalApiUrl: process.env.INTERNAL_API_URL ?? (isProduction ? "" : appUrl),
  internalApiSecret:
    process.env.INTERNAL_API_SECRET ?? (isProduction ? "" : DEV_INTERNAL_SECRET),
  billingApiUrl:
    process.env.BILLING_API_URL ??
    process.env.CONTROL_PLANE_API_URL ??
    devServiceBase("/api/dev/control-plane", ""),
  billingApiKey: process.env.BILLING_API_KEY ?? process.env.CONTROL_PLANE_API_KEY ?? "",
} as const;

/**
 * Utility for concise integration gating checks in loaders and actions.
 */
export function hasEnvValues(...values: Array<string | undefined>) {
  return values.every((value) => Boolean(value));
}
