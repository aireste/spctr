# SPCTR

**An AI implementation studio. We put AI to work for small and mid-sized businesses.**

Live site: **[spctr.run](https://spctr.run)**

SPCTR helps businesses get real results from AI without needing to understand it. Two offers today:

1. **Lead Generation Intelligence** (live now). Sales outreach, done for you. Clients get calendar invites with decision makers who already said yes, and pay a flat fee per booked meeting. No meeting, no charge.
2. **Custom AI Builds** (quoted per project). Clients tell us what's eating their week. We connect the tools they already use, build the fix, hand it over, and make sure it works. One flat quote after a 20 minute call.

More offerings are on the way. The site sells the outcome, never the plumbing: no jargon, no "how it works under the hood."

Built and shipped by Esteban Guerra under Guerra Digital LLC, Nashville, TN.

---

## What this project demonstrates

A production marketing site built from scratch, not a template:

- **A mascot as a design system.** The SPCTR crosshair "eye" mark is a character (Glint) rendered in endless colorways. One SVG mark with each ring quadrant and the center disc clipped separately, so every tile can recolor it.
- **A living hero mosaic.** Every tile moves with its own gentle personality: a searchlight sweep, a spring-physics "focus lock," a spin wave across a 3x3 grid, a conveyor, a stroll. Loops are seamless (no visible resets), and motion respects `prefers-reduced-motion`.
- **Eyes that notice you.** The 3x3 grid looks at your cursor on hover, and three spinning marks track the cursor mid-spin (the look vector is counter-rotated against each mark's live CSS rotation every frame).
- **Hand-tuned rAF springs** instead of keyframes for the "alive" moments, with deliberately unhurried tempos.
- **Glint, the site helper.** A corner launcher that answers common questions from site copy only, with a handoff to a human.
- **Outcome-first copy**, sharpened through real iteration: sell the six-pack, not the workout.
- **Responsive and accessible**: aligned card rows via CSS subgrid, mobile fallbacks, reduced-motion support.
- **Live lead capture** to a form backend, deployed continuously to Vercel on every push to `main`.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** hand-written CSS design system in `app/home.css` (Hanken Grotesk + JetBrains Mono)
- **Motion:** inline SVG, CSS animations, Web Animations API, requestAnimationFrame springs
- **Forms:** Formspree
- **Hosting / CI:** Vercel (auto-deploy on push to `main`)

## Pages

- `/` home: hero mosaic, offerings, how to start, who it's for, contact
- `/lead-generation`: the pay-per-meeting offer in full (problem, what you get, fit, pricing, FAQ)
- `/custom-builds`: the custom AI builds offer in full
- `/privacy`: privacy notice

## Run it locally

```bash
git clone git@github.com:aireste/spctr.git
cd spctr
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/
  page.tsx                # home
  lead-generation/        # lead gen offer page
  custom-builds/          # custom AI builds offer page
  home.css                # the design system + all page styling
components/bento/
  Mosaic.tsx              # hero mosaic + the recolorable SPCTR mark
  LivingEye.tsx           # Glint's eye: glances, blinks, double-takes
  FocusLock.tsx           # spring-physics "scan and lock"
  GridWave.tsx            # 3x3 spin wave + look-at-cursor
  TrioGaze.tsx            # spinning marks whose eyes track the cursor
  AssemblyLine.tsx        # conveyor of marks
  DuoTile.tsx             # the stroll
  GlintHelper.tsx         # corner helper
  Chrome.tsx              # nav + footer
  ContactForm.tsx         # lead capture
```

Older components in `components/` (globe, starfield) are from the previous site and are no longer rendered.

## Docs

- `PRODUCT.md`: who the site is for and what it must do
- `DESIGN.md`: palette, type, color roles, motion rules

---

© Guerra Digital LLC. Code shared for portfolio and review purposes.
