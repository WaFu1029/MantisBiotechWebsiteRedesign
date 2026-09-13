import { HumanParticles } from "@/components/human-particles";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-brand px-6 pt-[10vh] pb-10 sm:px-12">
      <h1 className="relative max-w-5xl text-[clamp(2.75rem,6.5vw,6.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-white lg:max-w-[55%]">
        We simulate human beings.
      </h1>
      <HumanParticles className="pointer-events-none absolute top-1/2 right-[8%] hidden aspect-[1/2] h-[82%] -translate-y-1/2 lg:block" />
    </main>
  );
}
