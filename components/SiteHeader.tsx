"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

const nav = [
  { href: "#programmes", label: "Programmes" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-bib bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#main" aria-label="Lawdemy home">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-sans text-sm font-medium text-gown-soft hover:text-gown">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-gown hover:bg-linen sm:w-auto sm:gap-2 sm:px-3"
          >
            <PhoneIcon />
            <span className="sr-only sm:not-sr-only sm:text-sm sm:font-medium">Call us</span>
          </a>
          <a href="#enrol" className="btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
            Join the Academy
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-gown hover:bg-linen lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-bib bg-paper lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-lg font-medium text-gown"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pb-3 pt-2">
              <a href="#enrol" onClick={() => setOpen(false)} className="btn-primary w-full">
                Join the Academy
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
