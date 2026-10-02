import type { Metadata } from "next";
import "../home.css";
import { SiteNav, SiteFooter } from "@/components/bento/Chrome";
import { MarkDefs } from "@/components/bento/Mosaic";
import { LivingEye } from "@/components/bento/LivingEye";
import { ContactForm } from "@/components/bento/ContactForm";

export const metadata: Metadata = {
  title: "Lead Generation · SPCTR",
  description:
    "SPCTR puts meetings with buyers who need what you sell on your calendar. You only pay for the ones you accept.",
};

const FAQ: [string, string][] = [
  ["What does a meeting cost?", "It depends on what a new customer is worth to you. We set one flat price per meeting on the first call, and it doesn't change without your OK."],
  ["What counts as a meeting?", "A meeting you accept, with a decision maker who fits the criteria we agree on up front. If it doesn't fit, you don't pay for it."],
  ["How fast does it start?", "First emails go out in about 2 to 3 weeks. Most of that is setting up sending properly so your emails land in inboxes, not spam."],
  ["Who will I talk to?", "The person running your campaign. No account managers, no handoffs."],
];

export default function LeadGeneration() {
  return (
    <>
      <MarkDefs />
      <SiteNav page="Lead generation" />

      <main className="wrap offer-page page-lg">
        <section className="lg-hero">
          <div>
            <h1>Meetings with buyers who <em>need what you sell.</em></h1>
            <p className="lead">
              We put them on your calendar. You only pay for the ones you accept.
            </p>
            <div className="cta">
              <a className="btn" href="#contact" data-interest="lead-generation">Book a 20 min call</a>
            </div>
          </div>
          <div className="lg-art" aria-hidden="true">
            <LivingEye className="lg-eye" lively ink="var(--teal)" bg="var(--paper)" />
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">What you get</p>
          <h2>This, on your calendar.</h2>
          <div className="mail">
            <div className="mail-bar"><span>&larr; Inbox</span><span>1 of 3</span></div>
            <div className="mail-head">
              <span className="mail-ava" aria-hidden="true">S</span>
              <div><b>SPCTR Bookings</b><span>to me</span></div>
              <time>9:14 AM</time>
            </div>
            <h3 className="mail-subj">Invitation: Intro call with Dana Ruiz @ Tue 10:30 AM</h3>
            <div className="mail-inv">
              <div className="mail-date" aria-hidden="true"><span>Oct</span><b>13</b><span>Tue</span></div>
              <div className="mail-ev">
                <b>Intro call: Dana Ruiz</b>
                <span>Tuesday, 10:30 &ndash; 10:50 AM</span>
                <span>Owner, 3-location HVAC company</span>
              </div>
              <div className="mail-rsvp" role="group" aria-label="Going?">
                <span>Going?</span>
                <span className="on" aria-current="true">Yes</span><span>Maybe</span><span>No</span>
              </div>
            </div>
            <div className="mail-body">
              <span className="ba-k">Your brief</span>
              <dl>
                <dt>Who</dt><dd>Dana owns the company and signs off on vendors.</dd>
                <dt>Why she said yes</dt><dd>&ldquo;Good timing. We&apos;re replacing how we schedule jobs this quarter.&rdquo;</dd>
                <dt>The thread</dt><dd>Every email, so you walk in knowing the whole story.</dd>
              </dl>
            </div>
          </div>
          <p className="note">An example. Yours will look like your buyers.</p>
        </section>

        <section className="sec" id="pricing">
          <p className="eyebrow">The deal</p>
          <h2>You pay per meeting. That&apos;s it.</h2>
          <div className="price">
            <div className="pmain">
              <h3>No meeting, no charge.</h3>
              <p>One flat price per meeting you accept, set on the first call based on what a new customer is worth to you.</p>
              <a className="btn" href="#contact" data-interest="lead-generation">Book a 20 min call</a>
            </div>
            <ul className="pterms">
              <li><b>No retainer, no setup fee</b><span>Nothing up front.</span></li>
              <li><b>Month to month</b><span>Stay because it works, not because of a contract.</span></li>
              <li><b>You approve every message</b><span>Nothing goes out under your name without your OK.</span></li>
              <li className="nofit"><b>Not a fit if</b><span>You&apos;re still figuring out what you sell, or you need meetings by tomorrow.</span></li>
            </ul>
          </div>
        </section>

        <section className="sec contact" id="contact">
          <div>
            <p className="eyebrow">Get started</p>
            <h2>Let&apos;s fill your calendar.</h2>
            <p className="sub">Tell us what you sell and who you sell to. You&apos;ll hear back within 24 hours with an honest read.</p>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
