/**
 * Informational screen shown after recovery or verification requests.
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Check Email",
  description: "Guidance after triggering verification or recovery emails.",
  path: "/check-email",
});

export default function CheckEmailPage() {
  return (
    <Panel className="space-y-6 rounded-[32px] p-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
          Check your inbox
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Watch for a message from Binboi
        </h1>
        <p className="text-sm leading-7 text-foreground/66">
          We send verification and recovery emails directly from the app. If nothing arrives,
          double-check the address you submitted and give your inbox a minute.
        </p>
      </div>

      <div className="grid gap-3 text-sm leading-7 text-foreground/66">
        <p>1. Confirm the email address you submitted.</p>
        <p>2. Check spam or filtered folders if nothing arrives.</p>
        <p>3. Return to reset or verify once you have the token.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/verify-email">Verify email</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/reset-password">Reset password</Link>
        </Button>
      </div>
    </Panel>
  );
}
