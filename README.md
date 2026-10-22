# Prestige Tours Marrakech

Site vitrine d'excursions privées au départ de Marrakech — React + Vite +
Tailwind CSS. Bilingue FR/EN, mode jour/nuit, réservation par WhatsApp.

Domaine : **prestigetoursmarrakech.com**

---

## 1. Ce que vous devez modifier en premier

Tout est dans **un seul fichier** : `src/config/site.js`

```js
whatsapp: "212600000000",            // ← VOTRE numéro, format international SANS "+" ni espaces
phoneDisplay: "+212 6 00 00 00 00",  // ← le numéro tel qu'il s'affiche
email: "contact@prestigetoursmarrakech.com",

social: {
  facebook:  "https://www.facebook.com/VOTRE-PAGE",
  instagram: "https://www.instagram.com/VOTRE-COMPTE",
  tiktok:    "https://www.tiktok.com/@VOTRE-COMPTE",
},
```

> ⚠️ Tant que le numéro WhatsApp n'est pas changé, les boutons de réservation
> envoient vers un numéro fictif.

## 2. Les excursions et les prix

Tout est dans `src/data/tours.js`. Chaque excursion a un champ `price`
(montant en dirhams) ; mettez `null` pour afficher « Prix sur demande ».

## 3. Les photos

Voir **[PHOTOS.md](PHOTOS.md)** : déposez vos `.jpg` dans `public/images/`
avec le bon nom et elles remplacent automatiquement les illustrations.

## 4. Lancer le site en local

```bash
npm install
npm run dev      # http://localhost:5173
```

## 5. Mettre en ligne

```bash
npm run build    # génère le dossier dist/
```

### Cloudflare Workers

Le fichier `wrangler.jsonc` est déjà configuré :

```bash
npx wrangler deploy
```

Ou via le tableau de bord Cloudflare, en connectant le dépôt GitHub :

- **Build command** : `npm run build`
- **Output directory** : `dist`

> ⚠️ Ne créez **pas** de fichier `public/_redirects` : le routage des pages
> est déjà géré par `not_found_handling: "single-page-application"` dans
> `wrangler.jsonc`. Un `_redirects` provoque l'erreur « Infinite loop detected ».

Après le déploiement, allez dans l'onglet **Domains** du Worker pour activer
l'URL `*.workers.dev`, puis rattachez `prestigetoursmarrakech.com`.

## Structure

```
src/
  config/site.js        ← coordonnées, réseaux sociaux (À MODIFIER)
  data/tours.js         ← excursions, prix, programmes (À MODIFIER)
  i18n/translations.js  ← tous les textes FR / EN
  components/           ← en-tête, pied de page, cartes, modale WhatsApp
  pages/                ← Accueil, Excursions, Fiche, À propos, Contact
public/
  images/               ← vos photos (voir PHOTOS.md)
  logo-badge.png        ← le logo affiché dans l'en-tête
scripts/
  gen_images.py         ← régénère les illustrations provisoires
```
