# Binboi App

Binboi App is a Next.js App Router product surface for the Binboi platform. It is organized in phases and intentionally prioritizes the public site first, then auth, then the dashboard so the repo stays understandable as backend integrations mature.

## What is in this repo

- Public product site: landing, docs, pricing, changelog, support, plus consistent site navigation.
- Auth flows: login, register, recovery, verification, and invite acceptance routes under a shared auth layout.
- Dashboard: overview, tunnels, tokens, usage, billing, settings, install, integrations, and logs.
- Backend adapters: typed, server-only fetch wrappers for auth, control plane, and billing integrations.
- Repo documentation: README files in the key route, component, constants, and lib folders.

## Architecture

- `app/(site)`: public marketing and docs routes.
- `app/(auth)`: auth flows; the route group is omitted from URLs.
- `app/dashboard`: authenticated product surface plus dashboard actions.
- `components/site`, `components/auth`, `components/dashboard`: route-family-specific UI building blocks.
- `constants`: structured content and navigation definitions.
- `lib`: metadata helpers, validation, formatters, env access, and backend normalization.

## Backend integration model

This frontend is designed to be backend-ready without pretending local mock data is production truth.

- Auth pages expect an upstream auth API under `AUTH_API_URL`.
- Dashboard data reads from `CONTROL_PLANE_API_URL` through `lib/backend/control-plane.ts`.
- Billing checkout expects a backend-issued URL from the billing or control-plane service, which can then hand off to Paddle.
- When services are not configured, pages render explicit configuration states instead of fabricated activity.
- A full backend integration map now lives in [lib/backend/README.md](/Users/sardorazimov/Desktop/binboi-app/lib/backend/README.md).

## Environment setup

Use `.env.example` as the source of truth for local and production configuration.

Environment groups:
- App: `NEXT_PUBLIC_APP_URL`
- Persistence: `DATABASE_URL`
- Auth: `AUTH_SECRET`, `AUTH_API_URL`, `AUTH_API_SECRET`
- OAuth: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_OAUTH_AUTHORIZE_URL`
- Billing / Paddle: `PADDLE_*`, `BILLING_API_URL`, `BILLING_API_KEY`
- Email: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, plus optional `EMAIL_PROVIDER`, `EMAIL_API_KEY`
- Platform services: `CONTROL_PLANE_*`, `ENGINE_*`, `INTERNAL_API_*`

Local development minimum:
- `NEXT_PUBLIC_APP_URL`
- `CONTROL_PLANE_API_URL` and `CONTROL_PLANE_API_KEY` if you want dashboard data
- `AUTH_API_URL` and `AUTH_API_SECRET` if you want auth forms to submit successfully

Production minimum:
- All local variables above
- Real database credentials
- Auth secret and OAuth credentials if social login is enabled
- Paddle keys, webhook secret, and price IDs for billing
- Resend credentials and sender identity for verification and recovery flows
- Internal service secrets for server-to-server requests

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Verification notes

- `npm run lint` is currently blocked in this environment by a toolchain issue inside installed ESLint dependencies, not by an application lint finding.
- `npm run build` also failed early in the current environment with a Next/runtime error before surfacing app-level compile output.

Those issues should be rechecked in a clean Node/Next environment after dependency/tooling normalization.


Author Sardor Azimov 
