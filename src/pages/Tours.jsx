import { useState } from "react";
import useApp from "../context/useApp";
import tours, { categories } from "../data/tours";
import TourCard from "../components/TourCard";
import SectionHeading from "../components/SectionHeading";

export default function Tours() {
  const { t, lang } = useApp();
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? tours : tours.filter((x) => x.category === cat);

  return (
    <div className="section">
      <div className="container-x">
        <SectionHeading eyebrow={t.nav.tours} title={t.tours.title} subtitle={t.tours.subtitle} />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                cat === c.id
                  ? "bg-clay-600 text-white shadow-soft"
                  : "border border-sand-300 bg-white/70 text-sand-800 hover:border-clay-400 dark:border-white/15 dark:bg-white/5 dark:text-sand-200"
              }`}
            >
              {c[lang]}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-sand-700 dark:text-sand-400">{t.tours.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
