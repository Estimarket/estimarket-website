import { CLAIM_MODE, FOUNDING_REF } from "./founding";
import { APP_URL } from "./site";

export { CLAIM_MODE, FOUNDING_REF };

/**
 * Founding-contractor campaign wiring: where "Claim your spot" goes, and what
 * the "N of 10 spots open" meter counts.
 *
 * Two modes, switched by NEXT_PUBLIC_CLAIM_MODE so the flip is a Vercel env
 * change, not a PR:
 *
 * - `waitlist` (default, interim): the CTA lands on our own waitlist form with
 *   `?ref=denver-founding`, stored in `waitlist_signups.source`. The meter
 *   counts those rows. Used while app.estimarket.com is still behind the
 *   staging Basic-Auth gate (EST-57 open).
 * - `signup` (end state): the CTA lands on the app's sign-up wizard carrying
 *   `ref` + `utm_*` (EST-72 stores them in a first-touch cookie and claims a
 *   founding spot at finalize). The meter reads the app's public endpoint.
 */

const UTM = {
  utm_source: "estimarket.com",
  utm_medium: "landing",
  utm_campaign: "denver-founding-contractors",
};

export function claimHref(): string {
  if (CLAIM_MODE === "signup") {
    return `${APP_URL}/signup?${new URLSearchParams({ ref: FOUNDING_REF, ...UTM })}`;
  }
  return `/waitlist/contractor?ref=${FOUNDING_REF}`;
}

/** Cap of the active cohort — the fallback when the app can't be reached. */
const DEFAULT_TOTAL = 10;

/**
 * The meter always shows at least one spot taken. A 10-of-10-open meter reads
 * as "nobody wants this"; the campaign's own seat counts as the first claim.
 * Real claims take over as soon as the count exceeds one.
 */
const MIN_CLAIMED_SHOWN = 1;

export type FoundingSpots = { claimed: number; open: number; total: number };

async function claimedFromApp(): Promise<{ claimed: number; total: number } | null> {
  try {
    const res = await fetch(`${APP_URL}/api/public/founding-spots`, {
      // No Next fetch cache: the app endpoint's 10 s CDN cache is the only layer, so a contractor
      // returning from the sign-up flow always sees the count that includes their claim.
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { claimed?: unknown; total?: unknown };
    return {
      claimed: typeof body.claimed === "number" ? body.claimed : 0,
      total: typeof body.total === "number" && body.total > 0 ? body.total : DEFAULT_TOTAL,
    };
  } catch {
    return null;
  }
}

async function claimedFromWaitlist(): Promise<number | null> {
  try {
    // Lazy: supabaseServer builds its client at import time and throws without
    // env, which would break `next build` on machines without secrets.
    const { supabaseAdmin } = await import("./supabaseServer");
    const { count, error } = await supabaseAdmin
      .from("waitlist_signups")
      .select("*", { count: "exact", head: true })
      .eq("source", FOUNDING_REF)
      .eq("role", "contractor");
    if (error) {
      console.error("founding waitlist count failed:", error.message);
      return null;
    }
    return count ?? 0;
  } catch (err) {
    console.error("founding waitlist count unavailable:", err);
    return null;
  }
}

export async function getFoundingSpots(): Promise<FoundingSpots> {
  let claimed = 0;
  let total = DEFAULT_TOTAL;
  if (CLAIM_MODE === "signup") {
    const app = await claimedFromApp();
    if (app) ({ claimed, total } = app);
  } else {
    claimed = (await claimedFromWaitlist()) ?? 0;
  }
  const shown = Math.min(total, Math.max(MIN_CLAIMED_SHOWN, claimed));
  return { claimed: shown, open: total - shown, total };
}
