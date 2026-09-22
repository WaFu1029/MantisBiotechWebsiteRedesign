import Image from "next/image";
import Link from "next/link";
import markBlue from "@/assets/mark-blue.svg";
import wordmark from "@/assets/wordmark-dark.png";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Vision", href: "/#vision" },
      { label: "Manifesto (PDF)", href: "/manifesto" },
      { label: "Brand Assets", href: "/brand-assets" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Apply", href: "/apply" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
];

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/MantisBiotech",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mantis-labratories/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z",
  },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="border-t border-neutral-200 pt-8">
        <div className="flex flex-wrap justify-between gap-x-12 gap-y-8">
          <div className="flex h-fit flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={markBlue}
                alt=""
                width={32}
                height={32}
                className="size-6"
              />
              <Image
                src={wordmark}
                alt="Mantis"
                className="h-[11px] w-auto"
              />
            </Link>

            <ul className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-neutral-500 transition-colors hover:text-brand"
                  >
                    <span className="sr-only">{social.label}</span>
                    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
                      <path d={social.path} fill="currentColor" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="flex gap-12 sm:gap-20">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h2 className="text-[13px] font-medium tracking-wide text-neutral-500 uppercase">
                  {column.heading}
                </h2>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-brand hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-10 flex flex-wrap items-center gap-x-1.5 text-[15px] text-neutral-600">
          <span>&copy; 2026</span>
          <span aria-hidden>&middot;</span>
          <span>We don&apos;t sell data.</span>
        </p>
      </div>
    </div>
  );
}
