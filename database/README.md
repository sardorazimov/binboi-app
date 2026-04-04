# Database Setup

Binboi now has a Neon + Drizzle schema that covers auth, workspaces, invites, tokens, tunnels, usage, and billing.

## Commands

- `npm run db:generate`
  Generates SQL migrations from `database/schema.ts`.
- `npm run db:push`
  Applies the schema to the database defined by `DATABASE_URL`.
- `npm run db:studio`
  Opens Drizzle Studio against the configured database.

## Environment

- `DATABASE_URL`
- `AUTH_SECRET`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_OAUTH_AUTHORIZE_URL`

## Table map

Identity:
- `users`: base profile record
- `password_credentials`: email/password hash per user
- `auth_accounts`: external providers like GitHub
- `email_verification_tokens`: email verification flow
- `password_reset_tokens`: password recovery flow
- `app_sessions`: reserved for durable app sessions if we persist them later

Workspace:
- `workspaces`: workspace root record
- `workspace_memberships`: user role inside each workspace
- `workspace_invites`: invite token flow for new members
- `workspace_subscriptions`: plan, billing status, renewal state

Runtime product data:
- `api_tokens`: control-plane tokens
- `tunnels`: active tunnel inventory and health
- `usage_daily`: daily usage aggregation

## Auth behavior

- Email/password auth is handled from `app/(auth)/actions.ts` through `lib/auth/db.ts`
- Transactional email delivery is handled by `lib/email.ts` through Resend
- GitHub OAuth routes live in:
  - `app/api/auth/github/start/route.ts`
  - `app/api/auth/github/callback/route.ts`
- Signed browser session cookie stays in `binboi_app_session`
- Session payload now carries:
  - `userId`
  - `workspaceId`
  - `role`
  - `email`
  - `name`

## Rollout order

1. Set `DATABASE_URL` in `.env`
2. Run `npm run db:generate`
3. Run `npm run db:push`
4. Add GitHub OAuth envs if social login is needed
5. Test `register`, `login`, `forgot-password`, `verify-email`, and GitHub callback
