// ============================================================
//  Liste les photos .jpg réellement présentes dans public/images/
//  et écrit src/data/images.js.
//
//  Pourquoi : sans cette liste, le site demanderait au navigateur
//  un .jpg qui n'existe pas, recevrait une erreur 404, puis
//  afficherait l'illustration .svg — une requête perdue et une
//  image qui clignote sur chaque fiche.
//
//  Lancé automatiquement par `npm run build`. Après avoir déposé
//  de nouvelles photos, relancez simplement le build.
// ============================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "src", "data", "images.js");

const photos = fs.existsSync(IMAGES)
  ? fs
      .readdirSync(IMAGES)
      .filter((f) => /\.jpe?g$/i.test(f))
      .map((f) => f.replace(/\.jpe?g$/i, ""))
      .sort()
  : [];

const body = `// ============================================================
//  FICHIER GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier à la main.
//  Produit par scripts/gen-image-manifest.mjs à chaque build.
//
//  Photos .jpg actuellement présentes dans public/images/ :
//  ${photos.length === 0 ? "(aucune pour l'instant — les illustrations provisoires sont utilisées)" : photos.length + " photo(s)"}
// ============================================================

export const photos = new Set(${JSON.stringify(photos)});

/** Chemin de l'image à afficher pour une excursion donnée. */
export const imageSrc = (name) => \`/images/\${name}.\${photos.has(name) ? "jpg" : "svg"}\`;

export default photos;
`;

fs.writeFileSync(OUT, body);
console.log(`  Images : ${photos.length} photo(s) .jpg détectée(s) dans public/images/`);
