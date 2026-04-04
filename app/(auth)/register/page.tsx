/**
 * Registration page for creating a new Binboi workspace account.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { env } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

import { registerAction } from "../actions";

export const metadata = createMetadata({
  title: "Register",
  description: "Create a Binboi account and start configuring your workspace.",
  path: "/register",
});

export default function RegisterPage() {
  const githubReady = Boolean(env.githubClientId && env.githubClientSecret);

  return (
    <AuthForm
      title="Create your workspace"
      description="Set up the account that will own your initial workspace, onboarding docs, and dashboard access."
      submitLabel="Create account"
      action={registerAction}
      githubHref={githubReady ? "/api/auth/github/start" : undefined}
      githubLabel={githubReady ? "Create with GitHub" : undefined}
      auxiliaryHref="/login"
      auxiliaryLabel="Already have an account?"
      footerHref="/docs/quick-start"
      footerLabel="Need setup context first? Read the quick start"
      fields={[
        {
          name: "name",
          label: "Full name",
          type: "text",
          placeholder: "Ada Lovelace",
          autoComplete: "name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "team@company.com",
          autoComplete: "email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Use at least 8 characters",
          autoComplete: "new-password",
          description: "Use a strong password you will not reuse elsewhere.",
        },
      ]}
    />
  );
}
