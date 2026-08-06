/**
 * The project categories that have a landing page.
 *
 * Single source of truth: `generateStaticParams` in `[category]/page.tsx`
 * builds exactly these, and `sitemap.ts` lists exactly these. Adding a
 * category means adding it here *and* to `CATEGORY_DATA` — miss the latter
 * and the build fails on the missing content.
 */
export const CATEGORY_SLUGS = [
  "bathrooms",
  "kitchens",
  "floors",
  "windows",
  "painting",
] as const;
