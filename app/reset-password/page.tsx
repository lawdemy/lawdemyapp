import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { getUser } from "@/lib/dal";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };

export default async function ResetPasswordPage() {
  const user = await getUser();

  return (
    <main id="main" className="min-h-screen bg-linen">
      <div className="container-page max-w-md py-16">
        <Link href="/" aria-label="Back to Lawdemy home">
          <Logo />
        </Link>
        <div className="mt-10">
          {user ? (
            <ResetPasswordForm />
          ) : (
            <div className="rounded-panel border border-bib bg-paper p-6 sm:p-8">
              <h1 className="font-sans text-xl font-semibold text-gown">This link has expired</h1>
              <p className="mt-2 font-serif text-lg leading-relaxed text-gown-soft">
                Password reset links only work once and expire after a while. Request a new one to continue.
              </p>
              <Link href="/forgot-password" className="btn-primary mt-6 inline-flex">
                Request a new link
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
