import { site, whatsappLink } from "@/lib/site";

export function Booking() {
  return (
    <section id="book" aria-labelledby="book-heading" className="bg-gown text-paper">
      <div className="container-page flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="book-heading" className="h2">
            Not sure where to start? Book a free call.
          </h2>
          <p className="lead text-bib">
            Tell us where you are in your career and what you want to get better at. We&apos;ll recommend the
            programme that fits, or tell you honestly if none does yet.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Choose a time
          </a>
          <a
            href={whatsappLink("Hello Lawdemy, I'd like to book a free call.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-on-dark"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
