# `lib/backend`

Purpose: server-only adapters that connect the Next.js product surface to Binboi backend services without leaking secrets to the browser.

## Current service map

- `auth`: upstream identity service used by login, register, recovery, verification, and invite acceptance.
- `controlPlane`: workspace-facing product API used by dashboard overview, tunnels, tokens, usage, and billing summary reads.
- `billing`: checkout URL minting surface used by dashboard billing actions.
- `engine`: `binboi-go` service used by install/health flows and internal engine checks.

## Files

- `client.ts`: central authenticated fetch helper for upstream services.
- `contracts.ts`: shared normalized result types for dashboard/auth integrations.
- `control-plane.ts`: normalization layer for dashboard-facing data.
- `engine.ts`: engine-specific reads and install overview aggregation.

## Environment variables

Auth:
- `AUTH_API_URL`
- `AUTH_API_SECRET`

Control plane:
- `CONTROL_PLANE_API_URL`
- `CONTROL_PLANE_API_KEY`

Billing:
- `BILLING_API_URL`
- `BILLING_API_KEY`

Engine:
- `ENGINE_API_URL`
- `ENGINE_API_KEY`
- `ENGINE_HEALTH_PATH`
- `ENGINE_TUNNELS_PATH`
- `ENGINE_SESSIONS_PATH`
- `ENGINE_CONNECT_PATH`

Internal app-to-app:
- `CONTROL_PLANE_INTERNAL_SECRET`
- `INTERNAL_API_SECRET`

Reference:
- Use the repo root [.env.example](/Users/sardorazimov/Desktop/binboi-app/.env.example) as the copyable template.
- Use [API-CONTRACT.md](/Users/sardorazimov/Desktop/binboi-app/lib/backend/API-CONTRACT.md) as the exact backend implementation checklist.

## Auth contract used by the app

The auth route actions in [app/(auth)/actions.ts](/Users/sardorazimov/Desktop/binboi-app/app/(auth)/actions.ts) call these endpoints:

- `POST /login`
- `POST /register`
- `POST /forgot-password`
- `POST /reset-password`
- `POST /verify-email`
- `POST /accept-invite`

Expected request pattern:
- JSON body
- bearer auth with `AUTH_API_SECRET` added server-side by the app

Expected response pattern:
- success payload may return the user at the top level or nested under `data.user`, `data.account`, or `data.member`
- error payload may return `message`, `error`, `detail`, `fieldErrors`, or `errors`

The app now normalizes those shapes so session creation can still work even if the auth service nests the user differently.

## Control plane contract used by dashboard pages

Overview reads:
- `GET /v1/dashboard/overview`

Tunnel reads:
- `GET /v1/tunnels`

Token reads and writes:
- `GET /v1/tokens`
- `POST /v1/tokens`
- `DELETE /v1/tokens/:id`

Usage reads:
- `GET /v1/usage`

Billing reads and checkout:
- `GET /v1/billing`
- `POST /v1/billing/checkout`

The normalization layer in [control-plane.ts](/Users/sardorazimov/Desktop/binboi-app/lib/backend/control-plane.ts) tolerates responses wrapped in `data` or `items`, then maps them into stable frontend types:

- `DashboardOverview`
- `Tunnel`
- `ApiToken`
- `CreatedToken`
- `UsageSummary`
- `BillingSummary`

## Engine contract used by install/internal health

The engine adapter in [engine.ts](/Users/sardorazimov/Desktop/binboi-app/lib/backend/engine.ts) reads:

- `GET ENGINE_HEALTH_PATH`
- `GET ENGINE_TUNNELS_PATH`

Those values are surfaced in:

- [app/dashboard/install/page.tsx](/Users/sardorazimov/Desktop/binboi-app/app/dashboard/install/page.tsx)
- [app/api/internal/engine/health/route.ts](/Users/sardorazimov/Desktop/binboi-app/app/api/internal/engine/health/route.ts)
- [app/api/internal/health/route.ts](/Users/sardorazimov/Desktop/binboi-app/app/api/internal/health/route.ts)

## Internal app routes

Protected with `x-binboi-internal-secret` or `Authorization: Bearer <secret>`:

- `GET /api/internal/health`
- `GET /api/internal/engine/health`

These routes are for internal checks and orchestration, not browser-facing product data.

## Integration notes

- Keep browser components on server actions or server components when possible; do not proxy everything through `app/api`.
- `ServiceResult<T>` now preserves `errorDetails` so auth and dashboard flows can surface upstream validation more accurately.
- If a backend contract hardens later, tighten the normalization layer instead of spreading response-shape assumptions across pages.
