"use client";

import { useEffect, useRef } from "react";

// A conveyor of whole SPCTR marks gliding up the tile in an endless loop.
// (The assemble/scatter effect was tried and removed: it read as weird.)
// Uses the shared #mk / #c* / #ringOnly defs.
const H = 200, W = 100;          // tile coordinates (the tile is 1 wide x 2 tall)
const SIZE = 58, GAP = 78;       // mark size and spacing along the belt
const SPEED = 14;                // units per second
const COUNT = Math.ceil(H / GAP) + 2;
const COLORS: [string, string][] = [["#eeeee6", "var(--lime)"], ["var(--lime)", "#eeeee6"]]; // [ring, center]

export function AssemblyLine() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const marks = Array.from(svg.querySelectorAll<SVGGElement>(".al-mark"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const travel = reduce ? 0 : ((now - start) / 1000) * SPEED;
      marks.forEach((g, i) => {
        // position on a looping belt, moving upward
        const y = ((i * GAP - travel) % (COUNT * GAP) + COUNT * GAP) % (COUNT * GAP) - GAP;
        const cy = y + SIZE / 2;
        const s = SIZE / 520;
        g.setAttribute("transform", `translate(${W / 2 - 500 * s} ${cy - 500 * s}) scale(${s})`);
      });
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const q = (id: string, col: string) =>
    `<g class="al-q"><g clip-path="url(#c${id})" mask="url(#ringOnly)"><use href="#mk" style="--a:${col};--b:${col}"/></g></g>`;
  const html = Array.from({ length: COUNT }, (_, i) => {
    const [ring, center] = COLORS[i % 2];
    return `<g class="al-mark">${q("TL", ring)}${q("TR", center)}${q("BL", center)}${q("BR", ring)}` +
      `<g class="al-c"><g clip-path="url(#cC)"><use href="#mk" style="--a:${center};--b:${center}"/></g></g></g>`;
  }).join("");

  return <svg ref={ref} className="al" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
