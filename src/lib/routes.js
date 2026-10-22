// ============================================================
//  URLs bilingues — /fr/... et /en/...
//  Chaque langue a ses propres adresses, indexées séparément
//  par Google, et reliées entre elles par les balises hreflang.
// ============================================================

export const LANGS = ["fr", "en"];
export const DEFAULT_LANG = "fr";

const SEGMENTS = {
  fr: { tours: "excursions", about: "a-propos", contact: "contact" },
  en: { tours: "tours", about: "about", contact: "contact" },
};

export const segment = (lang, key) => (SEGMENTS[lang] || SEGMENTS[DEFAULT_LANG])[key];

/** Construit une URL : path("fr", "tour", "vallee-ourika") → /fr/excursions/vallee-ourika */
export function path(lang, key, slug) {
  const l = LANGS.includes(lang) ? lang : DEFAULT_LANG;
  if (key === "home") return `/${l}`;
  if (key === "tour") return `/${l}/${segment(l, "tours")}/${slug}`;
  return `/${l}/${segment(l, key)}`;
}

/** Décompose une URL en { lang, key, slug }. */
export function parsePath(pathname) {
  const parts = String(pathname || "/").replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const hasLang = LANGS.includes(parts[0]);
  const lang = hasLang ? parts[0] : DEFAULT_LANG;
  const rest = hasLang ? parts.slice(1) : parts;

  if (rest.length === 0) return { lang, key: "home" };

  const seg = SEGMENTS[lang];
  if (rest[0] === seg.tours) return { lang, key: rest[1] ? "tour" : "tours", slug: rest[1] };
  if (rest[0] === seg.about) return { lang, key: "about" };
  if (rest[0] === seg.contact) return { lang, key: "contact" };
  return { lang, key: "notfound" };
}

/** Même page, autre langue. */
export function otherLangPath(pathname, target) {
  const { key, slug } = parsePath(pathname);
  if (key === "notfound") return `/${target}`;
  return path(target, key, slug);
}
