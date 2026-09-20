import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data couldn't be read." }, { status: 400 });
  }

  const email = clean(body.email, 200);
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const supabase = await createClient();
  // Errors (e.g. unknown email) are intentionally not surfaced: the response is always
  // the same, so a visitor can't use this form to discover which emails have accounts.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${site.url}/auth/confirm?next=/reset-password`,
  });

  return NextResponse.json({ ok: true });
}
