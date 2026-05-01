# SPCTR — State of the Business
*Last updated: 2026-04-30*

---

## What SPCTR Is

SPCTR is a B2B outbound sales service that books qualified meetings for IT/VAR companies by outsourcing their BDR function. The core value prop: clients stop hiring, training, and managing BDRs — SPCTR runs the outbound and delivers accepted meetings.

**Positioning:** BDR outsourcing for the IT/VAR channel. Not a lead list. Not a tool. Booked meetings, delivered.

---

## Where Things Stand

### Website — Done
- Live at spctr.com (deployed via Vercel)
- Built in Next.js / Tailwind
- Globe with animated arc routes, comet trails, 60 city connections
- Messaging centered on BDR outsourcing and accepted meetings
- Privacy policy, footer, crosshair favicon
- No placeholder links remaining

### Operational Docs — Done (V1.0)
All docs generated, branded (Barlow Condensed / Courier New / acid-green), and cross-referenced. Stored in Google Drive.

| Doc | File | Notes |
|-----|------|-------|
| Client Intake & ICP Brief | `SPCTR_CLIENT_INTAKE_V1-0.docx` | |
| Campaign Launch Checklist | `SPCTR_LAUNCH_CHECKLIST_V1-0.docx` | In Google Drive |
| Meeting Qualification Rubric | `SPCTR_QUAL_RUBRIC_V1-0.docx` | HOT/WARM/PASS scoring, 6 dimensions |
| Meeting Delivery Template | `SPCTR_MEETING_DELIVERY_V1-0.docx` | Google Sheet handoff, 14-day dispute window |
| Client Service Agreement | `SPCTR_SERVICE_AGREEMENT_V1-0.docx` | MSA, month-to-month, Net 7, TN law |
| SOW — Pay Per Meeting | `SPCTR_SOW_PAY_PER_MEETING_V1-0.docx` | $2,500 setup + $1,500/meeting, 90-day min |
| SOW — BDR Retainer | `SPCTR_SOW_BDR_RETAINER_V1-0.docx` | $7,500/mo, 8–12 meetings target, $1,000 overage |

**Pricing (defaults, edit per client):**
- PPM: $2,500 setup + $1,500/meeting, 90-day minimum
- Retainer: $7,500/mo, 8–12 meeting target band, $1,000/mtg overage, $500/mtg credit (capped $2,000), 3-month initial term

---

## What's Next — First Campaign

### Tool Stack to Spin Up
| Tool | Purpose |
|------|---------|
| **Google Workspace** | Main `@spctr.com` inbox for client comms |
| **Mailscale** | Spin up burner sending domains |
| **Apollo** | Prospect list / ICP filtering |
| **Instantly** | Load domains, run outbound sequences |

### Order of Operations
1. Review Campaign Launch Checklist (in Google Drive)
2. Set up Google Workspace (`@spctr.com`)
3. Set up Mailscale — create sending domains (keep primary spctr.com clean)
4. Set up Apollo — filter by ICP, pull first prospect list
5. Load domains + prospects into Instantly
6. Write and launch first sequence

---

## Horizon — Internal Dashboard

**The vision:** A unified ops dashboard that replaces the manual context-switching between Apollo → Mailscale → Instantly → Google Sheets. Claude handles the intelligence layer.

**What it would do:**
- Pull and filter prospects from Apollo API by ICP
- Push prospects into Instantly sequences automatically
- Score inbound replies against the qual rubric
- Flag HOT leads for immediate follow-up
- Auto-update the Google Sheet with booked meetings
- Surface campaign health: active sequences, open/reply rates, domain health, meetings booked

**Stack (planned):**
- Next.js (same as site)
- Apollo API, Instantly API, Google Sheets API, Mailscale API
- Claude API — reply scoring, sequence drafting, lead qualification

**Status:** Planning phase. Build starts after first campaign is live and real data informs what the dashboard needs to show.

---

## Key Decisions & Context
- Month-to-month contracts (no lock-in) — intentional, lowers sales friction
- Two pricing tiers give flexibility: PPM for skeptics, Retainer for committed clients
- Meeting Delivery Template + qual rubric are the source of truth for what counts as a billable meeting — don't change terminology without updating both SOWs and the MSA
- Sending domains must stay separate from spctr.com to protect primary domain reputation
