"use client";

import { useEffect, useId, useRef } from "react";
import { markInner } from "./Brand";

// Lime hero tile = "the machine": a camera that scans and locks focus.
// Driven by real spring physics every frame (not keyframes), so motion is
// snappy with a little overshoot and jiggle, then rests:
//   scan    ring snaps a quarter turn and wobbles into place
//   lock    ring pieces squeeze in, pupil pinpoints, eyeball swells
//   release everything springs back, then a 2 to 3s rest
const DISC = { x: 499, y: 491, r: 141 };
const PUPIL = { x: 462, y: 473, r: 51 };

type Spring = { x: number; v: number; to: number; k: number; c: number };
const spring = (x: number, k: number, c: number): Spring => ({ x, v: 0, to: x, k, c });

export function FocusLock({ ink = "var(--ink)", pupil = "var(--lime)" }: { ink?: string; pupil?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const quads = Array.from(svg.querySelectorAll<SVGGElement>(".fl-q"));
    const disc = svg.querySelector<SVGGElement>(".fl-disc")!;
    const pup = svg.querySelector<SVGCircleElement>(".fl-pupil")!;

    // moderately soft springs, light damping = unhurried with a small overshoot
    const angle = spring(0, 70, 7.5);   // ring rotation (deg)
    const squeeze = spring(0, 200, 11); // ring pieces pulled inward
    const pr = spring(1, 180, 9);       // pupil size
    const ds = spring(1, 150, 8.5);     // eyeball size
    const all = [angle, squeeze, pr, ds];

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let dir = 1;

    const lock = () => {
      squeeze.to = 1; pr.to = 0.35; ds.to = 1.07;
      later(() => { squeeze.to = 0; pr.to = 1; ds.to = 1; }, 280);
    };
    const cycle = () => {
      if (Math.random() < 0.25) dir = -dir;               // sometimes turn the other way
      angle.to += 90 * dir;
      const double = Math.random() < 0.25;                 // sometimes a quick double-scan
      if (double) later(() => { angle.to += 90 * dir; }, 500);
      later(lock, double ? 1200 : 750);
      later(cycle, 3200 + Math.random() * 1500);
    };
    later(cycle, 900);

    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.034, (now - last) / 1000); last = now;
      // semi-implicit Euler, a few substeps for stability at high stiffness
      for (let s = 0; s < 3; s++) {
        const h = dt / 3;
        all.forEach((p) => { p.v += (-p.k * (p.x - p.to) - p.c * p.v) * h; p.x += p.v * h; });
      }
      const sq = squeeze.x * 16;
      quads.forEach((q, i) => {
        const dx = i % 2 ? -sq : sq, dy = i < 2 ? sq : -sq; // pull toward center
        q.setAttribute("transform", `rotate(${angle.x} 500 500) translate(${dx} ${dy})`);
      });
      disc.setAttribute("transform", `translate(${DISC.x} ${DISC.y}) scale(${ds.x}) translate(${-DISC.x} ${-DISC.y})`);
      pup.setAttribute("r", String(PUPIL.r * Math.max(0.15, pr.x)));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  const m = `flring${uid}`;
  const quad = (id: string, x: number, y: number) =>
    `<clipPath id="fl${id}${uid}"><rect x="${x}" y="${y}" width="260" height="260"/></clipPath>` +
    `<g class="fl-q"><g clip-path="url(#fl${id}${uid})" mask="url(#${m})"><g style="--a:${ink};--b:${ink}">${markInner}</g></g></g>`;
  const html =
    `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="200" y="200" width="600" height="600"><rect x="200" y="200" width="600" height="600" fill="#fff"/><circle cx="500" cy="500" r="168" fill="#000"/></mask></defs>` +
    quad("TL", 240, 240) + quad("TR", 500, 240) + quad("BL", 240, 500) + quad("BR", 500, 500) +
    `<g class="fl-disc"><circle cx="${DISC.x}" cy="${DISC.y}" r="${DISC.r}" fill="${ink}"/>` +
    `<circle class="fl-pupil" cx="${PUPIL.x}" cy="${PUPIL.y}" r="${PUPIL.r}" fill="${pupil}"/></g>`;

  return <svg ref={ref} className="focus-lock" viewBox="240 240 520 520" aria-hidden="true" style={{ overflow: "visible" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
