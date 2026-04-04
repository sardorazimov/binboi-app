"use client";

/**
 * Client-side token manager for create and revoke workflows backed by server actions.
 */
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { createTokenAction, revokeTokenAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/panel";
import { Select } from "@/components/ui/select";
import { INITIAL_FORM_STATE } from "@/lib/form-state";
import type { ApiToken } from "@/lib/backend/contracts";
import { formatDateTime } from "@/lib/formatters";

type TokenManagerProps = {
  tokens: ApiToken[];
  configured: boolean;
};

function RevokeButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="danger" size="sm" disabled={pending}>
      {pending ? "Revoking..." : "Revoke"}
    </Button>
  );
}

export function TokenManager({ configured, tokens }: TokenManagerProps) {
  const [state, formAction, pending] = useActionState(
    createTokenAction,
    INITIAL_FORM_STATE,
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <Panel className="rounded-[20px] border border-white/[0.08] bg-[#050505] p-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Create token</h2>
          <p className="text-sm leading-7 text-white/62">
            Name the workflow clearly and keep scopes narrow. Newly created secrets
            are shown once so teams can copy them into secure storage immediately.
          </p>
        </div>

        <form action={formAction} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/84">Token name</span>
            <Input
              name="name"
              placeholder="CI deploy token"
              required
              disabled={!configured}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/84">Scope</span>
            <Select name="scope" defaultValue="workspace:read" disabled={!configured}>
              <option value="workspace:read">Workspace read</option>
              <option value="workspace:write">Workspace write</option>
              <option value="tunnels:manage">Tunnel manage</option>
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
              <p>{state.message}</p>
              {state.revealedSecret ? (
                <code className="mt-2 block overflow-x-auto rounded-xl border border-white/[0.08] bg-black px-3 py-2 text-xs text-white">
                  {state.revealedSecret}
                </code>
              ) : null}
            </div>
          ) : null}

          <Button className="w-full" disabled={!configured || pending}>
            {pending ? "Creating..." : "Create token"}
          </Button>
        </form>
      </Panel>

      <Panel className="rounded-[20px] border border-white/[0.08] bg-[#050505] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Active tokens</h2>
            <p className="mt-2 text-sm leading-7 text-white/62">
              Review prefixes, scopes, and last-used activity before you rotate.
            </p>
          </div>
          <p className="text-sm text-white/46">{tokens.length} total</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.08]">
          <table className="min-w-full divide-y divide-white/8 text-left text-sm">
            <thead className="bg-[#090909] text-white/48">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Prefix</th>
                <th className="px-4 py-3 font-medium">Scope</th>
                <th className="px-4 py-3 font-medium">Last used</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 bg-[#050505]">
              {tokens.length ? (
                tokens.map((token) => (
                  <tr key={token.id} className="bg-[#050505]">
                    <td className="px-4 py-4 text-white">{token.name}</td>
                    <td className="px-4 py-4 text-white/64">{token.prefix}</td>
                    <td className="px-4 py-4 text-white/64">{token.scope}</td>
                    <td className="px-4 py-4 text-white/64">
                      {token.lastUsedAt ? formatDateTime(token.lastUsedAt) : "Never"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <form action={revokeTokenAction.bind(null, token.id)}>
                        <RevokeButton />
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-white/46">
                    No tokens returned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
