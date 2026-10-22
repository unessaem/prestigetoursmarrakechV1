import { useState } from "react";
import { imageSrc } from "../data/images";

/**
 * Affiche `/images/<name>.jpg` si la photo existe, sinon l'illustration
 * provisoire `/images/<name>.svg`.
 *
 * La liste des photos disponibles est établie au build
 * (scripts/gen-image-manifest.mjs) : le navigateur demande donc
 * directement le bon fichier, sans 404 ni image qui clignote.
 * Déposez vos .jpg dans public/images/ puis relancez `npm run build`.
 *
 * width/height réservent la place avant le chargement, ce qui évite que la
 * page « saute » — un critère noté par Google sur mobile.
 */
export default function SmartImage({
  name,
  alt = "",
  className = "",
  loading = "lazy",
  priority = false,
  width = 1600,
  height = 1000,
}) {
  const [src, setSrc] = useState(() => imageSrc(name));

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setSrc((s) => (s.endsWith(".svg") ? s : `/images/${name}.svg`))}
      className={className}
    />
  );
}
