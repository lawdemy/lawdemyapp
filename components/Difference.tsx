const points = [
  {
    title: "Practice, not theory",
    body: "You already have the theory. We teach how the work is actually done: the process, the paperwork and the judgement calls.",
  },
  {
    title: "Current law, first",
    body: "Programmes are built around the law as it stands now, including the recent changes many lawyers haven't caught up with.",
  },
  {
    title: "Fits around a working week",
    body: "Short, focused programmes on your phone or laptop, so staying current doesn't mean stepping away from your practice.",
  },
];

export function Difference() {
  return (
    <section aria-labelledby="difference-heading" className="section bg-linen">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="difference-heading" className="h2 text-gown">
            Why lawyers choose Lawdemy
          </h2>
          <p className="lead text-gown-soft">
            Five years of teaching in Lagos has taught us what new and practising lawyers actually struggle with.
            That&apos;s what we teach.
          </p>
        </div>
        <ul className="space-y-8 lg:col-span-7">
          {points.map((p) => (
            <li key={p.title} className="border-b border-bib pb-8 last:border-0 last:pb-0">
              <h3 className="font-sans text-xl font-semibold text-gown">{p.title}</h3>
              <p className="mt-2 font-serif text-lg leading-relaxed text-gown-soft">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
