import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = { title: "Student login", robots: { index: false } };

export default function LoginPage() {
  return (
    <main id="main" className="min-h-screen bg-linen">
      <div className="container-page max-w-md py-16">
        <Link href="/" aria-label="Back to Lawdemy home">
          <Logo />
        </Link>
        <h1 className="h2 mt-10 text-gown">Student login</h1>
        <p className="lead text-gown-soft">Log in to see the programmes you&apos;re enrolled in.</p>
        <div className="mt-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
