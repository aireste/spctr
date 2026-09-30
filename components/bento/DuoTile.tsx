"use client";

import { useEffect, useRef } from "react";

// Bottom-right hero tile: little scenes of SPCTR marks playing together.
// Scenes rotate so it never feels like the same loop: bump, dance, trio.
// Each scene is pure CSS keyframes (app/home.css, ".duo.sN"); this component
// only swaps the scene class when the lead mark's animation ends.
const SCENES = ["s1", "s2", "s3"];

export function DuoTile({ a, b, c }: { a: string; b: string; c: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duo = ref.current;
    if (!duo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lead = duo.querySelector<HTMLElement>(".mv.a")!;
    let i = 0;
    const next = (e: AnimationEvent) => {
      if (e.target !== lead) return;
      duo.classList.remove(SCENES[i]);
      i = (i + 1) % SCENES.length;
      void duo.offsetWidth; // restart the animations
      duo.classList.add(SCENES[i]);
    };
    lead.addEventListener("animationend", next);
    return () => lead.removeEventListener("animationend", next);
  }, []);

  return (
    <div ref={ref} className="duo s1" aria-hidden="true">
      <div className="mv a"><div className="rl" dangerouslySetInnerHTML={{ __html: a }} /></div>
      <div className="mv b"><div className="rl" dangerouslySetInnerHTML={{ __html: b }} /></div>
      <div className="mv c"><div className="rl" dangerouslySetInnerHTML={{ __html: c }} /></div>
    </div>
  );
}
