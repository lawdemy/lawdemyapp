/** Wordmark with a small mark drawn from a barrister's bands (the two white tabs worn at the collar). */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect width="28" height="28" rx="6" className="fill-ember-ink" />
        <path d="M9 7h4.4v12.5L9 21.5zM14.6 7H19v14.5l-4.4-2z" className="fill-paper" />
      </svg>
      <span className={`font-sans text-xl font-semibold tracking-tight ${onDark ? "text-paper" : "text-gown"}`}>
        Lawdemy
      </span>
    </span>
  );
}
