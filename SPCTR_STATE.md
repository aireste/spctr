# SPCTR — State of the Business
*Last updated: 2026-06-02*

---

## What SPCTR Is

SPCTR is a B2B outbound sales service that books qualified meetings for IT/VAR companies by outsourcing their BDR function. The core value prop: clients stop hiring, training, and managing BDRs — SPCTR runs the outbound and delivers accepted meetings.

**Positioning:** BDR outsourcing for the IT/VAR channel. Not a lead list. Not a tool. Booked meetings, delivered.

**Legal entity:** Guerra Digital LLC d/b/a SPCTR — Nashville, TN. SPCTR is one of multiple brands operating under Guerra Digital LLC (owner: Esteban Guerra, also known as Steven War). All contracts, Stripe payments, and legal docs operate under Guerra Digital LLC. LLC registered 2026-06-02. EIN obtained same day.

---

## Where Things Stand

### Admin — Done
- Guerra Digital LLC registered in Tennessee
- EIN obtained
- Google Workspace set up (`@spctr.com` / `@gospctr.com`)
- Stripe being set up under Guerra Digital LLC
- Legal docs updated — all three (MSA, PPM SOW, Retainer SOW) now read "Guerra Digital LLC d/b/a SPCTR" as provider, signature updated to "Founder & Managing Member, Guerra Digital LLC"

### Website — Done
- Live at `spctr.run` (deployed via Vercel, GitHub: github.com/aireste/spctr)
- Built in Next.js 14 / Tailwind / Three.js
- Globe with animated arc routes, pulsing halos, drag to spin
- Messaging centered on BDR outsourcing and accepted meetings
- No placeholder links remaining

### Operational Docs — Done (V1.0)
All 9 docs generated, branded, stored in Google Drive. Legal docs updated to Guerra Digital LLC.

| Doc | Purpose | When Used |
|-----|---------|-----------|
| Service Overview V2.3 | Client-facing pitch deck (PDF) | Send to any warm prospect |
| Ops Brief V2.1 | Internal business ops plan | Reference for model/positioning decisions |
| Client Intake & ICP Brief | Campaign scoping doc | Kickoff call with every new client |
| Campaign Launch Checklist | Step-by-step campaign runbook | After intake is signed, every campaign |
| Meeting Qualification Rubric | HOT/WARM/PASS reply scoring | Every reply, every campaign |
| Meeting Delivery Template | Google Sheet meeting handoff | Created at launch, updated per booking |
| Client Service Agreement | Master legal agreement (MSA) | Before any SOW, once per client |
| SOW — Pay Per Meeting | PPM engagement contract | PPM clients, attaches to MSA |
| SOW — Monthly Retainer | Retainer engagement contract | Retainer clients, attaches to MSA |

**Ops Reference doc** created at `~/spctr/docs/ops-reference.html` + PDF — branded cheat sheet covering all 9 docs, when to use each, and deployment order.

**Service Overview** updated to V2.3:
- Removed "From Signed to Booked Meeting" process page (sells process not outcome)
- Real SPCTR wordmark logo embedded on cover
- Now 7 pages, tighter and outcome-focused

**Pricing (defaults, edit per client):**
- PPM: $2,500 setup + $1,500/meeting, 90-day minimum
- Retainer: $7,500/mo, 8–12 meeting target band, $1,000/mtg overage, $500/mtg credit (capped $2,000), 3-month initial term

---

## What's Next — First Campaign

### Tool Stack
| Tool | Purpose | Status |
|------|---------|--------|
| **Google Workspace** | `@spctr.com` / `@gospctr.com` inbox | Done |
| **Apollo Basic** | ICP filtering + prospect list building | Purchased 2026-06-02 |
| **Instantly Hypergrowth** | Burner domains, inbox warmup, sequences | Purchased 2026-06-02 |

> Mailscale dropped — Instantly handles domain setup natively. Revisit when managing 3+ clients simultaneously.

### Sending Domain Strategy
- **Burner domains** (for SPCTR's own outbound to find clients): `gospctr.com`, `getspctr.com` — buy inside Instantly tomorrow
- 2-3 inboxes per domain (e.g. `esteban@`, `hello@`, `team@`)
- **Primary domain** (`spctr.run` / `ops@gospctr.com`) — client comms only, never used for cold sending
- When a prospect bites → transition to primary domain for all professional communication
- Per-client campaigns: spin up burner domains that mirror the client's brand (separate from SPCTR's own domains)

### Order of Operations
1. ~~Google Workspace~~ — Done
2. ~~Buy Apollo + Instantly~~ — Done (2026-06-02)
3. **NEXT: Buy 2-3 burner domains inside Instantly** (gospctr.com, getspctr.com) — target: tomorrow lunch
4. Set up 2-3 inboxes per domain, start warmup (~2–3 weeks, runs automatically)
5. While warmup runs: build Apollo ICP list (IT/VAR, 10–200 employees, VP Sales / Founder / Director of Sales, US)
6. Write first cold email sequence (3-4 steps max)
7. Load prospects + launch
8. **Target first send: early next week**

### HOT Lead → Client Calendar Flow
1. Prospect replies in Instantly Unibox
2. Score against Qualification Rubric (must hit HOT on 4/6 dimensions incl. Authority + Vendor Fit)
3. HOT → reply from primary domain, book on client's Google Calendar directly
4. Log in Meeting Delivery Tracker within 24hrs (full context — name, title, reply thread, talk track)
5. Ping client via Slack/email
6. Client takes meeting, updates Outcome in tracker within 48hrs
7. Invoice: PPM → $1,500/meeting that week, Net 7

---

## Horizon — Internal Dashboard

**The vision:** Unified ops dashboard replacing manual context-switching between Apollo → Instantly → Google Sheets. Claude handles intelligence layer.

**What it would do:**
- Pull/filter prospects from Apollo API by ICP
- Push into Instantly sequences automatically
- Score replies against qual rubric
- Flag HOT leads for immediate follow-up
- Auto-update Meeting Delivery Tracker
- Surface campaign health metrics

**Stack (planned):** Next.js, Apollo API, Instantly API, Google Sheets API, Claude API

**Status:** Planning phase. Build starts after first campaign is live.

---

## Key Decisions & Context
- Month-to-month contracts — intentional, lowers sales friction
- Two pricing tiers: PPM for skeptics, Retainer for committed clients
- Mailscale skipped for now — Instantly sufficient for early stage
- Meeting Delivery Tracker + Qual Rubric are billing source of truth
- Primary domain (`spctr.run`) never used for cold sending — always protected
- Esteban asked Claude to act as mentor/coach with pushback — agreed
- Urgency is real: Apollo + Instantly are monthly costs, first campaign must launch ASAP
