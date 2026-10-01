---
name: SPCTR
description: Warm bone base, Marathon-style flat color blocks, a mascot eye in endless colorways. Alive in the hero, calm below the fold.
colors:
  bone: "#eeede7"      # page background
  panel: "#e2e1d9"     # neutral cards
  panel-2: "#d7d6cd"
  field: "#f7f7f2"     # inputs
  ink: "#0c0c11"       # text, dark surfaces
  ink-2: "#55555f"     # secondary text
  lime: "#c0fc04"
  orange: "#ff5500"
  magenta: "#ea027e"
  cobalt: "#3601fb"
  teal: "#00d4aa"
  red: "#ff0d1a"
typography:
  sans: "Hanken Grotesk (display 900, body 400-700)"
  mono: "JetBrains Mono (numbers, small spec labels only)"
---

# SPCTR design system

All tokens live on `:root` in `app/home.css`.

## Color roles

| Color | Role |
|---|---|
| **Orange** | Lead Generation offer card; the hero's "character" eye tile |
| **Cobalt** | Custom AI Builds card + page art; emphasis words in headlines; default button hover |
| **Teal** | "Start here" / positive: contact form, nav underline for the current page, checks |
| **Magenta** | Mascot colorways; step 1 marker |
| **Lime** | Big fills with ink text, checks on dark chips, hovers on dark/cobalt surfaces. Never as small neon badges |
| **Red** | Problems and "not a fit" only |
| **Ink / bone** | Text, dark cards, buttons |

Rules:
- Each big color block appears once per screen. Saturated cards come in complementary pairs (orange next to cobalt).
- Lime on ink only on dark surfaces; never black-and-neon chips on the bone background.

## Type and labels

- Section labels are numbered chapter lines: `01  Offerings ────`, sentence case, mono number. No pills.
- Status text ("Available now", "Quoted per project") is plain type next to the number. No pills, badges, or dots.
- Buttons: pill-shaped, ink by default, no arrows. They lift 2px on hover; the cards around them do not.
- Card titles that sit side by side share line count and row alignment (CSS subgrid).

## The mascot (Glint)

The crosshair "eye" mark is a character system: same shape, endless colorways and moods. Use mark variants for brand visuals instead of generic icons.

- Ring quadrants and center disc are clipped separately so each can take its own color (`components/bento/Mosaic.tsx`).
- No romance between marks. Interactions are cool and playful.
- Cursor reaction is limited to the hero: the 3x3 grid looks at the cursor on hover, and the black/cobalt/pink trio tracks it while spinning. Nothing else follows the mouse.

## Motion

- The hero is where the site is alive. Every tile may move, each with its own distinct, gentle motion. No chaotic scenes.
- Below the fold is calm: headers never animate; cards do a one-time staggered rise-in on scroll.
- Prefer requestAnimationFrame springs for "alive" moments. Bouncy but unhurried: short bursts with rests between them.
- Loops must never visibly reset. Advance on real elapsed time (capped per frame) and change scenes on `animationend`, never on a separate timer.
- Everything respects `prefers-reduced-motion`.

## Avoid

Neon pills, all-caps neon labels, status dots, shimmer and scan sweeps, glowing cards, gradient text, dot-matrix icons, arrows on buttons, dark tactical styling, and anything that looks like the HedgePredict dashboard.
