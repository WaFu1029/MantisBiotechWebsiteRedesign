"use client";

import { useEffect, useRef, useState } from "react";

export type GradientStop = {
  hex: string;
  /** Distance from the top of the swatch, as a CSS length or percentage. */
  top: string;
};

// The hex labels down the gradient swatch. Each one copies itself on click and
// confirms in place, so the label doubles as the control.
export function GradientStops({ stops }: { stops: GradientStop[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      return;
    }
    setCopied(hex);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1400);
  }

  return (
    <>
      {stops.map((stop) => (
        <button
          key={stop.hex}
          type="button"
          onClick={() => copy(stop.hex)}
          style={{ top: stop.top }}
          className="absolute right-4 z-10 -translate-y-1/2 rounded-[4px] px-2 py-1 text-[13px] font-medium tracking-wide text-white/90 transition-colors hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
        >
          <span aria-hidden>{copied === stop.hex ? "Copied" : stop.hex}</span>
          <span className="sr-only">Copy {stop.hex}</span>
        </button>
      ))}
    </>
  );
}
