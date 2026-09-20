import type { Metadata } from "next";
import Link from "next/link";
import { formatUSD, programmes, site, whatsappLink } from "@/lib/site";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Enrolment", robots: { index: false } };

type Verified = { ok: true; programme?: string; amount: number; email: string } | { ok: false };

async function verify(reference: string): Promise<Verified> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return { ok: false };
  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  if (!res.ok) return { ok: false };
  const json = (await res.json()) as {
    data?: { status: string; amount: number; customer: { email: string }; metadata?: { programme?: string } };
  };
  if (json.data?.status !== "success") return { ok: false };
  const programme = programmes.find((p) => p.slug === json.data?.metadata?.programme)?.title;
  return { ok: true, programme, amount: json.data.amount / 100, email: json.data.customer.email };
}

export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const params = await searchParams;
  const reference = params.reference ?? params.trxref;
  const result: Verified = reference ? await verify(reference) : { ok: false };

  return (
    <main id="main" className="min-h-screen bg-linen">
      <div className="container-page max-w-2xl py-16">
        <Link href="/" aria-label="Back to Lawdemy home">
          <Logo />
        </Link>
        <div className="mt-10 rounded-panel border border-bib bg-paper p-6 sm:p-10">
          {result.ok ? (
            <>
              <h1 className="h2 text-gown">You&apos;re enrolled</h1>
              <p className="lead text-gown-soft">
                Payment of {formatUSD(result.amount)} received
                {result.programme ? ` for ${result.programme}` : ""}. We&apos;ll email {result.email} with your next
                steps.
              </p>
              <p className="mt-4 font-sans text-sm text-gown-soft">Payment reference: {reference}</p>
            </>
          ) : (
            <>
              <h1 className="h2 text-gown">We couldn&apos;t confirm your payment</h1>
              <p className="lead text-gown-soft">
                If money left your account, don&apos;t pay again. Send us your payment reference and we&apos;ll
                sort it out.
                {reference ? ` Your reference is ${reference}.` : ""}
              </p>
            </>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Back to Lawdemy
            </Link>
            <a href={whatsappLink(`Hello Lawdemy, my payment reference is ${reference ?? "(not shown)"}.`)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp us
            </a>
          </div>
          <p className="mt-6 font-sans text-sm text-gown-soft">
            Or call <a href={`tel:${site.phone}`} className="text-ember-ink underline">{site.phoneDisplay}</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
