import { Link } from "react-router-dom";
import useApp from "../context/useApp";
import site from "../config/site";
import SmartImage from "./SmartImage";
import { path } from "../lib/routes";
import { Arrow, Clock, Star } from "./Icons";

export default function TourCard({ tour }) {
  const { t, lang } = useApp();
  const href = path(lang, "tour", tour.slug);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-sand-300 hover:shadow-soft dark:border-white/10 dark:bg-night-900 dark:hover:border-white/20">
      <Link to={href} className="relative block aspect-[4/3] overflow-hidden">
        <SmartImage
          name={tour.slug}
          alt={tour.title[lang]}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        {tour.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-clay-700 shadow-sm">
            <Star className="h-3 w-3" /> {t.tours.popular}
          </span>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-white">
          <Clock className="h-3.5 w-3.5" /> {tour.duration[lang]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug">
          <Link to={href} className="transition hover:text-clay-600 dark:hover:text-clay-300">
            {tour.title[lang]}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-sand-700 dark:text-sand-300">
          {tour.short[lang]}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-sand-200 pt-4 dark:border-white/10">
          <span>
            <span className="block text-[11px] uppercase tracking-wide text-sand-700 dark:text-sand-400">
              {t.tours.priceFrom}
            </span>
            <span className="font-display text-xl font-bold text-clay-700 dark:text-clay-300">
              {tour.price ? `${tour.price} ${site.currency}` : t.tours.onRequest}
            </span>
          </span>
          <Link
            to={href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-clay-700 transition dark:text-clay-300"
          >
            {t.tours.details}
            <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
