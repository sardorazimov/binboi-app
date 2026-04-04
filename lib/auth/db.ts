import "server-only";

import { randomBytes } from "node:crypto";

import bcrypt from "bcryptjs";
import { and, asc, desc, eq, gt, isNull } from "drizzle-orm";

import { getDb } from "@/database";
import {
  authAccounts,
  emailVerificationTokens,
  passwordCredentials,
  passwordResetTokens,
  workspaceInvites,
  workspaceMemberships,
  workspaceSubscriptions,
  workspaces,
  users,
} from "@/database/schema";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/email";
import { env } from "@/lib/env";

type AuthFieldErrors = Record<string, string>;

export type SessionIdentity = {
  userId: string;
  workspaceId?: string;
  role?: string;
  email: string;
  name?: string;
};

export type AuthMutationResult =
  | {
      ok: true;
      message?: string;
      identity?: SessionIdentity;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: AuthFieldErrors;
    };

type UserRecord = typeof users.$inferSelect;

type GitHubAuthInput = {
  accountId: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenType?: string | null;
  scope?: string | null;
  expiresAt?: Date | null;
  emailVerified?: boolean;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function slugifyWorkspaceName(value: string) {
  const base = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || `workspace-${randomBytes(3).toString("hex")}`;
}

function createOpaqueToken(size = 24) {
  return randomBytes(size).toString("base64url");
}

async function generateUniqueWorkspaceSlug(name: string) {
  const db = getDb();
  const base = slugifyWorkspaceName(name);
  let suffix = 0;

  while (true) {
    const candidate = suffix === 0 ? base : `${base}-${suffix + 1}`;
    const existing = await db
      .select({ id: workspaces.id })
      .from(workspaces)
      .where(eq(workspaces.slug, candidate))
      .limit(1);

    if (!existing[0]) {
      return candidate;
    }

    suffix += 1;
  }
}

async function findUserByEmail(email: string) {
  const db = getDb();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizeEmail(email)))
    .limit(1);

  return user ?? null;
}

async function ensureWorkspaceContextForUser(userId: string) {
  const db = getDb();
  const [membership] = await db
    .select({
      workspaceId: workspaceMemberships.workspaceId,
      role: workspaceMemberships.role,
      isDefault: workspaceMemberships.isDefault,
      workspaceName: workspaces.name,
    })
    .from(workspaceMemberships)
    .innerJoin(workspaces, eq(workspaceMemberships.workspaceId, workspaces.id))
    .where(eq(workspaceMemberships.userId, userId))
    .orderBy(desc(workspaceMemberships.isDefault), asc(workspaceMemberships.createdAt))
    .limit(1);

  if (membership) {
    return {
      workspaceId: membership.workspaceId,
      role: membership.role,
      workspaceName: membership.workspaceName,
    };
  }

  const [user] = await getDb()
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return null;
  }

  const workspaceName = `${user.name.split(" ")[0] || "Binboi"} workspace`;
  const slug = await generateUniqueWorkspaceSlug(workspaceName);

  const [workspace] = await db
    .insert(workspaces)
    .values({
      name: workspaceName,
      slug,
      createdByUserId: user.id,
    })
    .returning({
      id: workspaces.id,
      name: workspaces.name,
    });

  await db.insert(workspaceMemberships).values({
    workspaceId: workspace.id,
    userId: user.id,
    role: "owner",
    isDefault: true,
  });

  await db.insert(workspaceSubscriptions).values({
    workspaceId: workspace.id,
    plan: "starter",
    status: "draft",
    includedRequests: 50000,
    usageRequests: 0,
    monthlySpendUsd: "0",
  });

  return {
    workspaceId: workspace.id,
    role: "owner" as const,
    workspaceName: workspace.name,
  };
}

async function buildIdentity(user: UserRecord): Promise<SessionIdentity> {
  const workspaceContext = await ensureWorkspaceContextForUser(user.id);

  return {
    userId: user.id,
    workspaceId: workspaceContext?.workspaceId,
    role: workspaceContext?.role,
    email: user.email,
    name: user.name,
  };
}

