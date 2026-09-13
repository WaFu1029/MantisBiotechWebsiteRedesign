import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-dvh flex-col bg-white px-4 pb-4 sm:px-8 sm:pb-8">
      <header className="flex h-14 shrink-0 items-center sm:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/mark-blue.png"
            alt=""
            width={32}
            height={32}
            className="size-7 sm:size-8"
          />
          <span
            className={`${jakarta.className} text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl`}
          >
            Mantis
          </span>
        </Link>
      </header>
      <div className="flex-1 bg-[#3763C8]" />
    </main>
  );
}
