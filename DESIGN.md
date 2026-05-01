---
name: SPCTR
description: Tactical dark brand site for a B2B BDR outsourcing service — precision-instrument components, earned intensity.
colors:
  signal-green: "#c0fc04"
  alarm-red: "#ff1a1a"
  burn-orange: "#ff5500"
  magenta-pulse: "#ea027e"
  electric-violet: "#3601fb"
  cold-cyan: "#01ffff"
  field-olive: "#59b41d"
  void-black: "#000000"
  near-void: "#0a0a0a"
  panel-surface: "#111111"
  boundary-line: "#1c1c1c"
  bone-static: "#eeeee6"
  muted-signal: "#d4d4e4"
  deep-dim: "#222230"
  indigo-depth: "#29324f"
typography:
  display:
    fontFamily: "KH Interference, Barlow Condensed, sans-serif"
    fontSize: "clamp(56px, 8vw, 120px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "1px"
  headline:
    fontFamily: "KH Interference, Barlow Condensed, sans-serif"
    fontSize: "clamp(44px, 6vw, 80px)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "2px"
  title:
    fontFamily: "Space Mono, monospace"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "2px"
  body:
    fontFamily: "Space Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "4px"
  serif-accent:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(18px, 2vw, 26px)"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0px"
spacing:
  xs: "12px"
  sm: "24px"
  md: "52px"
  lg: "80px"
  xl: "110px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.none}"
    padding: "18px 40px"
  button-primary-hover:
    backgroundColor: "{colors.bone-static}"
    textColor: "{colors.void-black}"
  button-red:
    backgroundColor: "{colors.alarm-red}"
    textColor: "{colors.bone-static}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
  button-red-hover:
    backgroundColor: "{colors.bone-static}"
    textColor: "{colors.void-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone-static}"
    rounded: "{rounded.none}"
    padding: "0"
  button-ghost-hover:
    textColor: "{colors.signal-green}"
  input-default:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.bone-static}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  input-focus:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.bone-static}"
---

# Design System: SPCTR

## 1. Overview

**Creative North Star: "The Signal from the Black"**

SPCTR's design system is an operational surface — a dark intelligence brief that surfaces only what needs to be seen. The visual language is borrowed from classified infrastructure: narrow-channel text, hard geometric type, earned color signals. Nothing decorates. Everything informs.

The palette is unusually wide for a brand site — seven named accent colors — but the system holds through strict rationing. Accent colors appear as eyebrow markers, card distinguishers, and glitch channels, never as fills or backgrounds. Signal Green is the lone exception: it marks confirmation, activation, and primary action at no more than 15% of any surface. The ground stays void-black. The signal earns its moment.

Typography pairs heavy geometric uppercase display (KH Interference) against Space Mono for all UI text, with Playfair Display italic appearing once per section as a deliberate tonal break — the single moment of curve in an otherwise hard-edged system. Animations are purposeful and restrained: a periodic glitch on key display lines (never constant), fade-up entrance sequences, a blinking ping dot, a scanline overlay running full-screen at 6% opacity. These are infrastructure textures, not decorations — applied precisely, never compounded.

**Key Characteristics:**
- Deep void-black ground with tonal surface layering (void → near-void → panel surface)
- One primary accent (Signal Green) plus six supporting chromatic channels, all strictly rationed
- Parallelogram clip-path buttons: the signature shape, non-negotiable
- Monospaced UI throughout — no humanist sans anywhere in the interface
- Glitch, scanlines, and crosshair cursor as earned operational texture
- KH Interference + Playfair italic as the type system's defining tension

## 2. Colors: The Signal Palette

A near-monochrome dark field punctuated by seven chromatic channels. Restraint is the system — the colors read as vivid because they appear rarely.

### Primary
- **Signal Green** (`#c0fc04`): Activation, confirmation, hover state, primary CTA fill, selection highlight, scrollbar thumb. The one accent color permitted as a surface fill. Its rarity on any given screen is what makes it register as a signal, not noise.

