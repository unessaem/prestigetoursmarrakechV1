// ============================================================
//  PRÉ-RENDU — transforme l'application React en pages HTML
//  statiques, une par URL (/fr/, /fr/excursions/..., /en/..., etc.).
//
//  Pourquoi : Google indexe mieux du HTML déjà écrit que du
//  JavaScript à exécuter, et le visiteur voit la page tout de suite.
//
//  Lancé automatiquement par `npm run build`.
// ============================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR = path.join(ROOT, ".ssr-build");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

let template = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

// La feuille de style est injectée directement dans la page au lieu d'être
// chargée par un <link>. Cela supprime un aller-retour réseau avant le
// premier affichage — le point le plus coûteux sur mobile. La navigation
// d'une page à l'autre se fait ensuite sans recharger le HTML, donc rien
// n'est perdu côté cache.
template = template.replace(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g,
  (match, href) => {
    const file = path.join(DIST, href.replace(/^\//, ""));
    if (!fs.existsSync(file)) return match;
    return `<style>${fs.readFileSync(file, "utf-8")}</style>`;
  }
);
const { render, allRoutes, ORIGIN } = await import(path.join(SSR, "entry-server.js"));

// Les photos .jpg que le client n'a pas encore fournies sont remplacées par
// l'illustration .svg directement dans le HTML, pour ne pas livrer d'images
// cassées aux robots.
const haveJpg = new Set(
  fs.existsSync(PUBLIC_IMAGES)
    ? fs.readdirSync(PUBLIC_IMAGES).filter((f) => f.endsWith(".jpg")).map((f) => f.slice(0, -4))
    : []
);
const fixImages = (html) =>
  html.replace(/\/images\/([a-z0-9-]+)\.jpg/g, (m, name) => (haveJpg.has(name) ? m : `/images/${name}.svg`));

const routes = allRoutes();
const written = [];

for (const route of routes) {
  const { html, head, lang } = render(route.url);
  const page = template
    .replace('<html lang="fr">', `<html lang="${lang}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", fixImages(html));

  const dir = path.join(DIST, route.url.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page);
  written.push(route.url);
}

// ---- page 404 ------------------------------------------------------------
{
  const { html, head, lang } = render("/404");
  fs.writeFileSync(
    path.join(DIST, "404.html"),
    template
      .replace('<html lang="fr">', `<html lang="${lang}">`)
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", fixImages(html))
  );
}

// ---- racine : redirige vers la langue du visiteur -------------------------
fs.writeFileSync(
  path.join(DIST, "index.html"),
  `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Prestige Tours Marrakech</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${ORIGIN}/fr">
<meta http-equiv="refresh" content="0; url=/fr">
<script>
  (function () {
    var en = (navigator.language || "fr").toLowerCase().indexOf("fr") !== 0;
    try { var s = localStorage.getItem("ptm-lang"); if (s === "fr" || s === "en") en = s === "en"; } catch (e) {}
    location.replace(en ? "/en" : "/fr");
  })();
</script>
</head>
<body><p>Redirection… <a href="/fr">Excursions privées depuis Marrakech</a></p></body>
</html>
`
);

// ---- sitemap.xml ---------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const priorityFor = (key) => (key === "home" ? "1.0" : key === "tour" || key === "tours" ? "0.9" : "0.6");

const urls = routes
  .map((r) => {
    const alts = routes
      .filter((o) => o.key === r.key && o.slug === r.slug)
      .map((o) => `    <xhtml:link rel="alternate" hreflang="${o.lang}" href="${ORIGIN}${o.url}"/>`)
      .join("\n");
    return `  <url>
    <loc>${ORIGIN}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(r.key)}</priority>
${alts}
  </url>`;
  })
  .join("\n");

fs.writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
);

// ---- robots.txt ----------------------------------------------------------
fs.writeFileSync(
  path.join(DIST, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`
);

// ---- en-têtes de cache Cloudflare ----------------------------------------
fs.writeFileSync(
  path.join(DIST, "_headers"),
  `/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000

/*.png
  Cache-Control: public, max-age=2592000

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`
);

fs.rmSync(SSR, { recursive: true, force: true });

console.log(`\n  Pré-rendu : ${written.length} pages + 404 + sitemap.xml + robots.txt`);
console.log(`  ${written.join("  ")}\n`);
