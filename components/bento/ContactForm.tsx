"use client";

import { useEffect, useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

const INTERESTS = [
  { value: "lead-generation", label: "Lead generation" },
  { value: "custom-ai-build", label: "A custom AI build" },
  { value: "updates", label: "Updates on new offerings" },
];

export function ContactForm({ initial = ["lead-generation"] }: { initial?: string[] }) {
  const [state, setState] = useState<State>("idle");
  const [picked, setPicked] = useState<string[]>(initial);

  // Offer buttons elsewhere on the page carry data-interest; clicking one pre-selects it here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-interest]");
      const v = el?.dataset.interest;
      if (v) setPicked((p) => (p.includes(v) ? p : [...p, v]));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const toggle = (v: string) => setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = new FormData(e.currentTarget);
    data.set("interests", picked.join(", "));
    try {
      const res = await fetch("https://formspree.io/f/xgorgylv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="sent" role="status">
        <b>Got it. Talk soon.</b>
        <p>We&apos;ll get back to you fast. If we&apos;re not a fit, we&apos;ll say so.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label className="full">Company<input name="company" autoComplete="organization" /></label>
      <div className="full">
        <span className="flabel">I&apos;m interested in</span>
        <div className="chips">
          {INTERESTS.map((i) => (
            <label key={i.value}>
              <input type="checkbox" checked={picked.includes(i.value)} onChange={() => toggle(i.value)} />
              <span>{i.label}</span>
            </label>
          ))}
        </div>
      </div>
      <label className="full">Anything else
        <textarea name="message" placeholder="What you sell, or what you want off your plate" />
      </label>
      <div className="full">
        <button className="btn" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send it"}
        </button>
        {state === "error" && <p className="err" role="alert">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
