import { site } from "@/lib/site";

const facts = [
  { title: "Five years teaching", body: "Training lawyers in the practice of law since our first cohort." },
  { title: `Based in ${site.city}`, body: "Rooted in the courts, chambers and companies of Nigeria's commercial capital." },
  { title: "Phone or laptop", body: "Every programme works on the device you already carry to court." },
];

export function ProofStrip() {
  return (
    <section aria-label="About Lawdemy at a glance" className="border-y border-bib bg-linen">
      <ul className="container-page grid gap-6 py-8 sm:grid-cols-3 sm:gap-8">
        {facts.map((f) => (
          <li key={f.title} className="border-l-2 border-ember pl-4">
            <p className="font-sans font-semibold text-gown">{f.title}</p>
            <p className="mt-1 font-serif text-base leading-snug text-gown-soft">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
