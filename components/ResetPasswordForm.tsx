"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "sending" | "error";

export function ResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as { password: string; confirm: string };

    if (data.password.length < 8) {
      setError("Your password needs to be at least 8 characters.");
      setStatus("error");
      return;
    }
    if (data.password !== data.confirm) {
      setError("Those passwords don't match.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.password }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Your password couldn't be updated. Try again.");
      router.push("/courses");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel border border-bib bg-paper p-6 sm:p-8" noValidate>
      <h1 className="font-sans text-xl font-semibold text-gown">Set a new password</h1>
      <div className="mt-5 grid gap-5">
        <div>
          <label htmlFor="reset-password" className="field-label">
            New password
          </label>
          <input
            id="reset-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="reset-confirm" className="field-label">
            Confirm new password
          </label>
          <input
            id="reset-confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="field"
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-control bg-linen p-4 font-sans text-sm text-ember-deep">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full">
        {status === "sending" ? "Saving…" : "Save password"}
      </button>
    </form>
  );
}
