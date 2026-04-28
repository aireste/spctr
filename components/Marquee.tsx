const ITEMS = [
  "RECON INITIATED",
  "WARM LEADS ONLY",
  "98% ACCURACY RATE",
  "VERIFIED CONTACTS",
  "NO COLD LISTS",
  "PIPELINE INTELLIGENCE",
  "OUTBOUND PRECISION",
  "TARGETS IDENTIFIED",
  "LEADS QUALIFIED",
  "CLOSING VELOCITY",
  "ZERO WASTE OUTREACH",
  "DEPLOY SPCTR",
];

const COLORS = [
  "var(--acid)",
  "var(--orange)",
  "var(--pink)",
  "var(--red)",
  "var(--purple)",
  "var(--blue)",
  "var(--teal)",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span style={{ color: COLORS[i % COLORS.length] }}>{"//"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
