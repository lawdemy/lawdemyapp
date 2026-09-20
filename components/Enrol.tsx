import { programmes, site, whatsappLink } from "@/lib/site";
import { EnrolForm } from "./EnrolForm";

export function Enrol() {
  return (
    <section id="enrol" aria-labelledby="enrol-heading" className="section bg-paper">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="enrol-heading" className="h2 text-gown">
            Join the Academy
          </h2>
          <p className="lead text-gown-soft">
            Choose your programme, add your details and pay securely with Paystack. We&apos;ll confirm your place
            by email.
          </p>
          <p className="mt-6 font-serif text-lg leading-relaxed text-gown-soft">
            Prefer to talk first? Call{" "}
            <a href={`tel:${site.phone}`} className="font-medium text-ember-ink underline underline-offset-4">
              {site.phoneDisplay}
            </a>{" "}
            or{" "}
            <a
              href={whatsappLink("Hello Lawdemy, I'd like help choosing a programme.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ember-ink underline underline-offset-4"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
        <div className="lg:col-span-7">
          <EnrolForm
            programmes={programmes.map(({ slug, title, feeNaira }) => ({ slug, title, feeNaira }))}
          />
        </div>
      </div>
    </section>
  );
}
