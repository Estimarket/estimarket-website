# Estimarket Design System

A complete design system reference for **Estimarket** — a home improvement contractor quote marketplace where homeowners post projects and contractors submit itemized bids. Use this document to build consistent, on-brand UI in HTML, React, or any front-end framework.

> **Tagline:** *Contractors compete. You choose.*

---

## Index — what's in this project

```
README.md                  — this file: brand overview, content + visual foundations, iconography
SKILL.md                   — agent-skill manifest (cross-compatible w/ Claude Code skills)
colors_and_type.css        — all CSS variables (color, type, spacing, shadow, radius, motion) + @font-face
fonts/                     — webfonts (DM Sans, DM Serif Display — see substitution note)
assets/                    — logo kit (PNG, transparent) — see Logo kit v1.1
  ├─ lockup-{color,reverse}.png                        — 630×128 full lockup
  ├─ mark-{color,reverse,mono-navy,orange}.png         — 128×128 mark only
  ├─ wordmark-{color,reverse}.png                      — 401×128 wordmark only
  ├─ favicon-{16,16-crisp,32,48,64,96,128,180,192,256,512}.png
  └─ apple-touch-icon-180.png
  Note: mono-navy / mono-white lockup + wordmark exports are
  broken upstream (single-ink export drops the orange "market"
  half of the wordmark) — files removed pending re-export.
preview/                   — small HTML cards that render in the Design System tab
  ├─ colors-*.html         — color palette swatches
  ├─ type-*.html           — typography specimens
  ├─ spacing-*.html        — spacing scale, radii, shadow tokens
  ├─ components-*.html     — buttons, inputs, badges, cards, etc.
  └─ brand-*.html          — logo, photography treatments
ui_kits/
  └─ marketing-site/       — high-fidelity recreation of the Estimarket marketing site
     ├─ index.html         — interactive click-thru prototype
     ├─ README.md
     └─ *.jsx              — modular React components
```

---

## Sources used to build this system

This system was built from a written design spec document. The visual foundations (tokens, components, page patterns, accessibility, motion) are based on the original reference kit used as a source for the aesthetic. **The brand name, product logic, and all copy throughout this system apply to Estimarket — a contractor quote marketplace — not the reference source.**

---

## Brand Foundation

**Purpose.** Estimarket eliminates the broken contractor quoting process. Homeowners describe their project once, upload photos and measurements, and receive real itemized bids from licensed contractors — no in-home sales visits, no information asymmetry, no wasted afternoons. Contractors get qualified leads and a level playing field to compete on price and quality. The marketing site's job is to **build trust, explain the marketplace model clearly, and convert skeptical homeowners into project posters.**

**The two audiences — always keep both in mind.**
- **Homeowners:** frustrated by the traditional quote process (multiple in-home visits, high-pressure sales, no price transparency). They want convenience, fairness, and confidence they're getting a good deal.
- **Contractors:** tired of expensive in-home sales visits that don't convert. They want qualified leads, fair competition, and less sales overhead.

**Design principles.**

1. **Transparency over polish** — The product's core promise is price transparency. Design should reinforce openness, not obscure it.
2. **Clarity at every step** — The posting flow, bid comparison, and contractor selection must be effortless and unambiguous.
3. **Confidence through trust** — Contractor credentials, bid details, and review counts are first-class. Never bury the signals that help homeowners decide.
4. **Space to breathe** — Generous whitespace lets content lead. This is a high-consideration purchase; don't rush the user.
5. **Inclusive by default** — Accessible to all users, all devices, all abilities.

---

## CONTENT FUNDAMENTALS — voice, tone, copy rules

Estimarket speaks like a **knowledgeable friend who's navigated contractor hell and found a better way**. Confident, direct, and a little fed up with how broken the old process is. Not corporate, not salesy. Four words capture the personality: **transparent, fair, confident, practical.**

### Person + perspective
- Speak directly to **you**, the homeowner (or contractor). Always second person.
  - ✅ "You'll get real bids from contractors who actually want the job."
  - ❌ "Homeowners receive competitive bids from qualified contractors."
