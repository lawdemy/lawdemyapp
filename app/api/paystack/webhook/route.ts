import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { site } from "@/lib/site";

type ChargeSuccessEvent = {
  event: string;
  data: {
    reference: string;
    customer: { email: string };
    metadata?: { programme?: string; name?: string };
  };
};

function isValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const signatureBuf = Buffer.from(signature, "utf8");
  if (expectedBuf.length !== signatureBuf.length) return false;
  return timingSafeEqual(expectedBuf, signatureBuf);
}

/**
 * Finds an existing auth user by email. The Supabase admin client has no direct
 * "get user by email" call, so this paginates listUsers. Fine for a course-sized
 * student list; move to a synced `profiles` table with a unique email index if
 * the student base grows into the tens of thousands.
 */
async function findUserIdByEmail(
  admin: ReturnType<typeof createAdminClient>,
  email: string,
): Promise<string | null> {
  const target = email.toLowerCase();
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error || !data) return null;
    const match = data.users.find((u) => u.email?.toLowerCase() === target);
    if (match) return match.id;
    if (data.users.length < 200) return null;
  }
  return null;
}

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("Paystack webhook: PAYSTACK_SECRET_KEY is not set.");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const rawBody = await req.text();
  if (!isValidSignature(rawBody, req.headers.get("x-paystack-signature"), secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: ChargeSuccessEvent;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Malformed body." }, { status: 400 });
  }

  // Acknowledge anything we don't act on so Paystack doesn't retry it.
  if (payload.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const email = payload.data.customer?.email;
  const reference = payload.data.reference;
  const programmeSlug = payload.data.metadata?.programme;
  const name = payload.data.metadata?.name;
  if (!email || !reference || !programmeSlug) {
    console.error("Paystack webhook: charge.success missing email, reference or programme.", payload.data);
    return NextResponse.json({ received: true });
  }

  const admin = createAdminClient();

  const invite = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${site.url}/auth/confirm?next=/reset-password`,
    data: name ? { full_name: name } : undefined,
  });
  const studentId = invite.data?.user?.id ?? (await findUserIdByEmail(admin, email));

  if (!studentId) {
    console.error("Paystack webhook: couldn't resolve or create a student for", email);
    return NextResponse.json({ received: true });
  }

  const { error: enrolError } = await admin.from("enrolments").upsert(
    { student_id: studentId, email, programme_slug: programmeSlug, paystack_reference: reference },
    { onConflict: "paystack_reference", ignoreDuplicates: true },
  );
  if (enrolError) {
    console.error("Paystack webhook: failed to write enrolment.", enrolError);
  }

  return NextResponse.json({ received: true });
}
