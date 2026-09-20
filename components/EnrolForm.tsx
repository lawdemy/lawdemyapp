"use client";

import { useEffect, useState } from "react";
import { formatUSD } from "@/lib/site";
import { SELECT_PROGRAMME_EVENT } from "./ChooseProgrammeButton";

type Option = { slug: string; title: string; feeUSD: number | null };
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "error"; message: string };

export function EnrolForm({ programmes }: { programmes: Option[] }) {
  const [slug, setSlug] = useState(programmes[0]?.slug ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const onSelect = (e: Event) => setSlug((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_PROGRAMME_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PROGRAMME_EVENT, onSelect);
  }, []);

  const selected = programmes.find((p) => p.slug === slug);
  const canPay = Boolean(selected?.feeUSD);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error ?? "Payment couldn't be started.");
      window.location.assign(json.url);
    } catch (err) {
      setStatus({
        kind: "error",
        message: `${(err as Error).message} Check your details and try again, or contact us by phone or WhatsApp.`,
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel border border-bib bg-linen p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="enrol-programme" className="field-label">
            Programme
          </label>
          <select
            id="enrol-programme"
            name="programme"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="field"
            required
          >
            {programmes.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enrol-name" className="field-label">
            Full name
          </label>
          <input id="enrol-name" name="name" type="text" autoComplete="name" required className="field" />
        </div>
        <div>
          <label htmlFor="enrol-email" className="field-label">
            Email
          </label>
          <input id="enrol-email" name="email" type="email" autoComplete="email" required className="field" />
        </div>
        <div>
          <label htmlFor="enrol-phone" className="field-label">
            Phone number
          </label>
          <input
            id="enrol-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="0803 000 0000"
            required
            className="field"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-bib pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-base text-gown" aria-live="polite">
          {canPay && selected?.feeUSD ? (
            <>
              Total: <strong className="font-semibold">{formatUSD(selected.feeUSD)}</strong>
            </>
          ) : (
            "The fee for this programme is shared on request. Book a free call or WhatsApp us."
          )}
        </p>
        <button type="submit" className="btn-primary shrink-0" disabled={!canPay || status.kind === "sending"}>
          {status.kind === "sending" ? "Opening secure payment…" : "Pay and enrol"}
        </button>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="mt-4 rounded-control bg-paper p-4 font-sans text-sm text-ember-deep">
          {status.message}
        </p>
      )}
      <p className="mt-4 font-sans text-xs text-gown-soft">Payments are processed by Paystack. We never see your card details.</p>
    </form>
  );
}
