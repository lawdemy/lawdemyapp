import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser, hasEnrolment } from "@/lib/dal";
import { programmes } from "@/lib/site";

export const metadata: Metadata = { title: "Course", robots: { index: false } };

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) notFound();

  const user = await requireUser(`/courses/${slug}`);
  const enrolled = await hasEnrolment(user.id, slug);
  if (!enrolled) redirect("/courses");

  return (
    <main id="main" className="min-h-screen bg-linen">
      <div className="container-page max-w-3xl py-16">
        <Link href="/courses" className="font-sans text-sm font-medium text-ember-ink underline underline-offset-4">
          ← My courses
        </Link>
        <h1 className="h2 mt-4 text-gown">{programme.title}</h1>
        <p className="lead text-gown-soft">{programme.summary}</p>

        <div className="mt-10 rounded-panel border border-bib bg-paper p-6 sm:p-8">
          <h2 className="font-sans text-lg font-semibold text-gown">Lessons</h2>
          <ul className="mt-4 divide-y divide-bib">
            {programme.topics.map((topic, i) => (
              <li key={topic} className="flex items-center justify-between py-4 font-serif text-base text-gown-soft">
                <span>
                  Module {i + 1} — {topic}
                </span>
                <span className="font-sans text-sm font-medium text-gown-soft/70">Coming soon</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
