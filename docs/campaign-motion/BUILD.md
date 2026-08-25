# Build task: Denver Founding Contractors landing page — motion + imagery

You are working in the **`estimarket`** marketing site repo. This document is the task. Everything it
references is already in this repo — nothing needs downloading.

**Goal:** build the hero animation and the two animated How It Works scenes as React components, and place the
three static step images, for a new campaign landing page.

---

## 0. Read these first, in this order

| File | What to take from it |
|---|---|
| `AGENTS.md` | House rule for this repo. Follow it. |
| `docs/campaign-motion/reference.html` | **The specification.** A standalone working implementation of all three scenes. |
| `docs/campaign-motion/SPEC.md` | Timing tables, token mapping, product truths, acceptance criteria. |
| `src/app/globals.css` | The existing `@theme` tokens you'll map onto. |
| `src/app/components/CTABand.tsx` | A representative existing component — match its conventions. |

### How to read `reference.html`

You can't watch it run, so read it as source. It's one file, roughly 480KB, but most of that is base64 image
data in a handful of CSS rules — skip those.

- **`<style>` block** — all layout and visual treatment. Scene classes are `.sA` (hero), `.sB` (step 2),
  `.sC` (step 3). Mobile variants are `.mB2` and `.mC2`.
- **`<script>` block at the bottom** — the behaviour. Three timelines: `tlA`, `tlB`, `tlC`, each built as a
  chain of `.at(delayMs, fn)` calls. **These are the animation spec.** Read them literally; the delays and the
  order are what you're porting.
- `Timeline` class, `countUp()`, and the `IntersectionObserver` setup near the bottom — that's the machinery
  that becomes the shared hook.
- The `rmToggle` handler shows each scene's `prefers-reduced-motion` resting state. Port those exact states.

If Playwright is available, you can render it and screenshot to check your work against the original — see
§4.

---

## 1. Constraints

**Next.js 16.2.6 / React 19.2.4, App Router, TypeScript, Tailwind v4.** Per `AGENTS.md`, this Next version
differs from your training data — read the relevant guide in `node_modules/next/dist/docs/` before writing
components.

**Do not add dependencies.** No Framer Motion, no GSAP, no animation library. The reference is plain CSS
transitions driven by `setTimeout`, and that's deliberate: it's already correct, it adds zero bundle weight,
and this repo has no animation library today.

**Tailwind v4 with `@theme` in `globals.css`** — there is no `tailwind.config`. Add new tokens to the
`@theme` block.

**Components go in `src/app/components/campaign/`.** Existing components are flat in `src/app/components/`,
but these four belong together as a group. Match the existing conventions otherwise: PascalCase filenames,
default export, `"use client"` only where required.

**Never inline the photos as base64.** The reference does this because it had to be a single file. In the repo
the photos are already at `public/images/dfc-*.jpg` — use `next/image` with `fill` + `object-cover`. Every
photo slot in the scenes is a fixed-aspect box, so that's a direct translation.

---

## 2. Build order

Five commits. Each one should typecheck and build before you move on.

### 2.1 — Tokens

Add to the `@theme` block in `src/app/globals.css`:

```css
--color-tbd:        #4f46e5;  /* "TBD" / "Confirm on site" label + icon */
--color-tbd-bg:     #eeeefb;  /* chip and banner fill */
--color-tbd-border: #c9c9f0;
--color-tbd-row:    #f2f2fc;  /* flagged line-item row background */
```

Everything else in the reference maps to tokens that already exist. `SPEC.md` has the full mapping table. Note
the shadows are brand-tinted `rgba(14,33,75,…)`, not black — preserve that.

### 2.2 — `campaignDemoData.ts`

The reference hardcodes the same numbers in several places. **Don't replicate that.** Extract one module the
three components import from: project name, location, room size, budget, the five line items, the flagged
item, the bid range, contractor and homeowner names, the second marketplace card.

The exact values are in `SPEC.md` under "Demo data". Get them right — a contractor reading this page will
check the arithmetic, and the numbers are internally consistent by design (see §3).

