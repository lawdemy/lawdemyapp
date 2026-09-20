import { NextResponse } from "next/server";
import { programmes, site } from "@/lib/site";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Starts a Paystack transaction and returns the hosted checkout URL. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data couldn't be read." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const programme = programmes.find((p) => p.slug === clean(body.programme, 100));

  if (!programme) return NextResponse.json({ error: "Choose a programme." }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 10)
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  if (!programme.feeNaira)
    return NextResponse.json({ error: "Online payment isn't open for this programme yet." }, { status: 400 });

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("Enrol: PAYSTACK_SECRET_KEY is not set.");
    return NextResponse.json({ error: "Online payment is unavailable right now." }, { status: 500 });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      amount: Math.round(programme.feeNaira * 100), // kobo
      currency: "NGN",
      callback_url: `${site.url}/enrol/confirmed`,
      metadata: {
        name,
        phone,
        programme: programme.slug,
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: name },
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Programme", variable_name: "programme", value: programme.title },
        ],
      },
    }),
  });

  const json = (await res.json()) as { status: boolean; message: string; data?: { authorization_url: string } };
  if (!res.ok || !json.status || !json.data) {
    console.error("Enrol: Paystack error", res.status, json.message);
    return NextResponse.json({ error: "Payment couldn't be started." }, { status: 502 });
  }

  return NextResponse.json({ url: json.data.authorization_url });
}
