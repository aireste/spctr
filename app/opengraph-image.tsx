import { renderOg, OG_SIZE } from "@/lib/og";

// The card shown when a spctr.run link is shared (Messages, Slack, LinkedIn, X).
export const alt = "SPCTR: AI that brings in business. Booked meetings, pay per meeting. Custom AI builds, one flat quote.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("mosaic");
}
