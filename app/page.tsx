import { SiteHeader } from "@/components/SiteHeader";
import { getUser } from "@/lib/dal";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Audience } from "@/components/Audience";
import { Programmes } from "@/components/Programmes";
import { HowItWorks } from "@/components/HowItWorks";
import { Difference } from "@/components/Difference";
import { Enrol } from "@/components/Enrol";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default async function HomePage() {
  const user = await getUser();

  return (
    <>
      <SiteHeader loggedIn={Boolean(user)} />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Audience />
        <Programmes />
        <HowItWorks />
        <Difference />
        <Enrol />
        <Booking />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
