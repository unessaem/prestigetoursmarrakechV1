import { Link } from "react-router-dom";
import useApp from "../context/useApp";
import site from "../config/site";
import tours from "../data/tours";
import { path } from "../lib/routes";
import TourCard from "../components/TourCard";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import { Arrow, Car, Check, Clock, Globe, Shield, Star, Users, WhatsApp } from "../components/Icons";

const uspIcons = [Shield, Car, Globe, Clock, Check, Users];

export default function Home() {
  const { t, lang, openQuote } = useApp();
  const featured = tours.filter((x) => x.popular).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <SmartImage
          name="hero"
          priority
          alt={
            lang === "fr"
              ? "Route de montagne dans le Haut Atlas au lever du soleil, au départ de Marrakech"
              : "Mountain road in the High Atlas at sunrise, on a day trip from Marrakech"
          }
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/55 via-night-950/35 to-night-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950/70 via-night-950/25 to-transparent" />
        <div className="container-x relative flex min-h-[80vh] flex-col justify-center py-24 text-white">
          <div className="max-w-2xl animate-fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
              <Star className="h-3 w-3 text-clay-300" />
              {t.hero.badge}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-6xl">{t.hero.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{t.hero.subtitle}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => openQuote()} className="btn-whatsapp text-base">
                <WhatsApp className="h-5 w-5" />
                {t.hero.ctaPrimary}
              </button>
              <Link
                to={path(lang, "tours")}
                className="btn border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.hero.ctaSecondary} <Arrow className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-7">
              {[
                [site.experienceYears, t.hero.stat1],
                [tours.length, t.hero.stat2],
                [t.hero.stat3Value, t.hero.stat3],
              ].map(([n, label]) => (
                <div key={label}>
                  <dt className="font-display text-3xl font-bold text-clay-200">{n}</dt>
                  <dd className="mt-1 text-xs leading-snug text-white/70">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow={lang === "fr" ? "3 étapes" : "3 steps"} title={t.how.title} subtitle={t.how.subtitle} />
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {t.how.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="font-display text-4xl font-bold text-clay-800/70 dark:text-clay-300/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <button onClick={() => openQuote()} className="btn-whatsapp">
              <WhatsApp className="h-5 w-5" />
              {t.hero.ctaPrimary}
            </button>
          </div>
        </div>
      </section>

      {/* EXCURSIONS */}
      <section className="section border-y border-sand-200 bg-white/60 dark:border-white/10 dark:bg-night-900/50">
        <div className="container-x">
          <SectionHeading eyebrow={t.nav.tours} title={t.tours.title} subtitle={t.tours.subtitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to={path(lang, "tours")} className="btn-primary">
              {t.tours.viewAll} <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow={lang === "fr" ? "La différence" : "The difference"} title={t.usp.title} subtitle={t.usp.subtitle} />
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {t.usp.items.map((item, i) => {
              const Icon = uspIcons[i % uspIcons.length];
              return (
                <div key={item.title}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-clay-600/10 text-clay-700 dark:bg-white/10 dark:text-clay-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Reviews />
      <Faq />

      {/* CTA */}
      <section className="pb-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white sm:px-12">
            <SmartImage
              name="desert-agafay"
              alt={lang === "fr" ? "Désert d'Agafay au coucher du soleil" : "The Agafay desert at sunset"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-night-950/70" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                {lang === "fr" ? "Parlons de votre journée" : "Let's plan your day"}
              </h2>
              <p className="mt-4 text-white/85">
                {lang === "fr"
                  ? "Dites-nous où vous voulez aller et combien vous êtes : vous recevez une réponse sur WhatsApp en moins d'une heure."
                  : "Tell us where you want to go and how many you are: you'll get an answer on WhatsApp in under an hour."}
              </p>
              <button onClick={() => openQuote()} className="btn-whatsapp mt-8 text-base">
                <WhatsApp className="h-5 w-5" />
                {t.hero.ctaPrimary}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
