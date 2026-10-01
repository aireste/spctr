import { Letters } from "./Brand";
import { ScrollSpy } from "./ScrollSpy";
import { Reveal } from "./Reveal";
import { GlintHelper } from "./GlintHelper";

/** Site nav, shared by every page. Links are absolute so they work from subpages.
 *  Pages without their own contact form pass ctaHref="/#contact". */
export function SiteNav({ ctaHref = "#contact" }: { ctaHref?: string }) {
  return (
    <>
    <nav>
      <div className="wrap">
        <a href="/" className="brand" aria-label="SPCTR home"><Letters /></a>
        <div className="links">
          <a href="/lead-generation">Lead generation</a>
          <a href="/custom-builds">Custom builds</a>
          <a href="/#start">How to start</a>
        </div>
        <a className="btn" href={ctaHref}>Book a call</a>
      </div>
      <ScrollSpy />
      <Reveal />
    </nav>
    {/* outside <nav>: the nav's backdrop-filter would pin fixed children to it */}
    <GlintHelper />
    </>
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
