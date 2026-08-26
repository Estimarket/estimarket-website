/**
 * Founding-contractor campaign constants. Dependency-free on purpose — this is
 * imported by pages that must stay buildable without runtime env (the Supabase
 * client lives in foundingSpots.ts and is loaded lazily).
 */

/** Landing-page ref; matches ACTIVE_COHORT.ref in estimarket-platform (EST-72). */
export const FOUNDING_REF = "denver-founding";

type ClaimMode = "waitlist" | "signup";

/**
 * Where "Claim your spot" goes. Switched by NEXT_PUBLIC_CLAIM_MODE so the flip
 * is a Vercel env change, not a PR:
 * - `waitlist` (default, interim): our own waitlist form, tagged with the ref.
 * - `signup` (end state): the app's sign-up wizard, which claims the spot.
 */
export const CLAIM_MODE: ClaimMode =
  process.env.NEXT_PUBLIC_CLAIM_MODE === "signup" ? "signup" : "waitlist";
