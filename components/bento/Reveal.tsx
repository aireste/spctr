"use client";

import { useEffect } from "react";

// One-time "rise and fade in" for cards as they scroll into view, lightly
// staggered within each group (checked on scroll). Headers stay still on purpose. Content is only
// hidden once this script runs (html.js-reveal), so nothing is ever stuck
// invisible if JS fails, and reduced-motion users see everything immediately.
const CARDS = [
  ".offer", ".more", ".steps li", ".who > div",
  ".probs > div", ".gets > div", ".fit > div", ".pmain", ".pterms li", ".why > div",
  "section.contact form",
].join(",");

export function Reveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(CARDS));
    if (!els.length) return;

    els.forEach((el) => {
      const siblings = Array.from(el.parentElement?.children ?? []).filter((c) => c.matches(CARDS));
      el.style.setProperty("--rv-delay", `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
      el.classList.add("rv");
    });
    document.documentElement.classList.add("js-reveal");

    // reveal anything whose top has come within ~92% of the screen height; once only
    let pending = els.slice();
    const check = () => {
      const limit = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) { el.classList.add("rv-in"); return false; }
        return true;
      });
      if (!pending.length) stop();
    };
    const stop = () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return stop;
  }, []);
  return null;
}
