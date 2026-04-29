"use client";

export function HeroSection() {
  return (
    <section className="hero-section">


      <div className="bracket-tl" />
      <div className="bracket-br" />

      {/* Hero copy */}
      <div className="hero-eyebrow">
        {"//"} SYS:BOOT — SPCTR.EXE — BUILD 0xA4F1 — CLASSIFIED
      </div>

      <h1 className="hero-h1">
        <span className="h1-white glitch" data-text="YOUR NEXT">YOUR NEXT</span>
        <span className="h1-hollow">MEETING IS</span>
        <span className="h1-serif">already booked.</span>
        <span className="h1-acid glitch glitch-acid" data-text="SPCTR BOOKS IT.">
          SPCTR BOOKS IT.
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-sub">
          SPCTR handles the full BDR workflow — prospecting, outreach, qualification —
          and delivers <strong style={{ color: "var(--acid)", fontWeight: 900 }}>accepted meetings</strong> directly
          to your calendar. No ramp time. No overhead.{" "}
          <strong style={{ color: "var(--acid)", fontWeight: 900 }}>Just pipeline.</strong>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <a href="#deploy" className="btn-acid btn-red">DEPLOY SPCTR</a>
          <a href="#what" className="btn-ghost">See how it works →</a>
        </div>
      </div>
    </section>
  );
}
