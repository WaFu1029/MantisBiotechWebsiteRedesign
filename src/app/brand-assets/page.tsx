import Image from "next/image";
import type { Metadata } from "next";
import { GradientStops, type GradientStop } from "@/components/gradient-stops";

export const metadata: Metadata = {
  title: "Brand Assets",
};

const WORDMARK = { width: 795, height: 192 };

// Sampled down the rendered swatch: brand blue at the top, then the three
// points where the sunset turns violet, rose, and amber.
const GRADIENT_STOPS: GradientStop[] = [
  { hex: "#3763C8", top: "8%" },
  { hex: "#906EB8", top: "68%" },
  { hex: "#C57C97", top: "82%" },
  { hex: "#E79272", top: "96%" },
];

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4"
    >
      <path d="M12 3v11" />
      <path d="m7.5 10 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

// A download control that appears on hover -- and on keyboard focus, so it is
// reachable without a pointer. Sits in a tile marked `group relative`.
function DownloadHover({
  href,
  fileLabel,
  tone,
}: {
  href: string;
  fileLabel: string;
  tone: "dark" | "light";
}) {
  return (
    <a
      href={href}
      download
      className={`absolute top-3 right-3 rounded-[4px] p-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        tone === "dark"
          ? "text-white outline-white hover:bg-white/15"
          : "text-neutral-700 outline-brand hover:bg-neutral-900/10"
      }`}
    >
      <DownloadIcon />
      <span className="sr-only">Download {fileLabel}</span>
    </a>
  );
}

// A glyph on its background, with the same hover download control.
function GlyphTile({
  src,
  alt,
  href,
  fileLabel,
  tone,
  className = "",
}: {
  src: string;
  alt: string;
  href: string;
  fileLabel: string;
  tone: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`group relative flex aspect-square items-center justify-center p-10 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="h-auto w-full max-w-[220px]"
      />
      <DownloadHover href={href} fileLabel={fileLabel} tone={tone} />
    </div>
  );
}

export default function BrandAssetsPage() {
  return (
    <main className="flex flex-1 flex-col bg-brand px-6 pt-10 pb-16 sm:px-12">
      <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
        Brand Assets
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Left column: the hero lockup, then its usage note. */}
        <div className="flex flex-col">
          <div className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden bg-brand p-10 lg:min-h-[640px]">
            {/* Same sunset rising into blue as the hero. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(to_top,rgba(255,158,96,0.92)_0%,rgba(255,140,120,0.8)_18%,rgba(238,120,158,0.62)_38%,rgba(168,118,214,0.34)_62%,rgba(120,120,230,0)_100%)]"
            />
            <GradientStops stops={GRADIENT_STOPS} />
          </div>

          <div className="flex min-h-[200px] flex-col justify-between gap-6 bg-white p-6">
            <div className="flex max-w-prose flex-col gap-4 text-[15px] leading-relaxed text-neutral-700">
              <p>
                The blue (#3763C8) can be used individually or with the three
                colors composing the &ldquo;sunset&rdquo; (#906EB8, #C57C97, and
                #E79272), but the sunset colors should never be split and used
                individually themselves.
              </p>
              <p>
                Mantis focuses on enlargening the forecast horizons of its
                models; these colors evoke the horizon at sunset.
              </p>
            </div>
            <span className="text-[13px] font-medium tracking-wide text-neutral-500 uppercase">
              Colors
            </span>
          </div>
        </div>

        {/* Right column: mark and wordmark, each shown on light and on brand. */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <GlyphTile
              src="/brand/mantis-mark-white.svg"
              alt="Mantis mark, white"
              href="/brand/mantis-mark-white.svg"
              fileLabel="the white mark as SVG"
              tone="dark"
            />
            <GlyphTile
              src="/brand/mantis-mark-glyph-blue.svg"
              alt="Mantis mark, brand blue"
              href="/brand/mantis-mark-glyph-blue.svg"
              fileLabel="the blue mark as SVG"
              tone="light"
              className="bg-white"
            />
          </div>

          <div className="group relative flex items-center justify-center px-8 py-12">
            <Image
              src="/brand/mantis-wordmark-white.png"
              alt="Mantis wordmark, white"
              {...WORDMARK}
              className="h-auto w-full max-w-[420px]"
            />
            <DownloadHover
              href="/brand/mantis-wordmark-white.png"
              fileLabel="the white wordmark as PNG"
              tone="dark"
            />
          </div>

          <div className="group relative flex items-center justify-center bg-white px-8 py-12">
            <Image
              src="/brand/mantis-wordmark-blue.png"
              alt="Mantis wordmark, brand blue"
              {...WORDMARK}
              className="h-auto w-full max-w-[420px]"
            />
            <DownloadHover
              href="/brand/mantis-wordmark-blue.png"
              fileLabel="the blue wordmark as PNG"
              tone="light"
            />
          </div>

          <div className="flex min-h-[200px] flex-col justify-between gap-6 bg-white p-6">
            <div className="flex max-w-prose flex-col gap-4 text-[15px] leading-relaxed text-neutral-700">
              <p>
                The logo and the wordmark can be displayed freely, including
                together.
              </p>
              <p>
                Take careful note of the notch in the &ldquo;i&rdquo; of
                &ldquo;Mantis.&rdquo; It is simple, but meaningful. Viewed from left to right, it symbolizes
                the convergence of broad, scattered observations into
                predictable patterns; viewed from top to bottom, it symbolizes
                the closing gap between prediction and reality.
              </p>
            </div>
            <span className="text-[13px] font-medium tracking-wide text-neutral-500 uppercase">
              Logo, Wordmark
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
