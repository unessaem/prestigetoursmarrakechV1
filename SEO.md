# SEO — ce qui a été fait et ce qu'il vous reste à faire

## 1. Les mots-clés, page par page

Le marché prioritaire est **francophone** (France, Belgique, Suisse). L'anglais
est en place sur des adresses séparées, prêt à travailler quand vous le
voudrez.

Un seul mot-clé principal par page : c'est la règle qui fait la différence.
Deux pages qui visent le même mot-clé se concurrencent entre elles.

| Page | Mot-clé principal | Mots-clés secondaires |
|---|---|---|
| Accueil | excursion privée Marrakech | excursions depuis Marrakech, chauffeur-guide privé Marrakech, journée depuis Marrakech |
| Excursions | excursions d'une journée depuis Marrakech | circuit privé Marrakech, excursion Marrakech prix |
| Transferts aéroport | transfert aéroport Marrakech | navette aéroport Ménara, taxi privé aéroport Marrakech, transfert riad |
| Vallée de l'Ourika | excursion vallée de l'Ourika | Ourika depuis Marrakech, Setti Fatma cascades, journée Ourika |
| Atlas / Imlil | excursion Atlas depuis Marrakech | Imlil journée, Trois Vallées Marrakech, Haut Atlas excursion |
| Désert d'Agafay | excursion désert d'Agafay | Agafay depuis Marrakech, quad Agafay, dîner sous les étoiles Agafay |
| Cascades d'Ouzoud | excursion cascades d'Ouzoud | Ouzoud depuis Marrakech, journée Ouzoud prix |
| Essaouira | excursion Essaouira depuis Marrakech | journée Essaouira, Mogador depuis Marrakech |
| Ouarzazate / Aït Ben Haddou | excursion Ouarzazate Aït Ben Haddou | kasbah Aït Ben Haddou depuis Marrakech, Tizi n'Tichka |
| Casablanca | excursion Casablanca depuis Marrakech | mosquée Hassan II journée, Marrakech Casablanca aller-retour |
| Visite de Marrakech | visite privée de Marrakech | visite guidée médina Marrakech, guide privé Marrakech |
| À propos | chauffeur-guide francophone Marrakech | guide privé Marrakech français |
| Contact | réserver excursion Marrakech | excursion Marrakech WhatsApp |

Les titres et descriptions se modifient dans un seul fichier :
**`src/data/seo.js`**. Règles à respecter si vous les changez :

- titre : 55 à 60 caractères, **mot-clé principal en premier** ;
- description : 150 à 165 caractères, écrite pour donner envie de cliquer
  (c'est le texte que Google affiche sous le titre) ;
- une seule page par mot-clé.

## 2. Ce qui est en place techniquement

- **Adresses séparées par langue.** `/fr/excursions/desert-agafay` et
  `/en/tours/desert-agafay` sont deux pages distinctes, reliées par les
  balises `hreflang`. Google peut indexer et classer chacune dans sa langue.
- **Pages pré-rendues.** À chaque build, les 26 pages sont écrites en HTML
  complet. Google lit le texte immédiatement, sans attendre le JavaScript —
  c'est le point faible habituel des sites React, et il est réglé.
- **Données structurées** (schema.org) : fiche d'agence de voyage, fiche
  d'excursion avec le prix en dirhams, fil d'Ariane et FAQ. C'est ce qui
  permet d'obtenir les résultats enrichis (prix, étoiles, questions) dans
  Google.
- **sitemap.xml et robots.txt** générés automatiquement au build.
- **Textes alternatifs** descriptifs sur toutes les images.
- **Titre, description, canonical, Open Graph** propres à chaque page, y
  compris lors de la navigation interne.

## 3. Performance (Lighthouse, build actuel)

Mesuré sur réseau 4G simulé et processeur mobile ralenti ×4 :

| Page | Mobile | Ordinateur |
|---|---|---|
| Accueil | 99 | 100 |
| Liste des excursions | 97 | 99 |
| Fiche Agafay | 100 | 100 |
| À propos | 100 | 97 |
| Contact | 100 | 100 |

Accessibilité **100**, SEO **100** sur toutes les pages.
Affichage du premier contenu : environ **0,9 s** sur mobile.

Ce qui a été fait pour y arriver : feuille de style injectée dans la page
(plus d'aller-retour réseau avant l'affichage), polices chargées sans bloquer
le rendu, grande image déclarée en priorité dans l'en-tête, dimensions sur
toutes les images pour que la page ne saute pas, React et le routeur isolés
dans un fichier mis en cache un an, logo redimensionné à sa taille d'affichage.

Pour refaire la mesure vous-même :

```bash
npm run build
npm run serve                      # sert dist/ comme le fera Cloudflare
npx lighthouse http://localhost:4176/fr --view
```

## 4. Ce qu'il vous reste à faire — par ordre d'importance

Le site est techniquement prêt. Ce qui suit se joue **en dehors du code**, et
c'est là que se fait la différence sur Google.

1. **Fiche Google Business Profile.** Pour « excursion Marrakech », Google
   affiche d'abord la carte locale. Sans fiche, vous n'y êtes pas. C'est
   gratuit, ça prend une heure, et c'est de loin l'action la plus rentable.
2. **Les avis clients.** Demandez un avis Google après chaque excursion. Le
   nombre et la fraîcheur des avis pèsent énormément sur le classement local.
3. **Vos vraies photos.** Des photos originales (et non des banques d'images)
   aident au référencement et surtout à la conversion. Voir `PHOTOS.md`.
4. **Google Search Console.** Ajoutez le domaine, envoyez
   `https://prestigetoursmarrakech.com/sitemap.xml`, et surveillez les
   requêtes qui vous amènent du monde. C'est ce qui vous dira quels mots-clés
   travailler ensuite.
5. **Des pages de contenu.** Un article du type « Ourika ou Agafay : laquelle
   choisir ? » ou « Combien coûte une excursion à Marrakech » capte les
   recherches que les fiches d'excursion ne couvrent pas. Trois ou quatre
   bons articles valent mieux que vingt articles creux.
6. **Les liens entrants.** Riads et maisons d'hôtes qui recommandent vos
   services, annuaires locaux, TripAdvisor. Un lien depuis un riad connu de
   Marrakech vaut davantage que cent liens d'annuaires génériques.

## 5. À ne pas faire

- Ne créez pas une page par ville **et** une page par type d'excursion qui
  disent la même chose : Google n'en gardera qu'une et vous diluerez le reste.
- N'ajoutez pas de liste de mots-clés cachée dans le code
  (`<meta name="keywords">`) : Google l'ignore depuis des années.
- Ne supprimez pas le fichier `sitemap.xml` ni `robots.txt` du dossier `dist`,
  ils sont regénérés à chaque build.
- Ne créez pas de fichier `public/_redirects` : le routage est déjà géré par
  `wrangler.jsonc`, et un `_redirects` casse le déploiement Cloudflare.
