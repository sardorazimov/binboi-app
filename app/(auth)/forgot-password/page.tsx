/**
 * Password recovery page that starts the email-based reset flow.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { createMetadata } from "@/lib/metadata";

import { forgotPasswordAction } from "../actions";

export const metadata = createMetadata({
  title: "Forgot Password",
  description: "Request a password reset email for your Binboi account.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <AuthForm
      title="Reset your password"
      description="Enter the email tied to your workspace account and we will send a recovery link if the account exists."
      submitLabel="Send recovery email"
      action={forgotPasswordAction}
      auxiliaryHref="/login"
      auxiliaryLabel="Back to login"
      footerHref="/check-email"
      footerLabel="Already requested it? Open the check-email screen"
      fields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "team@company.com",
          autoComplete: "email",
        },
      ]}
    />
  );
}
