import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { programmes, type Programme } from "@/lib/site";

/** Returns the signed-in student, or null. Does not redirect. */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Returns the signed-in student, redirecting to /login if there isn't one. */
export async function requireUser(nextPath?: string) {
  const user = await getUser();
  if (!user) {
    redirect(nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login");
  }
  return user;
}

export type Enrolment = { programmeSlug: string; createdAt: string; programme: Programme | undefined };

/** This student's paid programmes, newest first. RLS also enforces the "own rows" scope. */
export async function getEnrolments(userId: string): Promise<Enrolment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enrolments")
    .select("programme_slug, created_at")
    .eq("student_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    programmeSlug: row.programme_slug,
    createdAt: row.created_at,
    programme: programmes.find((p) => p.slug === row.programme_slug),
  }));
}

/** Whether this student has a paid enrolment for a specific programme slug. */
export async function hasEnrolment(userId: string, slug: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enrolments")
    .select("id")
    .eq("student_id", userId)
    .eq("programme_slug", slug)
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}
