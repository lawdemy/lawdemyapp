import { whatsappLink } from "@/lib/site";
import { ChatIcon } from "./Icons";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-30 inline-flex h-14 items-center gap-2 rounded-full bg-[#157347] px-4 font-sans text-sm font-medium text-white shadow-lg hover:bg-[#0f5a37] sm:bottom-6 sm:right-6 sm:px-5"
    >
      <ChatIcon className="h-6 w-6" />
      <span className="sr-only sm:not-sr-only">Chat on WhatsApp</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
