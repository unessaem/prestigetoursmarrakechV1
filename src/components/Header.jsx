import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useApp from "../context/useApp";
import { path } from "../lib/routes";
import site from "../config/site";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { Close, Menu, Moon, Sun, WhatsApp } from "./Icons";

export default function Header() {
  const { t, lang, toggleLang, theme, toggleTheme, openQuote } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = path(lang, "home");
  const links = [
    { to: home, label: t.nav.home },
    { to: path(lang, "tours"), label: t.nav.tours },
    { to: path(lang, "about"), label: t.nav.about },
    { to: path(lang, "contact"), label: t.nav.contact },
  ];

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-clay-600/10 text-clay-700 dark:bg-white/10 dark:text-clay-200"
        : "text-night-800/80 hover:text-clay-700 dark:text-sand-200/80 dark:hover:text-white"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled
          ? "border-b border-sand-200 bg-sand-50/90 backdrop-blur dark:border-white/10 dark:bg-night-950/85"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-20">
        <Link to={home} className="flex min-w-0 flex-1 items-center gap-2.5 lg:flex-none lg:shrink-0">
          <Logo size={44} className="shadow-soft" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[15px] font-bold sm:text-base lg:whitespace-nowrap">
              {site.brand}
            </span>
            <span className="hidden truncate text-[11px] text-sand-700 sm:block dark:text-sand-300">
              {site.tagline[lang]}
            </span>
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === home}>
              <span className="whitespace-nowrap">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <SocialLinks size="sm" className="hidden xl:flex" />

          <button
            onClick={toggleLang}
            className="inline-flex h-9 items-center gap-1 rounded-full border border-sand-300 bg-white/70 px-3 text-xs font-bold uppercase tracking-wide text-sand-800 transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-sand-200 dark:hover:bg-white/10"
            title={lang === "fr" ? "Switch to English" : "Passer en français"}
          >
            {lang === "fr" ? "FR" : "EN"}
            <span className="text-sand-400">|</span>
            <span className="font-medium text-sand-700 dark:text-sand-400">{lang === "fr" ? "EN" : "FR"}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.common.lightMode : t.common.darkMode}
            title={theme === "dark" ? t.common.lightMode : t.common.darkMode}
            className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 bg-white/70 text-sand-800 transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-sand-200 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button onClick={() => openQuote()} className="btn-whatsapp hidden h-10 whitespace-nowrap px-4 text-xs sm:inline-flex">
            <WhatsApp className="h-4 w-4" />
            {t.nav.quote}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 bg-white/70 text-sand-800 lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-sand-200"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sand-200 bg-sand-50 lg:hidden dark:border-white/10 dark:bg-night-950">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === home}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-clay-600/10 text-clay-700 dark:bg-white/10 dark:text-clay-200"
                      : "text-night-800 dark:text-sand-200"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button onClick={() => openQuote()} className="btn-whatsapp mt-2 w-full">
              <WhatsApp className="h-4 w-4" />
              {t.nav.quote}
            </button>
            <SocialLinks className="mt-3 justify-center" />
          </div>
        </div>
      )}
    </header>
  );
}
