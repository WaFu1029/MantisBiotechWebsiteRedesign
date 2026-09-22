import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Mantis is building the infrastructure layer for the world’s most accurate digital twins of human beings.",
};

const CONTENTS = [
  { id: "observation", label: "The observation" },
  { id: "theory", label: "The theory" },
  { id: "why-nobody", label: "Why nobody has built it" },
  { id: "what-mantis-is", label: "What Mantis is" },
  { id: "healthcare-first", label: "Why healthcare first" },
  { id: "horizon", label: "The horizon" },
];

const APPENDIX_CONTENTS = [
  { id: "regimes", label: "A. The three regimes of human behavior" },
  { id: "worked-example", label: "B. A worked example of the actionable window" },
  { id: "evidence", label: "C. Empirical evidence" },
  { id: "sources", label: "Sources" },
];

const headingClass =
  "scroll-mt-24 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl";
const bodyClass = "text-[17px] leading-relaxed text-neutral-700";
const leadInClass = "font-medium text-neutral-950";
const labelClass =
  "text-xs font-medium tracking-widest text-neutral-500 uppercase";

// Formulae sit in the mono face so the Greek and the exponents stay legible
// against the body text.
function Formula({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.92em] text-neutral-950">{children}</span>
  );
}

function Journal({ children }: { children: React.ReactNode }) {
  return <em className="not-italic text-neutral-950">{children}</em>;
}

