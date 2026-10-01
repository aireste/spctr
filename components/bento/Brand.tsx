import { LETTER_PATHS, MARK_PATHS } from "./logo-paths";

/** The SPCTR letters only, drawn in currentColor. */
export function Letters({ className = "letters" }: { className?: string }) {
  return (
    <svg className={className} viewBox="312 332 484 106" role="img" aria-label="SPCTR">
      {LETTER_PATHS.map((d, i) => (
        <path key={i} fill="currentColor" d={d} />
      ))}
    </svg>
  );
}

/** Raw SVG markup of the mark, for building the mosaic tiles. */
export const markInner = MARK_PATHS.map((p) => `<path class="${p.cls}" d="${p.d}"/>`).join("");

/** Eye geometry inside the mark (viewBox 240 240 520 520): eyeball disc + pupil.
 *  The logo's pupil is a hole, so anything that moves the pupil redraws it with these. */
export const EYE = { x: 499, y: 491, r: 141, px: 462, py: 473, pr: 51 };
