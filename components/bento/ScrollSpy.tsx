"use client";

import { useEffect } from "react";

// "You are here" for the nav: highlights the link for the section on screen,
// and the page link when you're on that page (e.g. /lead-generation).
// On the homepage, Home is current until you scroll into a linked section.
export function ScrollSpy() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("nav .links a"));
    const mark = (a: HTMLAnchorElement | undefined) =>
      links.forEach((l) => (l === a ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));

    const home = location.pathname === "/";
    const homeLink = links.find((l) => l.getAttribute("href") === "/");
    const pageLink = links.find((l) => l.getAttribute("href") === location.pathname);
    if (pageLink && !home) { mark(pageLink); return; }

    const byId = new Map<string, HTMLAnchorElement>();
    links.forEach((l) => { const id = l.getAttribute("href")?.split("#")[1]; if (id) byId.set(id, l); });
    const sections = Array.from(byId.keys()).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) { if (home) mark(homeLink); return; }

    // on scroll, the section whose top has passed ~40% down the screen is "current"
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current: HTMLElement | undefined;
      for (const sec of sections) {
        const r = sec.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = sec;
      }
      mark(current ? byId.get(current.id) : home ? homeLink : undefined);
    };
    // only a few rect reads, cheap enough to run on every scroll event
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return null;
}
