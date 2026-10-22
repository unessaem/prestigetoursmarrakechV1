import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import metaFor from "../lib/seo";

/**
 * Met à jour <title>, la description, le canonical, les hreflang et le
 * JSON-LD à chaque changement de page.
 *
 * Au build, scripts/prerender.mjs écrit déjà ces balises en dur dans le
 * HTML : ce composant ne sert qu'à la navigation côté navigateur.
 */

function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaFor(pathname);

    document.title = meta.title;
    document.documentElement.lang = meta.lang;

    setTag('meta[name="description"]', () => document.createElement("meta"), {
      name: "description",
      content: meta.description,
    });
    setTag('link[rel="canonical"]', () => document.createElement("link"), {
      rel: "canonical",
      href: meta.canonical,
    });

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    [...meta.alternates, { lang: "x-default", href: meta.alternates[0].href }].forEach((a) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", a.lang);
      link.setAttribute("href", a.href);
      document.head.appendChild(link);
    });

    const og = {
      "og:url": meta.canonical,
      "og:title": meta.title,
      "og:description": meta.description,
      "og:image": meta.image,
      "og:locale": meta.lang === "fr" ? "fr_FR" : "en_GB",
    };
    for (const [property, content] of Object.entries(og)) {
      setTag(`meta[property="${property}"]`, () => document.createElement("meta"), { property, content });
    }
    for (const [name, content] of Object.entries({
      "twitter:title": meta.title,
      "twitter:description": meta.description,
      "twitter:image": meta.image,
    })) {
      setTag(`meta[name="${name}"]`, () => document.createElement("meta"), { name, content });
    }

    const robots = document.head.querySelector('meta[name="robots"]');
    if (meta.noindex) {
      setTag('meta[name="robots"]', () => document.createElement("meta"), {
        name: "robots",
        content: "noindex, follow",
      });
    } else if (robots) {
      robots.remove();
    }

    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify(meta.jsonLd);
    document.head.appendChild(ld);
  }, [pathname]);

  return null;
}
