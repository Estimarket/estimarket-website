# Denver Founding Contractors — landing page motion

Build brief for Claude Code. Three animated scenes for the campaign landing page: a looping hero and two
scroll-triggered How It Works scenes.

**Reference implementation:** `docs/campaign-motion/reference.html` — a standalone, working version of all
three scenes plus both mobile variants. Open it in a browser first. It is the source of truth for timing,
layout and behaviour; port it, don't reinvent it. It is NOT shipped.

**Design source:** the slots are `5:29` (hero, 588×441) and `7:23` / `7:37` (592×444) in the Campaign Landing
Pages Figma file `6Ps0i11qeiLhayGieUCJZq`, frame `4:2`. The app UI shown inside the scenes was built from the
Contractor Flows file `nO6Lib0JoAU2quoR3hBL4F` — see "Product truths" below before changing any copy.

---

## Before you write code

This repo runs **Next.js 16.2.6 / React 19.2.4**. Per `AGENTS.md`, this version has breaking changes versus
training data — read the relevant guide in `node_modules/next/dist/docs/` before writing components.

---

## Target files

```
src/app/components/campaign/
  useSceneTimeline.ts        hook: step timeline + IntersectionObserver + reduced-motion
  HeroLoopScene.tsx          scene A — loops while visible
  ScopeReviewScene.tsx       scene B — How It Works step 2, plays once
  BidBuilderScene.tsx        scene C — How It Works step 3, plays once
public/images/
  dfc-overview.jpg  dfc-shower.jpg  dfc-vanity.jpg  dfc-plumbing.jpg  dfc-lohi.jpg  dfc-toilet.jpg
```

All three scene components need `"use client"` — they use `IntersectionObserver`, timers and state.

There is no campaign route in this repo yet. Suggested: `src/app/denver-founding-contractors/page.tsx`.

## Tokens

The scenes were built on the same palette that's already in `src/app/globals.css`, so most of this is a
find-and-replace, not a redesign:

| Reference CSS var | Tailwind class here |
|---|---|
| `--primary-darkest` `#0E214B` | `navy` |
| `--primary-dark` `#1C4695` | `marine` |
| `--orange` `#E85D26` | `brand` |
| `--n900` `#111827` | `ink` |
| `--n700` `#374151` | `slate` |
| `--n500` `#6B7280` | `muted` |
| `--n200` `#E5E7EB` | `line` |
| `--n50` `#F9FAFB` | `surface` |

Four values in the reference are **not** in the theme yet — they're the "TBD" treatment, which is a real
product state and shouldn't be approximated with an existing colour. Add to `@theme` in `globals.css`:

```css
--color-tbd:        #4f46e5;  /* TBD label + icon */
--color-tbd-bg:     #eeeefb;  /* chip and banner fill */
--color-tbd-border: #c9c9f0;
--color-tbd-row:    #f2f2fc;  /* flagged line-item row */
```

Everything else in the reference (`--r-*` radii, `--sh-*` shadows, `--ease-*`) maps to Tailwind's built-ins or
arbitrary values. The shadows are brand-tinted (`rgba(14,33,75,…)`), not black — keep them tinted.

## Images

Photos are real project photography, already cropped to 1.2:1 and colour-corrected. In the reference they're
base64 data URLs inside CSS classes (`.p-overview` etc.) because it had to be a single file — **do not carry
that into the repo.** Use `next/image` with `fill` + `object-cover`, or a plain `background-image` pointing at
`/images/…`. Every photo slot in the scenes is a fixed-aspect box, so `fill` + `object-cover` is the direct
translation.

| File | Used in |
|---|---|
| `dfc-overview.jpg` | scope viewer photo 1, hero glance, first marketplace card |
| `dfc-shower.jpg` | scope viewer photo 2 (the one the thumbnail click switches to) |
| `dfc-vanity.jpg` | scope viewer photo 3 |
| `dfc-plumbing.jpg` | scope viewer photo 4 — the TBD/rough-in shot |
| `dfc-lohi.jpg` | second marketplace card. **473px wide** — card use only, don't enlarge |
| `dfc-toilet.jpg` | spare |
| `dfc-step1.png` | **static** imagery for How It Works step 1 (`7:9`) — 1184×888 |
| `dfc-step4.png` | **static** imagery for How It Works step 4 (`7:51`) — 1184×888 |
| `dfc-step5.png` | **static** imagery for How It Works step 5 (`7:65`) — 1184×888 |

### Steps 1, 4 and 5 are static, not animated

They drop straight into their placeholder frames as images — no component, no timeline. All three are rendered
at 2× the 592×444 slot and are abstractions of production UI, not screenshots: simplified, enlarged and
cropped so they stay legible at slot size.

- **Step 1** — the contractor marketplace (`estimarket-platform`, `apps/web/src/app/(app)/marketplace`),
  reduced to a two-up grid with a third row running off the bottom edge, the new project outlined and badged
  NEW, and a toast reading "New matching project in your area".
- **Step 4** — the homeowner compare-bids screen (Homeowner Flows `F4FQCzjEv5wjRZmlZZFRjI`, frame `433:172`),
  reduced to the summary tiles and four bid cards with one marked "Chosen".
- **Step 5** — the site-visit scheduler that already exists in the product under `/projects`, shown as a modal
  over an abstracted page.

Both carry the same demo project and the same bid range as the animated scenes ($12.3k–$16.6k for Brennan
Remodel Co.). **If those numbers change in the scenes, these images have to be re-rendered** — source is
`docs/campaign-motion/static-steps.html` (frames `#f1`, `#f4`, `#f5`), screenshot each at
`deviceScaleFactor: 2`. Note the chosen bid is
deliberately not the cheapest: the promise is best bid, not lowest.

