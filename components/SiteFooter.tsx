import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gown pb-24 pt-14 text-bib sm:pb-14">
      <div className="container-page grid gap-10 md:grid-cols-3">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs font-serif text-base leading-relaxed">
            Practical law programmes for new wigs, practising lawyers and anyone learning law. {site.city},{" "}
            {site.country}.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold text-paper">Explore</h2>
          <ul className="mt-3 space-y-2 font-sans text-sm">
            <li><a href="#programmes" className="hover:text-paper">Programmes</a></li>
            <li><a href="#how-it-works" className="hover:text-paper">How it works</a></li>
            <li><a href="#enrol" className="hover:text-paper">Join the Academy</a></li>
            <li><a href="#faq" className="hover:text-paper">FAQ</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold text-paper">Get in touch</h2>
          <ul className="mt-3 space-y-2 font-sans text-sm">
            <li><a href={`tel:${site.phone}`} className="hover:text-paper">{site.phoneDisplay}</a></li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                WhatsApp
              </a>
            </li>
            <li><a href={`mailto:${site.email}`} className="hover:text-paper">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <p className="container-page mt-12 border-t border-paper/10 pt-6 font-sans text-xs">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
