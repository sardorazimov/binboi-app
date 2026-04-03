"use client";

/**
 * Generic auth form with server-action state handling and premium dark styling.
 */
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { INITIAL_FORM_STATE, type FormState } from "@/lib/form-state";

type AuthField = {
  name: string;
  label: string;
  type?: "email" | "password" | "text" | "hidden";
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  description?: string;
  required?: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
};

type AuthFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  fields: AuthField[];
  auxiliaryHref?: string;
  auxiliaryLabel?: string;
  footerLabel?: string;
  footerHref?: string;
};

export function AuthForm({
  action,
  auxiliaryHref,
  auxiliaryLabel,
  description,
  fields,
  footerHref,
  footerLabel,
  submitLabel,
  title,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, INITIAL_FORM_STATE);

  return (
    <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))] p-8 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
          Secure access
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm leading-7 text-foreground/68">{description}</p>
      </div>

      <form action={formAction} className="mt-8 space-y-5">
        {fields.map((field) => {
          if (field.type === "hidden") {
            return (
              <input
                key={field.name}
                type="hidden"
                name={field.name}
                defaultValue={field.defaultValue}
              />
            );
          }

          const error = state.fieldErrors?.[field.name];

          return (
            <label key={field.name} className="block space-y-2">
              <span className="text-sm font-medium text-foreground/85">
                {field.label}
              </span>
              {field.options ? (
                <Select name={field.name} defaultValue={field.defaultValue}>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  name={field.name}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  defaultValue={field.defaultValue}
                  required={field.required ?? true}
                />
              )}
              {field.description ? (
                <p className="text-xs text-foreground/45">{field.description}</p>
              ) : null}
              {error ? <p className="text-xs text-red-300">{error}</p> : null}
            </label>
          );
        })}

        {state.message ? (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-white/10 bg-white/[0.05] text-foreground"
                : "border-red-500/20 bg-red-500/8 text-red-100"
            }`}
          >
            {state.message}
          </div>
        ) : null}

        <Button className="w-full" size="lg" disabled={pending}>
          {pending ? "Working..." : submitLabel}
        </Button>
      </form>

      {auxiliaryHref && auxiliaryLabel ? (
        <div className="mt-5 text-center text-sm text-foreground/55">
          <Link href={auxiliaryHref} className="text-foreground transition-colors hover:text-foreground/80">
            {auxiliaryLabel}
          </Link>
        </div>
      ) : null}

      {footerHref && footerLabel ? (
        <div className="mt-6 border-t border-white/8 pt-5 text-center text-sm text-foreground/55">
          <Link href={footerHref} className="text-foreground transition-colors hover:text-foreground/80">
            {footerLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
