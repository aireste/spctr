import type { Metadata } from "next";
import "../home.css";
import { SiteNav, SiteFooter } from "@/components/bento/Chrome";
import { MarkDefs } from "@/components/bento/Mosaic";
import { Relay } from "@/components/bento/Relay";
import { ContactForm } from "@/components/bento/ContactForm";

export const metadata: Metadata = {
  title: "Custom AI Builds · SPCTR",
  description:
    "Tell us what's eating your week. SPCTR connects the tools you already use and builds simple AI fixes, one flat quote, handed over working.",
};

const FAQ: [string, string][] = [
  ["I don't really use AI yet. Is this for me?", "Yes. You don't need to know anything about AI first. We set it up inside the tools you already use and show your team how it works."],
  ["Will I have to switch the tools I use?", "Usually no. Most builds connect what you already have, so your team keeps working the way they do now."],
  ["What does it cost?", "It depends on the size of the fix. After a 20 minute call you get one flat price, so you know the number before any work starts."],
  ["How long does a build take?", "Small fixes can be quick, bigger ones take longer. The timeline comes with your quote."],
];

export default function CustomBuilds() {
  return (
    <>
      <MarkDefs />
      <SiteNav page="Custom builds" />

      <main className="wrap offer-page page-cb">
        <section className="lg-hero">
          <div>
            <h1>AI that can actually <em>see your business.</em></h1>
            <p className="lead">
              Tell us the task eating your week. We connect AI to the tools you already use and hand it over working.
            </p>
            <div className="cta">
              <a className="btn" href="#contact" data-interest="custom-ai-build">Tell us the problem</a>
            </div>
          </div>
          <div className="lg-art cb-art" aria-hidden="true">
            <Relay />
          </div>
        </section>

        <section className="sec" id="build">
          <p className="eyebrow">What changes</p>
          <h2>Same question. A real answer.</h2>
          <div className="ba">
            <div className="ba-before">
              <span className="ba-k">Today</span>
              <p className="ba-q">Which tenants are late on rent this month?</p>
              <p className="ba-a">I don&apos;t have access to your rent records. You could export them from your property software and paste them here.</p>
            </div>
            <div className="ba-after">
              <span className="ba-k">After SPCTR</span>
              <p className="ba-q">Which tenants are late on rent this month?</p>
              <p className="ba-a">Four are late: units 2B, 4A, 7C and 9D. A friendly reminder is drafted for each one and waiting for your OK.</p>
            </div>
          </div>
          <p className="note">An example from property management. Same idea for your inbox, customer list, calendar and spreadsheets.</p>
        </section>

        <section className="sec" id="pricing">
          <p className="eyebrow">The deal</p>
          <h2>One flat price, before we start.</h2>
          <div className="price">
            <div className="pmain">
              <h3>You know the number first.</h3>
              <p>A 20 minute call, then one price for the whole build. No hourly billing.</p>
              <a className="btn" href="#contact" data-interest="custom-ai-build">Tell us the problem</a>
            </div>
            <ul className="pterms">
              <li><b>Half to start, half when it works</b><span>The second payment comes after you see it running.</span></li>
              <li><b>It&apos;s yours</b><span>Once it&apos;s paid for, you own what we built.</span></li>
              <li><b>30 days of fixes</b><span>If something breaks after handover, we fix it.</span></li>
              <li className="nofit"><b>Not a fit if</b><span>You want AI just because everyone else has it, or you need it by tomorrow.</span></li>
            </ul>
          </div>
        </section>

        <section className="sec contact" id="contact">
          <div>
            <p className="eyebrow">Get started</p>
            <h2>Tell us what&apos;s eating your week.</h2>
            <p className="sub">Describe it in your own words. You&apos;ll hear back within 24 hours with an honest read on whether a build makes sense.</p>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
          <ContactForm initial={["custom-ai-build"]} />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
