import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import translations from "../i18n/translations";
import { otherLangPath, parsePath } from "../lib/routes";

export const AppContext = createContext(null);

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem("ptm-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* stockage indisponible */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function AppProvider({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // La langue vient de l'URL (/fr/... ou /en/...), pas du navigateur :
  // chaque langue a ses propres pages indexables.
  const lang = parsePath(pathname).lang;

  const [theme, setTheme] = useState(getInitialTheme);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteTour, setQuoteTour] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem("ptm-theme", theme);
    } catch {
      /* stockage indisponible */
    }
  }, [theme]);

  const t = useMemo(() => translations[lang], [lang]);

  const toggleTheme = useCallback(() => setTheme((v) => (v === "dark" ? "light" : "dark")), []);

  const toggleLang = useCallback(() => {
    const target = lang === "fr" ? "en" : "fr";
    try {
      window.localStorage.setItem("ptm-lang", target);
    } catch {
      /* stockage indisponible */
    }
    navigate(otherLangPath(pathname, target));
  }, [lang, pathname, navigate]);

  const openQuote = useCallback((tour = null, people = null, date = null) => {
    setQuoteTour(tour ? { ...tour, people, date } : null);
    setQuoteOpen(true);
  }, []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const value = useMemo(
    () => ({ lang, toggleLang, theme, toggleTheme, t, quoteOpen, quoteTour, openQuote, closeQuote }),
    [lang, toggleLang, theme, toggleTheme, t, quoteOpen, quoteTour, openQuote, closeQuote]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
