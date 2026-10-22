import useApp from "../context/useApp";
import { WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  const { t, openQuote, quoteOpen } = useApp();
  if (quoteOpen) return null;

  return (
    <button
      onClick={() => openQuote()}
      aria-label={t.nav.quote}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-[#07351b] shadow-soft transition hover:bg-[#1fb356] hover:text-white active:scale-95 sm:bottom-8 sm:right-8"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50 opacity-60" />
        <WhatsApp className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm sm:inline">{t.nav.quote}</span>
    </button>
  );
}
