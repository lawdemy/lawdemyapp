import { site, whatsappLink } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;

  const channels = [
    { icon: <PhoneIcon />, label: "Call", value: site.phoneDisplay, href: `tel:${site.phone}`, external: false },
    { icon: <ChatIcon />, label: "WhatsApp", value: "Send us a message", href: whatsappLink(), external: true },
    { icon: <MailIcon />, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
    { icon: <PinIcon />, label: "Visit", value: site.address, href: directions, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section bg-linen">
      <div className="container-page">
        <h2 id="contact-heading" className="h2 text-gown">
          Contact Lawdemy
        </h2>
        <p className="lead text-gown-soft">
          Questions about a programme, group training for your chambers, or anything else. We&apos;ll reply as
          soon as we can.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-full items-start gap-3 rounded-control border border-bib bg-paper p-4 hover:border-ember-ink"
                  >
                    <span className="mt-0.5 text-ember-ink">{c.icon}</span>
                    <span>
                      <span className="block font-sans text-sm font-semibold text-gown">{c.label}</span>
                      <span className="block break-words font-sans text-sm text-gown-soft">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 overflow-hidden rounded-panel border border-bib bg-bib">
              <iframe
                title={`Map showing Lawdemy in ${site.city}`}
                src={mapSrc}
                className="block aspect-[4/3] w-full sm:aspect-video"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
