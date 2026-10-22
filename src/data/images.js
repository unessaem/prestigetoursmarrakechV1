// ============================================================
//  FICHIER GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier à la main.
//  Produit par scripts/gen-image-manifest.mjs à chaque build.
//
//  Photos .jpg actuellement présentes dans public/images/ :
//  (aucune pour l'instant — les illustrations provisoires sont utilisées)
// ============================================================

export const photos = new Set([]);

/** Chemin de l'image à afficher pour une excursion donnée. */
export const imageSrc = (name) => `/images/${name}.${photos.has(name) ? "jpg" : "svg"}`;

export default photos;
