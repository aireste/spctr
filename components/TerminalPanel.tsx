"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { tag: "BOOT", text: "SPCTR.EXE INITIALIZED",              color: "#AAFF00" },
  { tag: "SCAN", text: "LOADING TARGET PARAMETERS...",        color: "#00E5CC" },
  { tag: "OK  ", text: "ICP PROFILE LOADED — 847 CRITERIA",  color: "#AAFF00" },
  { tag: "RUN ", text: "MARKET SCAN IN PROGRESS...",          color: "#00E5CC" },
  { tag: "HIT ", text: "TARGET: SECTOR 7 — B2B SAAS",        color: "#FF5500" },
  { tag: "HIT ", text: "TARGET: SECTOR 12 — FINTECH",        color: "#FF5500" },
  { tag: "HIT ", text: "TARGET: SECTOR 3 — MED SPA",         color: "#FF5500" },
  { tag: "RUN ", text: "INTENT SIGNAL ANALYSIS...",           color: "#00E5CC" },
  { tag: "OK  ", text: "HIGH INTENT — CONFIDENCE 94%",       color: "#AAFF00" },
  { tag: "RUN ", text: "CONTACT VERIFICATION...",             color: "#00E5CC" },
  { tag: "OK  ", text: "EMAIL VALIDATED — DELIVERABILITY 98%", color: "#AAFF00" },
  { tag: "TX  ", text: "OUTREACH SEQUENCE INITIATED",         color: "#1A8FFF" },
  { tag: "TX  ", text: "MESSAGE DELIVERED — AWAITING RESPONSE", color: "#1A8FFF" },
  { tag: "HIT ", text: "RESPONSE RECEIVED — INTEREST CONFIRMED", color: "#FF5500" },
  { tag: "OK  ", text: "LEAD QUALIFIED — ROUTING TO PIPELINE", color: "#AAFF00" },
  { tag: "DONE", text: "MISSION COMPLETE ██████████ 100%",    color: "#AAFF00" },
];

const DELAY = 380;
const PAUSE = 2800;

export function TerminalPanel() {
  const [visible, setVisible] = useState<number[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runSequence = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setVisible([]);

    LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisible((prev) => [...prev, i]);
        if (i === LINES.length - 1) {
          const restart = setTimeout(runSequence, PAUSE);
          timeouts.current.push(restart);
        }
      }, i * DELAY);
      timeouts.current.push(t);
    });
  };

  useEffect(() => {
    runSequence();
    return () => timeouts.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: 380,
        background: "rgba(5,5,10,0.92)",
        border: "1px solid #1A1A28",
        fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          borderBottom: "1px solid #1A1A28",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(170,255,0,0.04)",
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#AAFF00" }}>
          {"// RECON.EXE — LIVE OUTPUT"}
        </span>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF1A1A", "#FF5500", "#AAFF00"].map((c) => (
            <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Output lines */}
      <div style={{ padding: "14px 16px", minHeight: 320 }}>
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              fontSize: 10,
              lineHeight: 2,
              opacity: visible.includes(i) ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            <span
              style={{
                color: line.color,
                flexShrink: 0,
                fontSize: 9,
                letterSpacing: 1,
                border: `1px solid ${line.color}44`,
                padding: "0 5px",
                lineHeight: 1.8,
              }}
            >
              {line.tag.trim()}
            </span>
            <span style={{ color: "#F2F2F8", letterSpacing: 0.5 }}>
              {line.text}
              {visible.includes(i) && i === Math.max(...visible) && i < LINES.length - 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 12,
                    background: "#AAFF00",
                    marginLeft: 4,
                    verticalAlign: "middle",
                    animation: "blink 1s step-start infinite",
                  }}
                />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          borderTop: "1px solid #1A1A28",
          padding: "8px 16px",
          display: "flex",
          justifyContent: "space-between",
          background: "rgba(170,255,0,0.03)",
        }}
      >
        <span style={{ fontSize: 9, color: "#AAFF00", letterSpacing: 2 }}>● LIVE</span>
        <span style={{ fontSize: 9, color: "#F2F2F8", letterSpacing: 1, opacity: 0.4 }}>
          SYS/RECON/v2.4.1
        </span>
      </div>
    </div>
  );
}
