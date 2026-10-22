import useApp from "../context/useApp";
import site from "../config/site";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import Reviews from "../components/Reviews";
import { Check, WhatsApp } from "../components/Icons";

export default function About() {
  const { t, lang, openQuote } = useApp();

  return (
    <>
      <div className="section">
        <div className="container-x">
          <SectionHeading eyebrow={t.nav.about} title={t.about.title} subtitle={t.about.lead} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="space-y-5">
              {t.about.body.map((p) => (
                <p key={p} className="leading-relaxed text-sand-800 dark:text-sand-200">
                  {p}
                </p>
              ))}

              <div className="mt-8 rounded-3xl border border-sand-200 bg-white p-6 dark:border-white/10 dark:bg-night-900">
                <h2 className="font-display text-lg font-bold">{t.about.valuesTitle}</h2>
                <ul className="mt-4 space-y-2.5">
                  {t.about.values.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay-600 dark:text-clay-300" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => openQuote()} className="btn-whatsapp mt-6 w-full">
                  <WhatsApp className="h-5 w-5" />
                  {t.hero.ctaPrimary}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SmartImage
                name="about-1"
                alt={
                  lang === "fr"
                    ? "Col de montagne du Haut Atlas sur la route d'une excursion depuis Marrakech"
                    : "High Atlas mountain pass on a day trip from Marrakech"
                }
                className="h-64 w-full rounded-3xl object-cover sm:col-span-2 sm:h-72"
              />
              <SmartImage
                name="about-2"
                alt={lang === "fr" ? "Thé à la menthe servi lors d'une pause en excursion" : "Mint tea served during a stop on tour"}
                className="h-44 w-full rounded-3xl object-cover sm:h-52"
              />
              <SmartImage
                name="about-3"
                alt={lang === "fr" ? "Étal de fruits au bord de la route près de Marrakech" : "Roadside fruit stall near Marrakech"}
                className="h-44 w-full rounded-3xl object-cover sm:h-52"
              />

              <dl className="grid grid-cols-3 gap-4 rounded-3xl border border-sand-200 bg-white p-5 text-center sm:col-span-2 dark:border-white/10 dark:bg-night-900">
                {[
                  [site.experienceYears, t.hero.stat1],
                  [site.rating, lang === "fr" ? "note moyenne" : "average rating"],
                  [site.reviewsCount, lang === "fr" ? "voyageurs" : "travellers"],
                ].map(([n, labelText]) => (
                  <div key={labelText}>
                    <dt className="font-display text-2xl font-bold text-clay-700 dark:text-clay-200">{n}</dt>
                    <dd className="mt-1 text-[11px] leading-snug text-sand-700 dark:text-sand-400">{labelText}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <Reviews />
    </>
  );
}
