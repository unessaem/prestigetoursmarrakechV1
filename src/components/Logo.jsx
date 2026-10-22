import site from "../config/site";

/** Le pictogramme de la marque. Remplacez public/logo-badge.png pour le changer. */
export default function Logo({ size = 44, className = "" }) {
  return (
    <img
      src="/logo-badge.png"
      srcSet="/logo-badge.png 1x, /logo-badge@2x.png 2x"
      alt={site.brand}
      width={size}
      height={size}
      className={`shrink-0 rounded-xl object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
