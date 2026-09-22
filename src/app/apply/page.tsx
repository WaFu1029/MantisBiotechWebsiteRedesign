import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for the Medical Sales Representative role at Mantis.",
};

const fieldClass =
  "w-full rounded-[4px] border border-neutral-300 bg-white px-3 py-2.5 text-[15px] text-neutral-950 placeholder:text-neutral-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none";
const labelClass = "block text-[15px] font-medium text-neutral-950";
const helpClass = "mt-1.5 font-mono text-xs leading-relaxed text-neutral-500";
const sectionLabelClass =
  "border-b border-neutral-200 pb-2 font-mono text-xs tracking-widest text-neutral-500 uppercase";

export default function ApplyPage() {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 pt-[8vh] pb-24 sm:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
          Show us the numbers.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-neutral-700">
          What you&apos;ve closed is more important to us than where
          you&apos;ve worked. Have your figures ready and be specific.
          Everything here is required.
        </p>

        <p className="mt-5 text-[17px] leading-relaxed text-neutral-700">
          Questions before you apply? Write to{" "}
          <a
            href="mailto:georgia@mantisbiotech.com"
            className="text-brand underline hover:no-underline"
          >
            georgia@mantisbiotech.com
          </a>
          .
        </p>

        <section className="mt-10 rounded-[4px] border border-[#FB651E] bg-[#FB651E]/5 p-5 sm:p-6">
          <h2 className="text-[15px] font-medium text-[#FB651E]">
            Required: one to two minutes of video
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-800">
            Record up to two minutes explaining exactly why you want to work for
            Mantis. You&apos;re applying for a sales job, so treat it as one:
            this is the closest thing to a live pitch we&apos;ll see before we
            meet you.
          </p>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-neutral-700">
            <li className="flex gap-2.5">
              <span aria-hidden className="text-[#FB651E]">
                &bull;
              </span>
              <span>
                <strong className="font-medium text-neutral-950">
                  Two minutes, maximum.
                </strong>{" "}
                One is fine. We stop watching at two.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span aria-hidden className="text-[#FB651E]">
                &bull;
              </span>
              <span>
                <strong className="font-medium text-neutral-950">
                  Unpolished is fine.
                </strong>{" "}
                A phone in one take beats anything edited. We&apos;re listening
                to how you talk, not watching a production.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span aria-hidden className="text-[#FB651E]">
                &bull;
              </span>
              <span>
                <strong className="font-medium text-neutral-950">
                  Paste a link, don&apos;t attach a file.
                </strong>{" "}
                <a
                  href="https://www.loom.com"
                  className="text-[#FB651E] underline hover:no-underline"
                >
                  Loom
                </a>{" "}
                is fastest — record in the browser, copy the link. Unlisted
                YouTube, Google Drive, and Vimeo all work.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span aria-hidden className="text-[#FB651E]">
                &bull;
              </span>
              <span>
                <strong className="font-medium text-neutral-950">
                  Check the sharing setting
                </strong>{" "}
                before you send. If we can&apos;t open it, we can&apos;t
                consider it.
              </span>
            </li>
          </ul>
        </section>

        <form className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={`mt-2 ${fieldClass}`}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`mt-2 ${fieldClass}`}
              />
            </div>

            <div>
              <label htmlFor="title" className={labelClass}>
                Which title are you applying for?
              </label>
              <select
                id="title"
                name="title"
                required
                defaultValue="Medical Sales Representative"
                className={`mt-2 ${fieldClass}`}
              >
                <option>Medical Sales Representative</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className={labelClass}>
                Where are you based?
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="e.g. Brooklyn, NY"
                aria-describedby="location-help"
                className={`mt-2 ${fieldClass}`}
              />
              <p id="location-help" className={helpClass}>
                The role is hybrid in New York — you do need to be in the city.
              </p>
            </div>
          </div>

          <h2 className={`mt-12 ${sectionLabelClass}`}>Track record</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="years-total" className={labelClass}>
                Years selling — total
              </label>
              <input
                id="years-total"
                name="yearsSellingTotal"
                type="number"
                min="0"
                step="1"
                required
                className={`mt-2 ${fieldClass}`}
              />
            </div>
            <div>
              <label htmlFor="years-medical" className={labelClass}>
                Years in medical sales
              </label>
              <input
                id="years-medical"
                name="yearsMedicalSales"
                type="number"
                min="2"
                step="1"
                required
                aria-describedby="years-medical-help"
                className={`mt-2 ${fieldClass}`}
              />
              <p id="years-medical-help" className={helpClass}>
                Two years minimum for this role.
              </p>
            </div>

            <div>
              <label htmlFor="volume" className={labelClass}>
                Total volume you&apos;ve sold
              </label>
              <input
                id="volume"
                name="totalVolume"
                type="text"
                required
                placeholder="e.g. $4.2M across 3 years"
                aria-describedby="volume-help"
                className={`mt-2 ${fieldClass}`}
              />
              <p id="volume-help" className={helpClass}>
                Career total in dollars. An honest estimate is fine.
              </p>
            </div>
            <div>
              <label htmlFor="buyers" className={labelClass}>
                How many different buyers?
              </label>
              <input
                id="buyers"
                name="buyerCount"
                type="number"
                min="0"
                step="1"
                required
                aria-describedby="buyers-help"
                className={`mt-2 ${fieldClass}`}
              />
              <p id="buyers-help" className={helpClass}>
                Distinct people or accounts you&apos;ve closed, not total deals.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="sold" className={labelClass}>
              What have you sold?
            </label>
            <textarea
              id="sold"
              name="whatYouveSold"
              rows={6}
              required
              aria-describedby="sold-help"
              className={`mt-2 ${fieldClass}`}
            />
            <p id="sold-help" className={helpClass}>
              Product, buyer, deal size, cycle length. Name the hardest sale you
              ever closed and what made it hard.
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="education" className={labelClass}>
              Education
            </label>
            <input
              id="education"
              name="education"
              type="text"
              required
              placeholder="e.g. BS Computer Science, NYU, 2019"
              className={`mt-2 ${fieldClass}`}
            />
          </div>

          <h2 className={`mt-12 ${sectionLabelClass}`}>Résumé and video</h2>

          <div className="mt-6">
            <label htmlFor="resume" className={labelClass}>
              Résumé
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              aria-describedby="resume-help"
              className={`mt-2 ${fieldClass} file:mr-3 file:rounded-[4px] file:border file:border-neutral-300 file:bg-neutral-50 file:px-3 file:py-1 file:font-mono file:text-xs file:text-neutral-700`}
            />
            <p id="resume-help" className={helpClass}>
              PDF or Word, up to 3 MB.
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="video" className={labelClass}>
              Link to your video
            </label>
            <input
              id="video"
              name="videoUrl"
              type="url"
              required
              placeholder="https://loom.com/share/..."
              aria-describedby="video-help"
              className={`mt-2 ${fieldClass}`}
            />
            <p id="video-help" className={helpClass}>
              One to two minutes. Make sure anyone with the link can view it.
            </p>
          </div>

          {/* Honeypot: real applicants never see this, bots fill it in. */}
          <div aria-hidden className="hidden">
            <label htmlFor="company-website">Company website</label>
            <input
              id="company-website"
              name="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-6">
            <div className="flex gap-3">
              <input
                id="ad-measurement"
                name="adMeasurementConsent"
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-brand"
              />
              <label
                htmlFor="ad-measurement"
                className="text-[15px] leading-relaxed text-neutral-700"
              >
                Optional — you may share a hashed, non-reversible form of my
                email address with the advertising platforms you use to measure
                recruiting campaigns.
              </label>
            </div>
            <p className={`${helpClass} ml-7`}>
              Leaving this unchecked has no effect on your application and we
              will never know which you chose while reading it.
            </p>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-[4px] bg-neutral-950 px-5 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Send application
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
