// ============================================================
//  Génération des balises <head> et des données structurées.
//  Ce module est utilisé à deux endroits :
//   - dans le navigateur, par <Seo /> ;
//   - au build, par scripts/prerender.mjs, qui écrit ces balises
//     en dur dans chaque page HTML pour Google.
// ============================================================

import site from "../config/site";
import tours, { getTour } from "../data/tours";
import translations from "../i18n/translations";
import { pageSeo, tourSeo } from "../data/seo";
import { imageSrc } from "../data/images";
import { LANGS, parsePath, path } from "./routes";

export const ORIGIN = `https://${site.domain}`;

const abs = (p) => `${ORIGIN}${p}`;
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Liste de toutes les URLs du site, pour le sitemap et le pré-rendu. */
export function allRoutes() {
  const out = [];
  for (const lang of LANGS) {
    out.push({ lang, key: "home", url: path(lang, "home") });
    out.push({ lang, key: "tours", url: path(lang, "tours") });
    for (const tour of tours) {
      out.push({ lang, key: "tour", slug: tour.slug, url: path(lang, "tour", tour.slug) });
    }
    out.push({ lang, key: "about", url: path(lang, "about") });
    out.push({ lang, key: "contact", url: path(lang, "contact") });
  }
  return out;
}

/** Titre + description + données structurées pour une URL donnée. */
export function metaFor(pathname) {
  const { lang, key, slug } = parsePath(pathname);
  const t = translations[lang];
  const tour = key === "tour" ? getTour(slug) : null;
  const resolvedKey = key === "tour" && !tour ? "notfound" : key;

  let base;
  if (resolvedKey === "tour") {
    base = (tourSeo[tour.slug] || {})[lang] || {
      title: tour.title[lang],
      description: tour.short[lang],
    };
  } else {
    base = (pageSeo[resolvedKey] || pageSeo.notfound)[lang];
  }

  // Le prix rejoint le titre quand il reste de la place (Google coupe vers 60).
  let title = base.title;
  if (resolvedKey === "tour" && tour.price) {
    const withPrice = `${title} — ${tour.price} ${site.currency}`;
    if (withPrice.length <= 62) title = withPrice;
  }
  const fullTitle = resolvedKey === "home" ? `${title} | ${site.brand}` : `${title} | ${site.brand}`;

  const canonicalPath = resolvedKey === "tour" ? path(lang, "tour", tour.slug) : path(lang, resolvedKey === "notfound" ? "home" : resolvedKey);
  const alternates = LANGS.map((l) => ({
    lang: l,
    href: abs(resolvedKey === "tour" ? path(l, "tour", tour.slug) : path(l, resolvedKey === "notfound" ? "home" : resolvedKey)),
  }));

  // Vignette des partages (WhatsApp, Facebook, X). Ces plateformes n'affichent
  // pas les illustrations .svg : tant que la vraie photo .jpg n'est pas
  // déposée, on partage le logo.
  const tourPhoto = resolvedKey === "tour" ? imageSrc(tour.slug) : null;
  const image = tourPhoto && tourPhoto.endsWith(".jpg") ? abs(tourPhoto) : abs("/logo-full.png");

  // Grande image affichée en haut de page : on la déclare dans le <head> pour
  // que le navigateur la télécharge sans attendre d'avoir lu toute la page.
  // C'est elle que Google chronomètre (« Largest Contentful Paint »).
  const heroImage =
    resolvedKey === "home" ? imageSrc("hero") : resolvedKey === "tour" ? imageSrc(tour.slug) : null;

  return {
    lang,
    key: resolvedKey,
    tour,
    heroImage,
    title: fullTitle,
    description: base.description,
    canonical: abs(canonicalPath),
    alternates,
    image,
    noindex: resolvedKey === "notfound",
    jsonLd: buildJsonLd({ lang, key: resolvedKey, tour, t, canonical: abs(canonicalPath) }),
  };
}

// ---------------------------------------------------------------- JSON-LD

function organization() {
  // On n'envoie à Google que les vrais profils : tant que le lien pointe sur
  // l'accueil du réseau (valeur par défaut), il est ignoré.
  const socials = Object.values(site.social).filter((u) => {
    if (!u) return false;
    try {
      return new URL(u).pathname.replace(/\/+$/, "").length > 0;
    } catch {
      return false;
    }
  });
  return {
    "@type": "TravelAgency",
    "@id": `${ORIGIN}/#organization`,
    name: site.brand,
    url: ORIGIN,
    logo: abs("/logo-full.png"),
    image: abs("/logo-full.png"),
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "600–2000 MAD",
    currenciesAccepted: "MAD",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      postalCode: "40000",
      addressCountry: "MA",
    },
    areaServed: { "@type": "City", name: "Marrakech" },
    sameAs: socials,
    aggregateRating: undefined,
  };
}

function buildJsonLd({ lang, key, tour, t, canonical }) {
  const graph = [organization()];

  graph.push({
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    url: ORIGIN,
    name: site.brand,
    inLanguage: lang,
    publisher: { "@id": `${ORIGIN}/#organization` },
  });

  if (key === "home" || key === "contact") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (key === "tours") {
    graph.push({
      "@type": "ItemList",
      itemListElement: tours.map((x, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: x.title[lang],
        url: abs(path(lang, "tour", x.slug)),
      })),
    });
  }

  if (key === "tour" && tour) {
    graph.push({
      "@type": "TouristTrip",
      "@id": `${canonical}#trip`,
      name: tour.title[lang],
      description: tour.short[lang],
      url: canonical,
      image: abs(`/images/${tour.slug}.jpg`),
      inLanguage: lang,
      touristType: lang === "fr" ? "Voyageurs individuels, familles, couples" : "Independent travellers, families, couples",
      provider: { "@id": `${ORIGIN}/#organization` },
      itinerary: {
        "@type": "ItemList",
        itemListElement: tour.itinerary[lang].map((step, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: step.title,
        })),
      },
      ...(tour.price
        ? {
            offers: {
              "@type": "Offer",
              price: String(tour.price),
              priceCurrency: "MAD",
              availability: "https://schema.org/InStock",
              url: canonical,
              seller: { "@id": `${ORIGIN}/#organization` },
            },
          }
        : {}),
    });

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.nav.home, item: abs(path(lang, "home")) },
        { "@type": "ListItem", position: 2, name: t.nav.tours, item: abs(path(lang, "tours")) },
        { "@type": "ListItem", position: 3, name: tour.title[lang], item: canonical },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ---------------------------------------------------------------- <head>

/** Rend les balises <head> sous forme de chaîne HTML (utilisé au build). */
export function headTags(meta) {
  const lines = [
    ...(meta.heroImage
      ? [`<link rel="preload" as="image" href="${meta.heroImage}" fetchpriority="high">`]
      : []),
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    `<link rel="canonical" href="${meta.canonical}">`,
    ...meta.alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}">`),
    `<link rel="alternate" hreflang="x-default" href="${meta.alternates[0].href}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(site.brand)}">`,
    `<meta property="og:locale" content="${meta.lang === "fr" ? "fr_FR" : "en_GB"}">`,
    `<meta property="og:url" content="${meta.canonical}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:image" content="${meta.image}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${meta.image}">`,
  ];
  if (meta.noindex) lines.push(`<meta name="robots" content="noindex, follow">`);
  lines.push(
    `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c")}</script>`
  );
  return lines.join("\n    ");
}

export default metaFor;
