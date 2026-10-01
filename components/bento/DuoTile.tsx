"use client";

import { useEffect, useRef } from "react";

// Bottom-right hero tile: a calm stroll. One mark rolls in, pauses and looks
// around, then rolls out; next time another mark comes from the other side.
// (Busier bump/dance/trio scenes were tried and cut: the hero felt too busy.)
// Each scene is pure CSS keyframes (app/home.css, ".duo.wN"); this component
// only swaps the scene class on a timer.
const SCENES = ["w1", "w2"];

export function DuoTile({ a, b, c }: { a: string; b: string; c: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duo = ref.current;
    if (!duo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    // swap to the next scene exactly when the current one finishes (the walker
    // has rolled off-tile), never on a separate timer: a timer drifts from the
    // CSS clock (e.g. in a background tab) and restarts a scene mid-roll,
    // which reads as a visible reset
    const next = (e: AnimationEvent) => {
      if (!(e.target as HTMLElement).classList.contains("mv")) return;
      duo.classList.remove(SCENES[i]);
      i = (i + 1) % SCENES.length;
      void duo.offsetWidth;
      duo.classList.add(SCENES[i]);
    };
    duo.addEventListener("animationend", next);
    return () => duo.removeEventListener("animationend", next);
  }, []);

  return (
    <div ref={ref} className="duo w1" aria-hidden="true">
      <div className="mv a"><div className="rl" dangerouslySetInnerHTML={{ __html: a }} /></div>
      <div className="mv b"><div className="rl" dangerouslySetInnerHTML={{ __html: b }} /></div>
      <div className="mv c"><div className="rl" dangerouslySetInnerHTML={{ __html: c }} /></div>
    </div>
  );
}