### Secondary
- **Alarm Red** (`#ff1a1a`): Deploy CTAs, glitch channel 1, nav button fill, threat-state indicators. The second-most visible accent, reserved for irreversible or high-urgency actions.
- **Burn Orange** (`#ff5500`): Hollow display strokes on the hero h1, structural accents. A warm register distinct from red — used as a non-interactive accent.

### Tertiary
- **Magenta Pulse** (`#ea027e`): Eyebrow labels, card top-border accents, glitch support channel.
- **Electric Violet** (`#3601fb`): Eyebrow labels, glitch channel 2, ambient background radial glows (~6% opacity max).
- **Cold Cyan** (`#01ffff`): Eyebrow labels and card distinguishers. The highest-chroma point in the palette — used sparingly for maximum contrast signal.
- **Field Olive** (`#59b41d`): A muted relative of Signal Green. Used in card top-border accents where the full acid would be too loud against the section context.

### Neutral
- **Void Black** (`#000000`): Absolute background. Body background, scrollbar track.
- **Near Void** (`#0a0a0a`): Card and section surface backgrounds. One step above void.
- **Panel Surface** (`#111111`): Hover state for cards, pillar backgrounds, elevated surfaces.
- **Boundary Line** (`#1c1c1c`): All borders, dividers, and the background color behind gap-1px card grids.
- **Deep Dim** (`#222230`): Large muted numerals (card numbers at rest). A dark surface with a faint indigo cast.
- **Indigo Depth** (`#29324f`): Mid-dark tone with strong indigo identity. Available for ambient section backgrounds where pure black reads flat.
- **Bone Static** (`#eeeee6`): Primary foreground. Warm off-white that keeps large display type from reading cold against the void.
- **Muted Signal** (`#d4d4e4`): Secondary text, metadata, placeholder copy. Cooler than Bone Static — creates hierarchy without a full opacity drop.

### Named Rules

**The Rationed Signal Rule.** Signal Green and all six accent colors are state markers and section identifiers, not fill colors. Any screen where accent colors collectively exceed 15% of visible surface area has broken the system. If more color presence is needed, add Burn Orange as a stroke — never add a second filled surface.

**The Seven-Channel Rule.** The palette has seven accents because they are never used together. Each section is assigned one eyebrow color. That color appears nowhere else in that section. The variety in the palette exists to give each section its own operational frequency, not to create a rainbow.

## 3. Typography

**Display Font:** KH Interference (weight 700–900, all-caps, tight line-height 0.92)
**Body / UI Font:** Space Mono (all labels, body copy, buttons, nav links, form fields)
**Serif Accent:** Playfair Display (italic, weight 400, one occurrence per section maximum)
**Condensed Fallback:** Barlow Condensed (form titles, fallback where KH is unavailable)

**Character:** The pairing is tension by design. KH Interference is industrial and angular — stenciled equipment labels, not editorial display. Space Mono removes all humanist warmth from the body text: equal-width characters, terminal-printout density. Playfair italic appears exactly once per section as a deliberate contrast line — the one moment of curve, the one weight of breath. It works because it is outnumbered.

### Hierarchy

- **Display** (KH Interference, 700, clamp(56px, 8vw, 120px), line-height 0.92): Hero headline only. Uppercase. Hollow-stroke variant (`-webkit-text-stroke`) and acid-fill variant both used.
- **Headline** (KH Interference, 700, clamp(44px, 6vw, 80px), line-height 1.0): Section h2 titles. Uppercase. Letter-spacing 2px.
- **Serif Accent** (Playfair Display italic, 400, clamp(18px, 2vw, 26px), line-height 1.4): Section sub-headline, immediately below the headline. One per section, 85% opacity. The softening line.
- **Title** (Space Mono, 700, 20px, line-height 1.2): Card names, panel headings, rate titles. Uppercase, letter-spacing 2px.
- **Body** (Space Mono, 400, 12–14px, line-height 1.85): Section body copy, card descriptions, contact text. Bone Static foreground. 65–70ch maximum line length.
- **Label** (Space Mono, 400 or 700, 9px, letter-spacing 3–5px, all-caps): Eyebrow text, form labels, nav links, button text, tags, metadata. The most-used type role in the system.

