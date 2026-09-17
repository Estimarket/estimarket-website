# Estimarket logo package

Two members, one system.

- **Lockup** — the primary logo. Site, app, documents, decks, email.
- **Badge** — the stamped-plate variant. Merch, decals, stickers, social avatars, anywhere it gets framed by empty space.

The mark is the same in both, and it is the app icon.

The **primary is two-tone**: orange middle bar in the mark, "market" in orange. Single-colour navy versions are included as alternates for the places two-tone doesn't survive.

---

## Which file do I use?

| Where | File |
|---|---|
| Website nav, light background | `01-lockup/svg/estimarket-lockup-primary.svg` |
| Website footer, navy background | `01-lockup/svg/estimarket-lockup-reverse.svg` |
| Where orange would clash, or one colour is safer | `01-lockup/svg/estimarket-lockup-navy.svg` (`-navy-reverse` on dark) |
| Faxes, stamps, embroidery, one-colour print | `01-lockup/svg/estimarket-lockup-mono-black.svg` (or `-mono-white`) |
| Truck decals, hard hats, stickers, tote bags | `02-badge/svg/estimarket-badge-two-tone.svg` |
| Badge over a photo or a colour field | `02-badge/svg/estimarket-badge-transparent-{navy\|white\|orange}.svg` |
| Social avatar (square crop) | `03-mark/png/estimarket-mark-two-tone-512.png` |
| Browser tab | `04-favicon/` |
| iOS app | `05-app-icon-ios/` |
| Android app | `06-app-icon-android/` |
| Anything going to a print shop | the `pdf/` folder in each group |

**Use SVG on the web.** The PNGs are there for tools that can't take vectors (some email clients, some slide software, app stores).

---

## Rules

**Clear space.** Keep empty space equal to **half the block height** on all four sides. Nothing crosses into it — no text, no rules, no photo edges.

**Minimum sizes.**

- Lockup: **120px** wide on screen, 1 inch in print. Below that the wordmark closes up.
- Badge: **160px** wide. It carries a border, so it needs more room than the lockup.
- Mark: **16px**. The 16 and 32px favicons are drawn on the pixel grid by hand — use those files, don't resize a larger one down to 16.
- **Two-tone below ~96px**: the orange bar is the first thing to go muddy. The favicons and app icons are single-colour on purpose for this reason. Use `-navy` under 96px.

**Don't.**

- Don't put the badge in the nav bar. Its border reads as a UI control next to real buttons.
- Don't recolour the bars individually beyond the two-tone form defined here.
- Don't stretch, rotate, add a shadow, or outline the wordmark.
- Don't rebuild the lockup by placing the mark next to typed text. The spacing is part of the artwork; use the file.
- Don't put the orange or two-tone lockup on an orange or red background — use `-navy` or `-reverse`.
- Don't put a transparent badge on a busy part of a photo. The plate interior and the bars are see-through, so the background reads straight through the mark — it needs a calm, even area behind it.

---

## Colours

| | Hex | Use |
|---|---|---|
| Navy | `#0E214B` | Block, "Esti", app icon background |
| White | `#FFFFFF` | Top and bottom bars, reverse wordmark |
| Orange | `#E85D26` | Middle bar and "market" |

Note the tension worth watching: `#E85D26` is also your primary CTA colour, and the primary lockup now carries it. In the nav that's a small amount of orange a long way from the Get started button, so it holds — but if you ever place the logo close to a CTA, or on a page dense with orange, switch to `01-lockup/svg/estimarket-lockup-navy.svg`.

---

## Typeface

The wordmark is **Staatliches** (SIL Open Font License — free for commercial use, including logos).

**Every wordmark in this package is converted to outlines**, so nothing here needs the font installed to render correctly. If you ever set new text to match, you'll need the font itself — but for the logo, use these files.

Note this is a *new* face for you. DM Sans and DM Serif Display remain the brand typefaces for everything else; Staatliches is the logo only.

---

## Folders

```
01-lockup/     svg · png (@1x @2x @3x @print) · pdf     two-tone, reverse, navy, navy-reverse, mono ×2
02-badge/      svg · png (@1x @2x @3x @print) · pdf     4 filled + two-tone + 3 transparent
03-mark/       svg · png (128–1024) · pdf               mark + bars-only, all colourways
04-favicon/    16 · 32 (hand-gridded) · 48–512 · svg · apple-touch-icon
05-app-icon-ios/     all 13 required sizes, opaque, no alpha
06-app-icon-android/ mipmap-mdpi → xxxhdpi, adaptive foreground, Play Store 512
```

`source/` subfolders hold the SVG masters the icon sets were generated from — you won't need them day to day.

### App store notes

- **iOS** icons are flattened to RGB with no alpha channel, which is what App Store Connect requires. Apple applies the rounded mask itself, so the artwork is a full-bleed square.
- **Android** ships both the legacy square icon and an adaptive `ic_launcher_foreground` (bars sized to the 66% safe zone) to pair with a solid `#0E214B` background colour. Set the background in `ic_launcher_background.xml` rather than shipping a background PNG.
- Both icon sets use the **single-colour** mark. At 40–60px the orange bar stops reading as a deliberate accent and starts looking like a rendering artefact.
