// ============================================================
//  AÉROPORTS PROPOSÉS DANS LE FORMULAIRE DE TRANSFERT
//
//  « city » pré-remplit la ville de prise en charge / dépose
//  quand le client choisit l'aéroport (il peut la modifier).
//  Pour ajouter un aéroport, copiez une ligne et adaptez-la.
// ============================================================

export const airports = [
  { code: "RAK", city: "Marrakech", fr: "Marrakech Ménara", en: "Marrakech Menara" },
  { code: "CMN", city: "Casablanca", fr: "Casablanca Mohammed V", en: "Casablanca Mohammed V" },
  { code: "AGA", city: "Agadir", fr: "Agadir Al Massira", en: "Agadir Al Massira" },
  { code: "ESU", city: "Essaouira", fr: "Essaouira Mogador", en: "Essaouira Mogador" },
  { code: "OZZ", city: "Ouarzazate", fr: "Ouarzazate", en: "Ouarzazate" },
  { code: "FEZ", city: "Fès", fr: "Fès-Saïss", en: "Fes-Saiss" },
  { code: "RBA", city: "Rabat", fr: "Rabat-Salé", en: "Rabat-Sale" },
  { code: "TNG", city: "Tanger", fr: "Tanger Ibn Battouta", en: "Tangier Ibn Battouta" },
];

export const airportLabel = (code, lang) => {
  const a = airports.find((x) => x.code === code);
  return a ? `${a[lang] || a.fr} (${a.code})` : null;
};

export default airports;
