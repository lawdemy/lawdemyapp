import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data couldn't be read." }, { status: 400 });
  }

  const password = clean(body.password, 200);
  if (password.length < 8) {
    return NextResponse.json({ error: "Your password needs to be at least 8 characters." }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "This link has expired. Request a new one from the forgot password page." },
      { status: 401 },
    );
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return NextResponse.json({ error: "Your password couldn't be updated. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
