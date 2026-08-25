"use client";

import { useEffect, useRef } from "react";

export function RatesSection() {
  const card1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [card1Ref.current].filter(Boolean) as HTMLDivElement[];
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
        <h2 className="section-h2">YOU ONLY PAY<br />FOR RESULTS.</h2>
        <p className="section-sub-serif">One model, built around one principle: we win when you win.</p>

        <div ref={card1Ref} className="rate-card rate-card-orange reveal" style={{ width: "100%" }}>
          <div className="rate-tag" style={{ color: "var(--orange)", borderColor: "var(--orange)" }}>
            PAY PER MEETING
          </div>

          <div className="rate-feature-row">
            <div className="rate-feature-main">
              <div className="rate-title">ONLY PAY FOR ACCEPTED MEETINGS</div>
              <p className="rate-desc">
                Flat fee per booked meeting with a qualified decision-maker. No meeting,
                no charge. If we don&apos;t deliver, you don&apos;t pay. That&apos;s not a guarantee — it&apos;s the model.
              </p>
            </div>

            <div className="rate-chips">
              <div className="rate-chip"><span className="rate-chip-mark">{"//"}</span> NO RETAINER</div>
              <div className="rate-chip"><span className="rate-chip-mark">{"//"}</span> NO SETUP FEE</div>
              <div className="rate-chip"><span className="rate-chip-mark">{"//"}</span> CANCEL ANYTIME</div>
            </div>
          </div>

          <div className="rate-best">
            <span style={{ color: "var(--orange)" }}>{"//"} </span>
            Best for businesses testing the model or running targeted campaigns.
          </div>
        </div>

      </div>
    </section>
  );
}
