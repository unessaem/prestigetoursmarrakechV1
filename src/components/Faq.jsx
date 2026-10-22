import { useState } from "react";
import useApp from "../context/useApp";
import SectionHeading from "./SectionHeading";
import { Chevron } from "./Icons";

export default function Faq() {
  const { t } = useApp();
  const [open, setOpen] = useState(0);

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="FAQ" title={t.faq.title} />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-night-900">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold transition hover:bg-sand-50 dark:hover:bg-white/5"
                >
                  {item.q}
                  <Chevron className={`h-4 w-4 shrink-0 text-clay-600 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
