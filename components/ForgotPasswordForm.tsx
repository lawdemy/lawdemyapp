"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Try again.");
      setStatus("sent");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-panel border border-bib bg-paper p-6 sm:p-8">
        <h1 className="font-sans text-xl font-semibold text-gown">Check your email</h1>
        <p className="mt-2 font-serif text-lg leading-relaxed text-gown-soft">
          If an account exists for that email address, we&apos;ve sent a link to reset your password.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel border border-bib bg-paper p-6 sm:p-8" noValidate>
      <h1 className="font-sans text-xl font-semibold text-gown">Reset your password</h1>
      <p className="mt-2 font-serif text-lg leading-relaxed text-gown-soft">
        Enter the email you enrolled with and we&apos;ll send you a link to set a new password.
      </p>
      <div className="mt-5">
        <label htmlFor="forgot-email" className="field-label">
          Email
        </label>
        <input id="forgot-email" name="email" type="email" autoComplete="email" required className="field" />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-control bg-linen p-4 font-sans text-sm text-ember-deep">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full">
        {status === "sending" ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
