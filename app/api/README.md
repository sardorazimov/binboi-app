# API routes

Purpose: route handlers reserved for inbound webhooks, lightweight server endpoints, or browser-facing APIs that must live inside the Next.js app.

What belongs here:
- Webhook handlers such as Paddle callbacks when they are owned by this app.
- Thin proxy endpoints only when the browser needs a same-origin route.
- Small health or status routes that are truly app-specific.

Notes:
- The current dashboard uses server-only adapters in `lib/backend` instead of browser-facing API routes.
- Keep secrets on the server and prefer server actions or server components when possible.
- Document each route handler clearly because API surfaces become integration contracts quickly.
- Internal health routes currently live at `/api/internal/health` and `/api/internal/engine/health`.
- Internal routes must be protected with `x-binboi-internal-secret` or `Authorization: Bearer <shared-secret>`.
