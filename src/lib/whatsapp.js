import site from "../config/site";

/** Construit l'URL wa.me avec un message pré-rempli. */
export function buildWhatsAppUrl(message) {
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Message complet à partir des champs du formulaire. */
export function buildQuoteMessage({ lang, tourTitle, people, date, name, hotel, note }) {
  const fr = lang === "fr";
  const c = fr ? " : " : ": ";
  const lines = [];
  lines.push(fr ? `Bonjour ${site.brand} 👋` : `Hello ${site.brand} 👋`);
  lines.push("");
  lines.push(fr ? "Je souhaite réserver une excursion privée :" : "I'd like to book a private day trip:");
  if (tourTitle) lines.push(`• ${fr ? "Excursion" : "Tour"}${c}${tourTitle}`);
  if (people) lines.push(`• ${fr ? "Voyageurs" : "Travellers"}${c}${people}`);
  if (date) lines.push(`• Date${c}${date}`);
  if (name) lines.push(`• ${fr ? "Nom" : "Name"}${c}${name}`);
  if (hotel) lines.push(`• ${fr ? "Hébergement" : "Accommodation"}${c}${hotel}`);
  if (note) {
    lines.push("");
    lines.push(`${fr ? "Précisions" : "Notes"}${c}${note}`);
  }
  lines.push("");
  lines.push(fr ? "Merci !" : "Thank you!");
  return lines.join("\n");
}

/** Message court depuis un bouton « Poser une question » ou le bouton flottant. */
export function buildSimpleMessage(lang, tourTitle) {
  const fr = lang === "fr";
  if (tourTitle) {
    return fr
      ? `Bonjour, je suis intéressé(e) par l'excursion privée « ${tourTitle} ». Pouvez-vous me donner vos disponibilités ?`
      : `Hello, I'm interested in the private tour "${tourTitle}". Could you share your availability?`;
  }
  return fr
    ? "Bonjour, je souhaite des informations sur vos excursions privées au départ de Marrakech."
    : "Hello, I'd like information about your private day trips from Marrakech.";
}

export default buildWhatsAppUrl;
