import type { Metadata } from "next";
import "../home.css";
import { SiteNav, SiteFooter } from "@/components/bento/Chrome";
import { MarkDefs } from "@/components/bento/Mosaic";
import { LivingEye } from "@/components/bento/LivingEye";
import { ContactForm } from "@/components/bento/ContactForm";
import { Lookout } from "@/components/bento/Lookout";

export const metadata: Metadata = {
  title: "Lead Generation Intelligence · SPCTR",
  description:
    "Sales outreach, done for you. SPCTR books meetings with decision makers who need what you sell. You only pay when a meeting lands.",
};

const FAQ: [string, string][] = [
  ["How fast does it start?", "First sends go out in about 2 to 3 weeks. Most of that is getting your sending set up properly so your emails land in inboxes, not spam."],
  ["What counts as a meeting?", "A meeting you accept, with a decision maker who fits the criteria we agree on up front. If it doesn't meet your criteria, you don't pay for it."],
  ["Is there a contract or retainer?", "No retainer and no long lock-in. Start with one campaign, see real results, then decide."],
  ["Who will I actually talk to?", "The person running your campaign. No account managers, no handoffs."],
];

export default function LeadGeneration() {
  return (
    <>
      <MarkDefs />
      <SiteNav />

      <main className="wrap">
        <section className="lg-hero">
          <div>
            <h1>Your next meeting is <em>already booked.</em></h1>
            <p className="lead">
              <b>Sales outreach, done for you.</b> SPCTR books meetings with decision makers who need what you sell.
              You show up and close. You only pay when a meeting lands.
            </p>
            <div className="cta">
              <a className="btn" href="#contact" data-interest="lead-generation">Book a 20 min call →</a>
              <a className="btn ghost" href="#pricing">How pricing works</a>
            </div>
          </div>
          <div className="lg-art" aria-hidden="true">
            <LivingEye className="lg-eye" />
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">The problem</p>
          <h2>Growing shouldn&apos;t mean building a sales team.</h2>
          <div className="probs">
            <div><b>A sales hire is a big bet.</b><p>$60 to 80K a year before they ramp, and months before you know if it&apos;s working.</p></div>
            <div><b>Blast emails burn your name.</b><p>Generic outreach gets ignored, and every ignored email makes the next one harder.</p></div>
            <div><b>You&apos;re busy doing the work.</b><p>You&apos;re great at what you sell. You just don&apos;t have hours to chase new buyers.</p></div>
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">What you get</p>
          <h2>A calendar invite with a decision maker who already said yes.</h2>
          <div className="gets">
            <div className="g1"><span className="gi">✓</span><b>Qualified meetings on your calendar</b><p>Real conversations with people who fit who you sell to. That&apos;s the whole point.</p></div>
            <div><span className="gi">✓</span><b>Decision makers, not gatekeepers</b><p>Owners, founders, and the people who actually sign.</p></div>
            <div><span className="gi">✓</span><b>Outreach that sounds like you</b><p>You approve the message before anything goes out under your name.</p></div>
            <div><span className="gi">✓</span><b>The full thread before every call</b><p>You walk in knowing who they are and why they said yes.</p></div>
            <div><span className="gi">✓</span><b>Honest reporting</b><p>Good weeks and slow weeks, you see the numbers and what we&apos;re changing.</p></div>
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>Built for businesses ready for more at bats.</h2>
          <div className="fit">
            <div className="yes">
              <h4>A great fit if</h4>
              <ul>
                <li>You have an offer that already sells</li>
                <li>You can take more meetings than you&apos;re getting</li>
                <li>You know who your best customers are</li>
                <li>You sell to other businesses</li>
              </ul>
            </div>
            <div className="no">
              <h4>Probably not a fit if</h4>
              <ul>
                <li>You&apos;re still figuring out what you sell</li>
                <li>You want thousands of contacts, not conversations</li>
                <li>You need meetings by tomorrow</li>
              </ul>
            </div>
          </div>
          <p className="note">If we&apos;re not a fit, we&apos;ll tell you on the first call. Not every business should take this on, and we&apos;d rather say so.</p>
        </section>

        <section className="sec" id="pricing">
          <p className="eyebrow">Pricing</p>
          <h2>You only pay for results.</h2>
          <div className="price">
            <div className="pmain">
              <h3>We win when you win.</h3>
              <p>A flat fee per booked meeting with a qualified decision maker. No meeting, no charge. That&apos;s not a guarantee, it&apos;s the model.</p>
              <a className="btn" href="#contact" data-interest="lead-generation">Get meetings →</a>
            </div>
            <ul className="pterms">
              <li><b>No retainer</b><span>Nothing up front for meetings that never happen.</span></li>
              <li><b>No lock-in</b><span>Start with one campaign. Decide after you see results.</span></li>
              <li><b>Accepted meetings only</b><span>If it doesn&apos;t meet the criteria we agreed on, you don&apos;t pay.</span></li>
              <li><b>Best for</b><span>Growing outbound without making a sales hire.</span></li>
            </ul>
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">Why SPCTR</p>
          <h2>Not your typical agency.</h2>
          <div className="why">
            <div><b>Boutique by design</b><p>Small roster, full attention. You&apos;re not account #47.</p></div>
            <div><b>Low barrier to entry</b><p>No massive retainers. Start small, see real results, then decide.</p></div>
            <div><b>You know who&apos;s running it</b><p>The person you talk to is the person running your campaign. Built by someone who&apos;s lived inside a sales org.</p></div>
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">FAQ</p>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        <section className="sec contact" id="contact">
          <div>
            <p className="eyebrow">Get started</p>
            <h2>Let&apos;s fill your calendar.</h2>
            <p className="sub">Tell us what you sell and who you sell to. We&apos;ll reply within 24 hours with an honest read on whether we can help.</p>
            <Lookout line="Hi, I'm Glint! Everything you send here goes straight to a real person." />
          </div>
          <ContactForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
