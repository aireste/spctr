"use client";

import { useEffect, useRef } from "react";

export function WhatIsSPCTR() {
  const topRef   = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [topRef.current, cardsRef.current].filter(Boolean) as HTMLDivElement[];
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
    <section className="section-base" id="about" style={{ paddingBottom: 120 }}>
      <div
        style={{
          position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)",
          width: 400, height: 600, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(26,143,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Top: headline + paragraph stacked */}
        <div ref={topRef} className="reveal" style={{ marginBottom: 52 }}>
          <div className="eyebrow ey-acid">{"//"} IDENT_FILE — What is SPCTR</div>
          <h2 className="section-h2" style={{ whiteSpace: "nowrap" }}>NOT YOUR TYPICAL AGENCY.</h2>
          <p className="about-body" style={{ marginTop: 24, maxWidth: 720 }}>
            SPCTR runs <span style={{ color: "var(--acid)" }}>lean by design.</span> No account managers, no handoffs, no brief getting lost in a chain of people who never talked to you. You get a{" "}
            <span style={{ color: "var(--acid)" }}>direct line to the strategist running your campaign</span> — someone who knows your ICP, knows your goals, and is{" "}
            <span style={{ color: "var(--acid)" }}>personally invested in your results.</span> That&apos;s not a limitation. That&apos;s the advantage.
          </p>
        </div>

        {/* Bottom row: 3 cards full width */}
        <div ref={cardsRef} className="card-grid grid-col-3 reveal">
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "var(--acid)" }}>{"//"} 01</div>
            <div className="pillar-title">BOUTIQUE BY DESIGN</div>
            <p className="pillar-desc">Small roster. Full attention. You&apos;re not account #47 — every campaign gets the focus it deserves, from the person actually running it.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "var(--orange)" }}>{"//"} 02</div>
            <div className="pillar-title">LOW BARRIER TO ENTRY</div>
            <p className="pillar-desc">No massive retainers. No long-term lock-in. Start with one campaign, see real results, then decide.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "#00d4aa" }}>{"//"} 03</div>
            <div className="pillar-title">YOU KNOW WHO'S RUNNING IT</div>
            <p className="pillar-desc">No mystery team. No &apos;your account manager will follow up.&apos; The person you talk to is the person pulling your list, writing your sequences, and watching your inbox. That&apos;s it.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
