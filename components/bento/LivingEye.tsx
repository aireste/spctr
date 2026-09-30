"use client";

import { useEffect, useRef } from "react";
import { markInner } from "./Brand";

// The SPCTR mark as a living eye. Geometry is in the mark's own coordinates
// (viewBox 240 240 520 520): the ring comes from the real logo paths, and the
// center disc + pupil are redrawn as circles so they can move.
// It glances around on its own; hovering (or tapping) tickles it.
const DISC = { x: 499, y: 491, r: 141 };
const PUPIL_REST = { x: -37, y: -18 }; // where the pupil sits in the logo
const PUPIL_R = 51;
const LOOK = 58; // how far the pupil can travel from the disc center

type Mood = "idle" | "blink" | "happy" | "surprised" | "tickle";

export function LivingEye({ className = "", ink = "var(--ink)", bg = "var(--lime)" }: { className?: string; ink?: string; bg?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pupil = svg.querySelector<SVGCircleElement>(".eye-pupil")!;
    const lid = svg.querySelector<SVGGElement>(".eye-lid")!;
    const quads = Array.from(svg.querySelectorAll<SVGGElement>(".eye-q"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // current and target state, eased toward each other every frame
    const cur = { px: PUPIL_REST.x, py: PUPIL_REST.y, sy: 1, s: 1, burst: 0, pr: 1 };
    const tgt = { ...cur };
    let mood: Mood = "idle";
    let tickled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const lookAt = (dx: number, dy: number) => {
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / LOOK);
      tgt.px = (dx / d) * LOOK * k; tgt.py = (dy / d) * LOOK * k;
    };
    // looks at random things: a quick glance, a hold, sometimes back to center
    const wander = () => {
      if (mood === "idle") {
        if (Math.random() < 0.2) lookAt(0, 0);
        else { const a = Math.random() * Math.PI * 2, r = LOOK * (0.5 + Math.random() * 0.5); lookAt(Math.cos(a) * r, Math.sin(a) * r); }
      }
      later(wander, 900 + Math.random() * 2200);
    };
    const blink = () => {
      if (mood === "idle") { mood = "blink"; tgt.sy = 0.08; later(() => { tgt.sy = 1; mood = "idle"; }, 140); }
      later(blink, 2800 + Math.random() * 3200);
    };
    const act = () => {
      if (mood === "idle") {
        if (Math.random() < 0.5) {
          mood = "surprised"; tgt.burst = 1; tgt.s = 1.1; tgt.pr = 0.55; lookAt(0, 0);
          later(() => { tgt.burst = 0; tgt.s = 1; tgt.pr = 1; mood = "idle"; }, 900);
        } else {
          mood = "happy"; tgt.sy = 0.45; lookAt(0, -10);
          later(() => { tgt.sy = 1; mood = "idle"; }, 1100);
        }
      }
      later(act, 5000 + Math.random() * 5000);
    };

    // tickle: pupil shrinks to a pinpoint, eye squints and giggles, ring jitters
    const startTickle = () => { tickled = true; mood = "tickle"; tgt.pr = 0.32; tgt.sy = 0.62; tgt.burst = 0.18; lookAt(0, 0); };
    const stopTickle = () => { tickled = false; tgt.pr = 1; tgt.sy = 1; tgt.burst = 0; tgt.s = 1; mood = "idle"; };
    const onTap = () => { startTickle(); later(() => { if (tickled) stopTickle(); }, 1300); };

    let raf = 0;
    const frame = (t: number) => {
      (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => { cur[k] += (tgt[k] - cur[k]) * (k === "sy" ? 0.35 : 0.14); });
      const g = tickled ? Math.sin(t / 45) : 0; // giggle wave
      const jx = tickled ? (Math.random() - 0.5) * 7 : 0, jy = tickled ? (Math.random() - 0.5) * 7 : 0;
      pupil.setAttribute("cx", String(DISC.x + cur.px + g * 10));
      pupil.setAttribute("cy", String(DISC.y + cur.py));
      pupil.setAttribute("r", String(PUPIL_R * cur.pr));
      const sy = cur.sy * (1 + g * 0.06);
      lid.setAttribute("transform", `translate(${DISC.x} ${DISC.y}) rotate(${g * 5}) scale(${cur.s} ${cur.s * sy}) translate(${-DISC.x} ${-DISC.y})`);
      const b = cur.burst * 34;
      quads.forEach((q, i) => {
        const dx = (i % 2 ? b : -b) + jx * (i % 2 ? 1 : -1), dy = (i < 2 ? -b : b) + jy * (i < 2 ? -1 : 1);
        q.setAttribute("transform", `translate(${dx} ${dy})`);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    later(wander, 800); later(blink, 2200); later(act, 4000);
    svg.addEventListener("pointerenter", startTickle);
    svg.addEventListener("pointerleave", stopTickle);
    svg.addEventListener("pointerdown", onTap);
    return () => {
      cancelAnimationFrame(raf); timers.forEach(clearTimeout);
      svg.removeEventListener("pointerenter", startTickle);
      svg.removeEventListener("pointerleave", stopTickle);
      svg.removeEventListener("pointerdown", onTap);
    };
  }, []);

  // ring = the real mark with the center cut away, split into 4 quadrants so it can burst
  const quad = (id: string, x: number, y: number) =>
    `<g class="eye-q"><g clip-path="url(#eq${id})" mask="url(#eyeRing)"><g style="--a:${ink};--b:${ink}">${markInner}</g></g></g>` +
    `<clipPath id="eq${id}"><rect x="${x}" y="${y}" width="260" height="260"/></clipPath>`;
  const html =
    `<defs><mask id="eyeRing" maskUnits="userSpaceOnUse" x="200" y="200" width="600" height="600"><rect x="200" y="200" width="600" height="600" fill="#fff"/><circle cx="500" cy="500" r="168" fill="#000"/></mask></defs>` +
    quad("TL", 240, 240) + quad("TR", 500, 240) + quad("BL", 240, 500) + quad("BR", 500, 500) +
    `<g class="eye-lid"><circle cx="${DISC.x}" cy="${DISC.y}" r="${DISC.r}" fill="${ink}"/>` +
    `<circle class="eye-pupil" cx="${DISC.x + PUPIL_REST.x}" cy="${DISC.y + PUPIL_REST.y}" r="${PUPIL_R}" fill="${bg}"/></g>`;

  return (
    <svg
      ref={svgRef}
      className={`living-eye ${className}`}
      viewBox="200 200 600 600"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