### 2.3 — `useSceneTimeline.ts`

Port the `Timeline` class + `IntersectionObserver` wiring into one hook. It takes an ordered list of
`[delayMs, () => void]` steps and a ref, and:

- starts the timeline when the element is **≥50% visible**
- supports **loop** (hero) vs **play-once-and-hold** (steps 2 and 3)
- **pauses and clears timers when the element leaves the viewport** (loop mode only)
- **clears every timer on unmount** — the reference doesn't need to, a React component does
- when `prefers-reduced-motion: reduce`, **runs no timers at all** and reports that so each scene can render
  its resting state directly

Two React-specific things the reference doesn't have to deal with: **StrictMode double-invokes effects in
dev**, so guard against two timelines running at once; and state updates after unmount must not fire.

### 2.4 — The three scenes

Build in this order, simplest first: `BidBuilderScene` → `ScopeReviewScene` → `HeroLoopScene`.

| Component | Reference class | Timeline | Behaviour |
|---|---|---|---|
| `BidBuilderScene.tsx` | `.sC` | `tlC` | ~9.5s, play once, hold |
| `ScopeReviewScene.tsx` | `.sB` | `tlB` | ~9.2s, play once, hold |
| `HeroLoopScene.tsx` | `.sA` | `tlA` | ~12.8s incl. 3.2s gap, loops |

Two details that are easy to lose in translation:

- **Scene B reads its scroll offsets from `offsetTop` at runtime**, not hardcoded pixels. Keep that — it's why
  copy edits don't desync the motion.
- **Scene C is two panes** (labor items → set bid range) that cross-fade, with the step rail advancing. It's
  one component, not two.

Each scene renders at a fixed slot size: hero **588×441**, steps **592×444**.

**Mobile variants** (`.mB2`, `.mC2` in the reference) are separately authored compositions, not the desktop
scenes scaled down. Build them as distinct render branches, not as responsive CSS on the same markup.

### 2.5 — The page

There's no campaign route yet. Create one — `src/app/denver-founding-contractors/page.tsx` unless Cam has
said otherwise — and lay out the five How It Works steps plus the hero.

Steps 1, 4 and 5 are **static images**, not components:

```
public/images/dfc-step1.png   step 1 — new project lands on the marketplace + toast
public/images/dfc-step4.png   step 4 — homeowner compares bids, picks one
public/images/dfc-step5.png   step 5 — scheduling the walkthrough
```

All three are 1184×888 (2× the 592×444 slot). Use `next/image` with explicit dimensions so nothing shifts on
load.

The page copy lives in the Figma frame — https://www.figma.com/design/6Ps0i11qeiLhayGieUCJZq/Campaign-Landing-Pages?node-id=4-2 —
which is the source of truth for headings and body text. Ask Cam before inventing copy.

---

## 3. Product truths — do not drift from these

The scenes mirror real product screens. If you find yourself rewording UI text inside a scene, check these
first:

1. **TBD items are excluded from the bid total.** Not an allowance, not a dollar amount. The line reads:
   *"TBD items aren't included in your bid total — you'll confirm them after a site visit."*
2. **Bids are labor + installation only.** The homeowner supplies materials.
3. **A homeowner's budget is a single figure; a contractor's bid is a range.** Different things. Budget renders
   as one number everywhere it appears.
4. **There is no chat thread, and no standalone "Needs contractor confirmation" block.** Items needing
   confirmation carry a **"Confirm on site" chip on the individual labor line item**. This is verified in the
   product repo at `estimarket-platform/apps/web/src/app/(bid)/projects/[jobId]/bid/overview/page.tsx`, which
   keys off `item.confidence === "needs_confirmation"`. The Figma redline frame `749:174` shows a separate
   block that the implementation deliberately dropped — **trust the code, not Figma, on this one.**

