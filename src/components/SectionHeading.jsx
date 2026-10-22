export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sand-700 dark:text-sand-300">{subtitle}</p>}
    </div>
  );
}
