import Image from "next/image";
import Link from "next/link";
import markBlue from "@/assets/mark-blue.svg";
import wordmark from "@/assets/wordmark-dark.png";

const navLinks = [
  { label: "Vision", href: "/#vision" },
  { label: "Open Roles", href: "/open-roles" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Brand Assets", href: "/brand-assets" },
];

export function SiteHeader() {
  return (
    <header className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center sm:h-14">
      <Link href="/" className="flex items-center gap-2.5 justify-self-start">
        <Image
          src={markBlue}
          alt=""
          width={32}
          height={32}
          className="size-6 sm:size-7"
        />
        <Image
          src={wordmark}
          alt="Mantis"
          className="h-[13px] w-auto sm:h-[15px]"
        />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-10 md:flex lg:gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[15px] text-neutral-800 transition-colors hover:text-brand"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="col-start-3 flex items-center gap-2 justify-self-end sm:gap-3">
        <Link
          href="/demo"
          className="hidden h-8 items-center rounded-[4px] bg-neutral-900 px-4 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 sm:inline-flex sm:h-9 sm:px-5"
        >
          Book a demo
        </Link>
        <Link
          href="/apply"
          className="inline-flex h-8 items-center rounded-[4px] bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-brand/90 sm:h-9 sm:px-5"
        >
          Apply
        </Link>
      </div>
    </header>
  );
}
