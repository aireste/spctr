"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(
  () => import("./GlobeCanvas").then((m) => ({ default: m.GlobeCanvas })),
  { ssr: false }
);

export function ServicesSection() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const headRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headRef.current, card1Ref.current, card2Ref.current].filter(Boolean) as HTMLDivElement[];
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
    <section className="section-base" id="what" style={{ background: "rgba(5,5,10,0.2)", overflow: "hidden" }}>
      <div className="svc-layout">

        {/* Left — heading + cards */}
        <div>
          <div ref={headRef} className="reveal" style={{ marginBottom: 20 }}>
            <div className="eyebrow ey-acid">{"//"} CAP_MODULE_v3.1 — Capabilities</div>
            <h2 className="section-h2">WHAT SPCTR<br />DELIVERS</h2>
            <p className="section-sub-serif" style={{ marginBottom: 20 }}>Outsourced BDR. Accepted meetings. Fraction of the cost.</p>
          </div>

          <div className="svc-cards-row" style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <div ref={card1Ref} className="svc-card reveal" style={{ flex: 1, minWidth: 0 }}>
              <div className="svc-num">01</div>
              <div className="svc-name">PAY PER MEETING</div>
              <span className="svc-name-serif">Outreach done. Meeting accepted. You just show up.</span>
              <p className="svc-desc">
                We handle prospecting, outreach, and qualification. You get a calendar
                invite with a decision-maker who already said yes — nothing else to chase.
              </p>
              <div className="svc-tag">{"//"} MTG.PKG — PAY PER MEETING</div>
            </div>

            <div ref={card2Ref} className="svc-card reveal" style={{ flex: 1, minWidth: 0 }}>
              <div className="svc-num">02</div>
              <div className="svc-name">BDR OUTSOURCING</div>
              <span className="svc-name-serif">Your full BDR function. Monthly. Hands off.</span>
              <p className="svc-desc">
                A junior BDR costs $60–80K/year before ramp. We deliver the same
                output — consistent booked meetings, every month — for a fraction of that.
              </p>
              <div className="svc-tag">{"//"} BDR.OPS — RETAINER</div>
            </div>
          </div>
        </div>

        {/* Right — interactive globe */}
        <div className="svc-globe" style={{ position: "relative", width: "100%" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
            {/* Corner brackets */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: "1px solid rgba(192,252,4,0.3)", borderLeft: "1px solid rgba(192,252,4,0.3)", zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: "1px solid rgba(192,252,4,0.3)", borderRight: "1px solid rgba(192,252,4,0.3)", zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: "1px solid rgba(192,252,4,0.3)", borderLeft: "1px solid rgba(192,252,4,0.3)", zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: "1px solid rgba(192,252,4,0.3)", borderRight: "1px solid rgba(192,252,4,0.3)", zIndex: 3, pointerEvents: "none" }} />
            <GlobeCanvas />
          </div>
        </div>

      </div>
    </section>
  );
}
