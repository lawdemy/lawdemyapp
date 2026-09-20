import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <main id="main" className="min-h-screen bg-linen">
      <div className="container-page max-w-md py-16">
        <Link href="/" aria-label="Back to Lawdemy home">
          <Logo />
        </Link>
        <div className="mt-10">
          <ForgotPasswordForm />
        </div>
        <p className="mt-6 text-center font-sans text-sm text-gown-soft">
          <Link href="/login" className="font-medium text-ember-ink underline underline-offset-4">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
