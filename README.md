# Lawdemy website

Next.js (App Router) + Tailwind CSS v4 + TypeScript. Deploys to Vercel.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Before launch: fill in real details
All business details live in `lib/site.ts`. Replace every `TODO`:
- phone, WhatsApp number, email and full street address (the map uses the address)
- booking link (Cal.com or Calendly)
- programmes: titles, topics and `feeUSD`. Online payment switches on for a programme once its fee is set.

Do not add testimonials, ratings or certifications unless they are real and you have permission to use them.

## Environment variables (set these in Vercel too)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain, for SEO and the Paystack return page |
| `PAYSTACK_SECRET_KEY` | Starts and verifies payments, and verifies the webhook signature |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Delivers contact form messages by email |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Student login and the protected course area |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only. Lets the Paystack webhook create student accounts and enrolments. Never exposed to the browser — do not prefix it with `NEXT_PUBLIC_` |

## Setting up student login (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the Project URL, `anon` key and `service_role` key into `.env.local` (and into Vercel for production).
3. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) — it creates the `enrolments` table with row-level security so a student can only ever read their own rows.
4. In **Authentication → Providers**, make sure Email is enabled.
5. In **Authentication → URL Configuration**, set the Site URL to your domain (or `http://localhost:3000` for local testing) and add `{your-domain}/auth/confirm` to the Redirect URLs — this is the page that turns a password-reset or invite email link into a signed-in session.
6. Students never sign themselves up: an account is created automatically by the Paystack webhook below, which also emails them an invite link to set their password.

## Setting up the Paystack webhook

1. In the [Paystack dashboard](https://dashboard.paystack.com), go to **Settings → API Keys & Webhooks**.
2. Set the webhook URL to `https://{your-domain}/api/paystack/webhook`.
3. Paystack sends every event to that URL; the route only acts on `charge.success` and verifies the `x-paystack-signature` header against `PAYSTACK_SECRET_KEY`, so no separate webhook secret is needed.
4. On a successful payment, the webhook creates (or reuses) the student's account, writes an `enrolments` row for that programme, and — for a new student — emails them a "set your password" link.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Add the environment variables above, then deploy.
4. In your Paystack dashboard, use live keys once you're ready to take real payments, and point the webhook at your live domain.

## Page sections (in display order)
Header · Hero with "laws that changed" panel · At-a-glance strip · Who it's for · Programmes · How it works · Why Lawdemy · Join the Academy (enrol + Paystack) · Book a free call · FAQ · Contact (form, call, WhatsApp, email, map) · Footer · Floating WhatsApp button
