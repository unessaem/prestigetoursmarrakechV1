import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApp from "../context/useApp";
import site from "../config/site";
import tours, { getTour, included, notIncluded } from "../data/tours";
import { path } from "../lib/routes";
import SmartImage from "../components/SmartImage";
import TourCard from "../components/TourCard";
import { ArrowLeft, Check, Clock, Minus, Pin, Users, WhatsApp } from "../components/Icons";

export default function TourDetail() {
  const { slug } = useParams();
  const { t, lang, openQuote } = useApp();
  const tour = getTour(slug);
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");

  if (!tour) {
    return (
      <div className="section">
        <div className="container-x text-center">
          <h1 className="font-display text-3xl font-bold">{t.common.notFound}</h1>
          <Link to={path(lang, "tours")} className="btn-primary mt-8">
            {t.detail.back}
          </Link>
        </div>
      </div>
    );
  }

  const inc = tour.included ?? included;
  const notInc = tour.notIncluded ?? notIncluded;
  const others = tours.filter((x) => x.slug !== tour.slug).slice(0, 3);

  const facts = [
    [Clock, t.detail.duration, tour.duration[lang]],
    [Pin, t.detail.distance, tour.distance[lang]],
    [Users, t.detail.pickup, tour.pickup[lang]],
  ];

  const field =
    "w-full rounded-xl border border-sand-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 dark:border-white/15 dark:bg-night-950 dark:text-sand-100";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sand-700 dark:text-sand-300";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <SmartImage
          name={tour.slug}
          priority
          alt={`${tour.title[lang]} — ${site.brand}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/50 via-night-950/30 to-night-950/85" />
        <div className="container-x relative flex min-h-[52vh] flex-col justify-end py-16 text-white">
          <Link
            to={path(lang, "tours")}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.detail.back}
          </Link>
          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            {tour.title[lang]}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{tour.short[lang]}</p>
        </div>
      </section>

      <div className="section">
        <div className="container-x">
          {/* FACTS */}
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map(([Icon, title, value]) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 dark:border-white/10 dark:bg-night-900"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clay-600/10 text-clay-700 dark:bg-white/10 dark:text-clay-200">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sand-700 dark:text-sand-400">
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* MAIN */}
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-bold">{t.detail.overview}</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-sand-800 dark:text-sand-200">
                {tour.description[lang]}
              </p>

              <h2 className="mt-12 font-display text-2xl font-bold">{t.detail.highlights}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {tour.highlights[lang].map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay-600 dark:text-clay-300" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {tour.options && (
                <div className="mt-12 rounded-3xl border border-clay-300/60 bg-clay-600/5 p-6 dark:border-clay-400/20 dark:bg-white/5">
                  <h2 className="font-display text-2xl font-bold">{t.detail.options}</h2>
                  <p className="mt-2 text-sm text-sand-700 dark:text-sand-300">{t.detail.optionsLead}</p>
                  <ul className="mt-6 divide-y divide-sand-200 dark:divide-white/10">
                    {tour.options[lang].map((o) => (
                      <li key={o.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                        <div className="min-w-[60%] flex-1">
                          <p className="font-semibold">{o.name}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-sand-700 dark:text-sand-300">{o.detail}</p>
                        </div>
                        <p className="font-display text-lg font-bold text-clay-700 dark:text-clay-200">{o.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <h2 className="mt-12 font-display text-2xl font-bold">{t.detail.itinerary}</h2>
              <ol className="mt-6 space-y-0">
                {tour.itinerary[lang].map((step, i, arr) => (
                  <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay-600 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      {i < arr.length - 1 && <span className="mt-1 w-px flex-1 bg-sand-300 dark:bg-white/15" />}
                    </div>
                    <div className="min-w-0 pb-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-clay-700 dark:text-clay-300">
                        {step.time}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-lg font-bold">{t.detail.included}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {inc[lang].map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{t.detail.notIncluded}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {notInc[lang].map((x) => (
                      <li
                        key={x}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-sand-700 dark:text-sand-400"
                      >
                        <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-night-900">
                <h2 className="font-display text-xl font-bold">{t.detail.priceTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{t.detail.priceLead}</p>

                <div className="mt-4 rounded-2xl bg-clay-600/10 p-4 dark:bg-white/5">
                  <p className="font-display text-3xl font-bold text-clay-700 dark:text-clay-200">
                    {tour.price ? `${tour.price} ${site.currency}` : t.tours.onRequest}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-sand-700 dark:text-sand-300">
                    {tour.priceNote ? tour.priceNote[lang] : t.detail.priceBase}
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className={label} htmlFor="d-people">
                      {t.detail.selectPeople}
                    </label>
                    <input
                      id="d-people"
                      type="number"
                      min="1"
                      max="20"
                      className={field}
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="d-date">
                      {t.detail.date}
                    </label>
                    <input
                      id="d-date"
                      type="date"
                      className={field}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <button onClick={() => openQuote(tour, people, date)} className="btn-whatsapp mt-5 w-full">
                  <WhatsApp className="h-5 w-5" />
                  {t.detail.bookNow}
                </button>
                <Link to={path(lang, "contact")} className="btn-ghost mt-2.5 w-full">
                  {t.detail.askQuestion}
                </Link>
                <p className="mt-4 text-center text-xs leading-relaxed text-sand-700 dark:text-sand-400">
                  {t.detail.noPayment}
                </p>
              </div>
            </aside>
          </div>

          {/* OTHERS */}
          <div className="mt-20 border-t border-sand-200 pt-14 dark:border-white/10">
            <h2 className="font-display text-2xl font-bold">{t.detail.otherTours}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((x) => (
                <TourCard key={x.slug} tour={x} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
