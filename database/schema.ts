import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const authProviderEnum = pgEnum("auth_provider", [
  "credentials",
  "github",
]);

export const workspaceRoleEnum = pgEnum("workspace_role", [
  "owner",
  "admin",
  "member",
  "viewer",
]);

export const workspacePlanEnum = pgEnum("workspace_plan", [
  "starter",
  "team",
  "enterprise",
]);

export const workspaceStatusEnum = pgEnum("workspace_status", [
  "active",
  "invited",
  "suspended",
]);

export const tokenStatusEnum = pgEnum("api_token_status", [
  "active",
  "revoked",
]);

export const tunnelStatusEnum = pgEnum("tunnel_status", [
  "healthy",
  "degraded",
  "offline",
]);

export const billingStatusEnum = pgEnum("billing_status", [
  "draft",
  "trialing",
  "active",
  "past_due",
  "canceled",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    avatarUrl: text("avatar_url"),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    emailUnique: uniqueIndex("users_email_unique").on(table.email),
  }),
);

export const passwordCredentials = pgTable(
  "password_credentials",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId], name: "password_credentials_pk" }),
  }),
);

export const authAccounts = pgTable(
  "auth_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: authProviderEnum("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    tokenType: text("token_type"),
    scope: text("scope"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    providerAccountUnique: uniqueIndex("auth_accounts_provider_account_unique").on(
      table.provider,
      table.providerAccountId,
    ),
    userIndex: index("auth_accounts_user_id_idx").on(table.userId),
  }),
);

export const workspaces = pgTable(
  "workspaces",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    plan: workspacePlanEnum("plan").default("starter").notNull(),
    status: workspaceStatusEnum("status").default("active").notNull(),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    slugUnique: uniqueIndex("workspaces_slug_unique").on(table.slug),
  }),
);

export const workspaceMemberships = pgTable(
  "workspace_memberships",
  {
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: workspaceRoleEnum("role").default("member").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.workspaceId, table.userId],
      name: "workspace_memberships_pk",
    }),
    userIndex: index("workspace_memberships_user_id_idx").on(table.userId),
  }),
);

export const workspaceInvites = pgTable(
  "workspace_invites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: workspaceRoleEnum("role").default("member").notNull(),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tokenUnique: uniqueIndex("workspace_invites_token_unique").on(table.token),
    workspaceEmailUnique: uniqueIndex("workspace_invites_workspace_email_unique").on(
      table.workspaceId,
      table.email,
    ),
  }),
);

export const emailVerificationTokens = pgTable(
  "email_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tokenUnique: uniqueIndex("email_verification_tokens_token_unique").on(table.token),
    userIndex: index("email_verification_tokens_user_id_idx").on(table.userId),
  }),
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tokenUnique: uniqueIndex("password_reset_tokens_token_unique").on(table.token),
    userIndex: index("password_reset_tokens_user_id_idx").on(table.userId),
  }),
);

export const appSessions = pgTable(
  "app_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id").references(() => workspaces.id, {
      onDelete: "set null",
    }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIndex: index("app_sessions_user_id_idx").on(table.userId),
  }),
);

export const apiTokens = pgTable(
  "api_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(),
    prefix: text("prefix").notNull(),
    lastFour: text("last_four").notNull(),
    tokenHash: text("token_hash").notNull(),
    scope: text("scope").notNull(),
    status: tokenStatusEnum("status").default("active").notNull(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workspaceIndex: index("api_tokens_workspace_id_idx").on(table.workspaceId),
  }),
);

export const tunnels = pgTable(
  "tunnels",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(),
    hostname: text("hostname").notNull(),
    protocol: text("protocol").default("http").notNull(),
    region: text("region").default("global").notNull(),
    status: tunnelStatusEnum("status").default("healthy").notNull(),
    requests24h: integer("requests_24h").default(0).notNull(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>().default(null),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workspaceIndex: index("tunnels_workspace_id_idx").on(table.workspaceId),
    workspaceNameUnique: uniqueIndex("tunnels_workspace_name_unique").on(
      table.workspaceId,
      table.name,
    ),
  }),
);

export const usageDaily = pgTable(
  "usage_daily",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    day: date("day", { mode: "date" }).notNull(),
    requests: integer("requests").default(0).notNull(),
    errors: integer("errors").default(0).notNull(),
    bandwidthGb: numeric("bandwidth_gb", { precision: 12, scale: 2 }).default("0").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workspaceDayUnique: uniqueIndex("usage_daily_workspace_day_unique").on(
      table.workspaceId,
      table.day,
    ),
  }),
);

export const workspaceSubscriptions = pgTable(
  "workspace_subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    paddleCustomerId: text("paddle_customer_id"),
    paddleSubscriptionId: text("paddle_subscription_id"),
    plan: workspacePlanEnum("plan").default("starter").notNull(),
    status: billingStatusEnum("status").default("draft").notNull(),
    monthlySpendUsd: numeric("monthly_spend_usd", { precision: 12, scale: 2 })
      .default("0")
      .notNull(),
    includedRequests: integer("included_requests").default(0).notNull(),
    usageRequests: integer("usage_requests").default(0).notNull(),
    renewalDate: timestamp("renewal_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workspaceUnique: uniqueIndex("workspace_subscriptions_workspace_unique").on(
      table.workspaceId,
    ),
  }),
);

//// Database db schema author Sardor Azimov