- Use "we" sparingly — only when it means the platform doing something ("we verify contractor licenses", "we'll notify you when bids come in").
- Never refer to users in third person ("the homeowner", "the customer") in user-facing copy.

### Casing
- **Sentence case** for everything: page titles, section headers, buttons, nav items.
  - ✅ "Find your perfect getaway" / "See all photos"
  - ❌ "Find Your Perfect Getaway" / "See All Photos"
- **ALL CAPS** is reserved for badge labels, breadcrumbs, and footer column headers — never body copy.

### Length + rhythm
| Slot | Length | Example |
|---|---|---|
| Hero headline | ≤ 8 words; outcome-led or pain-point hook | "Contractors compete. You choose the best bid." |
| Subheadline | ≤ 15 words; the mechanism | "Describe your project once. Get real, itemized quotes — no site visits required." |
| Body block | 2–3 short sentences max | "Post your project with photos and measurements. Contractors review your scope and submit itemized bids. You compare them side by side and pick the best fit." |
| Primary CTA | Verb + context, 2–4 words | "Post a project", "See all bids", "Get started" |
| Secondary CTA | Verb + object, 2–3 words | "Browse projects", "Learn how it works", "See example bids" |

### Do / Don't
| ✅ Do | ❌ Don't |
|---|---|
| "Real bids from contractors who want the job" | "Maximize your renovation experience" |
| "Skip the in-home sales visit" | "Solutions for home improvement needs" |
| "Itemized bids, side by side" | "Comprehensive quote comparison functionality" |
| "Describe your project once — contractors come to you" | "Submit your project details for contractor review" |
| "See all 4 bids" | "Click here for more information" |
| "No site visit required" | "Eliminates the need for preliminary assessments" |

### Emoji + special characters
- **No emoji in marketing copy.** Ever. Vacation feels warm because of photography and language, not 🌴 or 🏖️.
- Use a real **interpunct** (`·`) between meta facts: `6 guests · 3 beds · 2 baths`.
- Use a real **star glyph** (`★`) for ratings, paired with `color-accent-yellow`. Never ⭐.
- Use a real **en dash** (`–`) for date ranges (`May 4 – May 11`). Hyphen-minus is wrong.

### Trust signals are not optional
Surface the things that build confidence: contractor license verification, review counts, bid response rate, project completion history, itemized bid breakdowns. These belong **inline with each bid and contractor profile**, not buried in a footer. The homeowner is making a high-consideration purchase — never ask them to dig for reassurance.

### Numbers
- Spell out one through nine in body copy ("nine guests"); use digits for 10+ ("12 guests").
- Always use digits in UI labels and metadata (`9 guests`, `3 beds`).
- Currency: `$320 / night` (space around slash, no decimals when whole dollars), `$1,920 total before taxes` as the secondary line.

---

## VISUAL FOUNDATIONS — the visual DNA

### The vibe in one paragraph
Estimarket looks **clear, trustworthy, and action-oriented.** Project photography and contractor work samples carry the hero moments. Type is a warm sans-serif (DM Sans) for all UI and body copy, with a single italicized serif accent for the wordmark only. The palette is anchored by a deep, trustworthy navy blue, energized by a single warm orange reserved for primary CTAs. Layouts breathe — lots of whitespace, data presented cleanly, no clutter. The feel is "honest fintech meets home services," not "lead-gen site."

### Color motifs
- **One hero blue + one hero orange.** Blue (`#245ABC`) and dark blue (`#0E214B`) carry brand identity; orange (`#E85D26`) is reserved almost exclusively for the primary CTA and a couple of urgency badges. The contrast is intentional: blue = trust, orange = action.
- **Neutrals are warm grays** with a slight cool tint (`#111827`, `#6B7280`, `#F9FAFB`) — they sit comfortably alongside the blue without going icy.
- **Sage green and golden yellow are accent-only.** Sage = success/eco. Yellow = rating stars. Never use them as primary surfaces.
- **Photography is the dominant color carrier.** UI chrome is mostly neutral; the photos do the emotional heavy lifting.

