import { useEffect, useMemo, useState } from "react";
import useApp from "../context/useApp";
import tours from "../data/tours";
import { buildQuoteMessage, buildWhatsAppUrl } from "../lib/whatsapp";
import { Close, WhatsApp } from "./Icons";

export default function QuoteModal() {
  const { t, lang, quoteOpen, quoteTour, closeQuote } = useApp();
  const [slug, setSlug] = useState("");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!quoteOpen) return;
    setSlug(quoteTour?.slug ?? "");
    if (quoteTour?.people) setPeople(quoteTour.people);
    if (quoteTour?.date) setDate(quoteTour.date);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [quoteOpen, quoteTour]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeQuote();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeQuote]);

  const selected = useMemo(() => tours.find((x) => x.slug === slug), [slug]);

  const message = useMemo(
    () =>
      buildQuoteMessage({
        lang,
        tourTitle: selected ? selected.title[lang] : t.quote.custom,
        people,
        date,
        name,
        hotel,
        note,
      }),
    [lang, selected, people, date, name, hotel, note, t.quote.custom]
  );

  if (!quoteOpen) return null;

  const field =
    "w-full rounded-xl border border-sand-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 dark:border-white/15 dark:bg-night-950 dark:text-sand-100";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sand-700 dark:text-sand-300";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-night-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <button className="absolute inset-0 cursor-default" aria-label={t.common.close} onClick={closeQuote} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-sand-200 bg-sand-50 shadow-soft sm:rounded-3xl dark:border-white/10 dark:bg-night-900">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-sand-200 bg-sand-50/95 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-night-900/95">
          <div>
            <h2 className="font-display text-xl font-bold">{t.quote.title}</h2>
            <p className="mt-1 text-sm text-sand-700 dark:text-sand-300">{t.quote.subtitle}</p>
          </div>
          <button
            onClick={closeQuote}
            aria-label={t.common.close}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-sand-300 bg-white text-sand-800 dark:border-white/15 dark:bg-white/5 dark:text-sand-200"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="q-tour">{t.quote.tour}</label>
            <select id="q-tour" className={field} value={slug} onChange={(e) => setSlug(e.target.value)}>
              <option value="">{t.quote.custom}</option>
              {tours.map((x) => (
                <option key={x.slug} value={x.slug}>
                  {x.title[lang]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="q-people">{t.quote.people}</label>
            <input id="q-people" type="number" min="1" max="20" className={field} value={people} onChange={(e) => setPeople(e.target.value)} />
          </div>

          <div>
            <label className={label} htmlFor="q-date">{t.quote.date}</label>
            <input id="q-date" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <label className={label} htmlFor="q-name">{t.quote.name}</label>
            <input id="q-name" className={field} placeholder={t.quote.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className={label} htmlFor="q-hotel">{t.quote.hotel}</label>
            <input id="q-hotel" className={field} placeholder={t.quote.hotelPlaceholder} value={hotel} onChange={(e) => setHotel(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className={label} htmlFor="q-note">{t.quote.message}</label>
            <textarea id="q-note" rows={3} className={field} placeholder={t.quote.messagePlaceholder} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <p className={label}>{t.quote.preview}</p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-xl border border-sand-200 bg-white p-3.5 text-xs leading-relaxed text-sand-800 dark:border-white/10 dark:bg-night-950 dark:text-sand-300">
              {message}
            </pre>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-sand-200 bg-sand-50/95 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-night-900/95">
          <a
            href={buildWhatsAppUrl(message)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={closeQuote}
            className="btn-whatsapp w-full text-base"
          >
            <WhatsApp className="h-5 w-5" />
            {t.quote.send}
          </a>
          <p className="mt-3 text-center text-xs text-sand-700 dark:text-sand-400">{t.quote.note}</p>
        </div>
      </div>
    </div>
  );
}
