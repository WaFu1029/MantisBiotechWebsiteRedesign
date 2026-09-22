"use client";

import { useEffect, useRef } from "react";
import {
  CURVE_AGGREGATE,
  CURVE_CHAOS,
  CURVE_ROUTINE,
  CURVE_STEP,
} from "@/lib/vision-curves";

// Viewport into the trace, in path units; the traces themselves are 3000 wide.
const WINDOW = 1000;
const TRAVEL = 2000;
// Scroll distance the section holds for, as a multiple of the viewport.
const HOLD = 6;
// Where each morph happens within the pinned scroll. Outside these ranges the
// trace sits still, so every phase gets read before it changes.
const MORPH_ONE = [0.24, 0.38];
const MORPH_TWO = [0.62, 0.76];

const EDGE = "rgba(10,10,10,0.16)";
// The tiled background draws a line at the start of every cell, which gives
// the top and left edges. A border on the other two sides completes the frame
// -- tiling alone would either double an edge or leave one open.
const GRID = [
  "bg-[linear-gradient(to_right,rgba(10,10,10,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.07)_1px,transparent_1px),linear-gradient(to_right,rgba(10,10,10,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.16)_1px,transparent_1px)]",
  "[background-size:calc(100%/60)_calc(100%/30),calc(100%/60)_calc(100%/30),calc(100%/12)_calc(100%/6),calc(100%/12)_calc(100%/6)]",
  "border-r border-b",
].join(" ");

// Flat, then a smooth transition, then flat again.
function ramp(progress: number, [from, to]: number[]) {
  const t = Math.min(1, Math.max(0, (progress - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

// Aggregate -> routine -> chaos. The second blend runs on the result of the
// first, so each phase holds before the next one takes over.
function buildPath(progress: number) {
  const toRoutine = ramp(progress, MORPH_ONE);
  const toChaos = ramp(progress, MORPH_TWO);
  let d = "";
  for (let i = 0; i < CURVE_AGGREGATE.length; i++) {
    const settled =
      CURVE_AGGREGATE[i] + (CURVE_ROUTINE[i] - CURVE_AGGREGATE[i]) * toRoutine;
    const y = settled + (CURVE_CHAOS[i] - settled) * toChaos;
    d += `${i === 0 ? "M" : "L"}${(i * CURVE_STEP).toFixed(0)} ${y.toFixed(1)}`;
    if (i < CURVE_AGGREGATE.length - 1) d += " ";
  }
  return d;
}

const INITIAL_PATH = buildPath(0);

export function VisionSection() {
  const holderRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const holder = holderRef.current;
    const path = pathRef.current;
    const group = groupRef.current;
    if (!holder || !path || !group) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let queued = false;

    const apply = () => {
      queued = false;
      const rect = holder.getBoundingClientRect();
      // Distance the section stays pinned for.
      const span = rect.height - window.innerHeight;
      const progress =
        span <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / span));

      path.setAttribute("d", buildPath(progress));
      group.setAttribute("transform", `translate(${-progress * TRAVEL} 0)`);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="vision"
      ref={holderRef}
      className="relative scroll-mt-0"
      style={{ height: `${HOLD * 100}vh` }}
    >
      {/* Pinned for the length of the holder above, so the trace changes in
          place while the page scrolls past it. */}
      <div className="sticky top-0 flex h-dvh flex-col px-6 py-20 sm:px-12 sm:py-28">
        <h2 className="max-w-4xl text-2xl leading-snug tracking-tight text-balance text-neutral-950 sm:text-4xl">
          Raw behavior is chaotic, but it&rsquo;s not when you zoom out.
        </h2>

        <div className="mt-8 grid flex-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div
            className={`flex min-h-64 items-center overflow-hidden bg-white ${GRID}`}
            style={{ borderColor: EDGE }}
          >
            <svg
              viewBox={`0 0 ${WINDOW} 200`}
              preserveAspectRatio="none"
              aria-hidden
              className="h-28 w-full text-neutral-900 sm:h-36"
            >
              <g ref={groupRef}>
                <path
                  ref={pathRef}
                  d={INITIAL_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </svg>
          </div>
          <div className="min-h-64 border border-neutral-200 bg-neutral-50" />
        </div>
      </div>
    </section>
  );
}