### Named Rules

**The Mono-First Rule.** Every UI string — buttons, labels, nav, form fields, metadata — runs in Space Mono. No humanist or geometric sans enters the interface. If Space Mono is unavailable, fall back to a system monospace, never to a sans-serif.

**The One Serif Rule.** Playfair Display appears at most once per visible section: one italic line below the headline. Never inside cards, never on buttons, never repeated. Its scarcity is what makes it read as deliberate contrast rather than stylistic drift.

## 4. Elevation

The system is flat by default. Surfaces are differentiated through tonal steps (void black → near void → panel surface), not through shadow. This keeps the dark field clean and avoids the floated-card softness that would undermine the operational aesthetic.

Shadows appear only as responses to interaction state:

### Shadow Vocabulary

- **Hover Lift** (`0 16px 40px rgba(0,0,0,0.6), 0 0 24px rgba(192,252,4,0.12)`): Pillar cards on hover. The second layer is a diffuse acid glow. Present, not loud.
- **Button Glow** (`0 0 30px rgba(192,252,4,0.2)`): Acid-fill button on hover. A soft halo at 20% opacity, 30px spread. Does not appear at rest.

### Named Rules

**The Flat-by-Default Rule.** Surfaces never carry ambient shadows at rest. Shadow is a hover state, not a resting aesthetic. When something needs to feel elevated without interaction, use a tonal surface shift (near-void → panel surface) with a 1px Boundary Line border — not a box-shadow.

## 5. Components

### Buttons

Precision-instrument buttons. The signature shape is a parallelogram clip-path — hard diagonal cuts at both ends, zero border radius, zero softness. Three variants.

- **Shape:** No radius (0px). `clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)` on primary (10px cut); 8px cut on submit; 6px cut on nav button.
- **Primary (Acid):** Signal Green fill, Void Black text. 18px/40px padding. Space Mono 700, 10px, 3px letter-spacing, all-caps. Hover: Bone Static fill, translateY(-2px), Button Glow shadow.
- **Primary (Red):** Alarm Red fill, Bone Static text, same shape and typeset. Hover: Bone Static fill, Void Black text.
- **Ghost:** Transparent background, Bone Static text. No clip-path. Hover: Signal Green text, acid text-shadow glow (`0 0 12px rgba(192,252,4,0.6)`).
- **Nav Button:** 6px diagonal cut. Alarm Red fill, white text, Space Mono 700 9px. Hover: Bone Static fill, Void Black text.

### Cards / Containers

- **Corner Style:** Zero radius. Hard edges throughout.
- **Background:** Near Void (`#0a0a0a`) at rest, Panel Surface (`#111111`) on hover.
- **Shadow Strategy:** Flat at rest. Hover on pillar cards only: Hover Lift shadow.
- **Border:** Gap-1px grid technique for card grids — Boundary Line (`#1c1c1c`) is the grid background; cards sit flush with 1px gaps. Rate cards use `border: 1px solid transparent` (colored top border only).
- **Top Accent:** Rate cards and service cards carry a 2px solid top border — one accent color per card, never the same across cards in the same grid.
- **Internal Padding:** 24px (service cards), 48px/44px (rate cards), 36px (pillars).

### Inputs / Fields

- **Style:** Zero radius. 1px Boundary Line border. Void Black background. Bone Static text. Space Mono 12px, 1px letter-spacing. Crosshair cursor.
- **Focus:** Border shifts to Signal Green. No glow, no shadow — a clean color transition is enough.
- **Placeholder:** `#F2F2F8` — slightly brighter than body muted text.

