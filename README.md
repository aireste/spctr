# SPCTR

**AI-powered B2B lead generation that books qualified meetings, not spam.**

Live site: **[spctr.run](https://spctr.run)**

SPCTR is the marketing site for a done-for-you outbound service that finds the right buyers, runs the outreach, qualifies interest, and hands the client a calendar invite with a decision-maker who already said yes. The positioning is outcome-first and the business model is pay-per-meeting: the client only pays when a meeting actually lands, which structurally aligns incentives ("I only win when you win").

Built and shipped by Esteban Guerra under Guerra Digital LLC.

---

## What this project demonstrates

A production, deployed marketing site built from scratch, not a template. Highlights a reviewer can look at:

- **Interactive 3D globe** (`components/GlobeCanvas.tsx`) built with Three.js: a sphere with topojson country outlines, ~80 population-center clusters with Gaussian scatter, pulsing halos, animated arc connections, drag-to-spin, and auto-spin driven by an IntersectionObserver so it only animates when in view. Hidden on mobile for performance.
- **Custom animated starfield** background, resize-debounced so it stays smooth during mobile scroll rather than recalculating every frame.
- **A hand-built design system**, not a UI kit drop-in: a dark tactical aesthetic on a pure-black base with a disciplined accent palette, consistent eyebrow labels, and typography pairing Barlow Condensed, Space Mono, and Playfair Display.
- **Conversion-focused copy and layout**, sharpened through real iteration (hero, services, rates, and a lead-capture form).
- **Responsive from the ground up**, with deliberate mobile fallbacks for the heavier visual elements.
- **Live lead capture** wired to a form backend, deployed continuously to Vercel on every push to `main`.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + a custom design system in `app/globals.css`
- **3D / graphics:** Three.js (globe, starfield)
- **Components:** shadcn/ui
- **Forms:** Formspree
- **Hosting / CI:** Vercel (auto-deploy on push to `main`)

## Page structure

1. **Hero** — headline, primary CTA, starfield background
2. **Services** — what SPCTR delivers, paired with the interactive globe
3. **What is SPCTR** — the model and philosophy, shared dotted-surface background
4. **Rates** — pay-per-meeting pricing
5. **Contact** — lead-capture form (`#deploy`)

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
  page.tsx          # composes the page sections
  globals.css       # the full design system + section styling
components/
  GlobeCanvas.tsx   # Three.js interactive globe
  ...               # Hero, Services, Rates, Contact, etc.
public/             # static assets
```

## Notes

- The site is intentionally copy-light and visual-forward: the goal is to sell an outcome, so the messaging leads with results and keeps the "how" quiet.
- Deployment is continuous: a push to `main` ships to production at spctr.run via Vercel.

---

© Guerra Digital LLC. Code shared for portfolio and review purposes.
