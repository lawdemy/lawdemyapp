import type { Metadata } from "next";
import Link from "next/link";
import { requireUser, getEnrolments } from "@/lib/dal";

export const metadata: Metadata = { title: "My courses", robots: { index: false } };

export default async function CoursesPage() {
  const user = await requireUser("/courses");
  const enrolments = await getEnrolments(user.id);
  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "there";

  return (
    <main id="main" className="min-h-screen bg-linen">
      <div className="container-page py-16">
        <h1 className="h2 text-gown">Welcome, {name}</h1>

        {enrolments.length === 0 ? (
          <div className="mt-8 rounded-panel border border-bib bg-paper p-6 sm:p-8">
            <p className="font-serif text-lg leading-relaxed text-gown-soft">
              You don&apos;t have any programmes yet. Once you join one, it&apos;ll show up here.
            </p>
            <Link href="/#enrol" className="btn-primary mt-6 inline-flex">
              Join the Academy
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {enrolments.map((enrolment) => (
              <article
                key={enrolment.programmeSlug}
                className="flex flex-col rounded-panel border border-bib bg-paper p-6 sm:p-8"
              >
                <h2 className="font-sans text-xl font-semibold text-gown">
                  {enrolment.programme?.title ?? enrolment.programmeSlug}
                </h2>
                {enrolment.programme && (
                  <p className="mt-2 font-serif text-base leading-relaxed text-gown-soft">
                    {enrolment.programme.summary}
                  </p>
                )}
                <Link href={`/courses/${enrolment.programmeSlug}`} className="btn-primary mt-6 self-start">
                  Open course
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
