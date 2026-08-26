import { APP_URL } from "./site";

/**
 * Founding-contractor spots meter, read from the app's public endpoint
 * (`GET /api/public/founding-spots` → `{ cohort, claimed, total }`, EST-72).
 *
 * Fetched server-side with ISR: the endpoint is CDN-cached for a minute on its
 * side, and this adds a matching 60s layer here so a burst of landing-page
 * traffic never fans out to the app.
 */

export const FOUNDING_REF = "denver-founding";

/** Cap of the active cohort — the fallback when the app can't be reached. */
const DEFAULT_TOTAL = 10;

/**
 * The meter always shows at least one spot taken. A 10-of-10-open meter reads
 * as "nobody wants this"; the campaign's own seat counts as the first claim.
 * Real claims take over as soon as the backend reports more than one.
 */
const MIN_CLAIMED_SHOWN = 1;

export type FoundingSpots = { claimed: number; open: number; total: number };

export async function getFoundingSpots(): Promise<FoundingSpots> {
  let claimed = 0;
  let total = DEFAULT_TOTAL;
  try {
    const res = await fetch(`${APP_URL}/api/public/founding-spots`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const body = (await res.json()) as { claimed?: unknown; total?: unknown };
      if (typeof body.claimed === "number") claimed = body.claimed;
      if (typeof body.total === "number" && body.total > 0) total = body.total;
    }
  } catch {
    // Endpoint unreachable (app down, build without network): render the
    // floor rather than fail the page.
  }
  const shown = Math.min(total, Math.max(MIN_CLAIMED_SHOWN, claimed));
  return { claimed: shown, open: total - shown, total };
}
