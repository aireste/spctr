"use client";

import { useState, useEffect, useRef } from "react";

type FormState = "idle" | "submitting" | "success";

export function ContactForm() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("on"), i * 120);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const res = await fetch("https://formspree.io/f/xgorgylv", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      setState("success");
    } else {
      setState("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className="section-base section-dark"
      id="deploy"
      style={{
        background: "rgba(12,12,18,0.92)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Color wash */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(155,95,227,0.04) 0%, rgba(255,85,0,0.04) 30%, rgba(170,255,0,0.03) 70%, transparent 100%)",
        }}
      />

      <div className="contact-inner">
        {/* Left */}
        <div ref={leftRef} className="reveal">
          <div className="eyebrow ey-acid">{"//"} DEPLOY.INIT — Initiate Sequence</div>
          <h2 className="section-h2">TIME TO<br />DEPLOY.</h2>
          <p className="contact-body">
            Tell us about your business and we&apos;ll put together a custom hunt
            strategy — the right targets, the right approach, the right volume.{" "}
            <strong>No obligation. No boilerplate pitch.</strong>
          </p>
          <ul className="expect-list">
            <li><span className="expect-arrow">→</span> Response within 24 hours</li>
            <li><span className="expect-arrow">→</span> Custom strategy call, no sales script</li>
            <li><span className="expect-arrow">→</span> Pay only for leads that meet your criteria</li>
            <li><span className="expect-arrow">→</span> Cancel any time — no lock-in contracts</li>
          </ul>
        </div>

        {/* Right — form */}
        <div ref={rightRef} className="form-wrap reveal">
          {state === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  fontFamily: "var(--font-barlow), 'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: 32, textTransform: "uppercase",
                  letterSpacing: 3, color: "var(--acid)", marginBottom: 12,
                }}
              >
                TRANSMISSION RECEIVED
              </div>
              <p
                style={{
                  fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
                  fontSize: 11, color: "var(--muted)", lineHeight: 1.8,
                }}
              >
                {"//"} RTN_200 — Your brief has been logged.
                <br />A SPCTR operative will respond within 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
<span className="form-subtitle">
                {"//"} UPLINK:0x9C3A — TRANSMIT INTEL
              </span>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" type="text" name="first_name" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-input" type="text" name="last_name" placeholder="Doe" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" name="email" placeholder="you@company.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (optional)</label>
                <input className="form-input" type="tel" name="phone" placeholder="+1 (555) 000-0000" />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Business</label>
                <input className="form-input" type="text" name="company" placeholder="Acme Corp" required />
              </div>

              <div className="form-group">
                <label className="form-label">Target Industry</label>
                <select className="form-input" name="industry" required defaultValue="">
                  <option value="" disabled>Select your industry</option>
                  <option>Home Services (Roofing, HVAC, Solar)</option>
                  <option>B2B SaaS / Tech</option>
                  <option>Med Spa / Healthcare</option>
                  <option>Real Estate / Mortgage</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Lead Volume</label>
                <select className="form-input" name="lead_volume" required defaultValue="">
                  <option value="" disabled>How many leads / month?</option>
                  <option>1–20 leads</option>
                  <option>20–60 leads</option>
                  <option>60+ leads</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Intel (optional)</label>
                <textarea
                  className="form-input form-textarea"
                  name="message"
                  placeholder="Tell us about your target customer, current challenges, or anything else..."
                />
              </div>

              <button type="submit" className="btn-submit" disabled={state === "submitting"}>
                {state === "submitting" ? "TRANSMITTING..." : "→ SUBMIT_DEPLOYMENT.EXE"}
              </button>
              <p className="form-note">
                {"//"} STATUS: All submissions reviewed personally.<br />
                No bots. No auto-responders. RTN_200 within 24h.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
