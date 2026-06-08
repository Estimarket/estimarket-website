"use client";

import { useActionState } from "react";
import { nominateCity } from "../actions/nominate";

const initialState = { ok: false } as { ok: boolean; error?: string };

export default function NominateCity() {
  const [state, formAction, isPending] = useActionState(
    nominateCity,
    initialState
  );

  if (state.ok) {
    return (
      <p className="text-sm font-semibold text-marine">
        Thanks — your city is on our radar. ✓
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      {/* honeypot: hidden from real users, bots tend to fill it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex gap-2">
        <input
          name="city"
          required
          minLength={2}
          placeholder="City, state"
          className="h-11 flex-1 rounded-[8px] border border-line bg-white px-3 text-sm text-navy placeholder:text-muted outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-[8px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#d4521b] disabled:opacity-60"
        >
          {isPending ? "…" : "Nominate"}
        </button>
      </div>

      {state.error ? (
        <p role="alert" className="text-xs text-red-600">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
