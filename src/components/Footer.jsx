import { Link } from "react-router-dom";
import useApp from "../context/useApp";
import site from "../config/site";
import tours from "../data/tours";
import { path } from "../lib/routes";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { Mail, Phone, Pin, WhatsApp } from "./Icons";
import { buildSimpleMessage, buildWhatsAppUrl } from "../lib/whatsapp";

export default function Footer() {
  const { t, lang } = useApp();
  const top = tours.filter((x) => x.popular).slice(0, 5);

  return (
    <footer className="mt-8 border-t border-sand-200 bg-white/60 dark:border-white/10 dark:bg-night-900/60">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={40} />
            <span className="font-display text-base font-bold">{site.brand}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{t.footer.tagline}</p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-clay-700 dark:text-clay-300">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: path(lang, "home"), label: t.nav.home },
              { to: path(lang, "tours"), label: t.nav.tours },
              { to: path(lang, "about"), label: t.nav.about },
              { to: path(lang, "contact"), label: t.nav.contact },
            ].map((l) => (
              <li key={l.to}>
                <Link className="text-sand-700 transition hover:text-clay-600 dark:text-sand-300 dark:hover:text-white" to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-clay-700 dark:text-clay-300">
            {t.footer.topTours}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {top.map((x) => (
              <li key={x.slug}>
                <Link
                  className="text-sand-700 transition hover:text-clay-600 dark:text-sand-300 dark:hover:text-white"
                  to={path(lang, "tour", x.slug)}
                >
                  {x.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-clay-700 dark:text-clay-300">
            {t.footer.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-sand-700 dark:text-sand-300">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-clay-600 dark:text-clay-300" />
              <a href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-clay-600 dark:hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-clay-600 dark:text-clay-300" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-clay-600 dark:hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Pin className="h-4 w-4 shrink-0 text-clay-600 dark:text-clay-300" />
              {site.city[lang]}
            </li>
          </ul>
          <a
            href={buildWhatsAppUrl(buildSimpleMessage(lang))}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-whatsapp mt-5 w-full"
          >
            <WhatsApp className="h-4 w-4" />
            {t.common.whatsapp}
          </a>
        </div>
      </div>

      <div className="border-t border-sand-200 py-6 dark:border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 text-xs text-sand-700 sm:flex-row dark:text-sand-400">
          <p>
            © {new Date().getFullYear()} {site.brand}. {t.footer.rights}
          </p>
          <p>{t.footer.madeIn} 🇲🇦</p>
        </div>
      </div>
    </footer>
  );
}
