"use client";

import { useEffect, useRef } from "react";

// Custom builds hero = "the relay": three marks (three of your tools) pass a
// little lime dot of info around a loop. Everyone's eyes follow the dot; the
// one that catches it gives a happy squint and a small hop, rests, glances at
// the next one, and passes it on. It's a cycle (A -> B -> C -> A), so it never
// visibly resets. Spring physics like FocusLock: bouncy, but unhurried.
// Uses the shared #mk / #c* / #ringOnly defs from <MarkDefs/>.
const DISC = { x: 499, y: 491, r: 141 };
const PUPIL_REST = { x: -37, y: -18 };     // natural pupil offset from disc center
const PUPIL_R = 51;
const LOOK = 62;                           // how far a pupil travels toward what it watches
const S = 0.66;                            // mark scale in the 1000x1000 tile
const TRIM = 250 * S;                      // keep lines/dot outside each mark
const TRAVEL_MS = 1400, REST_MS = 1300;

// each mark is one color (ring + eyeball), and the pupil is painted with the
// tile's cobalt so it reads as the logo's cut-out, not a realistic eye.
// No magenta: it vibrates against cobalt.
const MARKS = [
  { x: 250, y: 260, ring: ["var(--orange)", "var(--orange)", "var(--orange)", "var(--orange)"], disc: "var(--orange)", pupil: "var(--violet)" },
  { x: 760, y: 420, ring: ["var(--lime)", "var(--lime)", "var(--lime)", "var(--lime)"], disc: "var(--lime)", pupil: "var(--violet)" },
  { x: 400, y: 770, ring: ["var(--teal)", "var(--teal)", "var(--teal)", "var(--teal)"], disc: "var(--teal)", pupil: "var(--violet)" },
];

type Spring = { x: number; v: number; to: number; k: number; c: number };
const spring = (x: number, k: number, c: number): Spring => ({ x, v: 0, to: x, k, c });
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// segment from mark i to mark j, trimmed so it starts/ends outside the marks
function seg(i: number, j: number) {
  const a = MARKS[i], b = MARKS[j];
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
  const ux = dx / d, uy = dy / d;
  return { x1: a.x + ux * TRIM, y1: a.y + uy * TRIM, x2: b.x - ux * TRIM, y2: b.y - uy * TRIM };
}

export function Relay() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let marks: SVGGElement[] = [], discs: SVGGElement[] = [], pupils: SVGCircleElement[] = [];
    let dot!: SVGCircleElement, trail!: SVGLineElement;
    const grab = () => {
      marks = Array.from(svg.querySelectorAll<SVGGElement>(".rl-mark"));
      discs = Array.from(svg.querySelectorAll<SVGGElement>(".rl-disc"));
      pupils = Array.from(svg.querySelectorAll<SVGCircleElement>(".rl-pupil"));
      dot = svg.querySelector<SVGCircleElement>(".rl-dot")!;
      trail = svg.querySelector<SVGLineElement>(".rl-trail")!;
    };
    grab();
    if (reduce) return;

    const hop = MARKS.map(() => spring(0, 120, 9));     // vertical hop (tile units)
    const squint = MARKS.map(() => spring(1, 170, 10));  // disc height (1 = open)
    const push = MARKS.map(() => spring(1, 160, 9));     // sender's little toss
    const gaze = MARKS.map(() => ({ x: PUPIL_REST.x, y: PUPIL_REST.y }));
    const all = [...hop, ...squint, ...push];

    // phase machine: "rest" at holder, then "travel" holder -> next
    let holder = 0, phase: "rest" | "travel" = "rest", phaseStart = performance.now();
    let trailFade = 0, ax = 0, ay = 0; // where the last catch happened
    const next = () => (holder + 1) % MARKS.length;

    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      if (!dot.isConnected) grab();
      const dt = Math.min(0.034, (now - last) / 1000); last = now;
      const el = now - phaseStart;

      // where the dot is, and what everyone looks at
      let px: number, py: number, p = 0;
      const s = seg(holder, next());
      if (phase === "rest") {
        px = s.x1; py = s.y1;
        if (el > REST_MS) { phase = "travel"; phaseStart = now; push[holder].to = 1.08; }
      } else {
        p = ease(Math.min(1, el / TRAVEL_MS));
        px = s.x1 + (s.x2 - s.x1) * p; py = s.y1 + (s.y2 - s.y1) * p;
        if (p > 0.15) push[holder].to = 1;
        if (el >= TRAVEL_MS) {
          const r = next();
          hop[r].v = -260; squint[r].x = 0.45; squint[r].to = 1; // catch: hop + happy squint
          ax = px; ay = py; holder = r; phase = "rest"; phaseStart = now; trailFade = 1;
        }
      }

      for (let k = 0; k < 3; k++) {
        const h = dt / 3;
        all.forEach((q) => { q.v += (-q.k * (q.x - q.to) - q.c * q.v) * h; q.x += q.v * h; });
      }

      // trail: draws behind the dot while traveling, fades after the catch
      // a short comet tail just behind the dot, not a wire back to the sender
      const tail = Math.max(0, p - 0.3);
      if (phase === "travel") { trail.setAttribute("x1", String(s.x1 + (s.x2 - s.x1) * tail)); trail.setAttribute("y1", String(s.y1 + (s.y2 - s.y1) * tail)); trail.setAttribute("x2", String(px)); trail.setAttribute("y2", String(py)); trail.style.opacity = "1"; }
      else { trailFade = Math.max(0, trailFade - dt * 2.2); trail.style.opacity = String(trailFade); }
      // the dot shrinks into the catcher, waits inside, then grows back out on the far side
      let dr = 17, dx0 = px, dy0 = py;
      if (phase === "rest") {
        const IN = 220, OUT = 300;
        if (el < IN) { dx0 = ax; dy0 = ay; dr = 17 * (1 - el / IN); }
        else if (el > REST_MS - OUT) dr = 17 * ease((el - (REST_MS - OUT)) / OUT);
        else dr = 0;
      }
      dot.setAttribute("cx", String(dx0)); dot.setAttribute("cy", String(dy0)); dot.setAttribute("r", String(dr));

      MARKS.forEach((m, i) => {
        const bob = Math.sin(now / 1000 * 0.9 + i * 2.1) * 6;
        const y = m.y + bob + hop[i].x;
        const sc = S * push[i].x;
        marks[i]?.setAttribute("transform", `translate(${m.x} ${y}) scale(${sc}) translate(-500 -500)`);
        discs[i]?.setAttribute("transform", `translate(${DISC.x} ${DISC.y}) scale(1 ${squint[i].x}) translate(${-DISC.x} ${-DISC.y})`);

        // look target: the dot while it moves; at rest everyone watches the holder,
        // and the holder glances at whoever is next just before passing
        let tx = px, ty = py;
        if (phase === "rest" && i === holder) {
          const n = MARKS[next()];
          if (el > REST_MS * 0.55) { tx = n.x; ty = n.y; } else { tx = m.x; ty = m.y; }
        }
        const dx = tx - m.x, dy = ty - (m.y + bob), d = Math.hypot(dx, dy);
        const want = d < 1 ? PUPIL_REST : { x: (dx / d) * LOOK, y: (dy / d) * LOOK };
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
  const html = `<line class="rl-trail" x1="0" y1="0" x2="0" y2="0" style="opacity:0"/>` + marks + `<circle class="rl-dot" cx="0" cy="0" r="0"/>`;

  return <svg ref={ref} className="relay" viewBox="0 0 1000 1000" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
