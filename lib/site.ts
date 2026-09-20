/**
 * Single source of truth for Lawdemy's business details.
 * Every value marked TODO must be replaced with real information before launch.
 * Nothing here should be invented: no fake reviews, ratings or certifications.
 */

export const site = {
  name: "Lawdemy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Lawdemy is a Lagos law academy teaching the practical side of legal practice. Short, current programmes for new wigs, practising lawyers and anyone learning law, on your phone or laptop.",
  yearsTeaching: 5,
  city: "Lagos",
  country: "Nigeria",

  // TODO: replace with the real numbers. Use international format without spaces.
  phone: "+2340000000000",
  phoneDisplay: "+234 000 000 0000",
  whatsapp: "2340000000000", // digits only, no "+"
  email: "admissions@your-domain.ng", // TODO

  // TODO: full street address. It powers the map and search listings.
  address: "Lagos, Nigeria",

  // TODO: your Cal.com / Calendly booking link for free consultations.
  bookingUrl: "https://cal.com/your-handle/free-consultation",
} as const;

export const whatsappLink = (
  message = "Hello Lawdemy, I'd like to know more about your programmes.",
) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export type Programme = {
  slug: string;
  title: string;
  forWho: string;
  summary: string;
  topics: string[];
  /** Fee in Naira. Leave null until confirmed; online payment stays off for that programme. */
  feeNaira: number | null;
};

// TODO: draft programmes based on the brief. Edit titles, topics and fees to match what you teach.
export const programmes: Programme[] = [
  {
    slug: "practice-foundations",
    title: "Practice Foundations for New Wigs",
    forWho: "Recently called to the Bar",
    summary:
      "The working knowledge chambers expect from day one: how a file moves, how court processes are drafted and filed, and how to handle clients professionally.",
    topics: [
      "Drafting and filing court processes",
      "Client intake, engagement letters and fees",
      "Rules of Professional Conduct 2023 in daily practice",
      "Legal research that holds up in court",
    ],
    feeNaira: null,
  },
  {
    slug: "litigation-practice",
    title: "Litigation and Courtroom Practice",
    forWho: "Lawyers who appear in court",
    summary:
      "Sharpen the skills that win applications and trials, with the evidence rules as they stand today, including electronic evidence.",
    topics: [
      "Pleadings, motions and written addresses",
      "Electronic evidence after the 2023 amendment",
      "Examination-in-chief and cross-examination",
      "Arbitration and mediation under the 2023 Act",
    ],
    feeNaira: null,
  },
  {
    slug: "corporate-commercial",
    title: "Corporate, Commercial and Tax Practice",
    forWho: "Lawyers advising businesses",
    summary:
      "Advise founders and companies with confidence, from incorporation and contracts to the new tax framework.",
    topics: [
      "Company formation and post-incorporation filings",
      "Commercial contract drafting and review",
      "Due diligence for transactions",
      "What the Nigeria Tax Act 2025 changes for clients",
    ],
    feeNaira: null,
  },
  {
    slug: "data-protection",
    title: "Data Protection and Technology Law",
    forWho: "Lawyers, compliance staff and curious learners",
    summary:
      "One of the fastest-growing areas of advice in Nigeria. Learn to help organisations comply with the Nigeria Data Protection Act.",
    topics: [
      "The NDPA 2023 and the role of the NDPC",
      "Privacy notices and lawful bases for processing",
      "Data protection impact assessments",
      "Responding to breaches and data subject requests",
    ],
    feeNaira: null,
  },
];

/** Real changes to Nigerian law, shown in the hero to make the case for staying current. */
export const legalChanges = [
  { year: "2023", title: "Rules of Professional Conduct", note: "New rules on how lawyers practise, advertise and deal with clients." },
  { year: "2023", title: "Evidence (Amendment) Act", note: "Updated the law on electronic evidence and electronic oaths." },
  { year: "2023", title: "Nigeria Data Protection Act", note: "A new data protection regime and a new regulator, the NDPC." },
  { year: "2023", title: "Arbitration and Mediation Act", note: "Replaced the old arbitration law and added statutory mediation." },
  { year: "2025", title: "Nigeria Tax Act", note: "Brought major federal tax laws together into one statute." },
];

export const faqs = [
  {
    q: "Do I need to be called to the Bar to join?",
    a: "No. Some programmes are built for practising lawyers, but others, like Data Protection and Technology Law, welcome anyone who wants to understand the law. Each programme says who it's for.",
  },
  {
    q: "Can I learn on my phone?",
    a: "Yes. Lawdemy is designed for phone and laptop, so you can learn between court sittings, on your commute or at your desk.",
  },
  {
    q: "How do I pay?",
    a: "Payments are processed securely by Paystack. You can pay by card, bank transfer or USSD, and you'll get a confirmation as soon as payment goes through.",
  },
  {
    q: "I'm not sure which programme fits me. Can I speak to someone?",
    a: "Yes. Book a free call or send us a WhatsApp message and we'll help you choose based on where you are in your career.",
  },
  {
    q: "Where are you based?",
    a: `We're in ${site.city}. Reach us by phone, WhatsApp or the contact form on this page.`,
  },
];

export const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
