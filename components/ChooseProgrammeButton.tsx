"use client";

export const SELECT_PROGRAMME_EVENT = "lawdemy:select-programme";

/** Pre-selects a programme in the enrolment form, then scrolls to it. */
export function ChooseProgrammeButton({ slug, title }: { slug: string; title: string }) {
  return (
    <button
      type="button"
      className="btn-primary w-full sm:w-auto"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(SELECT_PROGRAMME_EVENT, { detail: slug }));
        document.getElementById("enrol")?.scrollIntoView({ behavior: "smooth" });
        window.setTimeout(() => document.getElementById("enrol-name")?.focus({ preventScroll: true }), 400);
      }}
    >
      Enrol in this programme
      <span className="sr-only">: {title}</span>
    </button>
  );
}
