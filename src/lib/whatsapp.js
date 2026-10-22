import site from "../config/site";

/** Construit l'URL wa.me avec un message pré-rempli. */
export function buildWhatsAppUrl(message) {
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** 2026-11-03 → 03/11/2026 (le champ date du navigateur donne le format ISO). */
const formatDate = (d) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
};

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
  if (date) lines.push(`• Date${c}${formatDate(date)}`);
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

/**
 * Message de réservation d'un transfert aéroport.
 * direction : "toHotel" (arrivée) ou "toAirport" (départ).
 */
export function buildTransferMessage({
  lang, direction, airport, city, address, date, time, flight, passengers, luggage, name, note,
}) {
  const fr = lang === "fr";
  const c = fr ? " : " : ": ";
  const arrival = direction === "toHotel";
  const place = [address, city].filter(Boolean).join(", ") || (fr ? "(adresse à préciser)" : "(address to confirm)");
  const air = airport || (fr ? "Aéroport à préciser" : "Airport to confirm");
  const route = arrival ? `${air} → ${place}` : `${place} → ${air}`;

  const lines = [];
  lines.push(fr ? `Bonjour ${site.brand} 👋` : `Hello ${site.brand} 👋`);
  lines.push("");
  lines.push(
    fr
      ? `Je souhaite réserver un transfert ${arrival ? "depuis l'aéroport" : "vers l'aéroport"} :`
      : `I'd like to book a transfer ${arrival ? "from the airport" : "to the airport"}:`
  );
  lines.push(`• ${fr ? "Trajet" : "Route"}${c}${route}`);
  if (date) lines.push(`• Date${c}${formatDate(date)}`);
  if (time)
    lines.push(
      `• ${arrival ? (fr ? "Heure d'atterrissage" : "Landing time") : fr ? "Heure de décollage" : "Take-off time"}${c}${time}`
    );
  if (flight) lines.push(`• ${fr ? "Vol" : "Flight"}${c}${flight.toUpperCase()}`);
  if (passengers) lines.push(`• ${fr ? "Passagers" : "Passengers"}${c}${passengers}`);
  if (luggage !== "" && luggage != null) lines.push(`• ${fr ? "Valises" : "Suitcases"}${c}${luggage}`);
  if (name) lines.push(`• ${fr ? "Nom" : "Name"}${c}${name}`);
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
