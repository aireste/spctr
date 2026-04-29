"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Starfield } from "@/components/ui/starfield-1";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsSPCTR } from "@/components/WhatIsSPCTR";
import { ServicesSection } from "@/components/ServicesSection";
import { RatesSection } from "@/components/RatesSection";
import { ContactForm } from "@/components/ContactForm";

const DottedSurface = dynamic(
  () => import("@/components/ui/dotted-surface").then((m) => ({ default: m.DottedSurface })),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    const onScroll = () => {
      if (nav) {
        nav.style.borderBottomColor =
          window.scrollY > 60 ? "rgba(170,255,0,0.12)" : "var(--border)";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      {/* Starfield — fixed full-screen background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Starfield
          starColor="rgba(255,255,255,0.8)"
          bgColor="rgba(5,5,10,1)"
          speed={1.2}
          quantity={500}
          opacity={0.15}
        />
      </div>

      {/* NAV */}
      <nav id="main-nav" className="nav-root">
        <div className="nav-logo">SPCTR<em>.</em></div>
        <ul className="nav-links">
          <li><a href="#about">What is SPCTR</a></li>
          <li><a href="#what">Services</a></li>
          <li><a href="#rates">Rates</a></li>
        </ul>
        <button
          className="nav-btn"
          onClick={() =>
            document.getElementById("deploy")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Deploy SPCTR
        </button>
      </nav>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroSection />
        <ServicesSection />
        <div style={{
          position: "relative", overflow: "hidden",
          background: "rgba(12,12,18,0.9)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}>
          <DottedSurface />
          <WhatIsSPCTR />
          <RatesSection />
        </div>
        <ContactForm />
      </div>

      {/* FOOTER */}
      <footer className="footer-root">
        <div className="footer-logo">SPCTR<em>.</em></div>
        <div className="footer-copy">© 2026 SPCTR — v1.0.0 — All Rights Reserved</div>
        <ul className="footer-links">
          <li><a href="https://www.linkedin.com/in/esteban-guerra-b3631415b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </footer>
    </main>
  );
}
