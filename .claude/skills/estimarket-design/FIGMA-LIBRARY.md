# Figma library — Estimarket Design System

File: https://www.figma.com/design/8KW2ZKcnIglSqk1M3rdk5B
File key: `8KW2ZKcnIglSqk1M3rdk5B`

This Figma library is generated from `colors_and_type.css` in this folder. **The CSS is
the source of truth.** Every Figma variable carries its CSS custom property as WEB code
syntax, so Dev Mode shows `var(--color-primary)` next to `color/primary/base`.

## What the library publishes

| Figma                | Maps to                                                  |
|----------------------|----------------------------------------------------------|
| `Primitives` collection | Raw values: `color/*`, `space/*`, `radius/*`, `border-width/*`, `motion/*` |
| `Semantic` collection   | Roles aliased to primitives: `text/*`, `bg/*`, `border/*`, `status/*`, `action/*` |
| Text styles          | `display/*`, `heading/*`, `body/*`, `label/*`, `caption`, `editorial/display-italic` |
| Effect styles        | `elevation/xs` … `elevation/2xl`, `elevation/inner` (navy-tinted) |
| Components           | `Button` (Style x Size), `Input` (State), `Badge` (Tone), `Toast` (Type), `Rating` |

Design with the **Semantic** collection. Reach for `Primitives` only when no role fits.

## Naming differences to know about

- CSS `--color-primary` is Figma `color/primary/base` (Figma needs a leaf name).
- CSS has no token for the error-field tint `#FEF2F2` used by the input error state.
  Figma calls it `color/status/error-subtle`; add `--color-status-error-subtle` to the
  CSS next time it is touched so the two sides match.

## Not in the library on purpose

Navigation, search bar and property card. The preview cards for those in
`preview/components-*.html` are left over from the original reference kit the visual
language was derived from — they carry borrowed structure and copy (check-in and
check-out dates, guest counts, price per night, "Superhost") that does not describe
Estimarket. The real Estimarket Navigation, Promo Bar and CTA Band components live on
the Components page of the `Launch Site V1` Figma file (`hrk771noIPBK0zFHgzHRrh`) and
should be promoted from there.

## Re-syncing

Change `colors_and_type.css` first, then update the Figma variable. Do not edit a value
in Figma and expect it to flow back — nothing reads Figma into the CSS.
