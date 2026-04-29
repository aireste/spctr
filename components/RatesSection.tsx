"use client";

import { useEffect, useRef } from "react";

export function RatesSection() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [card1Ref.current, card2Ref.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("on"), i * 120);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-base" id="rates">

      {/* Pink glow */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(255,45,120,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Content above dots */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow ey-acid">{"//"} ACCESS_TIERS — How It Works</div>
        <h2 className="section-h2">SIMPLE,<br />FAIR PRICING.</h2>
        <p className="section-sub-serif">Two models. No surprises. No fine print.</p>

        <div className="card-grid grid-col-2">
          <div ref={card1Ref} className="rate-card rate-card-orange reveal">
            <div className="rate-tag" style={{ color: "var(--orange)", borderColor: "var(--orange)" }}>
              PAY PER LEAD
            </div>
            <div className="rate-title">Only Pay For Results</div>
            <p className="rate-desc">
              You pay a flat fee for each warm lead delivered. No interest, no charge. As
              low-risk as it gets.
            </p>
            <div className="rate-best">
              <span style={{ color: "var(--orange)" }}>{"//"} </span>
              Best for businesses testing the waters or with a tighter budget.
            </div>
          </div>

          <div ref={card2Ref} className="rate-card rate-card-teal reveal">
            <div className="rate-tag" style={{ color: "#ff0d1a", borderColor: "#ff0d1a" }}>
              MONTHLY RETAINER
            </div>
            <div className="rate-title">Consistent Pipeline, Every Month</div>
            <p className="rate-desc">
              A fixed monthly fee for an agreed volume of warm leads delivered on a
              regular cadence. Predictable cost, predictable output. Best value for
              businesses ready to scale.
            </p>
            <div className="rate-best">
              <span style={{ color: "#ff0d1a" }}>{"//"} </span>
              Best for businesses ready to commit to consistent growth.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
