# Docs routes

Purpose: structured documentation for setup, auth, tunnels, requests, and debugging.

What belongs here:
- Docs landing page and article routes.
- Docs-only layout concerns such as sidebar navigation and article presentation.
- Route metadata for documentation pages.

Notes:
- Article content currently lives in `constants/site-content.ts` so the docs IA is easy to audit in one place.
- `app/(site)/docs/[...slug]/page.tsx` is the contract between docs URLs and structured article content.
- If documentation grows significantly, move content definitions into a dedicated `lib/content` folder while keeping the route API stable.


API gateway
Early access
Webhook gateway
