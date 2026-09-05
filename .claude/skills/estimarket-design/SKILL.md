---
name: estimarket-design
description: "Use this skill whenever you need to build, design, or prototype anything for Estimarket — a home improvement contractor quote marketplace where homeowners post projects and contractors submit itemized bids. Use it for new marketing pages, app screens (Homeowner or Contractor experience), quick mockups, or design system components. Contains the full design system: brand guidelines, color tokens, typography, fonts, logo assets, and a React UI kit. Trigger this skill any time the user mentions Estimarket screens, pages, flows, UI components, or brand assets."
---

# Estimarket — Design Skill

Read the `README.md` file within this skill, and explore the other available files.

## What Estimarket is

Estimarket is a **home improvement contractor quote marketplace**. Homeowners describe their project once and receive real, itemized bids from contractors — no in-home sales visits required. Contractors browse available projects and compete on price. The tagline is: **"Contractors compete. You choose."**

There are two distinct user sides:
- **Homeowners** — post projects, receive and compare bids, schedule walkthroughs, accept a contractor
- **Contractors** — browse the project marketplace, submit itemized bids with line items and price ranges

## What's here

- `README.md` — brand foundation, content voice/tone, full visual foundations, iconography. **Read this first.**
- `colors_and_type.css` — every design token (color, type, spacing, shadow, radius, motion) as CSS variables, plus `@font-face` blocks for the locally-hosted DM Sans + DM Serif Display fonts. Drop it into any HTML file with `<link rel="stylesheet" href="colors_and_type.css">` and you're on-brand.
- `assets/` — logo PNGs (lockup, mark, wordmark — color, reverse, mono variants) and favicons in all sizes.
- `preview/*.html` — small reference cards for individual token groups. Useful as visual confirmation while you build.
- `ui_kits/marketing-site/` — high-fidelity React UI kit for the marketing site (Home, Search results, Property detail). Components are small, mostly cosmetic, and easy to lift.
- `SKILL.md` — this file.

## Two design contexts

### 1. Marketing site
Static HTML/CSS pages — `index.html`, `homeowners.html`, `contractors.html`, `browse.html` — in `Estimarket Website/`. Link `colors_and_type.css` and write standard HTML. New marketing pages should match the existing site's structure and component patterns.

### 2. App screens (Homeowner + Contractor experience)
React-based screens in `Estimarket Website/Homeowner Experience/` and `Estimarket Website/Contractor Experience/`. These use `tokens.css`, `styles.css`, `app.jsx`, and Lucide icons. New app screens should follow the same React + Babel + Lucide setup as existing screens. See the screen inventory in `README.md` for what's already built.

## How to use

**Visual artifacts** (slides, mocks, throwaway prototypes, marketing pages): link `colors_and_type.css` and write a static HTML file using the CSS variables. For React screens, use the same setup as existing app screens.

**Production code**: read the brand rules in `README.md` carefully — voice/tone, contractor-marketplace positioning, motion principles, iconography (Lucide), and accessibility floor. The tokens in `colors_and_type.css` map cleanly to Tailwind config or CSS-in-JS theme objects.

**No guidance given**: ask the user what surface they're designing for (marketing site vs. app screen), who the audience is (homeowner vs. contractor), and what the screen or component should do. Then act as an expert product designer and produce HTML output.

## Things to remember

- **Product is a contractor marketplace, not a vacation rental site.** Copy, CTAs, and UX patterns should reflect homeowners posting projects and contractors bidding — not travel booking.
- **One hero blue + one hero orange.** Orange (`--color-accent-orange: #E85D26`) is reserved almost exclusively for the primary CTA.
- **Shadows are tinted with brand dark blue**, not black. Don't substitute generic gray shadows.
- **Sentence case everywhere.** No title case in headlines, buttons, or nav.
- **No emoji** in marketing copy. Use real glyphs (`★`, `·`, `–`).
- **DM Sans + DM Serif Display** are the brand typefaces, loaded locally from `fonts/`.

## Caveats baked into this system

- Photography placeholders use gradients — bring real `<img>` sources for production.
- Icons use Lucide via CDN (`https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js`).
- The visual design system is based on the original reference kit — the *aesthetic* is correct but all copy, product logic, and UX patterns must reflect the Estimarket contractor marketplace, not the reference source.
