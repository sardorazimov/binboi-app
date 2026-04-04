"use client";

/**
 * Billing checkout form that calls the server action and reports configuration gaps clearly.
 */
import { useActionState } from "react";

import { startCheckoutAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Select } from "@/components/ui/select";
import { INITIAL_FORM_STATE } from "@/lib/form-state";

export function BillingCheckoutCard({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(
    startCheckoutAction,
    INITIAL_FORM_STATE,
  );

  return (
    <Panel className="rounded-[20px] border border-white/[0.08] bg-[#050505] p-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Change or start billing</h2>
        <p className="text-sm leading-7 text-white/62">
          The preferred production path is a backend-issued Paddle checkout or customer
          portal URL. This form is already wired for that integration.
        </p>
      </div>

      <form action={formAction} className="mt-6 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/84">Plan</span>
          <Select name="planId" defaultValue="team" disabled={!configured}>
            <option value="starter">Starter</option>
            <option value="team">Team</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </label>

        {state.message ? (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-white/[0.08] bg-[#080808] text-white"
                : "border-red-500/20 bg-red-500/10 text-red-100"
            }`}
          >
            {state.message}
          </div>
        ) : null}

        <Button className="w-full" disabled={!configured || pending}>
          {pending ? "Preparing..." : "Continue to billing"}
        </Button>
      </form>
    </Panel>
  );
}
