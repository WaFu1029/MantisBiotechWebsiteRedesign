import { ASCII_HUMAN } from "@/lib/ascii-human";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-brand px-6 pt-[10vh] pb-10 sm:px-12">
      <h1 className="relative max-w-5xl lg:max-w-[55%] text-[clamp(2.75rem,6.5vw,6.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-white">
        We simulate human beings.
      </h1>
      <pre
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[8%] hidden -translate-y-1/2 font-mono text-[length:min(1.1vh,0.85vw)] leading-none text-white/85 select-none lg:block"
      >
        {ASCII_HUMAN}
      </pre>
    </main>
  );
}