async function upsertCredentialsAccount(userId: string, email: string) {
  const db = getDb();
  const [existing] = await db
    .select({ id: authAccounts.id })
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.userId, userId),
        eq(authAccounts.provider, "credentials"),
      ),
    )
    .limit(1);

  if (existing) {
    return;
  }

  await db.insert(authAccounts).values({
    userId,
    provider: "credentials",
    providerAccountId: normalizeEmail(email),
  });
}

async function issueVerificationToken(userId: string) {
  const db = getDb();
  const token = createOpaqueToken();

  await db.insert(emailVerificationTokens).values({
    userId,
    token,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  return token;
}

async function issuePasswordResetToken(userId: string) {
  const db = getDb();
  const token = createOpaqueToken();

  await db.insert(passwordResetTokens).values({
    userId,
    token,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30),
  });

  return token;
}

export function isDatabaseAuthReady() {
  return Boolean(env.databaseUrl);
}

export async function registerUserWithPassword(input: {
  email: string;
  name: string;
  password: string;
}): Promise<AuthMutationResult> {
  const db = getDb();
  const email = normalizeEmail(input.email);
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return {
      ok: false,
      message: "An account with this email already exists.",
      fieldErrors: {
        email: "Use a different email or sign in instead.",
      },
    };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const [user] = await db
    .insert(users)
    .values({
      email,
      name: input.name.trim(),
    })
    .returning();

  await db.insert(passwordCredentials).values({
    userId: user.id,
    passwordHash,
  });

  await upsertCredentialsAccount(user.id, email);

  const workspaceName = `${input.name.trim().split(" ")[0] || "Binboi"} workspace`;
  const slug = await generateUniqueWorkspaceSlug(workspaceName);
  const [workspace] = await db
    .insert(workspaces)
    .values({
      name: workspaceName,
      slug,
      createdByUserId: user.id,
      plan: "starter",
      status: "active",
    })
    .returning({
      id: workspaces.id,
    });

  await db.insert(workspaceMemberships).values({
    workspaceId: workspace.id,
    userId: user.id,
    role: "owner",
    isDefault: true,
  });

  await db.insert(workspaceSubscriptions).values({
    workspaceId: workspace.id,
    plan: "starter",
    status: "draft",
    includedRequests: 50000,
    usageRequests: 0,
    monthlySpendUsd: "0",
  });

  const verificationToken = await issueVerificationToken(user.id);
  const emailResult = await sendVerificationEmail({
    email: user.email,
    name: user.name,
    token: verificationToken,
  });

  return {
    ok: true,
    message:
      emailResult.ok
        ? "Account created. Check your inbox to verify your email before logging in."
        : "Account created, but the verification email could not be sent yet. Open verify-email and request a new link after checking email setup.",
  };
}

export async function authenticateUserWithPassword(input: {
  email: string;
  password: string;
}): Promise<AuthMutationResult> {
  const db = getDb();
  const email = normalizeEmail(input.email);
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  const [credentials] = await db
    .select()
    .from(passwordCredentials)
    .where(eq(passwordCredentials.userId, user.id))
    .limit(1);

  if (!credentials) {
    return {
      ok: false,
      message: "This account does not have a password login yet.",
      fieldErrors: {
        email: "Use GitHub for this account or add a password later.",
      },
    };
  }

  const passwordMatches = await bcrypt.compare(input.password, credentials.passwordHash);

  if (!passwordMatches) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  if (!user.emailVerifiedAt) {
    return {
      ok: false,
      message: "Verify your email before logging in.",
      fieldErrors: {
        email: "Open the verification email we sent, or request a new one.",
      },
    };
  }

  return {
    ok: true,
    identity: await buildIdentity(user),
  };
}

export async function requestPasswordReset(input: {
  email: string;
}): Promise<AuthMutationResult> {
  const user = await findUserByEmail(input.email);

  if (user) {
    const token = await issuePasswordResetToken(user.id);
    const emailResult = await sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      token,
    });

    if (!emailResult.ok) {
      return {
        ok: false,
        message:
          "Recovery email could not be sent right now. Check RESEND_API_KEY and EMAIL_FROM, then try again.",
      };
    }
  }

  return {
    ok: true,
    message: "If this email exists, a recovery link has been sent.",
  };
}

