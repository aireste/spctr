"use client";

import { useEffect, useRef, useState } from "react";
import { LivingEye } from "./LivingEye";

// Glint in the corner: a quick-answer helper, not an AI chat (yet).
// The hello bubble only shows while hovering (or keyboard-focusing) Glint.
// Every answer below is taken from what the site already promises, so it can't
// say anything we haven't committed to. Upgrade path: swap `reply()` for a
// Claude-backed API route, keeping these answers as its grounding.
const QA: { q: string; a: string; link?: { label: string; href: string } }[] = [
  {
    q: "What does SPCTR do?",
    a: "SPCTR is an AI implementation studio. Right now we book meetings with decision makers who need what you sell, and we build custom AI fixes for the work eating your week.",
  },
  {
    q: "How does pricing work?",
    a: "Lead generation is pay per meeting: a flat fee for each booked meeting with a qualified decision maker. No meeting, no charge. Custom builds get one flat quote after a 20 minute call.",
    link: { label: "See pricing", href: "/lead-generation#pricing" },
  },
  {
    q: "How fast can I start?",
    a: "Book a 20 minute call. For lead generation, first sends usually go out in about 2 to 3 weeks. Most of that is setting up your sending so emails land in inboxes, not spam.",
  },
  {
    q: "Can you build something custom?",
    a: "Yes. Tell us the problem: leads answered in minutes, reports that write themselves, your tools talking to each other. We build the fix, hand it over, and make sure it works.",
  },
  {
    q: "Is SPCTR a fit for my business?",
    a: "A great fit if you have an offer that already sells, you can take more meetings than you're getting, and you sell to other businesses. If we're not a fit, we'll tell you on the first call.",
    link: { label: "Who it's for", href: "/lead-generation" },
  },
];

type Msg = { from: "glint" | "you"; text: string; link?: { label: string; href: string } };
const GREETING = "Hello, I'm Glint! Anything you want to know about SPCTR?";

export function GlintHelper() {
  const [open, setOpen] = useState(false);
  const [hello, setHello] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "glint", text: GREETING }]);
  const [asked, setAsked] = useState<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // tuck away while the contact section is on screen (Glint is already there)
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const check = () => {
      const r = contact.getBoundingClientRect();
      setHidden(r.top < window.innerHeight * 0.75 && r.bottom > 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);
  useEffect(() => { if (hidden) setOpen(false); }, [hidden]);

  // Esc closes; focus the first question when opening
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLButtonElement>(".glint-q")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const reply = (i: number) => {
    if (typing) return;
    setAsked((a) => [...a, i]);
    setMsgs((m) => [...m, { from: "you", text: QA[i].q }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "glint", text: QA[i].a, link: QA[i].link }]);
    }, 650);
  };

  const toggle = () => { setHello(false); setOpen((o) => !o); };
  const remaining = QA.map((qa, i) => ({ ...qa, i })).filter((x) => !asked.includes(x.i));

  return (
    <div className={`glint ${hidden ? "is-hidden" : ""} ${open ? "is-open" : ""}`}>
      {open && (
        <div className="glint-panel" ref={panelRef} role="dialog" aria-label="Glint, SPCTR helper">
          <div className="glint-head">
            <div className="glint-ava"><LivingEye lively ink="var(--ink)" bg="var(--lime)" /></div>
            <div><b>Glint</b><span>SPCTR helper · quick answers</span></div>
            <button className="glint-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="glint-log" ref={logRef} aria-live="polite">
            {msgs.map((m, k) => (
              <div key={k} className={`glint-msg from-${m.from}`}>
                {m.text}
                {m.link && <a href={m.link.href} onClick={() => setOpen(false)}>{m.link.label} →</a>}
              </div>
            ))}
            {typing && <div className="glint-msg from-glint glint-typing" aria-label="Glint is typing"><i /><i /><i /></div>}
          </div>
          <div className="glint-qs">
            {remaining.map((x) => (
              <button key={x.i} className="glint-q" onClick={() => reply(x.i)} disabled={typing}>{x.q}</button>
            ))}
            <a className="glint-human" href="#contact" onClick={() => setOpen(false)}>Talk to a human →</a>
          </div>
        </div>
      )}

      {hello && !open && (
        <div className="glint-hello" role="status">
          <button className="glint-hello-body" onClick={toggle} tabIndex={-1}>{GREETING}</button>
        </div>
      )}

      <button className="glint-launch" onClick={toggle}
        onMouseEnter={() => setHello(true)} onMouseLeave={() => setHello(false)}
        onFocus={() => setHello(true)} onBlur={() => setHello(false)} aria-expanded={open} aria-label={open ? "Close Glint" : "Open Glint, SPCTR helper"}>
        <LivingEye lively ink="var(--ink)" bg="var(--paper)" />
      </button>
    </div>
  );
}
