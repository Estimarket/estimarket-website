import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { CATEGORY_SLUGS } from "./projects/categories";
import { ARTICLES } from "./resources/articles";

// `/waitlist/[role]` is deliberately absent: it's one page at two URLs and is
// marked noindex, so listing it would ask crawlers to index what the page
// itself declines.

// `priority` is a hint for crawlers that still read it (Google ignores it).
// `lastModified` is deliberately omitted: nothing here carries a real edit
// date, and stamping build time on every URL would tell crawlers the whole
// site changes on every deploy — which trains them to ignore the field.
const STATIC_ROUTES: Array<[path: string, priority: number]> = [
  ["", 1],
  ["/homeowners", 0.9],
  ["/contractors", 0.9],
  ["/projects", 0.8],
  ["/resources", 0.7],
  ["/about", 0.5],
  ["/contact", 0.5],
  // Indexable so they can be found and cited, but never what we rank for.
  ["/privacy", 0.3],
  ["/terms", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(([path, priority]) => ({
      url: `${SITE_URL}${path}`,
      priority,
    })),
    ...CATEGORY_SLUGS.map((category) => ({
      url: `${SITE_URL}/projects/${category}`,
      priority: 0.8,
    })),
    ...ARTICLES.map((article) => ({
      url: `${SITE_URL}/resources/${article.slug}`,
      priority: 0.6,
    })),
  ];
}
