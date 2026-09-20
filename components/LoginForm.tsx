"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "idle" | "sending" | "error";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/courses";
  const linkExpired = searchParams.get("error") === "link-expired";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "That email or password isn't right.");
      router.push(next);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel border border-bib bg-paper p-6 sm:p-8" noValidate>
      <div className="grid gap-5">
        <div>
          <label htmlFor="login-email" className="field-label">
            Email
          </label>
          <input id="login-email" name="email" type="email" autoComplete="email" required className="field" />
        </div>
        <div>
          <label htmlFor="login-password" className="field-label">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="field"
          />
        </div>
      </div>

      {(status === "error" || linkExpired) && (
        <p role="alert" className="mt-4 rounded-control bg-linen p-4 font-sans text-sm text-ember-deep">
          {status === "error" ? error : "That link has expired. Request a new one below."}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full">
        {status === "sending" ? "Signing in…" : "Log in"}
      </button>

      <div className="mt-6 flex flex-col gap-2 border-t border-bib pt-6 text-center font-sans text-sm text-gown-soft">
        <a href="/forgot-password" className="font-medium text-ember-ink underline underline-offset-4">
          Forgot password?
        </a>
        <p>
          Not a student yet?{" "}
          <a href="/#enrol" className="font-medium text-ember-ink underline underline-offset-4">
            Join the Academy
          </a>
        </p>
      </div>
    </form>
  );
}
