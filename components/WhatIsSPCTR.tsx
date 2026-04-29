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
            SPCTR runs <span style={{ color: "var(--acid)" }}>lean by design.</span> No account managers, no handoffs — just a{" "}
            <span style={{ color: "var(--acid)" }}>direct line to the person doing the work.</span> Every client is a{" "}
            <span style={{ color: "var(--acid)" }}>relationship, not a contract.</span> That&apos;s not a pitch. That&apos;s how this operates.
          </p>
        </div>

        {/* Bottom row: 3 cards full width */}
        <div ref={cardsRef} className="card-grid grid-col-3 reveal">
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "var(--acid)" }}>{"//"} 01</div>
            <div className="pillar-title">BOUTIQUE BY DESIGN</div>
            <p className="pillar-desc">Quality over volume. Every client gets direct access, full attention, and a partner invested in their results.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "var(--orange)" }}>{"//"} 02</div>
            <div className="pillar-title">LOW BARRIER TO ENTRY</div>
            <p className="pillar-desc">No massive retainers. No long-term lock-in. Start small, scale when you see results.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "#00d4aa" }}>{"//"} 03</div>
            <div className="pillar-title">RELATIONSHIPS FIRST</div>
            <p className="pillar-desc">We&apos;re not in it for a quick transaction. We build long-term partnerships with clients who want to grow.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
