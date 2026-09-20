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
- programmes: titles, topics and `feeNaira`. Online payment switches on for a programme once its fee is set.

Do not add testimonials, ratings or certifications unless they are real and you have permission to use them.

## Environment variables (set these in Vercel too)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain, for SEO and the Paystack return page |
| `PAYSTACK_SECRET_KEY` | Starts and verifies payments |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Delivers contact form messages by email |

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Add the environment variables above, then deploy.
4. In your Paystack dashboard, use live keys once you're ready to take real payments.

## Page sections (in display order)
Header · Hero with "laws that changed" panel · At-a-glance strip · Who it's for · Programmes · How it works · Why Lawdemy · Join the Academy (enrol + Paystack) · Book a free call · FAQ · Contact (form, call, WhatsApp, email, map) · Footer · Floating WhatsApp button
