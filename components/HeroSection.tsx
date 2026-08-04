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
        <span className="h1-serif" style={{ color: "var(--acid)", opacity: 1 }}>already booked.</span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-lead">
          SPCTR books you meetings with <span className="lead-mark">buyers who need what you sell.</span>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
          <a href="#deploy" className="btn-acid btn-red">Deploy SPCTR</a>
        </div>
      </div>
    </section>
  );
}