## Scene behaviour

A shared hook drives all three. It takes a list of `[delayMs, fn]` steps, starts them when the element is ≥50%
visible, and clears its timers on unmount and on leaving the viewport.

- **Hero** loops: after the last step, wait ~3.2s, reset, replay. Pause when scrolled out of view.
- **Steps 2 and 3** play once and hold the final frame. Don't replay on re-entry.
- **`prefers-reduced-motion: reduce`** — don't run timelines at all; render each scene in its resting state
  (hero at the labor-items phase, step 2 with the scope scrolled to the labor line items, step 3 with all
  rows in and the TBD flagged). The reference has a toggle that shows exactly these frames.

### Timings

Scene A — hero, ~12.8s including the loop gap:

| t | beat |
|---|---|
| 0.5s | push notification slides in from the top |
| 2.0s | notification out, new marketplace card fades into the feed |
| 3.3s | cross-fade to the project scope glance |
| 5.9s | cross-fade to labor items; rows stagger in at 230ms, total counts to $13,300 over 1.5s |
| 7.7s | "1 TBD" chip appears |
| 9.6s | cross-fade to the submitted state with the bid range |

Scene B — scope review, ~9.2s:

| t | beat |
|---|---|
| 0.7s | scope column scrolls to the second section |
| 2.2s | scrolls to the labor line items |
| 3.1s | the row carrying the "Confirm on site" chip gets a focus ring |
| 4.6s | cursor appears, moves to thumbnail 2 |
| 5.5s → 5.75s | click, main photo switches to the shower shot |
| 7.2s | cursor out, scroll to the end of the scope |
| 8.2s | footer CTA slides up |

Scroll offsets are read from `offsetTop` at runtime, not hardcoded — keep that, or copy edits will desync
the motion.

Scene C — bid builder, ~9.5s:

| t | beat |
|---|---|
| 0.45s + 430ms each | five line items appear in turn; running total counts up with each |
| 3.4s | last row flips to TBD — price clears to "—", row tints, "1 TBD" chip appears |
| 3.9s | TBD explainer banner slides in |
| 6.5s | "+ Add line item" and materials note fade in |
| 6.9s | cross-fade to Set bid range; step rail advances to step 4 |
| 7.6s | range bar draws |

### Budget vs bid range — not the same thing

**A homeowner's budget is a single figure** they share as a rough number. **A contractor's bid is a range.**
Everywhere a budget appears — marketplace cards, scope stats, the running-total caption, the compare-bids
tile — it is one number, never a range. The Figma marketplace frame `204:66` shows a range; that is out of
date, follow staging.

On the Set bid range screen the homeowner's budget is a **marker on the scale**, not a competing band, and the
demo deliberately shows a bid whose range brackets that budget — so the "your range falls outside their budget"
warning never appears anywhere in the marketing.

## Product truths — don't drift from these

The scenes mirror real screens. If copy changes, keep these true:

1. **TBD items are excluded from the bid total.** They are not an allowance and not a dollar amount. The UI
   line is "TBD items aren't included in your bid total — you'll confirm them after a site visit."
2. **Bids are labor + installation only.** The homeowner supplies materials.
3. **There is no chat thread, and no standalone "Needs contractor confirmation" block.** Items needing
   confirmation carry a **"Confirm on site" chip on the individual labor line item** — verified in
   `estimarket-platform/apps/web/src/app/(bid)/projects/[jobId]/bid/overview/page.tsx`, which keys off
   `item.confidence === "needs_confirmation"`. Figma `749:174` shows a separate block; production dropped it.
4. **A bid is a range** calculated from the line items; homeowners compare the midpoint.

### Demo data

West Highlands remodel · Denver, CO 80211 · 5×9 ft · 4 photos · homeowner budget **$15,000** · submitted 1h ago,
2 bids · contractor Marcus B., Brennan Remodel Co. · homeowner Sarah K.

Line items: demo & haul-away $1,800 · rough plumbing $2,200 · shower pan + waterproofing $3,100 · tile shower
walls 78 sf $3,900 · tile floor 58 sf $2,300 → **$13,300**, bid range **$12,300 – $16,600** (brackets the
$15,000 budget). Flagged "Confirm on site" / TBD: toilet drain + vent relocation.

Second marketplace card: LoHi hall bath conversion, tub to shower, budget $11,000.

## Mobile

At 390px the 4:3 slot is about 292px tall and a full app screen is unreadable, so the mobile variants are
**separately authored**, not the desktop scenes scaled down. Step 2 becomes photo-zoom-and-confirm; step 3
becomes four larger line items with the total pinned to a bottom bar. Both are in the reference at the bottom
of the page. Don't try to make one component responsive across both — they're different compositions.

## Done when

- All three scenes render at the Figma slot sizes: hero 588×441, steps 592×444.
- Step scenes fire on scroll, play once, hold; hero loops and pauses off-screen.
- `prefers-reduced-motion` shows static resting frames, no timers running.
- No layout shift as photos load (fixed-aspect boxes, `fill` + `object-cover`).
- No base64 images in the bundle; photos served from `/images/`.
- Lighthouse performance on the campaign page is not worse than the other marketing pages.

## Open questions for Cam

- Step 2's scope screen was built from `749:174`, which sits in the **BID-2 proposed redlines** section of the
  Figma file — a proposal, not necessarily what ships. The shipped equivalent is `469:1137`. If the redline
  isn't live by launch, rebuild step 2 on `469:1137`.
- The hero ends on the submitted state rather than showing the homeowner choosing, because that would have
  meant inventing a homeowner UI. Pulling the Homeowner Flows file would let that beat exist.
