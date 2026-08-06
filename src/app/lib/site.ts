/**
 * Canonical origin for the marketing site.
 *
 * The apex (estimarket.com) permanently redirects to www, so every absolute
 * URL we hand to crawlers — sitemap entries, canonical tags, OG images — must
 * use this host. Anything pointing at the apex costs a redirect hop and splits
 * ranking signals across two hostnames.
 */
export const SITE_URL = "https://www.estimarket.com";
