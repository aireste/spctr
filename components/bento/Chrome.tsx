import { Letters } from "./Brand";
import { ScrollSpy } from "./ScrollSpy";
import { Reveal } from "./Reveal";
import { GlintHelper } from "./GlintHelper";

/** Site nav, shared by every page. Links are absolute so they work from subpages.
 *  Pages without their own contact form pass ctaHref="/#contact".
 *  Subpages pass `page` (their name) for a "Home / page" trail on phones,
 *  where the nav links are hidden. */
export function SiteNav({ ctaHref = "#contact", page }: { ctaHref?: string; page?: string }) {
  return (
    <>
    <nav>
      <div className="wrap">
        <a href="/" className="brand" aria-label="SPCTR home"><Letters /></a>
        <div className="links">
          <a href="/">Home</a>
          <a href="/lead-generation">Lead generation</a>
          <a href="/custom-builds">Custom builds</a>
        </div>
        <a className="btn nav-cta" href={ctaHref}>Book a call</a>
      </div>
      {page && (
        <div className="crumbs wrap" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{page}</span>
        </div>
      )}
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
