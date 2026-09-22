import Link from "next/link";
import { AsciiSkull } from "@/components/ascii-skull";
import { BackedBy } from "@/components/backed-by";
import { VisionSection } from "@/components/vision-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex min-h-[calc(100dvh-3rem)] flex-col overflow-hidden bg-brand px-6 pt-[10vh] pb-10 sm:min-h-[calc(100dvh-3.5rem)] sm:px-12">
        <BackedBy className="relative z-10 mb-3 sm:mb-4" />
        <h1 className="relative z-10 text-[clamp(1.9rem,7.6vw,8rem)] leading-[1.02] font-medium tracking-[-0.035em] text-white">
          <span className="block whitespace-nowrap">Predictive models of</span>
          <span className="block whitespace-nowrap">human beings</span>
        </h1>
        <p className="relative z-10 mt-6 max-w-xl text-[17px] leading-relaxed text-white/80 sm:mt-8 sm:text-xl lg:max-w-3xl">
          Mantis builds living digital twins of human physiology and behavior,
          forecast to the horizon where a decision still has to be made.
        </p>
        <Link
          href="/manifesto"
          className="group relative z-10 mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-[4px] bg-white px-5 text-[15px] font-medium text-brand transition-colors hover:bg-white/90 sm:mt-10 sm:h-12 sm:px-6 sm:text-base"
        >
          Read our manifesto
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </Link>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.16)_0.5px,transparent_0.5px)] [background-position:right_bottom] [background-size:5.4px_9px]"
        >
          <AsciiSkull className="absolute hidden font-mono text-white/60 select-none md:block" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(to_top,rgba(255,158,96,0.92)_0%,rgba(255,140,120,0.8)_18%,rgba(238,120,158,0.62)_38%,rgba(168,118,214,0.34)_62%,rgba(120,120,230,0)_100%)]"
        />
      </section>

      <VisionSection />
    </main>
  );
}