export default function ManifestoPage() {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 pt-[8vh] pb-24 sm:px-12">
      <article className="mx-auto w-full max-w-3xl">
        <p className={labelClass}>Mantis Biotech — July 2026</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-7xl">
          Manifesto
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-neutral-950 sm:text-2xl">
          Mantis is building the infrastructure layer for the world’s most
          accurate digital twins of human beings.
        </p>

        <nav
          aria-label="Contents"
          className="mt-12 border-y border-neutral-200 py-6"
        >
          <p className={labelClass}>Contents</p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {[...CONTENTS, ...APPENDIX_CONTENTS].map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="text-[15px] text-brand underline-offset-4 hover:underline"
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="mt-14">
          <h2 id="observation" className={headingClass}>
            The observation
          </h2>
          <p className={`mt-5 ${bodyClass}`}>
            The average American now spends roughly 40% of their waking life
            using a computer. Compounded over an adult lifetime, that is nearly
            two decades of continuous, recorded interaction with machines. By
            2025, the average connected person will generate nearly 5,000
            discrete digital interactions per day, and humanity as a whole will
            produce around 400 million terabytes of new data every 24 hours.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            For the first time in history, a person’s behavior is being
            continuously and passively documented at high resolution. Every one
            of those interactions is a measurement of a person’s state. When fed
            into the right models, measurements of the state become forecasts of
            the trajectory — a working simulation of what a unique individual
            will do next. Mantis intends to build those models.
          </p>
        </section>

        <section className="mt-14">
          <h2 id="theory" className={headingClass}>
            The theory
          </h2>
          <p className={`mt-5 ${bodyClass}`}>
            Human behavior is difficult to predict on a fully encompassing level
            because it is considered a chaotic system. A chaotic system is one
            where two nearly-identical starting states pull apart over time: an
            initial uncertainty <Formula>δ₀</Formula> grows roughly as{" "}
            <Formula>δ(t) = δ₀·e^(λt)</Formula>, where <Formula>λ</Formula> is
            the Lyapunov exponent. The larger <Formula>λ</Formula> is, the
            faster small errors blow up. Its reciprocal,{" "}
            <Formula>1/λ</Formula>, is the Lyapunov time: the horizon past which
            any forecast decays into noise no better than a baseline guess.
            Earth’s atmosphere has a Lyapunov time of roughly one to two weeks,
            which is precisely why a weather forecast is useless past that
            window.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            The core theory of the company is that the right algorithms for
            processing human behavioral data produce Lyapunov times long enough
            to yield meaningful, valuable predictions. Raw behavior is chaotic;
            the correct coarse-grainings of it are not. Currently we separate
            human behavior into three regimes:
          </p>
          <ol className={`mt-5 space-y-3 ${bodyClass}`}>
            <li className="flex gap-3">
              <span aria-hidden className="font-mono text-sm text-neutral-400">
                1
              </span>
              <span>
                <strong className={leadInClass}>Stable aggregates</strong> —
                trends, rates, and baselines that average over the chaos beneath
                them.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="font-mono text-sm text-neutral-400">
                2
              </span>
              <span>
                <strong className={leadInClass}>Stable routines</strong> —
                habit- and constraint-anchored patterns.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="font-mono text-sm text-neutral-400">
                3
              </span>
              <span>
                <strong className={leadInClass}>Micro-chaos</strong> — the thin
                sliver of genuine unpredictability that no one can forecast and
                no diagnostic depends on.
              </span>
            </li>
          </ol>
          <p className={`mt-5 ${bodyClass}`}>
            The questions worth answering live almost entirely in the first two
            regimes. Our moat is the ability to discover and define these
            algorithms: identifying which coarse-grained features of a person’s
            raw, chaotic data are stable, and forecasting them to the exact
            horizon at which a decision still has to be made. The full regime
            breakdown, a worked numerical example, and the peer-reviewed
            evidence quantifying each regime are in the{" "}
            <a
              href="#regimes"
              className="text-brand underline-offset-4 hover:underline"
            >
              Appendix
            </a>
            .
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            The same statistical regularities that let markets clear, insurers
            price risk, and epidemiologists model outbreaks in aggregate persist
            at the level of the single person’s own aggregates.
          </p>
        </section>

        <section className="mt-14">
          <h2 id="why-nobody" className={headingClass}>
            Why nobody has built it
          </h2>
          <p className={`mt-5 ${bodyClass}`}>
            Not for lack of data or ML talent. Massive incumbents like Google,
            Apple, and Meta each hold a deep slice of this record and employ the
            best machine learning teams on earth. Structural barriers stop them:
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>Silos.</strong> Each company sees
            only the behavior of its own products. A digital twin requires the
            integration of a person’s data across devices, platforms, and
            physiological systems. No incumbent can acquire its competitors’
            slice.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>Incentive misalignment.</strong>{" "}
            Every incumbent that holds this data monetizes it through a
            specific, narrow product: Google sells search and ads, Apple sells
            hardware, Meta sells attention. A holistic predictive model of the
            individual runs orthogonal to these direct incentives. Building it
            would mean diverting the crown-jewel data asset away from the
            justification for the company’s valuation, toward a product with
            enormous reputational exposure. No public-company executive gets
            rewarded for that trade. The model that would serve the person
            rather than the platform sits permanently outside every incumbent’s
            mandate.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            The opportunity isn’t too big for incumbents. It’s structurally
            incompatible with any company whose business is a single downstream
            use of the data.
          </p>
        </section>

        <section className="mt-14">
          <h2 id="what-mantis-is" className={headingClass}>
            What Mantis is
          </h2>
          <p className={`mt-5 ${bodyClass}`}>
            Mantis is the neutral infrastructure layer for behavioral modeling.
            It plays the same structural role OAuth plays for identity, Plaid
            plays for banking, and Stripe plays for payments: a broker that
            succeeds precisely because it doesn’t compete with either side. That
            neutrality serves as a strong moat, because it aligns our incentives
            with both the individual and the company.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            As a result, Mantis is also data-agnostic: our pipelines ingest and
            normalize any stream a person grants us (device telemetry, wearable
            physiology, digital activity, clinical records) and our models turn
            that unified record into a living, predictive twin of that
            individual’s high-inertia cognitive and physical behavior. Companies
            then request scoped, revocable access to predictions from that twin,
            the way an app requests scoped access through OAuth.
          </p>
        </section>

        <section className="mt-14">
          <h2 id="healthcare-first" className={headingClass}>
            Why healthcare first
          </h2>
          <p className={`mt-5 ${bodyClass}`}>
            We begin in medicine because it is where the value of
            individual-level prediction is highest, the permission to hold
            sensitive data is most clearly defined, and the demand is proven.
            Healthcare also imposes the strictest bar for privacy, validation,
            and accountability, so it’s a fun place to get started.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            On a more personal note, there is a 0% chance that I, as a founder,
            will ever do anything with my life other than try to improve the
            human experience. If you want to figure out a better way to predict
            purchasing behavior or advertise to consumers, go bark up another
            tree.
          </p>
        </section>

        <section className="mt-14">
          <h2 id="horizon" className={headingClass}>
            The horizon
          </h2>
          <p className={`mt-5 ${bodyClass}`}>
            Every consequential system humans build eventually gets a digital
            twin. The last and most valuable system without one is the human
            being. Mantis is that layer. We allow computers to understand and
            predict individual human behavior accurately, at the horizons that
            matter, in the service of the person being predicted.
          </p>
        </section>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <p className={labelClass}>Appendix</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Supporting theory and evidence
          </h2>
        </div>

        <section className="mt-12">
          <h3 id="regimes" className={headingClass}>
            A. The three regimes of human behavior
          </h3>
          <p className={`mt-5 ${bodyClass}`}>
            Human behavior is chaotic at the micro level while being remarkably
            stable at the level that matters for prediction. This is the same
            principle that lets thermodynamics work despite the chaos of
            individual molecules, and lets climate be forecast for decades while
            weather dies at two weeks: the trajectory of a single particle is
            unforecastable, but the temperature of the gas is rock-solid. Chaos
            at the bottom averages into stability at the top. Behavior separates
            accordingly:
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>
              Stable aggregates — the target.
            </strong>{" "}
            The coarse-grained statistics of a person’s behavior: their weekly
            average resting heart rate and how it’s trending, their typical
            sleep architecture, the rate at which they miss medications, the
            slow drift of their cognitive baseline over months. These are the
            sums, means, and trends over many underlying events — and precisely
            because they average over the chaos beneath them, they have long
            Lyapunov times and very high predictability. This is where
            diagnostics live. To flag an infection, detect cognitive decline, or
            forecast decompensation, you do not need to know what a person will
            do at 3:47 p.m. Tuesday. You need the trend, and the trend is
            stable.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>
              Stable routines — also reachable.
            </strong>{" "}
            Coarse individual behaviors anchored by habit and constraint: where
            you sleep, your commute, your spending categories. This is the
            regime the <Journal>Science</Journal> mobility work measured,
            topping out around 93% predictability.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>
              Micro-chaos — the sliver beyond today’s models.
            </strong>{" "}
            The exact word you’ll type next, one specific impulse purchase, a
            single momentary mood spike. Lyapunov times of minutes; genuinely
            unforecastable with current methods. But note what this region
            actually contains: individual, instantaneous, one-off events —
            almost none of which are what a diagnostic or a care decision
            depends on. The unpredictable part of a human being is real, but for
            the questions worth asking, it is a thin and largely irrelevant
            sliver. The signal we want survives the averaging; the noise we
            can’t yet predict washes out in it.
          </p>
        </section>

        <section className="mt-14">
          <h3 id="worked-example" className={headingClass}>
            B. A worked example of the actionable window
          </h3>
          <p className={`mt-5 ${bodyClass}`}>
            Suppose an individual’s day-to-day resting heart rate is noisy and
            effectively unpredictable at the single-day level, but its 7-day
            rolling average drifts slowly. Start from a 10% error on that
            average with an uncertainty that doubles roughly weekly, and the
            forecast stays under 50% error until <Formula>2^(t/7)</Formula>{" "}
            crosses 5 — about 16 days. That is a two-week actionable window on
            the aggregate, extracted from data that looks like noise if you
            stare at any single day of it. The barrier isn’t the phenomenon —
            it’s knowing which function of the data to model, and at what
            horizon.
          </p>
        </section>

        <section className="mt-14">
          <h3 id="evidence" className={headingClass}>
            C. Empirical evidence
          </h3>
          <p className={`mt-5 ${bodyClass}`}>
            The theoretical ceiling on human predictability has been quantified,
            repeatedly, in the peer-reviewed record.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>Movement.</strong> In a landmark
            2010 <Journal>Science</Journal> study, Song, Qu, Blumm, and Barabási
            analyzed the anonymized mobility trajectories of millions of
            mobile-phone users and found a 93% theoretical upper bound on the
            predictability of an individual’s location — and, strikingly, that
            this figure barely varied across people, independent of how far they
            routinely traveled. The intuition that frequent travelers are less
            predictable turned out to be wrong; nearly everyone is about equally
            forecastable. Human movement, one of the most basic behavioral
            signals, is roughly nine-tenths determined.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>
              Personality and preference.
            </strong>{" "}
            In a 2013 <Journal>PNAS</Journal> study, Kosinski, Stillwell, and
            Graepel showed that ordinary Facebook Likes — nothing more — could
            accurately predict sexual orientation, ethnicity, religious and
            political views, intelligence, personality, substance use, and even
            whether a person’s parents had separated. A 2015 follow-up in{" "}
            <Journal>PNAS</Journal> went further: a model using a person’s Likes
            judged their personality more accurately than their coworkers,
            friends, roommates, and family, and with enough data (around 300
            Likes) rivaled the accuracy of their own spouse. Machines already
            read us better than the people closest to us do.
          </p>
          <p className={`mt-5 ${bodyClass}`}>
            <strong className={leadInClass}>Physiology.</strong> A single
            consumer smartwatch takes on the order of 250,000 physiological
            measurements per day, and that stream carries early warning of
            illness. In a 2020{" "}
            <Journal>Nature Biomedical Engineering</Journal> study from Snyder’s
            lab at Stanford, 81% of COVID-19 cases showed detectable
            physiological deviations — in resting heart rate, sleep, and
            activity — at or before symptom onset, some as much as nine days
            early. The signal that you are getting sick exists in your data
            before it exists in your awareness.
          </p>
        </section>

        <section className="mt-14">
          <h3 id="sources" className={headingClass}>
            Sources
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-neutral-600">
            <li>
              U.S. average daily screen time ≈ 7 hours (~40% of waking hours):
              DataReportal / Statista (2025–2026)
            </li>
            <li>
              ~4,909 digital interactions per person per day by 2025: IDC Data
              Age projection
            </li>
            <li>
              ~402.7 million TB of new data created daily worldwide (~147–180
              ZB/year): IDC / Statista (2024–2025)
            </li>
            <li>
              Average U.S. broadband household ≈ 641 GB/month: OpenVault
              Broadband Insights
            </li>
            <li>
              93% theoretical upper bound on individual mobility predictability:
              Song, Qu, Blumm &amp; Barabási, “Limits of Predictability in Human
              Mobility,” <Journal>Science</Journal> 327, 1018–1021 (2010)
            </li>
            <li>
              Facebook Likes predicting sensitive traits: Kosinski, Stillwell
              &amp; Graepel, “Private traits and attributes are predictable from
              digital records of human behavior,” <Journal>PNAS</Journal> 110,
              5802–5805 (2013)
            </li>
            <li>
              Computer models out-judging friends and family on personality:
              Youyou, Kosinski &amp; Stillwell, “Computer-based personality
              judgments are more accurate than those made by humans,”{" "}
              <Journal>PNAS</Journal> (2015)
            </li>
            <li>
              Smartwatch presymptomatic illness detection: Mishra et al. (Snyder
              Lab, Stanford), “Pre-symptomatic detection of COVID-19 from
              smartwatch data,” <Journal>Nature Biomedical Engineering</Journal>{" "}
              (2020)
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
