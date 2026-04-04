import "server-only";

import { Resend } from "resend";

import { env, hasEnvValues } from "@/lib/env";

type EmailResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

function getEmailClient() {
  if (!hasEnvValues(env.emailApiKey, env.emailFrom)) {
    return null;
  }

  if ((env.emailProvider || "resend").toLowerCase() !== "resend") {
    return null;
  }

  return new Resend(env.emailApiKey);
}

function emailShell(input: {
  preview: string;
  title: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  note: string;
}) {
  return `
    <div style="background:#0b0d12;padding:40px 16px;font-family:Inter,Arial,sans-serif;color:#f5f7fb;">
      <div style="max-width:620px;margin:0 auto;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02));">
        <div style="font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:rgba(245,247,251,0.55);margin-bottom:16px;">Binboi Auth</div>
        <h1 style="margin:0 0 14px;font-size:30px;line-height:1.15;">${input.title}</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:rgba(245,247,251,0.72);">${input.body}</p>
        <a href="${input.ctaHref}" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#d9f99d;color:#0b0d12;text-decoration:none;font-weight:700;">
          ${input.ctaLabel}
        </a>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.8;color:rgba(245,247,251,0.56);">${input.note}</p>
        <div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;line-height:1.7;color:rgba(245,247,251,0.42);">
          ${input.preview}
        </div>
      </div>
    </div>
  `;
}

async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<EmailResult> {
  const client = getEmailClient();

  if (!client) {
    return {
      ok: false,
      message:
        "Email provider is not configured. Add RESEND_API_KEY and EMAIL_FROM to send auth emails.",
    };
  }

  try {
    const result = await client.emails.send({
      from: env.emailFrom,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: env.emailReplyTo || undefined,
    });

    if (result.error) {
      return {
        ok: false,
        message: result.error.message || "Email delivery failed.",
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Email delivery failed.",
    };
  }
}

export function isEmailDeliveryReady() {
  return Boolean(getEmailClient());
}

export async function sendVerificationEmail(input: {
  email: string;
  name?: string;
  token: string;
}) {
  const verifyHref = new URL("/verify-email", env.appUrl);
  verifyHref.searchParams.set("token", input.token);
  verifyHref.searchParams.set("email", input.email);

  const title = "Verify your email";
  const body = input.name
    ? `Hi ${input.name}, confirm your email to activate your Binboi workspace and continue into the dashboard.`
    : "Confirm your email to activate your Binboi workspace and continue into the dashboard.";
  const text = `${title}\n\n${body}\n\nOpen: ${verifyHref.toString()}\n\nIf you did not create this account, you can ignore this email.`;

  return sendEmail({
    to: input.email,
    subject: "Verify your Binboi email",
    text,
    html: emailShell({
      preview: "Use this link to verify your email and unlock your workspace.",
      title,
      body,
      ctaHref: verifyHref.toString(),
      ctaLabel: "Verify email",
      note: "If you did not create this account, you can safely ignore this message.",
    }),
  });
}

export async function sendPasswordResetEmail(input: {
  email: string;
  name?: string;
  token: string;
}) {
  const resetHref = new URL("/reset-password", env.appUrl);
  resetHref.searchParams.set("token", input.token);

  const title = "Reset your password";
  const body = input.name
    ? `Hi ${input.name}, we received a request to reset the password for your Binboi account.`
    : "We received a request to reset the password for your Binboi account.";
  const text = `${title}\n\n${body}\n\nOpen: ${resetHref.toString()}\n\nIf you did not request this, you can ignore this email.`;

  return sendEmail({
    to: input.email,
    subject: "Reset your Binboi password",
    text,
    html: emailShell({
      preview: "Use this link to set a new password for your Binboi account.",
      title,
      body,
      ctaHref: resetHref.toString(),
      ctaLabel: "Reset password",
      note: "If you did not request a password reset, no further action is needed.",
    }),
  });
}
