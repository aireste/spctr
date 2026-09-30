"use client";

import { useEffect, useRef } from "react";
import { markInner } from "./Brand";

// The SPCTR mark as a living eye. Geometry is in the mark's own coordinates
// (viewBox 240 240 520 520): the ring comes from the real logo paths, and the
// center disc + pupil are redrawn as circles so they can move.
const DISC = { x: 499, y: 491, r: 141 };
const PUPIL_REST = { x: -37, y: -18 }; // where the pupil sits in the logo
const PUPIL_R = 51;
const LOOK = 58; // how far the pupil can travel from the disc center

type Mood = "idle" | "blink" | "happy" | "surprised";

export function LivingEye({ className = "", ink = "var(--ink)", bg = "var(--lime)" }: { className?: string; ink?: string; bg?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pupil = svg.querySelector<SVGCircleElement>(".eye-pupil")!;
    const lid = svg.querySelector<SVGGElement>(".eye-lid")!;
    const quads = [...svg.querySelectorAll<SVGGElement>(".eye-q")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // current and target state, eased toward each other every frame
    const cur = { px: PUPIL_REST.x, py: PUPIL_REST.y, sy: 1, s: 1, burst: 0, pr: 1 };
    const tgt = { ...cur };
    let mood: Mood = "idle";
    let pointer: { x: number; y: number } | null = null;
    let pointerAt = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const lookAt = (dx: number, dy: number) => {
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / LOOK);
      tgt.px = (dx / d) * LOOK * k; tgt.py = (dy / d) * LOOK * k;
    };
    const wander = () => {
      if (mood === "idle" && performance.now() - pointerAt > 2500) {
        const a = Math.random() * Math.PI * 2, r = Math.random() * LOOK;
        lookAt(Math.cos(a) * r, Math.sin(a) * r);
      }
      later(wander, 1200 + Math.random() * 1800);
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

    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      pointer = { x: e.clientX - (r.left + r.width / 2), y: e.clientY - (r.top + r.height / 2) };
      pointerAt = performance.now();
      if (mood === "idle" || mood === "blink") lookAt(pointer.x / 6, pointer.y / 6);
    };
    const onClick = () => { mood = "idle"; tgt.burst = 1; tgt.s = 1.12; tgt.pr = 0.5; later(() => { tgt.burst = 0; tgt.s = 1; tgt.pr = 1; }, 700); };

    let raf = 0;
    const frame = () => {
      const e = 0.14;
      (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => { cur[k] += (tgt[k] - cur[k]) * (k === "sy" ? 0.35 : e); });
      pupil.setAttribute("cx", String(DISC.x + cur.px));
      pupil.setAttribute("cy", String(DISC.y + cur.py));
      pupil.setAttribute("r", String(PUPIL_R * cur.pr));
      lid.setAttribute("transform", `translate(${DISC.x} ${DISC.y}) scale(${cur.s} ${cur.s * cur.sy}) translate(${-DISC.x} ${-DISC.y})`);
      const b = cur.burst * 34;
      quads.forEach((q, i) => {
        const dx = i % 2 ? b : -b, dy = i < 2 ? -b : b;
        q.setAttribute("transform", `translate(${dx} ${dy})`);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    later(wander, 800); later(blink, 2200); later(act, 4000);
    window.addEventListener("pointermove", onMove);
    svg.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf); timers.forEach(clearTimeout);
      window.removeEventListener("pointermove", onMove); svg.removeEventListener("click", onClick);
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