### Type motifs
- **Freight Sans Pro everywhere** — headings and body share the same family, only weight + size differ. This creates rhythm without typographic stunts.
- **Dala Prisma Italic** is used **only** for the wordmark logotype and (very rarely) a single editorial display moment per page. Never for body copy. Its mixed-axis italics (upright V/r, inclined b/o) are what make the brand identifiable.
- **Negative tracking on display sizes** (−0.02em to −0.03em) tightens hero headlines.
- **Generous line height** on body (1.6) supports the "space to breathe" principle.

### Backgrounds
- **Full-bleed photography** is the default for hero sections and editorial features. Always paired with a scrim (`rgba(14,33,75,0.60)` → transparent gradient) when text overlays.
- **Solid white (`#FFFFFF`)** for cards.
- **Solid `#F9FAFB`** for the page canvas — never pure white at page level.
- **Solid `#0E214B` (Dark Blue)** for the footer and occasional dark sections (newsletter signup, app CTA).
- **No gradients on chrome.** No bluish-purple gradients, no rainbow gradients, no decorative blobs. Gradients exist only as photography scrims.
- **No repeating patterns or textures.** The brand stays clean.

### Imagery treatment
- **Warm, natural light.** Golden hour, soft daylight, real interiors with real furniture.
- **No grain, no heavy filters, no b&w.** Photos look like good consumer-camera shots, not "fashion campaign."
- **People are present but secondary** — small in frame, often with their backs to camera, looking *at* the place. The home is the subject.
- **Aspect ratios:** 4:3 for property cards (the standard), 16:9 for hero photos, square for thumbnails.

### Borders, corners, radii
- Borders are **1px, neutral-300 (`#D1D5DB`)** at rest. Inputs and dividers only — cards rely on shadow, not border.
- Focus rings: **2px primary blue, 2px offset.** Never `outline: none` without replacement.
- **Radii follow a soft, friendly progression:**
  - 4px on small buttons and tags
  - 8px on inputs and small cards
  - 12px on standard cards
  - 16px on the search bar and large cards
  - 24px on feature cards, modals, and sheets
  - Full-round (9999px) on pills, avatars, badges
- The system **never goes sharp-cornered** except on full-bleed sections.

### Shadows + elevation
- All shadows are **tinted with the brand dark blue** (`rgba(14, 33, 75, X)`) rather than neutral black — this is one of the most distinctive details of the system.
- Six steps from `shadow-xs` (1px lift on inputs) to `shadow-2xl` (full-screen sheets).
- **Cards at rest** sit on `shadow-sm`; hover lifts to `shadow-md` with a subtle 1.02 image scale.
- **No inset shadows** except for explicitly pressed states.

### Layout rules
- Page max-width: **1440px** centered on a `#F9FAFB` canvas.
- Text content max-width: **720px** for any prose block.
- 12-column grid at desktop, 8 at tablet, 4 at mobile. Gutters: 32 / 24 / 16.
- **Sticky header** with `shadow-xs` after first scroll pixel.
- **Booking widget on property detail** is sticky right rail (desktop) / sticky bottom sheet (mobile).
- Section vertical rhythm: 64px gap on desktop, 48px on mobile, between major sections.

### Transparency + blur
- **Backdrop blur (4px)** behind the modal overlay (`rgba(14,33,75,0.50)`).
- Sticky search bar on the search results page uses a faint white frosted effect (`rgba(255,255,255,0.92)` + `backdrop-filter: blur(8px)`).
- No glassmorphism anywhere else.

