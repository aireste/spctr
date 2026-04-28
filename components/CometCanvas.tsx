"use client";

import { useEffect, useRef } from "react";

interface Comet {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  length: number;
  opacity: number;
  width: number;
  color: string;
}

const COLORS = [
  "rgba(170,255,0",
  "rgba(255,255,255",
  "rgba(0,229,204",
];

export function CometCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const comets: Comet[] = [];

    const spawn = () => {
      // Random angle: shooting diagonally across the screen
      const angleDeg = 20 + Math.random() * 40; // 20–60 degrees below horizontal
      const angle = angleDeg * (Math.PI / 180);
      const speed = 20 + Math.random() * 16;

      // Spawn from top edge or left edge
      const fromLeft = Math.random() > 0.45;
      const x = fromLeft ? -60 : Math.random() * canvas.width * 0.6;
      const y = fromLeft ? Math.random() * canvas.height * 0.5 : -60;

      comets.push({
        x, y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        speed,
        length: 130 + Math.random() * 120,
        opacity: 1,
        width: 1.2 + Math.random() * 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    // First comet after a short delay so page has settled
    const firstTimer = setTimeout(spawn, 1200);

    // Recurring random spawns every 4–9 seconds
    let nextTimer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      nextTimer = setTimeout(() => {
        spawn();
        scheduleNext();
      }, 4000 + Math.random() * 5000);
    };
    scheduleNext();

    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        const mag = Math.hypot(c.dx, c.dy);
        const ux = c.dx / mag;
        const uy = c.dy / mag;

        // Tail: transparent at back, bright at head
        const tx = c.x - ux * c.length;
        const ty = c.y - uy * c.length;
        const grad = ctx.createLinearGradient(tx, ty, c.x, c.y);
        grad.addColorStop(0,   `${c.color},0)`);
        grad.addColorStop(0.6, `${c.color},${c.opacity * 0.35})`);
        grad.addColorStop(1,   `${c.color},${c.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = c.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head
        const headGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.width * 4);
        headGlow.addColorStop(0, `${c.color},${c.opacity})`);
        headGlow.addColorStop(1, `${c.color},0)`);
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.width * 4, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();

        // Advance
        c.x += c.dx;
        c.y += c.dy;

        // Fade out near exit
        const nearRight  = c.x > canvas.width  - 100;
        const nearBottom = c.y > canvas.height - 100;
        if (nearRight || nearBottom) c.opacity -= 0.05;

        // Cull
        if (c.x > canvas.width + 150 || c.y > canvas.height + 150 || c.opacity <= 0) {
          comets.splice(i, 1);
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(firstTimer);
      clearTimeout(nextTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
