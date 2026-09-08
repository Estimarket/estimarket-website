// Server half of the waitlist Slack alert (EST-144): read env, load the founding count for
// campaign sign-ups, then hand off to the pure builder. Called from joinWaitlist inside
// next/server `after()`, so nothing here is on the visitor's critical path — every failure is
// logged as `[slack-waitlist]` and swallowed.

import { FOUNDING_REF } from "./founding";
import {
  buildWaitlistSignupMessage,
  isFoundingSignup,
  postSlackMessage,
  resolveAlertEnvironment,
  type WaitlistRole,
} from "./slackWaitlistAlerts";

export type WaitlistSignupInput = {
  email: string;
  zipCode: string;
  role: WaitlistRole;
  source: string | null;
};

/** Cap of the active cohort; mirrors DEFAULT_TOTAL in foundingSpots.ts. */
const FOUNDING_TOTAL = 10;

async function foundingWaitlistCount(): Promise<number | null> {
  try {
    // Lazy: supabaseServer builds its client at import time and throws without env.
    const { supabaseAdmin } = await import("./supabaseServer");
    const { count, error } = await supabaseAdmin
      .from("waitlist_signups")
      .select("*", { count: "exact", head: true })
      .eq("source", FOUNDING_REF)
      .eq("role", "contractor");
    if (error) {
      console.error("[slack-waitlist] founding count failed:", error.message);
      return null;
    }
    return count ?? 0;
  } catch (err) {
    console.error("[slack-waitlist] founding count unavailable:", err);
    return null;
  }
}

export async function notifyWaitlistSignup(input: WaitlistSignupInput): Promise<void> {
  const webhookUrl = process.env.SLACK_SIGNUPS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const founding = isFoundingSignup(input) ? await foundingWaitlistCount() : null;
    const payload = buildWaitlistSignupMessage({
      ...input,
      founding: founding == null ? null : { claimed: founding, total: FOUNDING_TOTAL },
      environment: resolveAlertEnvironment({ VERCEL_ENV: process.env.VERCEL_ENV }),
      signedUpAt: new Date().toISOString(),
    });
    const result = await postSlackMessage(webhookUrl, payload);
    if (!result.ok) console.error("[slack-waitlist] post failed:", result.reason);
  } catch (err) {
    console.error("[slack-waitlist] unexpected error:", err);
  }
}