### Animation language
- **Fast and purposeful.** Hover color changes 80ms, button press 150ms, dropdown open 250ms, modal enter 350ms, hero reveal 500ms.
- **Ease-out for entering** (`cubic-bezier(0,0,0.2,1)`), **ease-in-out for transforms**, **ease-spring** (`cubic-bezier(0.34,1.56,0.64,1)`) for the playful one-offs — heart fill, success checkmark.
- **No bounces, no excessive scale-ups, no parallax** on chrome. Photography may slowly Ken-Burns on hero sections, but always pauses for `prefers-reduced-motion`.
- **Hover** = darken background 10%, no scale change on buttons; small lift + slight image scale (1.02) on cards.
- **Press** = darken 15%, scale 0.98, 150ms.
- **Focus** = 2px primary-blue ring at 2px offset. Always visible on keyboard nav.

### Card anatomy (the system's atomic unit)
A property card is the most-used component. Its rules generalize to most cards:
- White background, `radius-lg` (12px).
- Photo on top, `radius-lg` on top corners only, 4:3 aspect, `object-fit: cover`.
- 16px text padding all around.
- Rating row first (★ 4.8 · 312 reviews), then title (heading-sm, 600), then meta (body-sm, neutral-500), then price (heading-md), then totals (caption, neutral-500).
- Heart/save button: absolute top-right of photo, ghost button, ease-spring on toggle fill.
- Hover: shadow-sm → shadow-md, image scale 1.02 over 250ms.

---

## ICONOGRAPHY

### System
- **Style:** Outline icons, **2px stroke**, **rounded line caps and joins**.
- **Grid:** 24×24px (default), 16×16px (compact in dense UI), 32×32px (feature icons in the "How it works" row).
- **Color:** Icons inherit `currentColor` from their text context unless explicitly overridden.

### Source
The spec calls for Expedia Group's **EGDS icon set**. Since we don't have a license or asset bundle attached, this system uses **Lucide Icons** (CDN: `https://unpkg.com/lucide@latest`) as a compatible open-source substitute — Lucide is 2px stroke, rounded caps, 24px grid by default, which matches the EGDS visual spec almost exactly. **This is a substitution; please confirm or supply EGDS SVGs to swap in.**

Lucide is loaded via CDN in every preview and UI-kit HTML file:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

Then in markup:

```html
<i data-lucide="search"></i>
<i data-lucide="map-pin"></i>
<i data-lucide="calendar"></i>
<i data-lucide="users"></i>
<i data-lucide="heart"></i>
<i data-lucide="star"></i>      <!-- pair with class="filled" for ratings -->
<i data-lucide="sliders-horizontal"></i>
<i data-lucide="share-2"></i>
<i data-lucide="x"></i>
<i data-lucide="chevron-right"></i>
<i data-lucide="check"></i>
<i data-lucide="info"></i>
```

### Common-icon → Lucide mapping (already in use)

| Use | Lucide name |
|---|---|
| Search | `search` |
| Location | `map-pin` |
| Date / calendar | `calendar` |
| Guests | `users` |
| Favorite (outline) | `heart` |
| Favorite (filled) | `heart` + `fill="currentColor"` |
| Star (filled) | `star` + `fill="currentColor"` |
| Filter | `sliders-horizontal` |
| Share | `share-2` |
| Close | `x` |
| Chevron right | `chevron-right` |
| Chevron down | `chevron-down` |
| Checkmark | `check` |
| Info | `info` |
| Wifi (amenity) | `wifi` |
| Pool (amenity) | `waves` |
| Pets (amenity) | `paw-print` |
| Parking (amenity) | `parking-circle` |

### Emoji + unicode usage
- **Emoji: never** in production UI or marketing copy.
- **Unicode glyphs in copy** are encouraged: `★` (ratings), `·` (meta separator), `–` (date range en dash).
- App-store badges and social-icon brand marks are rendered as PNGs/SVGs supplied by the platform owner, not redrawn.

### Logo + wordmark
The Estimarket wordmark is rendered with **DM Serif Display Italic** (a free Google Font substitute for the proprietary Dala Prisma; flagged below). See `assets/logo-wordmark.svg`.

---

## Font substitutions — FLAG

The spec calls for two licensed typefaces:

