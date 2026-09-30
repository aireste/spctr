import { Letters } from "./Brand";

/** Site nav, shared by every page. Links are absolute so they work from subpages. */
export function SiteNav() {
  return (
    <nav>
      <div className="wrap">
        <a href="/" className="brand" aria-label="SPCTR home"><Letters /></a>
        <div className="links">
          <a href="/lead-generation">Lead generation</a>
          <a href="/#builds">Custom builds</a>
          <a href="/#start">How to start</a>
        </div>
        <a className="btn" href="#contact">Book a call</a>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <a href="/" className="brand" aria-label="SPCTR home"><Letters /></a>
        <span>
          © 2026 <a href="https://estejg.com" target="_blank" rel="noopener noreferrer">Guerra Digital LLC</a> · Nashville, TN · <a href="/privacy">Privacy</a>
        </span>
      </div>
    </footer>
  );
}
