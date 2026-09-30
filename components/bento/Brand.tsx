import { LETTER_PATHS, MARK_PATHS } from "./logo-paths";

/** The SPCTR letters only, drawn in currentColor. */
export function Letters({ className = "letters" }: { className?: string }) {
  return (
    <svg className={className} viewBox="322 334 470 101" role="img" aria-label="SPCTR">
      {LETTER_PATHS.map((d, i) => (
        <path key={i} fill="currentColor" d={d} />
      ))}
    </svg>
  );
}

/** Raw SVG markup of the mark, for building the mosaic tiles. */
export const markInner = MARK_PATHS.map((p) => `<path class="${p.cls}" d="${p.d}"/>`).join("");
