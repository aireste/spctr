"use client";

import { useEffect, useRef } from "react";

// Custom builds hero: three marks (three of your tools) hanging out together.
// Each one wanders to a nearby spot on a crisp spring, settles, looks at a
// neighbor or glances around, sometimes blinks or hops, then moves again.
// Unhurried but sharp: short moves, real rests, no crazy scenes.
// Uses the shared #mk / #c* / #ringOnly defs from <MarkDefs/>.
const DISC = { x: 499, y: 491, r: 141 };
const PUPIL_REST = { x: -37, y: -18 };     // natural pupil offset from disc center
const PUPIL_R = 51;
const LOOK = 62;                           // how far a pupil travels toward what it watches
const S = 0.66;                            // mark scale in the 1000x1000 tile
const WANDER = 70;                         // how far a mark strays from home (keeps them apart)

// each mark is one color (ring + eyeball). The pupil is painted with the page
// color, so it reads as a see-through cut-out of the logo. Orange / cobalt / pink:
// lime and teal wash out on the cream page.
const MARKS = [
  { x: 250, y: 260, ring: ["var(--orange)", "var(--orange)", "var(--orange)", "var(--orange)"], disc: "var(--orange)", pupil: "var(--paper)" },
  { x: 760, y: 420, ring: ["var(--violet)", "var(--violet)", "var(--violet)", "var(--violet)"], disc: "var(--violet)", pupil: "var(--paper)" },
  { x: 400, y: 770, ring: ["var(--magenta)", "var(--magenta)", "var(--magenta)", "var(--magenta)"], disc: "var(--magenta)", pupil: "var(--paper)" },
];

type Spring = { x: number; v: number; to: number; k: number; c: number };
const spring = (x: number, k: number, c: number): Spring => ({ x, v: 0, to: x, k, c });

export function Relay() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let marks: SVGGElement[] = [], discs: SVGGElement[] = [], pupils: SVGCircleElement[] = [];
    const grab = () => {
      marks = Array.from(svg.querySelectorAll<SVGGElement>(".rl-mark"));
      discs = Array.from(svg.querySelectorAll<SVGGElement>(".rl-disc"));
      pupils = Array.from(svg.querySelectorAll<SVGCircleElement>(".rl-pupil"));
    };
    grab();
    if (reduce) return;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    // position springs: stiff enough to feel sharp, damped so they settle with one small overshoot
    const px = MARKS.map((m) => spring(m.x, 38, 9.5));
    const py = MARKS.map((m) => spring(m.y, 38, 9.5));
    const hop = MARKS.map(() => spring(0, 120, 9));       // little vertical hop
    const squint = MARKS.map(() => spring(1, 170, 12));   // disc height (1 = open)
    const all = [...px, ...py, ...hop, ...squint];
    const gaze = MARKS.map(() => ({ x: PUPIL_REST.x, y: PUPIL_REST.y }));

    // each mark runs its own little schedule
    type Look = { kind: "mark"; j: number } | { kind: "point"; x: number; y: number } | { kind: "ahead" };
    const st = MARKS.map((_, i) => ({ nextMove: performance.now() + 600 + i * 900, nextBeat: performance.now() + rand(800, 2400), look: { kind: "ahead" } as Look }));

    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      if (marks[0] && !marks[0].isConnected) grab();
      const dt = Math.min(0.034, (now - last) / 1000); last = now;

      MARKS.forEach((m, i) => {
        const t = st[i];
        if (now >= t.nextMove) {
          // move: a short hop to a new spot near home, eyes leading the way
          const ang = rand(0, Math.PI * 2), r = rand(WANDER * 0.4, WANDER);
          px[i].to = m.x + Math.cos(ang) * r; py[i].to = m.y + Math.sin(ang) * r;
          if (Math.random() < 0.35) hop[i].v = -200;
          t.look = { kind: "ahead" };
          t.nextMove = now + rand(2600, 4600);
          t.nextBeat = now + rand(700, 1100);
        } else if (now >= t.nextBeat) {
          // settled: look at a friend, glance somewhere, or blink
          const roll = Math.random();
          if (roll < 0.5) { let j = Math.floor(rand(0, 2)); if (j >= i) j++; t.look = { kind: "mark", j }; }
          else if (roll < 0.8) t.look = { kind: "point", x: rand(0, 1000), y: rand(0, 1000) };
          else { squint[i].x = 0.08; squint[i].to = 1; }
          t.nextBeat = now + rand(900, 1700);
        }
      });

      for (let k = 0; k < 3; k++) {
        const h = dt / 3;
        all.forEach((q) => { q.v += (-q.k * (q.x - q.to) - q.c * q.v) * h; q.x += q.v * h; });
      }

      MARKS.forEach((m, i) => {
        const x = px[i].x, y = py[i].x + hop[i].x;
        marks[i]?.setAttribute("transform", `translate(${x} ${y}) scale(${S}) translate(-500 -500)`);
        discs[i]?.setAttribute("transform", `translate(${DISC.x} ${DISC.y}) scale(1 ${squint[i].x}) translate(${-DISC.x} ${-DISC.y})`);

        const lk = st[i].look;
        let dx: number, dy: number;
        if (lk.kind === "mark") { dx = px[lk.j].x - x; dy = py[lk.j].x - y; }
        else if (lk.kind === "point") { dx = lk.x - x; dy = lk.y - y; }
        else { dx = px[i].to - x; dy = py[i].to - y; }
        const d = Math.hypot(dx, dy);
        const want = d < 4 ? PUPIL_REST : { x: (dx / d) * LOOK, y: (dy / d) * LOOK };
        gaze[i].x += (want.x - gaze[i].x) * Math.min(1, dt * 9);
        gaze[i].y += (want.y - gaze[i].y) * Math.min(1, dt * 9);
        pupils[i]?.setAttribute("cx", String(DISC.x + gaze[i].x));
        pupils[i]?.setAttribute("cy", String(DISC.y + gaze[i].y));
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const q = (id: string, col: string) =>
    `<g clip-path="url(#c${id})" mask="url(#ringOnly)"><use href="#mk" style="--a:${col};--b:${col}"/></g>`;
  const marks = MARKS.map((m) =>
    `<g class="rl-mark" transform="translate(${m.x} ${m.y}) scale(${S}) translate(-500 -500)">` +
    q("TL", m.ring[0]) + q("TR", m.ring[1]) + q("BL", m.ring[2]) + q("BR", m.ring[3]) +
    `<g class="rl-disc"><circle cx="${DISC.x}" cy="${DISC.y}" r="${DISC.r}" fill="${m.disc}"/>` +
    `<circle class="rl-pupil" cx="${DISC.x + PUPIL_REST.x}" cy="${DISC.y + PUPIL_REST.y}" r="${PUPIL_R}" fill="${m.pupil}"/></g></g>`,
  ).join("");

  return <svg ref={ref} className="relay" viewBox="0 0 1000 1000" aria-hidden="true" dangerouslySetInnerHTML={{ __html: marks }} />;
}
