import "server-only";

import { and, asc, desc, eq } from "drizzle-orm";

import { db } from "@/database";
import {
  authAccounts,
  workspaceMemberships,
  workspaceSubscriptions,
  workspaces,
  users,
} from "@/database/schema";
import type { AppUserSession } from "@/lib/auth/session-token";

export type DashboardSessionProfile = {
  user: {
    id?: string;
    name?: string;
    email: string;
    avatarUrl?: string | null;
  };
  workspace: {
    id?: string;
    name: string;
    slug?: string;
    role?: string;
    plan?: string;
    status?: string;
  };
  auth: {
    state: string;
    verified: boolean;
    providers: string[];
  };
};

function toTitleCase(value?: string) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createFallbackProfile(session: AppUserSession): DashboardSessionProfile {
  const providers = session.email ? ["credentials"] : [];
  const verified = Boolean(session.email);

  return {
    user: {
      id: session.userId,
      name: session.name,
      email: session.email,
    },
    workspace: {
      id: session.workspaceId,
      name: "Binboi Workspace",
      role: session.role,
      plan: "starter",
      status: "active",
    },
    auth: {
      state: verified ? "Session active" : "Pending",
      verified,
      providers,
    },
  };
}

export async function getDashboardSessionProfile(
  session: AppUserSession,
): Promise<DashboardSessionProfile> {
  if (!db || !session.userId) {
    return createFallbackProfile(session);
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      emailVerifiedAt: users.emailVerifiedAt,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) {
    return createFallbackProfile(session);
  }

  const workspaceBaseQuery = db
    .select({
      workspaceId: workspaceMemberships.workspaceId,
      role: workspaceMemberships.role,
      workspaceName: workspaces.name,
      workspaceSlug: workspaces.slug,
      workspaceStatus: workspaces.status,
      workspacePlan: workspaces.plan,
      subscriptionPlan: workspaceSubscriptions.plan,
      subscriptionStatus: workspaceSubscriptions.status,
    })
    .from(workspaceMemberships)
    .innerJoin(workspaces, eq(workspaceMemberships.workspaceId, workspaces.id))
    .leftJoin(
      workspaceSubscriptions,
      eq(workspaceSubscriptions.workspaceId, workspaces.id),
    )
    .where(eq(workspaceMemberships.userId, user.id))
    .orderBy(
      desc(workspaceMemberships.isDefault),
      asc(workspaceMemberships.createdAt),
    )
    .limit(1);

  const [sessionWorkspace] =
    session.workspaceId && session.workspaceId.length > 0
      ? await db
          .select({
            workspaceId: workspaceMemberships.workspaceId,
            role: workspaceMemberships.role,
            workspaceName: workspaces.name,
            workspaceSlug: workspaces.slug,
            workspaceStatus: workspaces.status,
            workspacePlan: workspaces.plan,
            subscriptionPlan: workspaceSubscriptions.plan,
            subscriptionStatus: workspaceSubscriptions.status,
          })
          .from(workspaceMemberships)
          .innerJoin(workspaces, eq(workspaceMemberships.workspaceId, workspaces.id))
          .leftJoin(
            workspaceSubscriptions,
            eq(workspaceSubscriptions.workspaceId, workspaces.id),
          )
          .where(
            and(
              eq(workspaceMemberships.userId, user.id),
              eq(workspaceMemberships.workspaceId, session.workspaceId),
            ),
          )
          .limit(1)
      : [];

  const [defaultWorkspace] = sessionWorkspace ? [] : await workspaceBaseQuery;
  const workspace = sessionWorkspace ?? defaultWorkspace;

  const providerRows = await db
    .select({
      provider: authAccounts.provider,
    })
    .from(authAccounts)
    .where(eq(authAccounts.userId, user.id));

  const providers = providerRows.map((row) => row.provider);
  const verified = Boolean(user.emailVerifiedAt) || providers.includes("github");
  const authState = verified
    ? providers.includes("github")
      ? "Verified with GitHub"
      : "Verified account"
    : "Email verification pending";

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    },
    workspace: {
      id: workspace?.workspaceId ?? session.workspaceId,
      name: workspace?.workspaceName ?? "Binboi Workspace",
      slug: workspace?.workspaceSlug ?? undefined,
      role: workspace?.role ?? session.role,
      plan: workspace?.subscriptionPlan ?? workspace?.workspacePlan ?? "starter",
      status:
        workspace?.subscriptionStatus ?? workspace?.workspaceStatus ?? "active",
    },
    auth: {
      state: authState,
      verified,
      providers: providers.map((provider) => toTitleCase(provider)),
    },
  };
}
