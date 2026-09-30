import "./home.css";
import { Letters } from "@/components/bento/Brand";
import { Mosaic } from "@/components/bento/Mosaic";
import { ContactForm } from "@/components/bento/ContactForm";

export default function Home() {
  return (
    <>
      <nav>
        <div className="wrap">
          <a href="#" className="brand" aria-label="SPCTR home"><Letters /></a>
          <div className="links">
            <a href="#offerings">Offerings</a>
            <a href="#builds">Custom builds</a>
            <a href="#start">How to start</a>
          </div>
          <a className="btn" href="#contact">Book a call</a>
        </div>
      </nav>

      <main className="wrap">
        <section className="hero">
          <div>
            <h1>AI that brings in <em>business.</em></h1>
            <p className="lead">
              <b>SPCTR is an AI implementation studio.</b> Right now our engine finds buyers who need what you
              sell and puts them on your calendar. You only pay when a meeting lands.
            </p>
            <div className="cta">
              <a className="btn" href="#contact">Book a 20 min call →</a>
              <a className="btn ghost" href="#offerings">See what we do</a>
            </div>
          </div>
          <Mosaic />
        </section>

        <section className="sec" id="offerings">
          <p className="eyebrow">Our offerings</p>
          <h2>Pick what you need. We handle the rest.</h2>
          <div className="offers">
            <article className="offer o1">
              <div className="otop"><span className="num">01</span><span className="badge live">Live now</span></div>
              <h3>Lead Generation Intelligence</h3>
              <p className="d">Sales outreach, done for you. You get a calendar invite with a decision maker who already said yes. No ramp time. No overhead.</p>
              <dl className="spec">
                <dt>Price</dt><dd>Flat fee per booked meeting</dd>
                <dt>Risk</dt><dd>No meeting, no charge</dd>
                <dt>First sends</dt><dd>About 2 to 3 weeks</dd>
              </dl>
              <a className="btn" href="#contact" data-interest="lead-generation">Get meetings →</a>
            </article>
            <article className="offer o2" id="builds">
              <div className="otop"><span className="num">02</span><span className="badge">Scoped per project</span></div>
              <h3>Custom AI Builds</h3>
              <p className="d">Tell us what&apos;s eating your week. We build the fix, hand it over, and make sure it works.</p>
              <div className="ex"><span>Leads answered in minutes</span><span>Reports that write themselves</span><span>Your tools talking to each other</span></div>
              <a className="btn alt" href="#contact" data-interest="custom-ai-build">Tell us the problem →</a>
            </article>
          </div>
        </section>

        <section className="sec" id="start">
          <p className="eyebrow">How to start</p>
          <h2>Three steps. That&apos;s it.</h2>
          <ol className="steps">
            <li><span className="sn">1</span><b>Book a call</b><p>20 minutes. Tell us what you sell or what you want fixed.</p></li>
            <li><span className="sn">2</span><b>Get a clear price</b><p>Pay per meeting, or one flat quote for a build. No surprises.</p></li>
            <li><span className="sn">3</span><b>Get the result</b><p>Meetings on your calendar, or the build in your hands.</p></li>
          </ol>
        </section>

        <section className="sec">
          <p className="eyebrow">Who it&apos;s for</p>
          <div className="who">
            <div><b>Owner led businesses</b><span>You sell, you deliver, you&apos;re out of hours.</span></div>
            <div><b>Small sales teams</b><span>Great closers, not enough at bats.</span></div>
            <div><b>Service companies</b><span>IT, property, facilities, professional services.</span></div>
            <div><b>Teams buried in admin</b><span>Too many tools, not enough hours.</span></div>
          </div>
        </section>

        <section className="sec contact" id="contact">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>Tell us what you want booked, or built.</h2>
            <p className="sub">We&apos;ll get back to you fast. If we&apos;re not a fit, we&apos;ll say so.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span className="brand"><Letters /></span>
          <span>© 2026 Guerra Digital LLC · Nashville, TN · <a href="https://estejg.com" target="_blank" rel="noopener noreferrer">About</a> · <a href="/privacy">Privacy</a></span>
        </div>
      </footer>
    </>
  );
}
