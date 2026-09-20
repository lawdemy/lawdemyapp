import type { Metadata, Viewport } from "next";
import { Poppins, Source_Serif_4 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lawdemy | Practical law courses in Lagos for new and practising lawyers",
    template: "%s | Lawdemy",
  },
  description: site.description,
  keywords: [
    "law courses Nigeria",
    "law academy Lagos",
    "continuing legal education Nigeria",
    "courses for new wigs",
    "legal practice training",
    "NDPA data protection course",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: site.name,
    title: "Lawdemy | Stay current as a lawyer in Nigeria",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawdemy | Stay current as a lawyer in Nigeria",
    description: site.description,
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#221e1c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.city,
    addressCountry: "NG",
  },
  areaServed: "NG",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${poppins.variable} ${sourceSerif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-paper focus:px-4 focus:py-3 focus:text-gown"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
