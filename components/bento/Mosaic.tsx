import { markInner } from "./Brand";

// Every tile is the SPCTR mark. Each quadrant of the ring (and the center disc)
// is clipped separately so it can take its own color.
// Order: [topLeft, topRight, bottomLeft, bottomRight, center]
type Cols = [string, string, string, string, string];

const C: Record<string, string> = {
  lime: "var(--lime)", ink: "var(--ink)", bone: "#eeeee6", white: "#fff",
  orange: "var(--orange)", magenta: "var(--magenta)", violet: "var(--violet)", green: "var(--green)",
};

function mark(cols: Cols, { wrap = "", style = "" } = {}) {
  const [tl, tr, bl, br, c] = cols.map((k) => C[k] ?? k);
  const q = (id: string, col: string) =>
    `<g class="q${id}" clip-path="url(#c${id})"><use href="#mk" style="--a:${col};--b:${col}"/></g>`;
  const inner = q("TL", tl) + q("TR", tr) + q("BL", bl) + q("BR", br) +
    `<g clip-path="url(#cC)"><use href="#mk" style="--a:${c};--b:${c}"/></g>`;
  const body = wrap ? `<g class="${wrap}" style="transform-origin:500px 500px">${inner}</g>` : inner;
  return `<svg viewBox="240 240 520 520"${style ? ` style="${style}"` : ""}>${body}</svg>`;
}

const W: Cols = ["bone", "lime", "lime", "bone", "lime"];
const K: Cols = ["ink", "ink", "ink", "ink", "ink"];
const MULTI: Cols = ["magenta", "orange", "green", "violet", "ink"];
const W2: Cols = ["lime", "bone", "bone", "lime", "bone"];

const minis: Cols[] = [
  MULTI, K, ["orange", "orange", "orange", "orange", "ink"], ["white", "white", "white", "white", "violet"],
  ["lime", "ink", "ink", "lime", "ink"], MULTI, ["violet", "violet", "violet", "violet", "lime"], K,
  ["green", "orange", "magenta", "violet", "ink"],
];

const tiles: [string, string][] = [
  ["t1", mark(MULTI, { wrap: "spin" })],
  ["t2", mark(K)],
  ["t3", `<div class="col">${[W, W2, W, W2].map((c) => mark(c)).join("")}</div>`],
  ["t4", `<div class="grid">${minis.map((c, i) => mark(c, { style: `animation-delay:${i * 0.35}s` })).join("")}</div>`],
  ["t5", mark(["bone", "bone", "bone", "bone", "ink"])],
  ["t6", mark(W)],
  ["t7", mark(["ink", "lime", "lime", "ink", "lime"])],
  ["t8", mark(["bone", "bone", "bone", "bone", "lime"])],
  ["t9", [MULTI, K, ["orange", "lime", "violet", "magenta", "ink"] as Cols]
    .map((c, i) => mark(c, { style: `animation-delay:-${i * 3}s` })).join("")],
];

const defs = `<defs>
  <g id="mk">${markInner}</g>
  <clipPath id="cTL"><rect x="240" y="240" width="260" height="260"/></clipPath>
  <clipPath id="cTR"><rect x="500" y="240" width="260" height="260"/></clipPath>
  <clipPath id="cBL"><rect x="240" y="500" width="260" height="260"/></clipPath>
  <clipPath id="cBR"><rect x="500" y="500" width="260" height="260"/></clipPath>
  <clipPath id="cC"><circle cx="500" cy="500" r="165"/></clipPath>
</defs>`;

/** Shared SVG defs (the mark + quadrant clips). Render once per page before any mark. */
export function MarkDefs() {
  return <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: defs }} />;
}

export function Mosaic() {
  return (
    <>
      <MarkDefs />
      <div className="mosaic" aria-hidden="true">
        {tiles.map(([cls, html]) => (
          <div key={cls} className={`t ${cls}`} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>
    </>
  );
}

/** A single multicolor mascot, used as a small badge outside the mosaic (relies on the defs Mosaic renders). */
export function MarkBadge({ colors = MULTI, className = "markbadge" }: { colors?: Cols; className?: string }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: mark(colors, { wrap: "spin" }) }} />;
}
