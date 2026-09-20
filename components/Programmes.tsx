import { formatUSD, programmes } from "@/lib/site";
import { ChooseProgrammeButton } from "./ChooseProgrammeButton";
import { CheckIcon } from "./Icons";

export function Programmes() {
  return (
    <section id="programmes" aria-labelledby="programmes-heading" className="section bg-gown text-paper">
      <div className="container-page">
        <h2 id="programmes-heading" className="h2">
          Programmes
        </h2>
        <p className="lead text-bib">
          Each programme focuses on one area of practice and teaches it as the law stands today.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {programmes.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-panel bg-paper p-6 text-gown sm:p-8">
              <p className="font-sans text-sm font-medium text-ember-ink">{p.forWho}</p>
              <h3 className="mt-2 font-sans text-2xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-gown-soft">{p.summary}</p>
              <h4 className="mt-6 font-sans text-sm font-semibold">What you&apos;ll learn</h4>
              <ul className="mt-3 space-y-2.5">
                {p.topics.map((t) => (
                  <li key={t} className="flex gap-3 font-serif text-base leading-snug text-gown-soft">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-ember-ink" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-sans text-base font-semibold">
                  {p.feeUSD ? formatUSD(p.feeUSD) : "Fee on request"}
                </p>
                <ChooseProgrammeButton slug={p.slug} title={p.title} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
