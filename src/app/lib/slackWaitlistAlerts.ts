// Slack alert for waitlist sign-ups (EST-144). Pure half: shape the sign-up into a Block Kit
// payload and post it to an incoming-webhook URL. No Supabase or env access here — the .server.ts
// sibling reads env, loads the founding count and calls in. Kept dependency-free so the message
// layout is unit-testable (`npm run test:slack`).
//
// Same shape as the platform's contractor sign-up alert (estimarket-platform, EST-126): fires from
// the server action via next/server `after()`, best-effort, never surfaces to the visitor.

import { FOUNDING_REF } from "./founding";

export type AlertEnvironment = "production" | "preview" | "local";

export type WaitlistRole = "homeowner" | "contractor";

export type WaitlistSignupEvent = {
  email: string;
  zipCode: string;
  role: WaitlistRole;
  /** `waitlist_signups.source`: page/CTA tag, or the founding ref for campaign traffic. */
  source: string | null;
  /**
   * For founding-ref sign-ups only: how many contractor rows carry the ref now, including this
   * one, and the cohort cap. Null when the count could not be loaded.
   */
  founding: { claimed: number; total: number } | null;
  environment: AlertEnvironment;
  /** ISO timestamp of the sign-up; defaults to now in the builder. */
  signedUpAt?: string;
};

export type SlackPayload = { text: string; blocks: unknown[] };

export type SlackAlertEnv = Partial<Record<"SLACK_SIGNUPS_WEBHOOK_URL" | "VERCEL_ENV", string>>;

/** Which environment a deployment is, for the message prefix. The site has one Supabase project
 *  for every scope, so unlike the platform this goes by Vercel scope: only the Production
 *  deployment (estimarket.com) is prod; PR previews are labelled so a test submit is obvious. */
export function resolveAlertEnvironment(env: SlackAlertEnv): AlertEnvironment {
  if (env.VERCEL_ENV === "production") return "production";
  if (env.VERCEL_ENV) return "preview";
  return "local";
}

/** Slack mrkdwn reserves these three characters (https://api.slack.com/reference/surfaces/formatting#escaping). */
export function escapeMrkdwn(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function field(label: string, value: string) {
  return { type: "mrkdwn", text: `*${label}*\n${escapeMrkdwn(value) || "—"}` };
}

export function isFoundingSignup(e: Pick<WaitlistSignupEvent, "role" | "source">): boolean {
  return e.role === "contractor" && e.source === FOUNDING_REF;
}

export function buildWaitlistSignupMessage(e: WaitlistSignupEvent): SlackPayload {
  const prefix = e.environment === "production" ? "" : `[${e.environment}] `;
  const founding = isFoundingSignup(e);
  const foundingLine = founding
    ? e.founding
      ? `founding waitlist ${e.founding.claimed} of ${e.founding.total}`
      : "founding waitlist"
    : null;

  const text = `${prefix}New ${e.role} waitlist sign-up: ${e.email} (${e.zipCode})${
    foundingLine ? ` — ${foundingLine}` : ""
  }`;

  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${prefix}📬 New ${e.role} on the waitlist: ${e.email}`.slice(0, 150),
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        field("Email", e.email),
        field("Role", e.role),
        field("Zip", e.zipCode),
        field("Source", e.source ?? "direct"),
      ],
    },
  ];

  if (founding) {
    const over = e.founding != null && e.founding.claimed > e.founding.total;
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `⭐ *Denver founding contractor — ${foundingLine}* (interim waitlist)\n` +
          "Send them the real sign-up link with the founding ref before the CTA flips (EST-92)." +
          (over ? "\n⚠️ Past the cohort cap — the landing-page meter shows 0 open." : ""),
      },
    });
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `waitlist_signups · ${e.environment} · ${e.signedUpAt ?? new Date().toISOString()}`,
      },
    ],
  });

  return { text, blocks };
}

export type PostResult = { ok: true } | { ok: false; reason: string };

/** POST a payload to a Slack incoming webhook. Never throws. */
export async function postSlackMessage(
  webhookUrl: string,
  payload: SlackPayload,
  fetchImpl: typeof fetch = fetch
): Promise<PostResult> {
  try {
    const res = await fetchImpl(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return {
        ok: false,
        reason: `slack responded ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