### Navigation

- **Style:** Fixed, full-width, 64px height. Background `rgba(5,5,10,0.92)`, `backdrop-filter: blur(16px)`. Bottom border: Boundary Line at rest, transitions to `rgba(192,252,4,0.12)` on scroll past 60px.
- **Logo:** KH Interference 900, 28px, 12px letter-spacing, uppercase. The trailing period renders in Signal Green.
- **Links:** Space Mono 9px, 3px letter-spacing, uppercase. Bone Static at rest, Signal Green on hover.
- **CTA:** Nav button variant (6px clip, Alarm Red fill).

### Eyebrow Label

The section identifier pattern. A 20–32px horizontal rule followed by uppercase Space Mono text at 9px/5px letter-spacing. The line and text share the accent color assigned to that section. This is the primary mechanism for giving each section its own operational frequency — pick one of the seven accent colors, use it nowhere else on that section.

### Signature Components

**Glitch Text.** Two pseudo-elements (`::before`, `::after`) offset horizontally on a 5-second cycle, active in the 76–98% window. Channel 1 (`::before`): Alarm Red, horizontal clip-path slice. Channel 2 (`::after`): Signal Green (Electric Violet on the acid variant). The glitch fires for approximately one second per five-second cycle, then rests. Increasing frequency or stacking multiple glitch elements breaks the system — the rarity is the effect.

**Scanline Overlay.** Fixed, full-screen, `z-index: 9999`, `pointer-events: none`. `repeating-linear-gradient` at 4px pitch, 6% black opacity. A single site-wide texture. Never exceed 8% opacity or add a second overlay layer.

**Crosshair Cursor.** Site-wide `cursor: crosshair`, not overridden on any interactive element. This is a brand identity choice, not a UX accident.

**Bracket Corners.** 24px `L`-shaped corner accents on the hero section: top-left in Signal Green, bottom-right in Alarm Red. 1px lines, no fill. Used only to frame the hero — not a repeating pattern.

## 6. Do's and Don'ts

### Do:
- **Do** use the parallelogram clip-path on all primary buttons. It is the system's signature shape — never swap it for a rounded or rectangular button.
- **Do** assign exactly one eyebrow accent color per section. Use it for the eyebrow line and nowhere else in that section.
- **Do** keep all UI text (buttons, nav, labels, form fields, metadata) in Space Mono. The Mono-First Rule is non-negotiable.
- **Do** limit Playfair Display to one italic line per section, positioned below the headline as a tonal counterpoint.
- **Do** introduce surface depth with tonal background shifts (Near Void → Panel Surface) before reaching for shadows or borders.
- **Do** support `prefers-reduced-motion` — all animations are cosmetic and should be suppressed for users who request it.
- **Do** keep Void Black as the absolute background ground. No section should use a lighter-than-Near-Void base.

### Don't:
- **Don't** use gradient text (`background-clip: text` with a gradient). Prohibited. Use a solid accent color for emphasis, or weight/size contrast.
- **Don't** use glassmorphism decoratively. The nav `backdrop-filter: blur(16px)` is a single purposeful exception, not a pattern to replicate across cards or modals.
- **Don't** let Signal Green fill more than 15% of any screen. If it appears everywhere, it signals nothing.
- **Don't** use bubbly SaaS optimism: rounded cards, pastel gradients, friendly illustrations, "Let's grow together" copy energy.
- **Don't** build hero-metric templates (large number, gradient accent, supporting stats). Generic B2B cliché.
- **Don't** add border-radius to any interactive component. The system has zero radius — a single rounded button breaks the language.
- **Don't** stack multiple glitch text elements in the same viewport. One glitch element per visible area maximum.
- **Don't** increase the scanline overlay opacity above 8% or layer a second full-screen texture. They compound and crush dark-area detail.
- **Don't** use bright or saturated backgrounds. Accent colors are signals, never grounds. The surface stays dark.
