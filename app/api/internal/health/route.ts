/**
 * Internal integration-health route that summarizes which upstream services are configured.
 */
import { NextResponse } from "next/server";

import { getEngineHealth } from "@/lib/backend/engine";
import { env, hasEnvValues } from "@/lib/env";
import { isInternalApiRequestAuthorized } from "@/lib/security/internal";

export async function GET(request: Request) {
  if (!isInternalApiRequestAuthorized(request.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const engineHealthResult = await getEngineHealth();

  return NextResponse.json({
    ok: true,
    services: {
      auth: {
        configured: hasEnvValues(env.authBaseUrl),
        baseUrl: env.authBaseUrl || null,
      },
      controlPlane: {
        configured: hasEnvValues(env.controlPlaneApiUrl),
        baseUrl: env.controlPlaneApiUrl || null,
      },
      billing: {
        configured: hasEnvValues(env.billingApiUrl),
        baseUrl: env.billingApiUrl || null,
      },
      engine: {
        configured: hasEnvValues(env.engineApiUrl),
        baseUrl: env.engineApiUrl || null,
        health: engineHealthResult.data,
        error: engineHealthResult.ok ? null : engineHealthResult.error ?? null,
      },
    },
    internal: {
      protectedRoutes: [
        "/api/internal/health",
        "/api/internal/engine/health",
      ],
    },
  });
}
