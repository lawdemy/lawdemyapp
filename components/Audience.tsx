const groups = [
  {
    title: "You were called to the Bar recently",
    body: "Law school taught you the law. Chambers expect you to practise it. We close the gap between the two, so your first year feels less like guesswork.",
  },
  {
    title: "You've been practising for a while",
    body: "Clients and courts notice when advice is out of date. Refresh the areas that have changed and add ones your clients now ask about.",
  },
  {
    title: "You simply want to understand the law",
    body: "Compliance officers, founders, HR teams and students: some programmes are open to anyone who needs practical legal knowledge.",
  },
];

export function Audience() {
  return (
    <section id="who-its-for" aria-labelledby="audience-heading" className="section bg-paper">
      <div className="container-page">
        <h2 id="audience-heading" className="h2 max-w-2xl text-gown">
          Nobody wants to be the lawyer who didn&apos;t hear about the change.
        </h2>
        <p className="lead text-gown-soft">
          Lawdemy is for people who want their legal knowledge to stay relevant, wherever they are in their career.
        </p>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {groups.map((g) => (
            <li key={g.title}>
              <h3 className="font-sans text-xl font-semibold text-gown">{g.title}</h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-gown-soft">{g.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
