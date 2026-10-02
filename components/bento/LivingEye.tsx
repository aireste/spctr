"use client";

import { memo, useEffect, useId, useRef } from "react";
import { markInner } from "./Brand";

// The SPCTR mark as a living eye. Geometry is in the mark's own coordinates
// (viewBox 240 240 520 520): the ring comes from the real logo paths, and the
// center disc + pupil are redrawn as circles so they can move.
// It glances around on its own and blinks. No hover behavior (by design).
// `lively` adds cute extras: little hops, head tilts, double-takes, quicker blinks.
const DISC = { x: 499, y: 491, r: 141 };
const PUPIL_REST = { x: -37, y: -18 }; // where the pupil sits in the logo
const PUPIL_R = 51;
const LOOK = 58; // how far the pupil can travel from the disc center

type Mood = "idle" | "busy";

type Props = {
  className?: string;
  ring?: string;  // outer ring color
  ink?: string;   // eyeball (center disc) color
  bg?: string;    // pupil color (matches the tile behind it)
  lively?: boolean;
  steadyRing?: boolean; // keep the crosshair still: no ring burst, hops or tilts (the eye does all the acting)
  hollow?: boolean;     // pupil is a hole cut through the eyeball (whatever is behind shows through), not a filled dot
};

function LivingEyeImpl({ className = "", ring, ink = "var(--ink)", bg = "var(--lime)", lively = false, steadyRing = false, hollow = false }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const ringColor = ring ?? ink;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // The SVG's inner markup can be swapped by React on a re-render, so look the
    // parts up again whenever they've been detached (otherwise the eye freezes).
    let all!: SVGGElement, pupil!: SVGCircleElement, lid!: SVGGElement, quads: SVGGElement[] = [];
    const grab = () => {
      all = svg.querySelector<SVGGElement>(".eye-all")!;
      pupil = svg.querySelector<SVGCircleElement>(".eye-pupil")!;
      lid = svg.querySelector<SVGGElement>(".eye-lid")!;
      quads = Array.from(svg.querySelectorAll<SVGGElement>(".eye-q"));
    };
    grab();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // current and target state, eased toward each other every frame
    const cur = { px: PUPIL_REST.x, py: PUPIL_REST.y, sy: 1, s: 1, burst: 0, pr: 1, hy: 0, rot: 0 };
    const tgt = { ...cur };
    let mood: Mood = "idle";
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const busy = (ms: number, done: () => void) => { mood = "busy"; later(() => { done(); mood = "idle"; }, ms); };

    const lookAt = (dx: number, dy: number) => {
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / LOOK);
      tgt.px = (dx / d) * LOOK * k; tgt.py = (dy / d) * LOOK * k;
    };
    const randomLook = () => {
      const a = Math.random() * Math.PI * 2, r = LOOK * (0.5 + Math.random() * 0.5);
      lookAt(Math.cos(a) * r, Math.sin(a) * r);
    };

    // glance at random things: a quick look, a hold, sometimes back to center
    const wander = () => {
      if (mood === "idle") { if (Math.random() < 0.2) lookAt(0, 0); else randomLook(); }
      later(wander, (lively ? 700 : 900) + Math.random() * (lively ? 1500 : 2200));
    };
    const blink = () => {
      if (mood === "idle") {
        tgt.sy = 0.08;
        later(() => { tgt.sy = 1; }, 130);
        if (lively && Math.random() < 0.3) later(() => { tgt.sy = 0.08; later(() => { tgt.sy = 1; }, 120); }, 260); // double blink
      }
      later(blink, (lively ? 1800 : 2800) + Math.random() * (lively ? 2200 : 3200));
    };

    const moves: (() => void)[] = [
      // surprised: ring pops out (or, with a steady ring, just the eye widens), pupil shrinks
      () => { if (!steadyRing) tgt.burst = 1; tgt.s = 1.1; tgt.pr = 0.55; lookAt(0, 0); busy(850, () => { tgt.burst = 0; tgt.s = 1; tgt.pr = 1; }); },
      // happy squint
      () => { tgt.sy = 0.45; lookAt(0, -10); busy(1000, () => { tgt.sy = 1; }); },
    ];
    if (lively && !steadyRing) moves.push(
      // little hop
      () => { tgt.hy = -26; tgt.sy = 1.06; busy(240, () => { tgt.hy = 0; tgt.sy = 1; }); },
      // curious head tilt while looking the same way
      () => { const side = Math.random() < 0.5 ? -1 : 1; tgt.rot = 10 * side; lookAt(LOOK * side, -12); busy(1100, () => { tgt.rot = 0; }); },
    );
    if (lively) moves.push(
      // double-take: look one way, snap to the other
      () => { lookAt(-LOOK, 0); busy(380, () => { lookAt(LOOK, 0); tgt.s = 1.06; later(() => { tgt.s = 1; }, 250); }); },
    );
    const act = () => {
      if (mood === "idle") moves[Math.floor(Math.random() * moves.length)]();
      later(act, (lively ? 2600 : 5000) + Math.random() * (lively ? 2600 : 5000));
    };

    let raf = 0;
    const frame = () => {
      if (!pupil.isConnected) grab();
      (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => {
        cur[k] += (tgt[k] - cur[k]) * (k === "sy" ? 0.35 : k === "hy" ? 0.22 : 0.14);
      });
      all.setAttribute("transform", `translate(0 ${cur.hy}) rotate(${cur.rot} 500 500)`);
      pupil.setAttribute("cx", String(DISC.x + cur.px));
      pupil.setAttribute("cy", String(DISC.y + cur.py));
      pupil.setAttribute("r", String(PUPIL_R * cur.pr));
      lid.setAttribute("transform", `translate(${DISC.x} ${DISC.y}) scale(${cur.s} ${cur.s * cur.sy}) translate(${-DISC.x} ${-DISC.y})`);
      const b = cur.burst * 34;
      quads.forEach((q, i) => q.setAttribute("transform", `translate(${i % 2 ? b : -b} ${i < 2 ? -b : b})`));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    later(wander, 600); later(blink, 1600); later(act, lively ? 1800 : 4000);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, [lively, steadyRing]);

  // ring = the real mark with the center cut away, split into 4 quadrants so it can burst
  const m = `ring${uid}`;
  const quad = (id: string, x: number, y: number) =>
    `<clipPath id="q${id}${uid}"><rect x="${x}" y="${y}" width="260" height="260"/></clipPath>` +
    `<g class="eye-q"><g clip-path="url(#q${id}${uid})" mask="url(#${m})"><g style="--a:${ringColor};--b:${ringColor}">${markInner}</g></g></g>`;
  // hollow: the pupil lives in a mask on the disc, so it moves (and blinks) as a cut-out
  const pupil = (fill: string) => `<circle class="eye-pupil" cx="${DISC.x + PUPIL_REST.x}" cy="${DISC.y + PUPIL_REST.y}" r="${PUPIL_R}" fill="${fill}"/>`;
  const pm = `pupil${uid}`;
  const html =
    `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="200" y="200" width="600" height="600"><rect x="200" y="200" width="600" height="600" fill="#fff"/><circle cx="500" cy="500" r="168" fill="#000"/></mask>` +
    (hollow ? `<mask id="${pm}" maskUnits="userSpaceOnUse" x="200" y="200" width="600" height="600"><rect x="200" y="200" width="600" height="600" fill="#fff"/>${pupil("#000")}</mask>` : "") +
    `</defs>` +
    `<g class="eye-all">` +
    quad("TL", 240, 240) + quad("TR", 500, 240) + quad("BL", 240, 500) + quad("BR", 500, 500) +
    `<g class="eye-lid"><circle cx="${DISC.x}" cy="${DISC.y}" r="${DISC.r}" fill="${ink}"${hollow ? ` mask="url(#${pm})"` : ""}/>` +
    (hollow ? "" : pupil(bg)) + `</g></g>`;

  return (
    <svg ref={svgRef} className={`living-eye ${className}`} viewBox="200 200 600 600" aria-hidden="true"
      style={{ overflow: "visible" }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/** Memoized so parent re-renders (e.g. Glint hiding/showing) don't touch the eye. */
export const LivingEye = memo(LivingEyeImpl);
