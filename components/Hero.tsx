import { legalChanges, site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-paper">
      <div className="container-page grid gap-12 py-12 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <h1
            id="hero-heading"
            className="max-w-[16ch] font-sans text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-gown sm:text-6xl lg:text-7xl"
          >
            The law has moved on. Move with it.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-gown-soft sm:text-xl">
            For five years, Lawdemy has taught the practical side of law in {site.city}: the
            drafting, filing, advising and advocacy that law school leaves out. Short, current programmes you can
            take on your phone or laptop.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#enrol" className="btn-primary">
              Join the Academy
            </a>
            <a href="#book" className="btn-secondary">
              Book a free call
            </a>
          </div>
        </div>

        <aside
          aria-labelledby="changes-heading"
          className="rounded-panel bg-gown p-6 text-paper sm:p-8 lg:col-span-5"
        >
          <h2 id="changes-heading" className="font-sans text-lg font-semibold">
            Laws that changed in the last few years
          </h2>
          <p className="mt-1 font-serif text-base text-bib">
            If you qualified before them, your practice may be out of date.
          </p>
          <ul className="mt-5 divide-y divide-paper/10 border-t border-paper/10">
            {legalChanges.map((c) => (
              <li key={c.title} className="flex gap-5 py-4">
                <span className="w-14 shrink-0 font-sans text-2xl font-semibold tabular-nums text-ember-glow">
                  {c.year}
                </span>
                <div>
                  <p className="font-sans font-medium">{c.title}</p>
                  <p className="mt-0.5 font-serif text-[0.95rem] leading-snug text-bib">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="#programmes"
            className="mt-4 inline-block font-sans text-sm font-medium text-ember-glow underline underline-offset-4 hover:text-paper"
          >
            See which programme covers what you need
          </a>
        </aside>
      </div>
    </section>
  );
}
