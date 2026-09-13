"use client";

import { useEffect, useRef } from "react";
import { humanSdf } from "@/lib/human-shape";

type Dot = {
  homeX: number;
  homeY: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  speedX: number;
  speedY: number;
  phaseX: number;
  phaseY: number;
};

const DOT_COUNT = 1500;
// Canvas width relative to its height; leaves room for dots to drift.
const ASPECT = 0.5;

// Seeded PRNG so the figure looks the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createDots() {
  const rand = mulberry32(7);
  const dots: Dot[] = [];
  while (dots.length < DOT_COUNT) {
    const x = (rand() - 0.5) * ASPECT;
    const y = rand();
    const d = humanSdf(x, y);
    // Keep points inside the body, plus a sparse fuzzy halo around it.
    if (d > 0.02 || (d > 0 && rand() > 0.15)) continue;
    const depth = Math.min(1, Math.max(0, -d / 0.04));
    dots.push({
      homeX: x,
      homeY: y,
      radius: 0.6 + rand() * 0.9,
      alpha: (d > 0 ? 0.3 : 0.55 + 0.45 * depth) * (0.7 + 0.3 * rand()),
      driftX: 0.003 + rand() * 0.009,
      driftY: 0.003 + rand() * 0.009,
      speedX: 0.3 + rand() * 0.9,
      speedY: 0.3 + rand() * 0.9,
      phaseX: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
    });
  }
  return dots;
}

export function HumanParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dots = createDots();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = (time: number) => {
      if (height === 0) return;
      const t = time / 1000;
      const scale = height / 500;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fff";
      for (const dot of dots) {
        const x = dot.homeX + Math.cos(t * dot.speedX + dot.phaseX) * dot.driftX;
        const y = dot.homeY + Math.sin(t * dot.speedY + dot.phaseY) * dot.driftY;
        ctx.globalAlpha = dot.alpha;
        ctx.beginPath();
        ctx.arc(width / 2 + x * height, y * height, dot.radius * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    if (!reduceMotion) frame = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
