import { useEffect, useMemo, useState } from "react";
import useApp from "../context/useApp";
import tours from "../data/tours";
import airports, { airportLabel } from "../data/airports";
import { buildQuoteMessage, buildTransferMessage, buildWhatsAppUrl } from "../lib/whatsapp";
import { Close, WhatsApp } from "./Icons";

/** Fiche dont le formulaire est remplacé par celui des transferts. */
export const TRANSFER_SLUG = "transfert-aeroport";

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 dark:border-white/15 dark:bg-night-950 dark:text-sand-100";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sand-700 dark:text-sand-300";

export default function QuoteModal() {
  const { t, lang, quoteOpen, quoteTour, closeQuote } = useApp();

  // ---- champs communs
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  // ---- excursion
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [hotel, setHotel] = useState("");

  // ---- transfert
  const [direction, setDirection] = useState("toHotel");
  const [airport, setAirport] = useState("RAK");
  const [city, setCity] = useState("Marrakech");
  const [cityEdited, setCityEdited] = useState(false);
  const [address, setAddress] = useState("");
  const [tDate, setTDate] = useState("");
  const [time, setTime] = useState("");
  const [flight, setFlight] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);

  useEffect(() => {
    if (!quoteOpen) return;
    setSlug(quoteTour?.slug ?? "");
    if (quoteTour?.people) setPeople(quoteTour.people);
    if (quoteTour?.date) setDate(quoteTour.date);
    if (quoteTour?.direction) setDirection(quoteTour.direction);
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

  const isTransfer = slug === TRANSFER_SLUG;
  const arrival = direction === "toHotel";
  const selected = useMemo(() => tours.find((x) => x.slug === slug), [slug]);

  // Choisir un aéroport pré-remplit la ville, tant que le client ne l'a pas tapée lui-même.
  const pickAirport = (code) => {
    setAirport(code);
    const a = airports.find((x) => x.code === code);
    if (a && !cityEdited) setCity(a.city);
  };

  const message = useMemo(() => {
    if (isTransfer) {
      return buildTransferMessage({
        lang,
        direction,
        airport: airport === "OTHER" ? null : airportLabel(airport, lang),
        city,
        address,
        date: tDate,
        time,
        flight,
        passengers,
        luggage,
        name,
        note,
      });
    }
    return buildQuoteMessage({
      lang,
      tourTitle: selected ? selected.title[lang] : t.quote.custom,
      people,
      date,
      name,
      hotel,
      note,
    });
  }, [
    isTransfer, lang, direction, airport, city, address, tDate, time, flight, passengers, luggage,
    selected, people, date, hotel, name, note, t.quote.custom,
  ]);

  if (!quoteOpen) return null;

  const tr = t.transfer;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-night-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <button className="absolute inset-0 cursor-default" aria-label={t.common.close} onClick={closeQuote} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-sand-200 bg-sand-50 shadow-soft sm:rounded-3xl dark:border-white/10 dark:bg-night-900">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-sand-200 bg-sand-50/95 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-night-900/95">
          <div>
            <h2 className="font-display text-xl font-bold">{isTransfer ? tr.title : t.quote.title}</h2>
            <p className="mt-1 text-sm text-sand-700 dark:text-sand-300">{isTransfer ? tr.subtitle : t.quote.subtitle}</p>
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

          {isTransfer ? (
            <>
              {/* Sens du trajet */}
              <fieldset className="sm:col-span-2">
                <legend className={label}>{tr.direction}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["toHotel", tr.toHotel, tr.toHotelHint],
                    ["toAirport", tr.toAirport, tr.toAirportHint],
                  ].map(([value, title, hint]) => {
                    const active = direction === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDirection(value)}
                        aria-pressed={active}
                        className={`rounded-xl border px-3 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-500/40 ${
                          active
                            ? "border-clay-600 bg-clay-600/10 dark:border-clay-300 dark:bg-white/10"
                            : "border-sand-300 bg-white hover:border-clay-400 dark:border-white/15 dark:bg-night-950"
                        }`}
                      >
                        <span className={`block text-sm font-semibold ${active ? "text-clay-700 dark:text-clay-200" : ""}`}>
                          {title}
                        </span>
                        <span className="mt-0.5 block text-xs text-sand-700 dark:text-sand-400">{hint}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label className={label} htmlFor="q-airport">{tr.airport}</label>
                <select id="q-airport" className={field} value={airport} onChange={(e) => pickAirport(e.target.value)}>
                  {airports.map((a) => (
                    <option key={a.code} value={a.code}>
                      {airportLabel(a.code, lang)}
                    </option>
                  ))}
                  <option value="OTHER">{tr.otherAirport}</option>
                </select>
              </div>

              <div>
                <label className={label} htmlFor="q-city">{arrival ? tr.cityDrop : tr.cityPickup}</label>
                <input
                  id="q-city"
                  className={field}
                  placeholder={tr.cityPlaceholder}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setCityEdited(true);
                  }}
                />
              </div>

              <div>
                <label className={label} htmlFor="q-address">{arrival ? tr.addressDrop : tr.addressPickup}</label>
                <input
                  id="q-address"
                  className={field}
                  placeholder={tr.addressPlaceholder}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className={label} htmlFor="q-tdate">{tr.date}</label>
                <input id="q-tdate" type="date" className={field} value={tDate} onChange={(e) => setTDate(e.target.value)} />
              </div>

              <div>
                <label className={label} htmlFor="q-time">{arrival ? tr.timeArrival : tr.timeDeparture}</label>
                <input id="q-time" type="time" className={field} value={time} onChange={(e) => setTime(e.target.value)} />
                {!arrival && <p className="mt-1.5 text-xs text-sand-700 dark:text-sand-400">{tr.timeDepartureHint}</p>}
              </div>

              <div>
                <label className={label} htmlFor="q-flight">{tr.flight}</label>
                <input
                  id="q-flight"
                  className={`${field} uppercase placeholder:normal-case`}
                  placeholder={tr.flightPlaceholder}
                  value={flight}
                  onChange={(e) => setFlight(e.target.value)}
                  autoCapitalize="characters"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label} htmlFor="q-pax">{tr.passengers}</label>
                  <input id="q-pax" type="number" min="1" max="50" className={field} value={passengers} onChange={(e) => setPassengers(e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="q-bags">{tr.luggage}</label>
                  <input id="q-bags" type="number" min="0" max="50" className={field} value={luggage} onChange={(e) => setLuggage(e.target.value)} />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={label} htmlFor="q-name">{t.quote.name}</label>
                <input id="q-name" className={field} placeholder={t.quote.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}

          <div className="sm:col-span-2">
            <label className={label} htmlFor="q-note">{t.quote.message}</label>
            <textarea id="q-note" rows={3} className={field} placeholder={t.quote.messagePlaceholder} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <p className={label}>{t.quote.preview}</p>
            <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-xl border border-sand-200 bg-white p-3.5 text-xs leading-relaxed text-sand-800 dark:border-white/10 dark:bg-night-950 dark:text-sand-300">
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
          <p className="mt-3 text-center text-xs text-sand-700 dark:text-sand-400">{isTransfer ? tr.note : t.quote.note}</p>
        </div>
      </div>
    </div>
  );
}
