// ============================================================
//  DONNÉES DES EXCURSIONS PRIVÉES
//
//  PRIX — champ "price" : montant en dirhams pour le circuit privé
//  (transport aller-retour, chauffeur inclus). Mettre null pour
//  afficher « Sur demande ».
//
//  PHOTOS — aucune configuration nécessaire :
//  déposez "<slug>.jpg" dans public/images/ et la photo remplace
//  automatiquement l'illustration provisoire.
//  Exemple : public/images/vallee-ourika.jpg
// ============================================================

export const categories = [
  { id: "all", fr: "Toutes", en: "All" },
  { id: "desert", fr: "Désert", en: "Desert" },
  { id: "montagne", fr: "Montagne", en: "Mountains" },
  { id: "cote", fr: "Côte & Villes", en: "Coast & Cities" },
  { id: "transfert", fr: "Transferts", en: "Transfers" },
];

export const tours = [
  // ----------------------------------------------------------------
  {
    slug: "transfert-aeroport",
    category: "transfert",
    popular: true,
    price: null,
    duration: { fr: "Selon le trajet", en: "Depends on the route" },
    distance: { fr: "Tous les aéroports du Maroc", en: "Every airport in Morocco" },
    pickup: { fr: "24h/24 — vol suivi en temps réel", en: "24/7 — flight tracked in real time" },
    title: { fr: "Transferts aéroport", en: "Airport Transfers" },
    short: {
      fr: "Accueil à l'arrivée avec pancarte à votre nom, chauffeur privé, trajet direct porte à porte — depuis ou vers l'aéroport.",
      en: "Met on arrival with a name sign, private driver, direct door-to-door ride — from or to the airport.",
    },
    description: {
      fr: "Le premier et le dernier moment de votre voyage sont souvent les plus stressants : un vol de nuit, des bagages, une médina impossible à trouver. Nous prenons tout en charge. Votre chauffeur suit votre vol en temps réel, vous attend dans le hall avec une pancarte à votre nom, vous aide avec les bagages et vous dépose directement à la porte de votre riad ou de votre hôtel. Nous couvrons tous les aéroports du Maroc : Marrakech Ménara, Casablanca Mohammed V, Agadir, Fès, Tanger, Essaouira et Ouarzazate.",
      en: "The first and last moments of a trip are often the most stressful: a night flight, luggage, a medina impossible to find. We handle all of it. Your driver tracks your flight in real time, waits in the arrivals hall with a name sign, helps with the bags and drops you right at the door of your riad or hotel. We cover every airport in Morocco: Marrakech Menara, Casablanca Mohammed V, Agadir, Fes, Tangier, Essaouira and Ouarzazate.",
    },
    highlights: {
      fr: [
        "Accueil dans le hall avec une pancarte à votre nom",
        "Vol suivi en temps réel : aucun supplément si votre avion a du retard",
        "Tous les aéroports du Maroc, départ comme arrivée",
        "Disponible 24h/24, y compris pour les vols de nuit",
        "Dépose à la porte, accompagnement à pied si le riad est au cœur de la médina",
      ],
      en: [
        "Met in the arrivals hall with a name sign",
        "Flight tracked in real time: no extra charge if your plane is late",
        "Every airport in Morocco, arrivals and departures",
        "Available 24/7, night flights included",
        "Door-to-door drop-off, walked to your riad if it sits deep in the medina",
      ],
    },
    itinerary: {
      fr: [
        { time: "Réservation", title: "Vous envoyez vos informations", text: "Numéro de vol, date, heure d'atterrissage et adresse d'arrivée. Un message WhatsApp suffit." },
        { time: "J-1", title: "Confirmation", text: "Vous recevez le nom et le numéro de votre chauffeur la veille du trajet." },
        { time: "Arrivée", title: "Accueil à l'aéroport", text: "Votre chauffeur vous attend dans le hall, pancarte à votre nom, et vous aide avec les bagages." },
        { time: "Trajet", title: "Route directe", text: "Véhicule climatisé, eau fraîche à bord, aucun arrêt imposé." },
        { time: "Dépose", title: "Porte à porte", text: "Dépose devant votre hébergement. Si votre riad est dans une ruelle piétonne, on vous accompagne à pied jusqu'à la porte." },
      ],
      en: [
        { time: "Booking", title: "You send your details", text: "Flight number, date, landing time and drop-off address. One WhatsApp message is enough." },
        { time: "Day before", title: "Confirmation", text: "You get your driver's name and number the day before the ride." },
        { time: "Arrival", title: "Met at the airport", text: "Your driver waits in the arrivals hall with a name sign and helps with the luggage." },
        { time: "Ride", title: "Direct route", text: "Air-conditioned vehicle, chilled water on board, no forced stops." },
        { time: "Drop-off", title: "Door to door", text: "Dropped at your accommodation. If your riad sits down a pedestrian alley, we walk you to the door." },
      ],
    },
    included: {
      fr: [
        "Chauffeur professionnel",
        "Accueil avec pancarte à votre nom",
        "Suivi du vol en temps réel",
        "60 minutes d'attente offertes après l'atterrissage",
      ],
      en: [
        "Professional driver",
        "Meet and greet with a name sign",
        "Real-time flight tracking",
        "60 minutes of free waiting time after landing",
      ],
    },
    notIncluded: {
      fr: ["Arrêts supplémentaires non prévus au départ", "Frais de parking exceptionnels", "Pourboires"],
      en: ["Additional stops not agreed beforehand", "Exceptional parking fees", "Tips"],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "vallee-ourika",
    category: "montagne",
    popular: true,
    price: 900,
    duration: { fr: "8 heures", en: "8 hours" },
    distance: { fr: "70 km · 1h de route", en: "70 km · 1h drive" },
    pickup: { fr: "08h30 — départ de votre riad ou hôtel", en: "8:30 AM — pickup at your riad or hotel" },
    title: { fr: "Vallée de l'Ourika & cascades de Setti Fatma", en: "Ourika Valley & Setti Fatma Waterfalls" },
    short: {
      fr: "La vallée verte de l'Atlas à 1h de Marrakech : rivière, maison berbère et déjeuner tajine les pieds dans l'eau.",
      en: "The green Atlas valley one hour from Marrakech: river, Berber house and a tagine lunch by the water.",
    },
    description: {
      fr: "Direction le sud de Marrakech pour la plus verte des vallées de l'Atlas. On longe la rivière Ourika, on s'arrête dans une maison berbère traditionnelle pour comprendre la vie de montagne, puis on grimpe jusqu'aux cascades de Setti Fatma. Le déjeuner se prend sur une terrasse au bord de la rivière, les pieds presque dans l'eau. Une journée fraîche, verte et authentique, idéale en été comme au printemps.",
      en: "Head south of Marrakech to the greenest of the Atlas valleys. We drive along the Ourika river, stop at a traditional Berber house to learn about mountain life, then hike up to the Setti Fatma waterfalls. Lunch is served on a riverside terrace, feet almost in the water. A cool, green and authentic day out, perfect in spring and summer.",
    },
    highlights: {
      fr: ["Coopérative d'huile d'argan gérée par des femmes", "Visite d'une maison berbère et thé à la menthe", "Randonnée jusqu'aux 7 cascades de Setti Fatma", "Déjeuner tajine au bord de la rivière", "Arrêts photo libres dans la vallée"],
      en: ["Women-run argan oil cooperative", "Visit of a Berber home with mint tea", "Hike to the 7 Setti Fatma waterfalls", "Riverside tagine lunch", "Free photo stops along the valley"],
    },
    itinerary: {
      fr: [
        { time: "08:30", title: "Prise en charge", text: "Départ de votre hôtel ou riad en véhicule privatisé et climatisé." },
        { time: "09:30", title: "Coopérative d'argan", text: "Démonstration de la fabrication traditionnelle de l'huile d'argan." },
        { time: "10:30", title: "Maison berbère", text: "Accueil chez l'habitant, thé à la menthe et découverte du mode de vie local." },
        { time: "12:00", title: "Setti Fatma", text: "Montée jusqu'aux cascades (1h à 1h30 aller-retour, à votre rythme)." },
        { time: "14:00", title: "Déjeuner", text: "Tajine ou grillades sur une terrasse au bord de la rivière." },
        { time: "16:30", title: "Retour", text: "Retour tranquille sur Marrakech avec arrêts photo." },
      ],
      en: [
        { time: "08:30", title: "Pickup", text: "Departure from your hotel or riad in a private air-conditioned vehicle." },
        { time: "09:30", title: "Argan cooperative", text: "Demonstration of traditional argan oil production." },
        { time: "10:30", title: "Berber house", text: "Welcomed by a local family, mint tea and insight into mountain life." },
        { time: "12:00", title: "Setti Fatma", text: "Walk up to the waterfalls (1h–1h30 round trip, at your own pace)." },
        { time: "14:00", title: "Lunch", text: "Tagine or grilled meats on a terrace by the river." },
        { time: "16:30", title: "Return", text: "Easy drive back to Marrakech with photo stops." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "atlas-imlil-trois-vallees",
    category: "montagne",
    popular: true,
    price: 1200,
    duration: { fr: "9 heures", en: "9 hours" },
    distance: { fr: "130 km · 1h30 de route", en: "130 km · 1h30 drive" },
    pickup: { fr: "08h00 — départ de votre riad ou hôtel", en: "8:00 AM — pickup at your riad or hotel" },
    title: { fr: "Montagnes de l'Atlas : Imlil, plateau de Kik & 3 vallées", en: "Atlas Mountains: Imlil, Kik Plateau & 3 Valleys" },
    short: {
      fr: "Le vrai Haut Atlas : plateau de Kik, village d'Imlil au pied du Toubkal et déjeuner berbère en altitude.",
      en: "The real High Atlas: Kik plateau, Imlil village at the foot of Toubkal and a Berber lunch in the mountains.",
    },
    description: {
      fr: "La journée la plus complète pour découvrir le Haut Atlas. On prend de l'altitude jusqu'au plateau de Kik et ses panoramas à 360°, on traverse les villages d'Asni et de Moulay Brahim, puis on rejoint Imlil, camp de base du Toubkal (4 167 m). Petite randonnée dans les vergers de noyers et de pommiers, possibilité de balade à dos de mulet, puis déjeuner face aux sommets. On prend le temps que les circuits en groupe n'ont pas : arrêts libres et villages traversés à votre rythme.",
      en: "The most complete day to discover the High Atlas. We climb up to the Kik plateau and its 360° panoramas, cross the villages of Asni and Moulay Brahim, then reach Imlil, the base camp of Mount Toubkal (4,167 m). A short walk through walnut and apple orchards, an optional mule ride, then lunch facing the peaks. We take the time group tours never have: free stops and villages crossed at your own pace.",
    },
    highlights: {
      fr: ["Panorama du plateau de Kik (1 800 m)", "Village d'Imlil, porte du Toubkal", "Randonnée douce dans les vergers berbères", "Balade à dos de mulet en option", "Déjeuner panoramique face aux montagnes"],
      en: ["Kik plateau panorama (1,800 m)", "Imlil village, gateway to Toubkal", "Gentle walk through Berber orchards", "Optional mule ride", "Panoramic lunch facing the mountains"],
    },
    itinerary: {
      fr: [
        { time: "08:00", title: "Départ", text: "Prise en charge à votre hébergement, route vers le sud." },
        { time: "09:30", title: "Plateau de Kik", text: "Montée jusqu'au plateau et arrêt photo panoramique." },
        { time: "11:00", title: "Asni & Moulay Brahim", text: "Traversée des villages et du souk (le samedi)." },
        { time: "12:00", title: "Imlil", text: "Randonnée guidée dans les vergers et vues sur le Toubkal." },
        { time: "13:30", title: "Déjeuner berbère", text: "Tajine en terrasse avec vue sur les sommets." },
        { time: "17:00", title: "Retour", text: "Retour à Marrakech en fin d'après-midi." },
      ],
      en: [
        { time: "08:00", title: "Departure", text: "Pickup at your accommodation, drive south." },
        { time: "09:30", title: "Kik plateau", text: "Climb to the plateau and panoramic photo stop." },
        { time: "11:00", title: "Asni & Moulay Brahim", text: "Drive through the villages and local souk (Saturdays)." },
        { time: "12:00", title: "Imlil", text: "Guided walk through orchards with Toubkal views." },
        { time: "13:30", title: "Berber lunch", text: "Tagine on a terrace facing the summits." },
        { time: "17:00", title: "Return", text: "Back in Marrakech in the late afternoon." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "desert-agafay",
    category: "desert",
    popular: true,
    price: 600,
    priceNote: {
      fr: "Transport aller-retour. Les activités ci-dessous se choisissent à la carte.",
      en: "Round-trip transport. The activities below are picked à la carte.",
    },
    duration: { fr: "Demi-journée ou soirée", en: "Half day or evening" },
    distance: { fr: "45 km · 45 min de route", en: "45 km · 45 min drive" },
    pickup: { fr: "À l'heure de votre choix", en: "At the time of your choice" },
    title: { fr: "Désert d'Agafay", en: "Agafay Desert" },
    short: {
      fr: "Le désert de pierre à 45 minutes de Marrakech. Transport aller-retour à 600 DH, puis vous composez votre journée : quad, buggy, chameau, dîner sous les étoiles.",
      en: "The stone desert 45 minutes from Marrakech. Round-trip transport at 600 DH, then you build your own day: quad, buggy, camel, dinner under the stars.",
    },
    description: {
      fr: "Agafay, c'est le Sahara sans les huit heures de route : un océan de collines lunaires à 45 minutes de la ville, avec l'Atlas enneigé en toile de fond. Le principe est simple — le transport aller-retour est à prix fixe, et vous choisissez ensuite les activités qui vous tentent. Certains viennent juste pour le coucher du soleil et un thé, d'autres enchaînent quad, balade à dos de chameau et dîner sous tente. Dites-nous ce qui vous intéresse et l'on construit la sortie avec vous.",
      en: "Agafay is the Sahara without the eight-hour drive: an ocean of lunar hills 45 minutes from the city, with the snow-capped Atlas as a backdrop. The idea is simple — round-trip transport is a fixed price, and you then pick the activities you fancy. Some come just for the sunset and a glass of tea, others line up quad biking, a camel ride and dinner under a tent. Tell us what you're after and we build the outing with you.",
    },
    options: {
      fr: [
        { name: "Quad", price: "200 DH", detail: "1 quad pour 2 personnes · 1 heure" },
        { name: "Buggy", price: "600 DH", detail: "1 buggy pour 2 personnes · 1 heure" },
        { name: "Balade à dos de chameau", price: "200 DH", detail: "Par personne · 1 heure" },
        { name: "Dîner sous les étoiles", price: "Sur demande", detail: "Entrée, tajine ou couscous et dessert sous tente caïdale · musique gnaoua, spectacle de feu et observation des étoiles" },
      ],
      en: [
        { name: "Quad bike", price: "200 DH", detail: "1 quad for 2 people · 1 hour" },
        { name: "Buggy", price: "600 DH", detail: "1 buggy for 2 people · 1 hour" },
        { name: "Camel ride", price: "200 DH", detail: "Per person · 1 hour" },
        { name: "Dinner under the stars", price: "On request", detail: "Starter, tagine or couscous and dessert under a caidal tent · Gnaoua music, fire show and stargazing" },
      ],
    },
    highlights: {
      fr: [
        "Collines de pierre à 45 minutes de Marrakech",
        "Activités à la carte : quad, buggy, chameau, dîner",
        "Coucher de soleil sur l'Atlas",
        "Sortie possible en journée comme en soirée",
        "Idéal en famille comme en couple",
      ],
      en: [
        "Stone hills 45 minutes from Marrakech",
        "À la carte activities: quad, buggy, camel, dinner",
        "Sunset over the Atlas",
        "Possible during the day or in the evening",
        "Great for families and couples alike",
      ],
    },
    itinerary: {
      fr: [
        { time: "Départ", title: "Prise en charge", text: "Départ de votre hôtel ou riad à l'heure convenue, 45 minutes de route." },
        { time: "Sur place", title: "Vos activités", text: "Quad, buggy, balade à dos de chameau : vous enchaînez ce que vous avez choisi, à votre rythme." },
        { time: "Coucher du soleil", title: "L'heure dorée", text: "Le moment le plus photogénique du désert, avec l'Atlas en arrière-plan." },
        { time: "Soirée", title: "Dîner sous tente (en option)", text: "Repas marocain sous tente caïdale, musique gnaoua, spectacle de feu et ciel étoilé." },
        { time: "Retour", title: "Retour à Marrakech", text: "Retour à votre hébergement à l'heure qui vous convient." },
      ],
      en: [
        { time: "Departure", title: "Pickup", text: "Leave your hotel or riad at the agreed time, 45 minutes on the road." },
        { time: "On site", title: "Your activities", text: "Quad, buggy, camel ride: you go through whatever you picked, at your own pace." },
        { time: "Sunset", title: "Golden hour", text: "The most photogenic moment in the desert, with the Atlas behind you." },
        { time: "Evening", title: "Dinner under a tent (optional)", text: "Moroccan meal under a caidal tent, Gnaoua music, fire show and a starry sky." },
        { time: "Return", title: "Back to Marrakech", text: "Dropped at your accommodation whenever suits you." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "cascades-ouzoud",
    category: "montagne",
    popular: true,
    price: 1500,
    duration: { fr: "9 heures", en: "9 hours" },
    distance: { fr: "150 km · 2h30 de route", en: "150 km · 2h30 drive" },
    pickup: { fr: "07h30 — départ de votre riad ou hôtel", en: "7:30 AM — pickup at your riad or hotel" },
    title: { fr: "Cascades d'Ouzoud", en: "Ouzoud Waterfalls" },
    short: {
      fr: "Les plus hautes cascades d'Afrique du Nord (110 m), les singes magots et une balade en barque au pied des chutes.",
      en: "North Africa's tallest waterfalls (110 m), Barbary macaques and a boat ride at the foot of the falls.",
    },
    description: {
      fr: "Une journée nature au cœur du Moyen Atlas. Les cascades d'Ouzoud tombent de 110 mètres en trois paliers dans un canyon verdoyant. On descend le sentier ombragé au milieu des oliviers, avec de fortes chances de croiser les singes magots en liberté. En bas, une balade en barque permet d'approcher les chutes au plus près — et de prendre une petite douche. Déjeuner dans un restaurant en terrasse suspendue au-dessus des cascades.",
      en: "A nature day in the heart of the Middle Atlas. The Ouzoud waterfalls drop 110 metres in three tiers into a green canyon. We walk down the shaded path through olive groves, with a strong chance of meeting wild Barbary macaques. At the bottom, a small boat takes you right up to the falls — expect a light shower. Lunch on a terrace suspended above the waterfalls.",
    },
    highlights: {
      fr: ["Cascades de 110 m, les plus hautes du Maroc", "Singes magots en liberté", "Balade en barque au pied des chutes (en option)", "Déjeuner en terrasse au-dessus des cascades", "Sentier ombragé au milieu des oliviers"],
      en: ["110 m falls, the tallest in Morocco", "Wild Barbary macaques", "Optional boat ride at the foot of the falls", "Lunch on a terrace above the waterfalls", "Shaded path through olive groves"],
    },
    itinerary: {
      fr: [
        { time: "07:30", title: "Départ", text: "Prise en charge et route vers le Moyen Atlas." },
        { time: "10:00", title: "Arrivée à Ouzoud", text: "Descente du sentier panoramique jusqu'aux bassins." },
        { time: "11:30", title: "Barque", text: "Approche des chutes en barque (en option, sur place)." },
        { time: "13:00", title: "Déjeuner", text: "Tajine en terrasse avec vue sur les cascades." },
        { time: "16:00", title: "Retour", text: "Départ d'Ouzoud, arrivée à Marrakech en début de soirée." },
      ],
      en: [
        { time: "07:30", title: "Departure", text: "Pickup and drive to the Middle Atlas." },
        { time: "10:00", title: "Arrival at Ouzoud", text: "Walk down the panoramic path to the pools." },
        { time: "11:30", title: "Boat ride", text: "Get close to the falls by boat (optional, paid on site)." },
        { time: "13:00", title: "Lunch", text: "Tagine on a terrace overlooking the waterfalls." },
        { time: "16:00", title: "Return", text: "Leave Ouzoud, back in Marrakech in the early evening." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "essaouira",
    category: "cote",
    popular: true,
    price: 1600,
    duration: { fr: "11 heures", en: "11 hours" },
    distance: { fr: "190 km · 2h30 de route", en: "190 km · 2h30 drive" },
    pickup: { fr: "08h00 — départ de votre riad ou hôtel", en: "8:00 AM — pickup at your riad or hotel" },
    title: { fr: "Essaouira, la cité du vent", en: "Essaouira, the City of Wind" },
    short: {
      fr: "L'Atlantique en une journée : médina UNESCO, remparts, port de pêche bleu et plage à perte de vue.",
      en: "The Atlantic in a day: UNESCO medina, ramparts, blue fishing port and an endless beach.",
    },
    description: {
      fr: "Cap sur l'océan. La route traverse la plaine des arganiers — avec l'arrêt obligé à la coopérative féminine d'huile d'argan — avant d'arriver à Essaouira, ancienne Mogador. Sa médina fortifiée classée à l'UNESCO se visite à pied : remparts de la Skala, ateliers d'ébénistes en thuya, galeries d'art et port de pêche avec ses barques bleues. Déjeuner de poisson grillé face à l'océan, puis temps libre sur la plage ou dans les souks avant le retour.",
      en: "Head for the ocean. The road crosses the argan plain — with the classic stop at a women's argan cooperative — before reaching Essaouira, the former Mogador. Its fortified UNESCO medina is explored on foot: the Skala ramparts, thuya woodwork studios, art galleries and the fishing port with its blue boats. Grilled fish lunch facing the ocean, then free time on the beach or in the souks before heading back.",
    },
    highlights: {
      fr: ["Médina fortifiée classée UNESCO", "Remparts de la Skala face à l'Atlantique", "Port de pêche et ses barques bleues", "Coopérative d'huile d'argan sur la route", "Temps libre sur la plage et déjeuner de poisson"],
      en: ["UNESCO-listed fortified medina", "Skala ramparts facing the Atlantic", "Fishing port and its blue boats", "Argan oil cooperative on the way", "Free time on the beach and a fish lunch"],
    },
    itinerary: {
      fr: [
        { time: "08:00", title: "Départ", text: "Route vers l'ouest à travers la plaine des arganiers." },
        { time: "09:30", title: "Coopérative d'argan", text: "Arrêt chez une coopérative féminine, dégustation." },
        { time: "10:30", title: "Arrivée à Essaouira", text: "Balade dans la médina et sur les remparts de la Skala." },
        { time: "13:00", title: "Déjeuner", text: "Poisson grillé au port ou en terrasse (à votre charge)." },
        { time: "14:30", title: "Temps libre", text: "Plage, souks, galeries d'art ou promenade à dos de dromadaire." },
        { time: "17:00", title: "Retour", text: "Retour à Marrakech en début de soirée." },
      ],
      en: [
        { time: "08:00", title: "Departure", text: "Drive west across the argan plain." },
        { time: "09:30", title: "Argan cooperative", text: "Stop at a women's cooperative with tasting." },
        { time: "10:30", title: "Arrival in Essaouira", text: "Walk through the medina and along the Skala ramparts." },
        { time: "13:00", title: "Lunch", text: "Grilled fish at the port or on a terrace (own expense)." },
        { time: "14:30", title: "Free time", text: "Beach, souks, art galleries or a camel ride." },
        { time: "17:00", title: "Return", text: "Back in Marrakech in the early evening." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "ouarzazate-ait-ben-haddou",
    category: "desert",
    popular: true,
    price: 1800,
    duration: { fr: "11 heures", en: "11 hours" },
    distance: { fr: "200 km · 4h de route", en: "200 km · 4h drive" },
    pickup: { fr: "07h00 — départ de votre riad ou hôtel", en: "7:00 AM — pickup at your riad or hotel" },
    title: { fr: "Ouarzazate & Aït Ben Haddou par le Tizi n'Tichka", en: "Ouarzazate & Aït Ben Haddou via Tizi n'Tichka" },
    short: {
      fr: "Le col du Tizi n'Tichka (2 260 m), le ksar UNESCO d'Aït Ben Haddou et les studios de cinéma de Ouarzazate.",
      en: "The Tizi n'Tichka pass (2,260 m), the UNESCO ksar of Aït Ben Haddou and Ouarzazate's film studios.",
    },
    description: {
      fr: "La plus spectaculaire des routes marocaines. On franchit le col du Tizi n'Tichka à 2 260 m d'altitude, avec des panoramas qui changent à chaque virage. Arrivée au ksar d'Aït Ben Haddou, village fortifié en terre classé à l'UNESCO et décor de Gladiator, Game of Thrones et Lawrence d'Arabie. Traversée à pied jusqu'au grenier collectif au sommet, puis route vers Ouarzazate, la « Hollywood africaine », et sa kasbah Taourirt.",
      en: "Morocco's most spectacular road. We cross the Tizi n'Tichka pass at 2,260 m, with views changing at every bend. Arrival at the ksar of Aït Ben Haddou, a UNESCO-listed fortified earthen village used as a set for Gladiator, Game of Thrones and Lawrence of Arabia. Walk up to the collective granary at the top, then on to Ouarzazate, the “African Hollywood”, and its Taourirt kasbah.",
    },
    highlights: {
      fr: ["Col du Tizi n'Tichka (2 260 m)", "Coopérative d'huile d'argan sur la route", "Ksar d'Aït Ben Haddou classé UNESCO", "Décors de Gladiator et Game of Thrones", "Kasbah Taourirt à Ouarzazate"],
      en: ["Tizi n'Tichka pass (2,260 m)", "Argan oil cooperative on the way", "UNESCO-listed ksar of Aït Ben Haddou", "Gladiator and Game of Thrones filming locations", "Taourirt kasbah in Ouarzazate"],
    },
    itinerary: {
      fr: [
        { time: "07:00", title: "Départ", text: "Route vers le Haut Atlas et le col du Tizi n'Tichka." },
        { time: "09:00", title: "Tizi n'Tichka", text: "Arrêts photo au col et dans les villages berbères." },
        { time: "10:00", title: "Coopérative d'argan", text: "Visite d'une coopérative d'huile d'argan et dégustation." },
        { time: "11:00", title: "Aït Ben Haddou", text: "Visite guidée du ksar et montée au grenier collectif." },
        { time: "13:00", title: "Déjeuner", text: "Repas avec vue sur le ksar." },
        { time: "14:30", title: "Ouarzazate", text: "Kasbah Taourirt et studios de cinéma Atlas (option)." },
        { time: "17:00", title: "Retour", text: "Départ de Ouarzazate, arrivée à Marrakech en soirée." },
      ],
      en: [
        { time: "07:00", title: "Departure", text: "Drive to the High Atlas and the Tizi n'Tichka pass." },
        { time: "09:00", title: "Tizi n'Tichka", text: "Photo stops at the pass and in Berber villages." },
        { time: "10:00", title: "Argan cooperative", text: "Visit of an argan oil cooperative with tasting." },
        { time: "11:00", title: "Aït Ben Haddou", text: "Guided visit of the ksar and climb to the granary." },
        { time: "13:00", title: "Lunch", text: "Meal with a view over the ksar." },
        { time: "14:30", title: "Ouarzazate", text: "Taourirt kasbah and Atlas film studios (optional)." },
        { time: "17:00", title: "Return", text: "Leave Ouarzazate, back in Marrakech in the evening." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "casablanca",
    category: "cote",
    popular: false,
    price: 2000,
    duration: { fr: "12 heures", en: "12 hours" },
    distance: { fr: "240 km · 3h de route", en: "240 km · 3h drive" },
    pickup: { fr: "07h00 — départ de votre riad ou hôtel", en: "7:00 AM — pickup at your riad or hotel" },
    title: { fr: "Casablanca : mosquée Hassan II & Corniche", en: "Casablanca: Hassan II Mosque & Corniche" },
    short: {
      fr: "La capitale économique en une journée : mosquée Hassan II sur l'océan, quartier Habous, Art déco et Rick's Café.",
      en: "Morocco's business capital in a day: the ocean-side Hassan II Mosque, Habous quarter, Art Deco and Rick's Café.",
    },
    description: {
      fr: "Une journée dans le Maroc moderne. Le point d'orgue est la mosquée Hassan II, l'une des plus grandes du monde, construite en partie au-dessus de l'Atlantique et ouverte aux visiteurs non musulmans. On poursuit par le quartier des Habous et son architecture néo-mauresque, la place Mohammed V et ses bâtiments Art déco, la Corniche d'Aïn Diab et le célèbre Rick's Café inspiré du film Casablanca.",
      en: "A day in modern Morocco. The highlight is the Hassan II Mosque, one of the largest in the world, partly built over the Atlantic and open to non-Muslim visitors. We continue through the Habous quarter and its neo-Moorish architecture, Mohammed V square and its Art Deco buildings, the Aïn Diab Corniche and the famous Rick's Café inspired by the film Casablanca.",
    },
    highlights: {
      fr: ["Mosquée Hassan II au bord de l'océan", "Quartier des Habous", "Place Mohammed V et architecture Art déco", "Corniche d'Aïn Diab", "Rick's Café (arrêt photo)"],
      en: ["Hassan II Mosque by the ocean", "Habous quarter", "Mohammed V square and Art Deco architecture", "Aïn Diab Corniche", "Rick's Café (photo stop)"],
    },
    itinerary: {
      fr: [
        { time: "07:00", title: "Départ", text: "Route par l'autoroute vers Casablanca." },
        { time: "10:00", title: "Mosquée Hassan II", text: "Visite extérieure et intérieure (billet en supplément)." },
        { time: "12:00", title: "Quartier des Habous", text: "Balade dans la médina nouvelle et ses pâtisseries." },
        { time: "13:30", title: "Déjeuner", text: "Repas sur la Corniche face à l'océan." },
        { time: "15:00", title: "Corniche & centre-ville", text: "Aïn Diab, Rick's Café, place Mohammed V." },
        { time: "17:00", title: "Retour", text: "Départ de Casablanca, arrivée à Marrakech en soirée." },
      ],
      en: [
        { time: "07:00", title: "Departure", text: "Motorway drive to Casablanca." },
        { time: "10:00", title: "Hassan II Mosque", text: "Outside and inside visit (ticket not included)." },
        { time: "12:00", title: "Habous quarter", text: "Walk through the new medina and its pastry shops." },
        { time: "13:30", title: "Lunch", text: "Meal on the Corniche facing the ocean." },
        { time: "15:00", title: "Corniche & downtown", text: "Aïn Diab, Rick's Café, Mohammed V square." },
        { time: "17:00", title: "Return", text: "Leave Casablanca, back in Marrakech in the evening." },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "visite-privee-marrakech",
    category: "cote",
    popular: true,
    price: 800,
    duration: { fr: "8 heures", en: "8 hours" },
    distance: { fr: "Dans Marrakech, à pied", en: "Within Marrakech, on foot" },
    pickup: { fr: "09h00 — prise en charge à votre hôtel ou riad", en: "9:00 AM — pickup at your hotel or riad" },
    title: { fr: "Visite guidée privée de Marrakech", en: "Private Guided Tour of Marrakech" },
    short: {
      fr: "Monuments, souks et street food avec un guide local agréé : Koutoubia, tombeaux saadiens, palais Bahia, Ben Youssef et Jemaa el-Fna.",
      en: "Monuments, souks and street food with a licensed local guide: Koutoubia, Saadian Tombs, Bahia Palace, Ben Youssef and Jemaa el-Fna.",
    },
    description: {
      fr: "La ville rouge racontée par quelqu'un qui y vit. Une journée complète à pied dans la médina : la mosquée Koutoubia, les tombeaux saadiens et le palais de la Bahia le matin ; les souks, les ateliers d'artisans et le quartier Mellah l'après-midi ; puis la médersa Ben Youssef et une dégustation de plats marocains sur la place Jemaa el-Fna en fin de journée. Le guide vous aide aussi à vous repérer dans les souks et à négocier. Le guide local est à réserver avant le départ, en précisant la langue souhaitée.",
      en: "The red city told by someone who lives in it. A full day on foot through the medina: the Koutoubia mosque, the Saadian Tombs and the Bahia Palace in the morning; the souks, craft workshops and the Mellah quarter in the afternoon; then the Ben Youssef Madrasa and a Moroccan street-food tasting on Jemaa el-Fna square at the end of the day. Your guide also helps you find your way through the souks and negotiate. The local guide must be booked before departure, stating your preferred language.",
    },
    highlights: {
      fr: [
        "Guide local agréé pendant environ 8 heures",
        "Mosquée Koutoubia, tombeaux saadiens et palais de la Bahia",
        "Souks, ateliers d'artisans et quartier Mellah",
        "Médersa Ben Youssef",
        "Dégustation de plats marocains sur Jemaa el-Fna",
        "Itinéraire flexible, adapté à vos centres d'intérêt",
      ],
      en: [
        "Licensed local guide for around 8 hours",
        "Koutoubia mosque, Saadian Tombs and Bahia Palace",
        "Souks, craft workshops and the Mellah quarter",
        "Ben Youssef Madrasa",
        "Moroccan street-food tasting on Jemaa el-Fna",
        "Flexible itinerary, shaped around your interests",
      ],
    },
    itinerary: {
      fr: [
        { time: "09:00", title: "Monuments historiques et architecture palatiale", text: "Prise en charge à l'hôtel, puis mosquée Koutoubia, tombeaux saadiens et palais de la Bahia." },
        { time: "Midi", title: "Souks, artisans et quartier juif", text: "Marché aux épices, travail du cuir et du métal, aide à la négociation, puis le quartier Mellah." },
        { time: "17:00", title: "Architecture islamique & street food marocaine", text: "Médersa Ben Youssef, dégustation de cuisine de rue sur Jemaa el-Fna et thé à la menthe. Fin vers 17h." },
      ],
      en: [
        { time: "09:00", title: "Historic monuments and palace architecture", text: "Hotel pickup, then the Koutoubia mosque, the Saadian Tombs and the Bahia Palace." },
        { time: "Midday", title: "Souks, craftsmen and the Jewish quarter", text: "Spice market, leather and metalwork, help with negotiating, then the Mellah quarter." },
        { time: "5:00 PM", title: "Islamic architecture & Moroccan street food", text: "Ben Youssef Madrasa, street-food tasting on Jemaa el-Fna and mint tea. Ends around 5 PM." },
      ],
    },
    included: {
      fr: [
        "Guide local agréé (environ 8 heures)",
        "Prise en charge à l'hôtel ou au riad à Marrakech",
        "Visite complète de la médina à pied (palais, souks, gastronomie)",
        "Aide à la navigation dans les souks et à la négociation",
        "Promenade gastronomique sur la place Jemaa el-Fna",
        "Itinéraire flexible, adapté à vos centres d'intérêt",
      ],
      en: [
        "Licensed local guide (around 8 hours)",
        "Pickup at your hotel or riad in Marrakech",
        "Full walking tour of the medina (palaces, souks, food)",
        "Help navigating the souks and negotiating",
        "Food walk on Jemaa el-Fna square",
        "Flexible itinerary, shaped around your interests",
      ],
    },
    notIncluded: {
      fr: [
        "Frais d'entrée des monuments (à régler sur place, à votre convenance)",
        "Nourriture et boissons lors de la dégustation",
        "Achats personnels et souvenirs",
        "Pourboire pour le guide (facultatif)",
      ],
      en: [
        "Monument entrance fees (paid on site, at your convenience)",
        "Food and drinks during the tasting",
        "Personal purchases and souvenirs",
        "Tip for the guide (optional)",
      ],
    },
  },
];

// Inclus / non inclus par défaut (utilisés quand la prestation n'a pas sa propre liste)
export const included = {
  fr: ["Chauffeur professionnel"],
  en: ["Professional driver"],
};

export const notIncluded = {
  fr: [
    "Repas et boissons",
    "Billets d'entrée des monuments",
    "Activités optionnelles (chameau, quad, buggy, barque…)",
    "Guide officiel à l'intérieur des monuments",
    "Pourboires",
  ],
  en: [
    "Meals and drinks",
    "Monument entrance tickets",
    "Optional activities (camel, quad, buggy, boat…)",
    "Official guide inside monuments",
    "Tips",
  ],
};

export const getTour = (slug) => tours.find((t) => t.slug === slug);

export default tours;
