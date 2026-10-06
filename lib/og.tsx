import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LETTER_PATHS, MARK_PATHS } from "@/components/bento/logo-paths";

/** The link preview (Messages, Slack, LinkedIn, X): 1200×630, drawn from the brand. */
export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  bone: "#eeede7",
  ink: "#0c0c11",
  ink2: "#55555f",
  lime: "#c0fc04",
  orange: "#ff5500",
  cobalt: "#3601fb",
};

/** The mascot mark: `a` paints the eye and two ring quarters, `b` the other two. */
function Mark({ size, a, b }: { size: number; a: string; b: string }) {
  return (
    <svg width={size} height={size} viewBox="240 240 520 520">
      {MARK_PATHS.map((p, i) => (
        <path key={i} fill={p.cls === "m1" ? a : b} d={p.d} />
      ))}
    </svg>
  );
}

function Wordmark({ width, color }: { width: number; color: string }) {
  return (
    <svg width={width} height={Math.round((width * 106) / 484)} viewBox="312 332 484 106">
      {LETTER_PATHS.map((d, i) => (
        <path key={i} fill={color} d={d} />
      ))}
    </svg>
  );
}

const Headline = ({ ink, accent, size }: { ink: string; accent: string; size: number }) => (
  <div style={{ display: "flex", flexDirection: "column", fontWeight: 900, fontSize: size, letterSpacing: "-0.045em", lineHeight: 0.94, color: ink, whiteSpace: "nowrap" }}>
    <span>AI that</span>
    <span>brings in</span>
    <span style={{ color: accent }}>business.</span>
  </div>
);

const Offers = ({ color, soft }: { color: string; soft: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 25, fontWeight: 700, color, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
    <span>Booked meetings. Pay per meeting.</span>
    <span>Custom AI builds. One flat quote.</span>
    <span style={{ marginTop: 12, fontSize: 22, color: soft }}>spctr.run</span>
  </div>
);

function Mosaic() {
  const tiles: [string, string, string][] = [
    [C.lime, C.ink, C.ink],
    [C.ink, C.lime, C.bone],
    [C.orange, C.ink, C.ink],
    [C.cobalt, C.bone, C.bone],
  ];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: C.bone, padding: 56, gap: 48 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Wordmark width={190} color={C.ink} />
        <Headline ink={C.ink} accent={C.cobalt} size={88} />
        <Offers color={C.ink} soft={C.ink2} />
      </div>
      <div style={{ width: 518, display: "flex", flexWrap: "wrap", gap: 14, alignContent: "center" }}>
        {tiles.map(([bg, a, b], i) => (
          <div key={i} style={{ width: 252, height: 252, background: bg, borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Mark size={150} a={a} b={b} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Orange() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.orange, padding: 60 }}>
      <div style={{ position: "absolute", right: -250, top: -45, display: "flex" }}>
        <Mark size={720} a={C.ink} b={C.ink} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <Wordmark width={200} color={C.ink} />
        <Headline ink={C.ink} accent={C.bone} size={96} />
        <Offers color={C.ink} soft={C.ink} />
      </div>
    </div>
  );
}

function Ink() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: C.ink, padding: 60, gap: 40 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <Wordmark width={190} color={C.bone} />
        <Headline ink={C.bone} accent={C.lime} size={90} />
        <Offers color={C.bone} soft="#b9b8b0" />
      </div>
      <Mark size={420} a={C.lime} b={C.bone} />
    </div>
  );
}

export const OG_VARIANTS = { mosaic: Mosaic, orange: Orange, ink: Ink } as const;
export type OgVariant = keyof typeof OG_VARIANTS;

export async function renderOg(v: OgVariant = "mosaic") {
  const font = (w: number) => readFile(join(process.cwd(), `app/og-fonts/hanken-${w}.woff`));
  const [f900, f700, f500] = await Promise.all([font(900), font(700), font(500)]);
  const Card = OG_VARIANTS[v];
  return new ImageResponse(<Card />, {
    ...OG_SIZE,
    fonts: [
      { name: "Hanken Grotesk", data: f900, weight: 900, style: "normal" },
      { name: "Hanken Grotesk", data: f700, weight: 700, style: "normal" },
      { name: "Hanken Grotesk", data: f500, weight: 500, style: "normal" },
    ],
  });
}