| Spec calls for | We're using | Where to get the real thing |
|---|---|---|
| **Dala Prisma** (modified) — for the wordmark and rare editorial display | **DM Serif Display Italic** (Google Fonts, free) | Commercial Type, commercial license required |
| **Freight Sans Pro** — for all headings + body | **DM Sans** (Google Fonts, free) | GarageFonts, commercial license required |

The spec itself recommends `DM Sans` as the closest open-source stand-in for Freight Sans Pro, so that pairing is faithful to the brief. **DM Serif Display Italic is our best free approximation of Dala Prisma's italicized serif spirit**, but it lacks Dala Prisma's signature "prismed" line-decorations. If you have the real font files, drop them into `fonts/` and update `colors_and_type.css` — the system will inherit them automatically.

---

## Accessibility (target: WCAG 2.1 AA, AAA on conversion flows)

- All interactive elements: visible `:focus-visible` ring (2px primary-blue, 2px offset).
- Minimum tap target: 44×44px (iOS), 48×48px (Android Material). Spacing between targets ≥ 8px.
- All property photos: descriptive `alt` text. Decorative illustrations: `alt=""`. Icons with meaning: `aria-label`.
- All form inputs paired with `<label>`. Errors linked via `aria-describedby`.
- Skip-to-main-content link as first focusable element.
- All animations wrapped in `@media (prefers-reduced-motion: reduce)`.
- **Never** use Light Blue `#328EEE` as a text color on white (fails AA — decorative only).
- On orange CTAs, only large text (18px+) passes AA at 3.1:1 contrast — use white text and never put body copy on orange.

---

---

## Screen inventory — what's already built

Use this list before designing anything new, so you know what exists and can build consistent extensions.

### Marketing site (`Estimarket Website/`)
| File | Description |
|---|---|
| `index.html` | Homepage — hero with bid-comparison mockup, how it works, trust row |
| `homeowners.html` | Homeowner landing — project posting flow explainer, waitlist CTA |
| `contractors.html` | Contractor landing — marketplace value prop, sign-up |
| `browse.html` | Browse projects — public project listing page |

All marketing pages are static HTML linking a shared `assets/site.css`.

### Homeowner experience (`Estimarket Website/Homeowner Experience/`)
React-based screens using `tokens.css`, `styles.css`, `app.jsx`, and Lucide icons.

| File | Description |
|---|---|
| `01 Dashboard.html` | Main dashboard — active projects summary |
| `02 Dashboard - New Bid Toast.html` | Dashboard with new-bid toast notification |
| `03 All Bids - Open.html` | All bids view — open/pending state |
| `04 All Bids - Scheduled.html` | All bids view — scheduled walkthrough state |
| `05 All Bids - Accepted.html` | All bids view — accepted contractor state |
| `06 Bid Detail - Open.html` | Individual bid detail — open state |
| `07 Bid Detail - Scheduled.html` | Individual bid detail — walkthrough scheduled |
| `08 Bid Detail - Accepted.html` | Individual bid detail — contractor accepted |
| `09 Schedule Modal.html` | Schedule walkthrough modal overlay |

### Contractor experience (`Estimarket Website/Contractor Experience/`)
React-based screens using the same stack as Homeowner experience.

| File | Description |
|---|---|
| `01 Home.html` | Contractor home / logged-out landing |
| `02 Marketplace.html` | Browse available projects marketplace |
| `03 My Bids.html` | Contractor's submitted bids dashboard |
| `04 Account.html` | Contractor account / profile settings |
| `05 Bid Flow - Project Overview.html` | Step 1 of bid submission — project overview |
| `06 Bid Flow - Line Items.html` | Step 2 — enter itemized line items |
| `07 Bid Flow - Set Range.html` | Step 3 — set overall price range |
| `08 Bid Flow - Notes.html` | Step 4 — add notes / qualifications |
| `09 Bid Flow - Review.html` | Step 5 — review bid before submitting |
| `10 Bid Flow - Submitted.html` | Confirmation — bid submitted successfully |

*Last updated: May 2026.*
