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
        <span className="h1-hollow">CLIENT IS</span>
        <span className="h1-serif">already out there.</span>
        <span className="h1-acid glitch glitch-acid" data-text="SPCTR FINDS THEM.">
          SPCTR FINDS THEM.
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-sub">
          SPCTR deploys precision outreach to locate, qualify, and deliver leads
          directly into your pipeline.{" "}
          <strong style={{ color: "var(--acid)", fontWeight: 900 }}>Targeted. Verified. Ready to intercept.</strong>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <a href="#deploy" className="btn-acid btn-red">DEPLOY SPCTR</a>
          <a href="#what" className="btn-ghost">See how it works →</a>
        </div>
      </div>
    </section>
  );
}