Two deliberate choices in the demo numbers, so don't "fix" them: the bid range **brackets** the homeowner's
budget, so the product's "your range falls outside their budget" warning never appears; and in step 4 the
chosen contractor is **not the cheapest**, because the promise is best bid, not lowest price.

---

## 4. Verification

Before you call this done:

- [ ] `npm run build` passes, `npm run lint` clean.
- [ ] All three scenes render at the correct slot sizes.
- [ ] Step scenes fire on scroll, play once, hold their final frame, and don't replay on re-entry.
- [ ] Hero loops, and stops looping when scrolled out of view (check no timers keep firing).
- [ ] `prefers-reduced-motion: reduce` renders static resting frames with **no timers running**. Emulate it —
      in Playwright, `page.emulateMedia({ reducedMotion: 'reduce' })`.
- [ ] No layout shift as photos load.
- [ ] No base64 image data anywhere in the bundle.
- [ ] Navigating away unmounts cleanly — no "setState on unmounted component" warnings, no stray timers.
- [ ] Lighthouse performance on the campaign page is no worse than the other marketing pages.

**Visual check.** If Playwright is available, render `docs/campaign-motion/reference.html` and your built page
side by side, screenshot each scene at equivalent timestamps, and compare. The reference is the target. Don't
skip this for the hero — it has four cross-faded phases and it's the easiest one to get subtly wrong.

---

## 5. Things that will look like bugs but aren't

- **The `est.` figures in step 4** are midpoints of each bid range. They're meant to be.
- **`dfc-lohi.jpg` is only 473px wide** while the others are 1280px. It's used at card size only. Don't upscale
  it, don't flag it.
- **Three of the four cards in step 1's marketplace grid are the same bathroom** from different angles. Known,
  accepted — there aren't more real project photos yet.
- **The reference declares its own CSS variables** (`--primary-darkest` etc.) because it's standalone. Those
  map onto existing theme tokens; don't add them to `globals.css`.

---

## 6. Ask before deciding

Come back to Cam rather than guessing on:

- Any landing page copy that isn't in the Figma frame.
- The route name, if `denver-founding-contractors` isn't what he wants.
- Anything that would change the demo numbers — they're consistent across the three components *and* the three
  static PNGs, and changing them means re-rendering the images from
  `docs/campaign-motion/static-steps.html` (frames `#f1`, `#f4`, `#f5`, screenshot at `deviceScaleFactor: 2`,
  keep `fonts/` beside the HTML or the type falls back).

---

## Appendix: timings

Copied from `SPEC.md` for convenience. The authoritative version is the `.at()` chain in `reference.html`.

**Hero (`tlA`)** — ~12.8s including the loop gap

| t | beat |
|---|---|
| 0.5s | push notification slides in from the top |
| 2.0s | notification out, new marketplace card fades into the feed |
| 3.3s | cross-fade to the project scope glance |
| 5.9s | cross-fade to labor items; rows stagger at 230ms; total counts to $13,300 over 1.5s |
| 7.7s | "1 TBD" chip appears |
| 9.6s | cross-fade to the submitted state with the bid range |

**Scope review (`tlB`)** — ~9.2s, play once

| t | beat |
|---|---|
| 0.7s | scope column scrolls to the description |
| 2.2s | scrolls to the labor line items |
| 3.1s | the row carrying the "Confirm on site" chip gets a focus ring |
| 4.6s | cursor appears, moves to thumbnail 2 |
| 5.5s → 5.75s | click; main photo switches to the shower shot |
| 7.2s | cursor out; scroll to the homeowner notes |
| 8.2s | footer CTA slides up |

**Bid builder (`tlC`)** — ~9.5s, play once

| t | beat |
|---|---|
| 0.45s, then every 430ms | five line items appear in turn; running total counts up with each |
| 3.4s | last row flips to TBD — price clears to "—", row tints, "1 TBD" chip appears |
| 3.9s | TBD explainer banner slides in |
| 6.5s | "+ Add line item" and materials note fade in |
| 6.9s | cross-fade to Set bid range; step rail advances to step 4 |
| 7.6s | range bar draws |
