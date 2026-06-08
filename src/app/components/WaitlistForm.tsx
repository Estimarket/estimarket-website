"use client";

import { useActionState, useState } from "react";
import { joinWaitlist } from "../actions/waitlist";

type Variant = "default" | "onDark" | "card";
type Role = "homeowner" | "contractor";

type WaitlistFormProps = {
  role?: Role;
  defaultRole?: Role;
  source?: string;
  variant?: Variant;
};

const initialState = { ok: false } as {
  ok: boolean;
  error?: string;
  zip?: string;
};

export default function WaitlistForm(props: WaitlistFormProps) {
  const [resetKey, setResetKey] = useState(0);
  return (
    <WaitlistFormInner
      key={resetKey}
      {...props}
      onReset={() => setResetKey((k) => k + 1)}
    />
  );
}

function WaitlistFormInner({
  role,
  defaultRole,
  source,
  variant = "default",
  onReset,
}: WaitlistFormProps & { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(
    joinWaitlist,
    initialState
  );
  const [selectedRole, setSelectedRole] = useState<Role>(
    defaultRole ?? role ?? "homeowner"
  );

  const card = variant === "card";
  const onDark = variant === "onDark";

  if (state.ok) {
    const where = state.zip ? state.zip : "your area";
    if (card) {
      return (
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-[#dcfce7] text-2xl font-bold text-[#166534]">
            ✓
          </span>
          <p className="mt-4 text-[22px] font-bold text-ink">
            You did it. You&apos;re on the list.
          </p>
          <p className="mt-2 max-w-[420px] text-sm text-slate">
            Thank you for your interest. We&apos;ll email you the moment we open
            in {where}.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-5 rounded-full border border-[#d1d5db] px-6 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            Add another
          </button>
        </div>
      );
    }
    return (
      <div className={onDark ? "text-white" : "text-navy"}>
        <span className="flex size-10 items-center justify-center rounded-full bg-[#dcfce7] text-lg font-bold text-[#166534]">
          ✓
        </span>
        <p className="mt-3 text-lg font-bold">You&apos;re on the list.</p>
        <p className={`mt-1 text-sm ${onDark ? "text-band-text" : "text-muted"}`}>
          We&apos;ll email you the moment we open in {where}.
        </p>
      </div>
    );
  }

  const inputClass = card
    ? "h-[50px] rounded-[12px] border border-[#d1d5db] bg-white px-4 text-[15px] text-navy placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-accent"
    : onDark
      ? "h-[52px] rounded-[10px] bg-white px-4 text-[15px] text-navy placeholder:text-[#5980ad] outline-none focus:ring-2 focus:ring-accent"
      : "h-[52px] rounded-[10px] border border-line bg-white px-4 text-[15px] text-navy placeholder:text-muted outline-none focus:ring-2 focus:ring-accent";

  const honeypot = (
    <input
      type="text"
      name="company_website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );

  const errorEl = state.error ? (
    <p role="alert" className={onDark ? "text-gold" : "text-red-600"}>
      {state.error}
    </p>
  ) : null;

  if (card) {
    return (
      <form action={formAction} className="flex flex-col gap-3">
        {source ? <input type="hidden" name="source" value={source} /> : null}
        {honeypot}
        <input type="hidden" name="role" value={selectedRole} />

        <div className="flex rounded-full bg-[#f3f4f6] p-[5px]">
          {(["homeowner", "contractor"] as const).map((r) => {
            const active = selectedRole === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                aria-pressed={active}
                className={`flex-1 rounded-full py-2.5 text-[15px] font-semibold transition-colors ${
                  active ? "bg-accent text-white shadow-sm" : "text-slate/80"
                }`}
              >
                I&apos;m a {r}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className={`${inputClass} flex-1`}
          />
          <input
            type="text"
            name="zip_code"
            required
            minLength={3}
            maxLength={12}
            placeholder="Zip"
            className={`${inputClass} w-[140px]`}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="h-[52px] rounded-full bg-accent text-[17px] font-semibold text-white transition-colors hover:bg-[#d4521b] disabled:opacity-60"
        >
          {isPending ? "Joining…" : "Join the list →"}
        </button>

        {errorEl}
      </form>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {source ? <input type="hidden" name="source" value={source} /> : null}
      {honeypot}

      <input
        type="email"
        name="email"
        required
        placeholder="you@email.com"
        className={inputClass}
      />
      <input
        type="text"
        name="zip_code"
        required
        minLength={3}
        maxLength={12}
        placeholder="Zip code (Denver area)"
        className={inputClass}
      />

      {role ? (
        <input type="hidden" name="role" value={role} />
      ) : (
        <fieldset
          className={`flex gap-4 text-sm ${onDark ? "text-band-text" : "text-slate"}`}
        >
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="homeowner" defaultChecked />
            Homeowner
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="contractor" />
            Contractor
          </label>
        </fieldset>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="h-[52px] rounded-[10px] bg-accent text-base font-semibold text-white transition-colors hover:bg-[#d4521b] disabled:opacity-60"
      >
        {isPending ? "Joining…" : "Join waitlist →"}
      </button>

      {errorEl}
    </form>
  );
}