export async function resetPasswordWithToken(input: {
  token: string;
  password: string;
}): Promise<AuthMutationResult> {
  const db = getDb();
  const [record] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.token, input.token),
        isNull(passwordResetTokens.consumedAt),
        gt(passwordResetTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!record) {
    return {
      ok: false,
      message: "Reset token is invalid or expired.",
      fieldErrors: {
        token: "Use a fresh reset link.",
      },
    };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const [existing] = await db
    .select({ userId: passwordCredentials.userId })
    .from(passwordCredentials)
    .where(eq(passwordCredentials.userId, record.userId))
    .limit(1);

  if (existing) {
    await db
      .update(passwordCredentials)
      .set({
        passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(passwordCredentials.userId, record.userId));
  } else {
    await db.insert(passwordCredentials).values({
      userId: record.userId,
      passwordHash,
    });
  }

  await db
    .update(passwordResetTokens)
    .set({
      consumedAt: new Date(),
    })
    .where(eq(passwordResetTokens.id, record.id));

  return {
    ok: true,
    message: "Password reset complete.",
  };
}

export async function verifyEmailRecord(input: {
  token?: string;
  email?: string;
}): Promise<AuthMutationResult> {
  const db = getDb();

  if (input.token) {
    const [record] = await db
      .select()
      .from(emailVerificationTokens)
      .where(
        and(
          eq(emailVerificationTokens.token, input.token),
          isNull(emailVerificationTokens.consumedAt),
          gt(emailVerificationTokens.expiresAt, new Date()),
        ),
      )
      .limit(1);

    if (!record) {
      return {
        ok: false,
        message: "Verification token is invalid or expired.",
        fieldErrors: {
          token: "Use a fresh verification link.",
        },
      };
    }

    await db
      .update(users)
      .set({
        emailVerifiedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, record.userId));

    await db
      .update(emailVerificationTokens)
      .set({
        consumedAt: new Date(),
      })
      .where(eq(emailVerificationTokens.id, record.id));

    return {
      ok: true,
      message: "Email verified.",
    };
  }

  if (input.email) {
    const user = await findUserByEmail(input.email);

    if (user) {
      const token = await issueVerificationToken(user.id);
      const emailResult = await sendVerificationEmail({
        email: user.email,
        name: user.name,
        token,
      });

      if (!emailResult.ok) {
        return {
          ok: false,
          message:
            "Verification email could not be sent right now. Check RESEND_API_KEY and EMAIL_FROM, then try again.",
        };
      }
    }
  }

  return {
    ok: true,
    message: "If the account exists, a verification email has been sent.",
  };
}

export async function acceptInviteWithPassword(input: {
  inviteToken: string;
  email: string;
  name: string;
  password: string;
}): Promise<AuthMutationResult> {
  const db = getDb();
  const email = normalizeEmail(input.email);
  const [invite] = await db
    .select()
    .from(workspaceInvites)
    .where(
      and(
        eq(workspaceInvites.token, input.inviteToken),
        isNull(workspaceInvites.acceptedAt),
        gt(workspaceInvites.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!invite) {
    return {
      ok: false,
      message: "Invite token is invalid or expired.",
      fieldErrors: {
        inviteToken: "Use a fresh invite link.",
      },
    };
  }

  if (normalizeEmail(invite.email) !== email) {
    return {
      ok: false,
      message: "Invite email does not match this account.",
      fieldErrors: {
        email: "Use the email address that received the invite.",
      },
    };
  }

  let user = await findUserByEmail(email);

  if (!user) {
    const passwordHash = await bcrypt.hash(input.password, 12);
    [user] = await db
      .insert(users)
      .values({
        email,
        name: input.name.trim(),
      })
      .returning();

    await db.insert(passwordCredentials).values({
      userId: user.id,
      passwordHash,
    });

    await upsertCredentialsAccount(user.id, email);
  } else {
    const [credentials] = await db
      .select({ userId: passwordCredentials.userId })
      .from(passwordCredentials)
      .where(eq(passwordCredentials.userId, user.id))
      .limit(1);

    if (!credentials) {
      await db.insert(passwordCredentials).values({
        userId: user.id,
        passwordHash: await bcrypt.hash(input.password, 12),
      });
      await upsertCredentialsAccount(user.id, email);
    }
  }

  const [existingMembership] = await db
    .select({ workspaceId: workspaceMemberships.workspaceId })
    .from(workspaceMemberships)
    .where(
      and(
        eq(workspaceMemberships.workspaceId, invite.workspaceId),
        eq(workspaceMemberships.userId, user.id),
      ),
    )
    .limit(1);

  if (!existingMembership) {
    await db.insert(workspaceMemberships).values({
      workspaceId: invite.workspaceId,
      userId: user.id,
      role: invite.role,
      isDefault: false,
    });
  }

  await db
    .update(workspaceInvites)
    .set({
      acceptedAt: new Date(),
    })
    .where(eq(workspaceInvites.id, invite.id));

  return {
    ok: true,
    identity: {
      ...(await buildIdentity(user)),
      workspaceId: invite.workspaceId,
      role: invite.role,
    },
  };
}

export async function findOrCreateGitHubUser(
  input: GitHubAuthInput,
): Promise<AuthMutationResult> {
  const db = getDb();
  const email = normalizeEmail(input.email);

  const [existingAuthAccount] = await db
    .select()
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.provider, "github"),
        eq(authAccounts.providerAccountId, input.accountId),
      ),
    )
    .limit(1);

  if (existingAuthAccount) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, existingAuthAccount.userId))
      .limit(1);

    if (!user) {
      return {
        ok: false,
        message: "GitHub account is linked to a missing user record.",
      };
    }

    await db
      .update(authAccounts)
      .set({
        accessToken: input.accessToken ?? null,
        refreshToken: input.refreshToken ?? null,
        tokenType: input.tokenType ?? null,
        scope: input.scope ?? null,
        expiresAt: input.expiresAt ?? null,
        updatedAt: new Date(),
      })
      .where(eq(authAccounts.id, existingAuthAccount.id));

    await db
      .update(users)
      .set({
        name: input.name || user.name,
        avatarUrl: input.avatarUrl ?? user.avatarUrl,
        emailVerifiedAt:
          input.emailVerified && !user.emailVerifiedAt
            ? new Date()
            : user.emailVerifiedAt,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return {
      ok: true,
      identity: await buildIdentity({
        ...user,
        name: input.name || user.name,
        avatarUrl: input.avatarUrl ?? user.avatarUrl,
        emailVerifiedAt:
          input.emailVerified && !user.emailVerifiedAt
            ? new Date()
            : user.emailVerifiedAt,
      }),
    };
  }

  let user = await findUserByEmail(email);

  if (!user) {
    [user] = await db
      .insert(users)
      .values({
        email,
        name: input.name,
        avatarUrl: input.avatarUrl ?? null,
        emailVerifiedAt: input.emailVerified ? new Date() : null,
      })
      .returning();
  } else {
    await db
      .update(users)
      .set({
        name: input.name || user.name,
        avatarUrl: input.avatarUrl ?? user.avatarUrl,
        emailVerifiedAt:
          input.emailVerified && !user.emailVerifiedAt
            ? new Date()
            : user.emailVerifiedAt,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    user = {
      ...user,
      name: input.name || user.name,
      avatarUrl: input.avatarUrl ?? user.avatarUrl,
      emailVerifiedAt:
        input.emailVerified && !user.emailVerifiedAt
          ? new Date()
          : user.emailVerifiedAt,
    };
  }

  await db.insert(authAccounts).values({
    userId: user.id,
    provider: "github",
    providerAccountId: input.accountId,
    accessToken: input.accessToken ?? null,
    refreshToken: input.refreshToken ?? null,
    tokenType: input.tokenType ?? null,
    scope: input.scope ?? null,
    expiresAt: input.expiresAt ?? null,
  });

  await ensureWorkspaceContextForUser(user.id);

  return {
    ok: true,
    identity: await buildIdentity(user),
  };
}
