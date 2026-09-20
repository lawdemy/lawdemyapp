const steps = [
  { title: "Choose a programme", body: "Pick the area of practice you want to strengthen. Not sure? Book a free call and we'll help." },
  { title: "Enrol and pay securely", body: "Fill in a short form and pay through Paystack by card, bank transfer or USSD." },
  { title: "Learn on any device", body: "Study on your phone or laptop, at a pace that works around court and client work." },
  { title: "Use it on Monday", body: "Every lesson is built around a task you'll actually do in practice, so it pays off straight away." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="section bg-paper">
      <div className="container-page">
        <h2 id="how-heading" className="h2 text-gown">
          How it works
        </h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-gown pt-5">
              <span className="font-sans text-sm font-semibold text-ember-ink">Step {i + 1}</span>
              <h3 className="mt-1 font-sans text-xl font-semibold text-gown">{s.title}</h3>
              <p className="mt-2 font-serif text-lg leading-relaxed text-gown-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
