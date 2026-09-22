import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "See how Mantis models human physiology and behavior.",
};

const fieldClass =
  "w-full rounded-[4px] border border-neutral-300 bg-white px-3 py-2.5 text-[15px] text-neutral-950 placeholder:text-neutral-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none";
const labelClass = "block text-[15px] font-medium text-neutral-950";
const helpClass = "mt-1.5 font-mono text-xs leading-relaxed text-neutral-500";

const COMPANY_TYPES = [
  "Prime Contractor",
  "Subcontractor",
  "Pharmaceutical",
  "Biotech",
  "Hospital or health system",
  "Athletic organization",
  "Research institution",
  "Government",
  "Other",
];

export default function DemoPage() {
  return (
    <main className="flex flex-1 flex-col bg-white pt-[8vh] pb-24">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
          See what we can do.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-neutral-700">
          Fill out the form and we will get back to you shortly.
        </p>

        <form className="mt-12 space-y-6">
          <div>
            <label htmlFor="work-email" className={labelClass}>
              Work Email
            </label>
            <input
              id="work-email"
              name="workEmail"
              type="email"
              required
              autoComplete="email"
              className={`mt-2 ${fieldClass}`}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className={labelClass}>
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                className={`mt-2 ${fieldClass}`}
              />
            </div>
            <div>
              <label htmlFor="last-name" className={labelClass}>
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                className={`mt-2 ${fieldClass}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="company-name" className={labelClass}>
              Company Name
            </label>
            <input
              id="company-name"
              name="companyName"
              type="text"
              required
              autoComplete="organization"
              className={`mt-2 ${fieldClass}`}
            />
          </div>

          <div>
            <label htmlFor="company-type" className={labelClass}>
              What type of Company are you?
            </label>
            <select
              id="company-type"
              name="companyType"
              required
              defaultValue="Prime Contractor"
              className={`mt-2 ${fieldClass}`}
            >
              {COMPANY_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="details" className={labelClass}>
              What would you like to see?
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              aria-describedby="details-help"
              className={`mt-2 ${fieldClass}`}
            />
            <p id="details-help" className={helpClass}>
              What you&apos;re working on, which decisions you&apos;re trying to
              forecast, anything we should know before we meet.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-[4px] bg-neutral-950 px-5 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Request a demo
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
