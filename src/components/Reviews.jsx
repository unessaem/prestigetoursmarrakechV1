import useApp from "../context/useApp";
import site from "../config/site";
import SectionHeading from "./SectionHeading";
import { Star } from "./Icons";

export default function Reviews() {
  const { t } = useApp();

  return (
    <section className="section bg-white/60 dark:bg-night-900/50">
      <div className="container-x">
        <SectionHeading eyebrow={`${site.rating}/5 · ${site.reviewsCount}`} title={t.reviews.title} subtitle={t.reviews.subtitle} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {t.reviews.items.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-sand-200 bg-white p-6 dark:border-white/10 dark:bg-night-900">
              <div className="flex gap-0.5 text-clay-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-sand-800 dark:text-sand-200">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-sand-200 pt-4 text-sm dark:border-white/10">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-clay-600/10 font-semibold text-clay-700 dark:bg-white/10 dark:text-clay-200">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="block text-xs text-sand-700 dark:text-sand-400">
                    {r.country} · {r.tour}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
