<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
<!-- BEGIN:estimarket-design-system -->
## Design system

The Estimarket design system is vendored at `.claude/skills/estimarket-design/`. Claude
Code and Cursor pick it up from this repo — no Claude subscription add-on needed.

- `colors_and_type.css` — every token (color, type, spacing, shadow, radius, motion) as
  CSS custom properties, plus `@font-face` for DM Sans and DM Serif Display. **This file
  is the source of truth for every color and type value in the product.**
- `README.md` — brand foundation, voice and tone, visual foundations, iconography.
- `FIGMA-LIBRARY.md` — the matching Figma library, what it publishes, and how the two
  stay in sync.
- `assets/` — logo lockup, mark, wordmark, favicons.
- `preview/` — token reference cards. Note the `components-*.html` cards for navigation,
  search bar and property card still carry copy from the original reference kit the
  visual language came from; do not treat those as Estimarket patterns.

Rules that are easy to get wrong:

- One hero blue, one hero orange. Orange `#E85D26` is the primary CTA and almost nothing
  else.
- Sentence case everywhere — headlines, buttons, nav.
- No emoji in product or marketing copy. Use real glyphs: `★` `·` `–`.
- Shadows are tinted with brand navy `#0E214B`, never neutral grey.
- Icons are Lucide.

Update the CSS first, then the Figma library — never the reverse.
<!-- END:estimarket-design-system -->
