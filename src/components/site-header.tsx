import Image from "next/image";
import Link from "next/link";
import markBlue from "@/assets/mark-blue.png";

const navLinks = [
  { label: "Vision", href: "/vision" },
  { label: "Open Roles", href: "/open-roles" },
  { label: "Manifesto", href: "/manifesto" },
];

export function SiteHeader() {
  return (
    <header className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
      <Link href="/" className="flex items-center gap-2.5 justify-self-start">
        <Image
          src={markBlue}
          alt=""
          width={32}
          height={32}
          className="size-7 sm:size-8"
        />
        <span className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
          Mantis
        </span>
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

      <Link
        href="/apply"
        className="col-start-3 inline-flex h-9 items-center justify-self-end rounded-[4px] bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-brand/90 sm:h-10 sm:px-5"
      >
        Apply
      </Link>
    </header>
  );
}
