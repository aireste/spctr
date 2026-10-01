"use client";

import { useEffect } from "react";

// 3x3 hero grid: every few seconds the minis spin in a wave, and the wave's
// order changes each time (never the same pattern twice in a row).
// Hovering the tile makes all nine eyes look at the cursor together
// (waves pause while you're there, so the glance never gets spun around).
// Cells are numbered row by row: 0 1 2 / 3 4 5 / 6 7 8.
const PATTERNS: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],   // reading order
  [8, 7, 6, 5, 4, 3, 2, 1, 0],   // reverse
  [0, 1, 2, 5, 8, 7, 6, 3, 4],   // spiral in
  [4, 1, 5, 7, 3, 0, 2, 8, 6],   // center out
  [0, 3, 1, 6, 4, 2, 7, 5, 8],   // diagonal sweep
  [0, 3, 6, 1, 4, 7, 2, 5, 8],   // by columns
];
const shuffled = () => {
  const a = Array.from({ length: 9 }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

export function GridWave() {
  useEffect(() => {
    const cells = Array.from(document.querySelectorAll<SVGSVGElement>(".t4 .grid svg"));
    if (cells.length !== 9 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tile = cells[0].closest<HTMLElement>(".t4");
    const eyes = cells.map((c) => c.querySelector<SVGGElement>(".pc"));
    let hovering = false;
    const LOOK = 34; // max eye travel, in mark units (disc radius is 165)
    const look = (e: PointerEvent) => {
      cells.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / (r.width * 1.2));
        eyes[i]?.setAttribute("style", `transform:translate(${(dx / d) * LOOK * k}px,${(dy / d) * LOOK * k}px)`);
      });
    };
    const enter = () => { hovering = true; cells.forEach((c) => c.getAnimations().forEach((a) => a.finish())); };
    const leave = () => { hovering = false; eyes.forEach((g) => g?.setAttribute("style", "")); };
    tile?.addEventListener("pointerenter", enter);
    tile?.addEventListener("pointermove", look);
    tile?.addEventListener("pointerleave", leave);
    let last = -1;
    const wave = () => {
      if (hovering) return;
      let pick: number;
      do { pick = Math.floor(Math.random() * (PATTERNS.length + 1)); } while (pick === last);
      last = pick;
      const order = pick === PATTERNS.length ? shuffled() : PATTERNS[pick];
      const dir = Math.random() < 0.5 ? 1 : -1;
      order.forEach((cell, k) =>
        cells[cell].animate([{ transform: "rotate(0)" }, { transform: `rotate(${360 * dir}deg)` }], {
          duration: 1600, delay: k * 140, easing: "cubic-bezier(.34,1.35,.64,1)",
        }),
      );
    };
    const first = window.setTimeout(wave, 700);
    const t = window.setInterval(wave, 5400);
    return () => {
      clearTimeout(first); clearInterval(t);
      tile?.removeEventListener("pointerenter", enter);
      tile?.removeEventListener("pointermove", look);
      tile?.removeEventListener("pointerleave", leave);
    };
  }, []);
  return null;
}
