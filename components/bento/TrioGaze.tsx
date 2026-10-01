"use client";

import { useEffect } from "react";
import { EYE } from "./Brand";

// Hero tiles t6 / t7 / t8 (black, cobalt, pink): when the cursor comes near
// them, their eyes track it together while the marks keep spinning, pulsing
// and tilting. Each frame the look vector is counter-rotated by the mark's
// current CSS rotation, so the pupil stays aimed at the cursor mid-spin.
// Off the area, the eyes ease back to center and the tiles carry on.
const TILES = [".t6", ".t7", ".t8"];
const LOOK = 72;    // pupil distance from eye center when looking (disc r 141, pupil r 51)
const RX = EYE.px - EYE.x, RY = EYE.py - EYE.y; // pupil's resting offset
const NEAR = 140;   // px around the trio that still counts as "near"
const EASE = 0.12;  // how fast the gaze engages / lets go (per frame)

export function TrioGaze() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = TILES.map((s) => document.querySelector<HTMLElement>(`.mosaic ${s}`));
    if (tiles.some((t) => !t)) return;
    const svgs = tiles.map((t) => t!.querySelector<SVGSVGElement>("svg")!);
    const eyes = svgs.map((s) => s.querySelector<SVGCircleElement>(".pp")); // pupils only, the eyeball stays put

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
        const wx = (dx / d) * LOOK * k, wy = (dy / d) * LOOK * k;
        const lx = c * wx + s * wy, ly = -s * wx + c * wy;     // look target in the mark's own frame
        g.style.setProperty("transform", `translate(${(lx - RX) * amt}px,${(ly - RY) * amt}px)`);
      });
      if (near || amt > 0.01) raf = requestAnimationFrame(frame);
      else { raf = 0; amt = 0; eyes.forEach((g) => g?.style.removeProperty("transform")); }
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
