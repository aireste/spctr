"use client";

import { useEffect } from "react";

// Hero tiles t6 / t7 / t8 (black, cobalt, pink): when the cursor comes near
// them, their eyes track it together while the marks keep spinning, pulsing
// and tilting. Each frame the look vector is counter-rotated by the mark's
// current CSS rotation, so the pupil stays aimed at the cursor mid-spin.
// Off the area, the eyes ease back to center and the tiles carry on.
const TILES = [".t6", ".t7", ".t8"];
const LOOK = 40;    // max eye travel, in mark units (disc radius is 165)
const NEAR = 140;   // px around the trio that still counts as "near"
const EASE = 0.12;  // how fast the gaze engages / lets go (per frame)

export function TrioGaze() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = TILES.map((s) => document.querySelector<HTMLElement>(`.mosaic ${s}`));
    if (tiles.some((t) => !t)) return;
    const svgs = tiles.map((t) => t!.querySelector<SVGSVGElement>("svg")!);
    const eyes = svgs.map((s) => s.querySelector<SVGGElement>(".pc"));

    let px = 0, py = 0, near = false, amt = 0, raf = 0;

    const area = () => {
      const r = tiles.map((t) => t!.getBoundingClientRect());
      return {
        l: Math.min(...r.map((b) => b.left)) - NEAR, r: Math.max(...r.map((b) => b.right)) + NEAR,
        t: Math.min(...r.map((b) => b.top)) - NEAR, b: Math.max(...r.map((b) => b.bottom)) + NEAR,
      };
    };

    const frame = () => {
      amt += ((near ? 1 : 0) - amt) * EASE;
      tiles.forEach((tile, i) => {
        const g = eyes[i];
        if (!g) return;
        const r = tile!.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / (r.width * 0.9));
        // undo the mark's current rotation so the look stays in screen space
        const tf = getComputedStyle(svgs[i]).transform;
        const m = new DOMMatrix(tf === "none" ? undefined : tf);
        const th = Math.atan2(m.b, m.a), c = Math.cos(th), s = Math.sin(th);
        const wx = (dx / d) * LOOK * k * amt, wy = (dy / d) * LOOK * k * amt;
        g.setAttribute("style", `transform:translate(${c * wx + s * wy}px,${-s * wx + c * wy}px)`);
      });
      if (near || amt > 0.01) raf = requestAnimationFrame(frame);
      else { raf = 0; amt = 0; eyes.forEach((g) => g?.setAttribute("style", "")); }
    };

    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      const a = area();
      near = px > a.l && px < a.r && py > a.t && py < a.b;
      if ((near || amt > 0.01) && !raf) raf = requestAnimationFrame(frame);
    };
    const out = () => { near = false; };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", out);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", out);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
