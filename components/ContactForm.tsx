"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Your message wasn't sent.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(`${(err as Error).message} Try again, or reach us by phone or WhatsApp.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-panel border border-bib bg-paper p-6 sm:p-8">
        <h3 className="font-sans text-xl font-semibold text-gown">Message sent</h3>
        <p className="mt-2 font-serif text-lg leading-relaxed text-gown-soft">
          Thanks for getting in touch. We&apos;ll reply to the email address you gave us.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel border border-bib bg-paper p-6 sm:p-8">
      <h3 className="font-sans text-xl font-semibold text-gown">Send a message</h3>
      <div className="mt-5 grid gap-5">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Full name
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required className="field" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className="field-label">
              Email
            </label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required className="field" />
          </div>
          <div>
            <label htmlFor="contact-phone" className="field-label">
              Phone <span className="font-normal text-gown-soft">(optional)</span>
            </label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="contact-message" className="field-label">
            How can we help?
          </label>
          <textarea id="contact-message" name="message" rows={5} required minLength={10} className="field" />
        </div>
        {/* Spam trap: hidden from people, filled in by bots */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-4 rounded-control bg-linen p-4 font-sans text-sm text-ember-deep">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
