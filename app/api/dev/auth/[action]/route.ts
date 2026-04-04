import { NextResponse } from "next/server";

import {
  findUserByEmail,
  getDevStore,
  registerDevUser,
} from "@/lib/backend/dev-store";

type AuthRouteContext = {
  params: Promise<{
    action: string;
  }>;
};

function unauthorized(message: string, field?: string) {
  return NextResponse.json(
    {
      message,
      fieldErrors: field ? { [field]: message } : undefined,
    },
    { status: 401 },
  );
}

export async function POST(request: Request, context: AuthRouteContext) {
  const { action } = await context.params;
  const body = (await request.json().catch(() => null)) as
    | Record<string, string>
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password?.trim() ?? "";
  const name = body?.name?.trim() ?? "";
  const token = body?.token?.trim() ?? "";
  const inviteToken = body?.inviteToken?.trim() ?? "";
  const store = getDevStore();

  switch (action) {
    case "login": {
      const user = findUserByEmail(email);

      if (!user || user.password !== password) {
        return unauthorized("Email or password is incorrect.", "email");
      }

      return NextResponse.json({
        data: {
          user: {
            email: user.email,
            name: user.name,
          },
        },
      });
    }

    case "register": {
      const result = registerDevUser({ email, name, password });

      if (!result.ok) {
        return NextResponse.json(
          {
            message: result.message,
            fieldErrors: {
              email: result.message,
            },
          },
          { status: 409 },
        );
      }

      if (!result.user) {
        return NextResponse.json(
          {
            message: "User could not be created.",
          },
          { status: 500 },
        );
      }

      const user = result.user;

      return NextResponse.json({
        data: {
          user: {
            email: user.email,
            name: user.name,
          },
        },
      });
    }

    case "forgot-password": {
      const user = findUserByEmail(email);

      if (user) {
        store.resetTokens.set(user.email, `reset_${user.id}`);
      }

      return NextResponse.json({
        message: "Recovery email sent",
        data: user ? { token: store.resetTokens.get(user.email) } : null,
      });
    }

    case "reset-password": {
      const matchedEntry = [...store.resetTokens.entries()].find(
        ([, storedToken]) => storedToken === token,
      );

      if (!matchedEntry) {
        return NextResponse.json(
          {
            message: "Reset token is invalid.",
            fieldErrors: {
              token: "Reset token is invalid.",
            },
          },
          { status: 400 },
        );
      }

      const [matchedEmail] = matchedEntry;
      const user = findUserByEmail(matchedEmail);

      if (user) {
        user.password = password;
      }

      return NextResponse.json({ message: "Password updated" });
    }

    case "verify-email": {
      if (token) {
        const matchedEntry = [...store.verifyTokens.entries()].find(
          ([, storedToken]) => storedToken === token,
        );

        if (matchedEntry) {
          const user = findUserByEmail(matchedEntry[0]);
          if (user) {
            user.verified = true;
          }
        }
      } else if (email) {
        const user = findUserByEmail(email);
        if (user) {
          store.verifyTokens.set(user.email, `verify_${user.id}`);
        }
      }

      return NextResponse.json({ message: "Verification processed" });
    }

    case "accept-invite": {
      const invite = store.invites.find((item) => item.token === inviteToken);

      if (!invite) {
        return NextResponse.json(
          {
            message: "Invite token is invalid.",
            fieldErrors: {
              inviteToken: "Invite token is invalid.",
            },
          },
          { status: 400 },
        );
      }

      const existingUser = findUserByEmail(email);
      const user = existingUser ?? {
        id: crypto.randomUUID(),
        email,
        name,
        password,
        verified: true,
      };

      if (!existingUser) {
        store.users.push(user);
      } else {
        existingUser.name = name || existingUser.name;
        existingUser.password = password || existingUser.password;
        existingUser.verified = true;
      }

      return NextResponse.json({
        data: {
          user: {
            email: user.email,
            name: user.name,
          },
          workspace: invite.workspaceName,
        },
      });
    }

    default:
      return NextResponse.json({ message: "Unknown auth action" }, { status: 404 });
  }
}
