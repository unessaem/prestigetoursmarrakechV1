import useApp from "../context/useApp";
import site from "../config/site";
import SectionHeading from "../components/SectionHeading";
import SocialLinks from "../components/SocialLinks";
import Faq from "../components/Faq";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { Clock, Mail, Phone, Pin, WhatsApp } from "../components/Icons";

export default function Contact() {
  const { t, lang, openQuote } = useApp();

  const rows = [
    {
      Icon: WhatsApp,
      title: t.contact.whatsapp,
      value: site.phoneDisplay,
      href: buildWhatsAppUrl(
        lang === "fr"
          ? "Bonjour, je souhaite des informations sur vos excursions privées."
          : "Hello, I'd like information about your private tours."
      ),
    },
    { Icon: Phone, title: t.contact.phone, value: site.phoneDisplay, href: `tel:${site.phoneDisplay.replace(/\s/g, "")}` },
    { Icon: Mail, title: t.contact.email, value: site.email, href: `mailto:${site.email}` },
    { Icon: Pin, title: t.contact.location, value: site.city[lang] },
    { Icon: Clock, title: lang === "fr" ? "Horaires" : "Hours", value: t.contact.hours },
  ];

  return (
    <>
      <div className="section">
        <div className="container-x">
          <SectionHeading eyebrow={t.nav.contact} title={t.contact.title} subtitle={t.contact.subtitle} />

          <div className="mx-auto mt-12 max-w-3xl">
            <ul className="grid gap-4 sm:grid-cols-2">
              {rows.map(({ Icon, title, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clay-600/10 text-clay-700 dark:bg-white/10 dark:text-clay-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-sand-700 dark:text-sand-400">
                        {title}
                      </p>
                      <p className="mt-0.5 break-words text-sm font-semibold leading-snug">{value}</p>
                    </div>
                  </>
                );
                return (
                  <li key={title}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer noopener"
                        className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 transition hover:border-clay-400 hover:shadow-soft dark:border-white/10 dark:bg-night-900 dark:hover:border-clay-400/50"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 dark:border-white/10 dark:bg-night-900">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-3xl bg-clay-600/10 p-6 text-center dark:bg-white/5">
              <p className="text-sm leading-relaxed text-sand-800 dark:text-sand-200">{t.quote.subtitle}</p>
              <button onClick={() => openQuote()} className="btn-whatsapp mt-5">
                <WhatsApp className="h-5 w-5" />
                {t.hero.ctaPrimary}
              </button>
            </div>

            <div className="mt-10 text-center">
              <p className="eyebrow">{t.contact.followUs}</p>
              <div className="mt-4 flex justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Faq />
    </>
  );
}
