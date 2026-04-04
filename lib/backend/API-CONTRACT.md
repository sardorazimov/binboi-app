# Backend API Contract

Purpose: exact request/response shape for the Binboi app frontend so auth, dashboard, CLI, and billing flows can be implemented without guesswork.

## Core decisions

- Web app auth uses a server-created signed cookie session.
- Product/API/CLI automation uses scoped control-plane tokens.
- Browser code does not receive upstream service secrets.
- Next.js server actions call upstream services from the server only.

## Session model

Web session:
- Cookie name: `binboi_app_session`
- Created after successful `login` or `accept-invite`
- Stored as signed HTTP-only cookie
- Lifetime: 7 days
- Signing secret: `AUTH_SECRET`

Cookie payload:

```json
{
  "email": "team@company.com",
  "name": "Sardor",
  "issuedAt": 1775251200000,
  "expiresAt": 1775856000000
}
```

Important:
- Backend auth service does not need to mint the app cookie.
- Backend only needs to return enough user identity for the app to create it.

## Auth API

Base URL:
- `AUTH_API_URL`

Headers added by app:

```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer <AUTH_API_SECRET>
```

### `POST /login`

Request:

```json
{
  "email": "team@company.com",
  "password": "secret123"
}
```

Preferred success response:

```json
{
  "data": {
    "user": {
      "email": "team@company.com",
      "name": "Sardor"
    }
  }
}
```

Also tolerated by frontend:
- top-level `{ "email": "...", "name": "..." }`
- `{ "data": { "account": { ... } } }`
- `{ "data": { "member": { ... } } }`

Error response:

```json
{
  "message": "Invalid credentials",
  "fieldErrors": {
    "email": "Email or password is incorrect"
  }
}
```

### `POST /register`

Request:

```json
{
  "email": "team@company.com",
  "name": "Sardor",
  "password": "secret123"
}
```

Success response:

```json
{
  "data": {
    "user": {
      "email": "team@company.com",
      "name": "Sardor"
    }
  }
}
```

Expected behavior:
- account created
- verification mail may be triggered by backend
- frontend does not automatically create a logged-in session here

### `POST /forgot-password`

Request:

```json
{
  "email": "team@company.com"
}
```

Success response:

```json
{
  "message": "Recovery email sent"
}
```

### `POST /reset-password`

Request:

```json
{
  "token": "reset_token_here",
  "password": "new-secret123"
}
```

Success response:

```json
{
  "message": "Password updated"
}
```

### `POST /verify-email`

Request:

Token mode:

```json
{
  "token": "verify_token_here",
  "email": ""
}
```

Email resend mode:

```json
{
  "token": "",
  "email": "team@company.com"
}
```

Success response:

```json
{
  "message": "Verification processed"
}
```

### `POST /accept-invite`

Request:

```json
{
  "inviteToken": "invite_token_here",
  "email": "team@company.com",
  "name": "Sardor",
  "password": "secret123"
}
```

Success response:

```json
{
  "data": {
    "user": {
      "email": "team@company.com",
      "name": "Sardor"
    }
  }
}
```

Expected behavior:
- invite accepted
- account ready
- frontend creates local app session immediately

## Control plane API

Base URL:
- `CONTROL_PLANE_API_URL`

Headers added by app:

```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer <CONTROL_PLANE_API_KEY>
```

The frontend accepts either:
- raw payload
- `{ "data": ... }`
- `{ "items": [...] }`

### `GET /v1/dashboard/overview`

Preferred response:

```json
{
  "data": {
    "activeTunnels": 4,
    "requestsToday": 128450,
    "activeTokens": 7,
    "activeProjects": 3,
    "errorRate": 0.012,
    "incidentStatus": "healthy"
  }
}
```

Normalized frontend type:

```json
{
  "activeTunnels": 4,
  "requestsToday": 128450,
  "activeTokens": 7,
  "activeProjects": 3,
  "errorRate": 0.012,
  "incidentStatus": "healthy"
}
```

### `GET /v1/tunnels`

Preferred response:

```json
{
  "items": [
    {
      "id": "tun_123",
      "name": "docs-preview",
      "hostname": "docs-preview.binboi.dev",
      "protocol": "http",
      "region": "fra",
      "status": "healthy",
      "requests24h": 18240,
      "lastSeenAt": "2026-04-04T10:30:00.000Z"
    }
  ]
}
```

### `GET /v1/tokens`

Preferred response:

```json
{
  "items": [
    {
      "id": "tok_123",
      "name": "CI deploy",
      "prefix": "bnb_",
      "scope": "tunnels:manage",
      "createdAt": "2026-04-01T09:00:00.000Z",
      "lastUsedAt": "2026-04-04T08:00:00.000Z"
    }
  ]
}
```

### `POST /v1/tokens`

Request:

```json
{
  "name": "CI deploy",
  "scope": "tunnels:manage"
}
```

Success response:

```json
{
  "data": {
    "id": "tok_123",
    "name": "CI deploy",
    "prefix": "bnb_",
    "scope": "tunnels:manage",
    "token": "bnb_live_secret_value",
    "createdAt": "2026-04-04T10:00:00.000Z"
  }
}
```

Important:
- `token` must be returned on create
- frontend expects one-time secret reveal here

### `DELETE /v1/tokens/:id`

Success response:

```json
{
  "ok": true
}
```

### `GET /v1/usage`

Preferred response:

```json
{
  "data": {
    "period": {
      "label": "April 2026",
      "requests": 1822400,
      "bandwidthGb": 92.4,
      "errorRate": 0.014
    },
    "series": [
      {
        "date": "2026-04-01",
        "requests": 71234,
        "errors": 82
      }
    ],
    "topRoutes": [
      {
        "route": "/internal/docs",
        "requests": 401245
      }
    ]
  }
}
```

### `GET /v1/billing`

Preferred response:

```json
{
  "data": {
    "planName": "Team",
    "status": "active",
    "monthlySpendUsd": 49,
    "includedRequests": 1000000,
    "usageRequests": 1822400,
    "renewalDate": "2026-05-01T00:00:00.000Z",
    "customerPortalUrl": "https://billing.example.com/portal/session_123"
  }
}
```

### `POST /v1/billing/checkout`

Request:

```json
{
  "planId": "team"
}
```

Success response:

```json
{
  "url": "https://billing.example.com/checkout/session_123"
}
```

Important:
- frontend redirects immediately to `url`

## Engine API

Base URL:
- `ENGINE_API_URL`

Headers added by app:

```http
Accept: application/json
Authorization: Bearer <ENGINE_API_KEY>
```

### `GET ENGINE_HEALTH_PATH`

Preferred response:

```json
{
  "data": {
    "status": "healthy",
    "version": "0.1.0",
    "instanceName": "binboi-go-fra-1",
    "region": "fra",
    "uptimeSeconds": 86400
  }
}
```

### `GET ENGINE_TUNNELS_PATH`

Preferred response:

```json
{
  "items": [
    {
      "id": "tun_123",
      "name": "docs-preview",
      "status": "healthy",
      "lastSeenAt": "2026-04-04T10:30:00.000Z"
    }
  ]
}
```

## Internal app routes

These are Next.js route handlers, not upstream services.

### `GET /api/internal/engine/health`

Protection:
- `x-binboi-internal-secret: <secret>`
- or `Authorization: Bearer <secret>`

Success response:

```json
{
  "configured": true,
  "data": {
    "status": "healthy",
    "version": "0.1.0",
    "instanceName": "binboi-go-fra-1",
    "region": "fra",
    "uptimeSeconds": 86400
  },
  "ok": true
}
```

### `GET /api/internal/health`

Success response:

```json
{
  "ok": true,
  "services": {
    "auth": {
      "configured": true,
      "baseUrl": "http://127.0.0.1:9000"
    },
    "controlPlane": {
      "configured": true,
      "baseUrl": "http://127.0.0.1:9080"
    },
    "billing": {
      "configured": true,
      "baseUrl": "http://127.0.0.1:9080"
    },
    "engine": {
      "configured": true,
      "baseUrl": "http://127.0.0.1:9081",
      "health": {
        "status": "healthy",
        "version": "0.1.0",
        "instanceName": "binboi-go-fra-1",
        "region": "fra",
        "uptimeSeconds": 86400
      },
      "error": null
    }
  }
}
```

## Error contract

Preferred error shape across all upstream services:

```json
{
  "message": "Human-readable error",
  "fieldErrors": {
    "email": "Use a valid email address"
  }
}
```

Also accepted by frontend:
- `{ "error": "..." }`
- `{ "detail": "..." }`
- `{ "errors": { "field": "..." } }`
- `{ "errors": { "field": ["..."] } }`

## Recommended rollout order

1. Implement auth endpoints exactly as listed above.
2. Confirm login and accept-invite both return user identity.
3. Implement `GET /v1/tokens` and `POST /v1/tokens` first for dashboard usability.
4. Add overview, tunnels, and usage for the main dashboard.
5. Add billing summary and checkout URL minting.
6. Wire engine health and tunnel endpoints.
