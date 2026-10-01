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
  ["Do I need to be technical?", "Not at all. You tell us what's slowing you down in plain words. We handle everything else and show you how it works when it's done."],
  ["Will I have to switch the tools I use?", "Usually no. Most builds connect what you already have, so your team keeps working the way they do now, just with less busywork."],
  ["What does it cost?", "It depends on the size of the fix. After a 20 minute call you get one flat quote, so you know the number before any work starts."],
  ["How long does a build take?", "Small fixes can be quick, bigger ones take longer. You'll get a timeline with your quote, and you'll see it working along the way."],
  ["What if something changes later?", "We hand it over working and make sure it holds up in your real week. If you want help growing it after that, we can talk about it."],
];

export default function CustomBuilds() {
  return (
    <>
      <MarkDefs />
      <SiteNav page="Custom builds" />

      <main className="wrap">
        <section className="lg-hero">
          <div>
            <h1>Your tools, finally <em>working together.</em></h1>
            <p className="lead">
              <b>Custom AI builds, done for you.</b> Tell us what&apos;s eating your week. We connect the tools you already use,
              build the fix, hand it over, and make sure it works.
            </p>
            <div className="cta">
              <a className="btn" href="#contact" data-interest="custom-ai-build">Tell us the problem</a>
              <a className="btn ghost" href="#build">See what we build</a>
            </div>
          </div>
          <div className="lg-art cb-art" aria-hidden="true">
            <Relay />
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">The problem</p>
          <h2>Your business runs on apps that don&apos;t talk to each other.</h2>
          <div className="probs">
            <div><b>Copy, paste, repeat.</b><p>The same info typed into three different places, every single day.</p></div>
            <div><b>Answers are scattered.</b><p>What you need to know lives in spreadsheets, inboxes and apps that never meet.</p></div>
            <div><b>Things slip through.</b><p>A new lead waits a day for a reply. A follow up gets forgotten. Nobody has time to watch everything.</p></div>
          </div>
        </section>

        <section className="sec" id="build">
          <p className="eyebrow">What we build</p>
          <h2>Small fixes that give you hours back.</h2>
          <div className="gets">
            <div className="g1"><span className="gi">✓</span><b>Your tools, connected</b><p>Your customer list, inbox, calendar and spreadsheets share what they know, on their own. Type it once, it shows up everywhere it should.</p></div>
            <div><span className="gi">✓</span><b>Leads answered in minutes</b><p>Every new inquiry gets a thoughtful reply and lands in the right place, even at 10pm.</p></div>
            <div><span className="gi">✓</span><b>Reports that write themselves</b><p>The numbers you check every Monday, pulled together and explained in plain English, waiting in your inbox.</p></div>
            <div><span className="gi">✓</span><b>A helper that knows your business</b><p>Ask a question, get an answer from your own prices, policies and past work.</p></div>
            <div><span className="gi">✓</span><b>Simple apps for one job</b><p>A small tool built around how your team actually works, instead of another subscription that almost fits.</p></div>
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">Built, not just pitched</p>
          <h2>We use this stuff every day.</h2>
          <div className="proof">
            <div className="proof-main">
              <b>Right now we run a live app that does exactly this.</b>
              <p>
                Every morning it pulls information from several different places, makes sense of it, and sends readers a short,
                plain English briefing on what changed and what matters. No one copies anything by hand.
              </p>
              <p>Same skills, pointed at your business.</p>
            </div>
            <ul className="proof-steps">
              <li><span>1</span>Gathers info from many sources</li>
              <li><span>2</span>Connects the dots between them</li>
              <li><span>3</span>Turns it into something a person can use</li>
            </ul>
          </div>
        </section>

        <section className="sec">
          <p className="eyebrow">How it works</p>
          <h2>Three steps. No jargon.</h2>
          <ol className="steps">
            <li><span className="sn">1</span><b>Tell us the problem</b><p>A 20 minute call. You describe the busywork, we ask questions.</p></li>
            <li><span className="sn">2</span><b>Get one flat quote</b><p>A clear price and timeline before any work starts. No hourly meter running.</p></li>
            <li><span className="sn">3</span><b>Get it working</b><p>We build it, hand it over, and make sure it fits your real week.</p></li>
          </ol>
        </section>

        <section className="sec">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>Built for busy teams with repeat work.</h2>
          <div className="fit">
            <div className="yes">
              <h4>A great fit if</h4>
              <ul>
                <li>You do the same task every week and wish you didn&apos;t</li>
                <li>Your info lives in a few apps that don&apos;t share</li>
                <li>You can describe what &quot;fixed&quot; looks like</li>
                <li>You want it done, not a course on how to do it</li>
              </ul>
            </div>
            <div className="no">
              <h4>Probably not a fit if</h4>
              <ul>
                <li>You want AI just because everyone else has it</li>
                <li>You need a company wide overhaul with a committee</li>
                <li>You need it finished by tomorrow</li>
              </ul>
            </div>
          </div>
          <p className="note">If a build isn&apos;t worth it for you, we&apos;ll say so on the first call. Sometimes the fix is simpler than you think.</p>
        </section>

        <section className="sec" id="pricing">
          <p className="eyebrow">Pricing</p>
          <h2>One flat quote. No surprises.</h2>
          <div className="price">
            <div className="pmain">
              <h3>You know the number first.</h3>
              <p>After a 20 minute call, you get one flat price for the whole build. No hourly billing, no invoice that grows while you&apos;re not looking.</p>
              <a className="btn" href="#contact" data-interest="custom-ai-build">Tell us the problem</a>
            </div>
            <ul className="pterms">
              <li><b>Scoped up front</b><span>We agree on what &quot;done&quot; means before we start.</span></li>
              <li><b>Plain English</b><span>No tech talk. You&apos;ll always know what&apos;s happening and why.</span></li>
              <li><b>Handed over working</b><span>We show you how it works and make sure it holds up.</span></li>
              <li><b>Best for</b><span>Getting hours back without hiring or switching tools.</span></li>
            </ul>
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
            <h2>Tell us what&apos;s eating your week.</h2>
            <p className="sub">Describe the busywork in your own words. We&apos;ll reply within 24 hours with an honest read on whether a build makes sense.</p>
          </div>
          <ContactForm initial={["custom-ai-build"]} />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
