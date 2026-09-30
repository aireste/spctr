import { LivingEye } from "./LivingEye";

/** Glint, the SPCTR mascot (the living eye), parked next to the contact form. */
export function Lookout({ line }: { line: string }) {
  return (
    <div className="lookout">
      <div className="lookout-tile"><LivingEye lively ink="var(--ink)" bg="var(--lime)" /></div>
      <p className="lookout-bubble">{line}</p>
    </div>
  );
}
