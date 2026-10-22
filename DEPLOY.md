# Mettre cette nouvelle version en ligne

Votre dépôt GitHub contient l'ancienne version. Cette mise à jour **ajoute,
modifie et supprime** des fichiers : il ne suffit donc pas de déposer les
nouveaux par-dessus. Il faut remplacer le contenu du dossier.

Deux façons de faire. La première ne demande aucune connaissance de Git.

---

## Option A — avec GitHub Desktop (le plus simple)

1. Ouvrez **GitHub Desktop** et sélectionnez le dépôt `marrakechtours`.
2. Cliquez sur **Repository → Show in Explorer** (ou *Show in Finder* sur Mac).
   Le dossier local du dépôt s'ouvre.
3. Dans ce dossier, **supprimez tout sauf le dossier caché `.git`**.
   Si vous ne voyez pas `.git`, c'est normal : il est masqué, laissez-le en place.
   > Supprimez aussi `node_modules` s'il est présent, il sera recréé.
4. Décompressez `prestigetoursmarrakech-site.zip`. Vous obtenez un dossier
   `prestigetoursmarrakech`. **Copiez son contenu** (et non le dossier
   lui-même) dans le dossier du dépôt.
5. Revenez dans GitHub Desktop : la liste des fichiers modifiés apparaît.
6. En bas à gauche, écrivez un résumé, par exemple
   `Refonte SEO, adresses FR/EN, performances`, puis cliquez
   **Commit to main**.
7. Cliquez **Push origin** en haut.

Cloudflare détecte le push et reconstruit le site tout seul, en deux à trois
minutes.

---

## Option B — en ligne de commande

Dans le dossier de votre dépôt local :

```bash
# 1. Repartir d'une copie propre du dépôt
git pull

# 2. Supprimer tous les fichiers suivis par Git (le dossier .git est conservé)
git rm -r --cached . > /dev/null
git clean -fd -e .git

# 3. Copier ici le contenu du dossier décompressé, puis :
git add -A
git commit -m "Refonte SEO, adresses FR/EN separees, performances"
git push origin main
```

> Si votre branche s'appelle `master` et non `main`, remplacez le nom dans la
> dernière ligne.

---

## Vérifier les réglages Cloudflare (une seule fois)

Dans le tableau de bord Cloudflare, ouvrez votre Worker puis
**Settings → Build** :

| Réglage | Valeur attendue |
|---|---|
| Build command | `npm run build` |
| Deploy command | *(vide)* |
| Build output directory | `dist` |
| Root directory | *(vide)* |
| Version de Node | 20 ou plus |

Si la version de Node n'est pas indiquée, ajoutez une variable
d'environnement de build `NODE_VERSION` = `20`.

### Un point à vérifier avant de pousser

Le fichier **`wrangler.jsonc`** contient cette ligne :

```jsonc
"name": "prestigetoursmarrakech",
```

Si votre Worker existant s'appelle encore **`marrakechtours`**, deux choix :

- **garder le Worker actuel** → remplacez la valeur par `"marrakechtours"`
  avant de pousser ;
- **repartir sur un nom propre** → laissez `prestigetoursmarrakech`, et après
  le déploiement rattachez le domaine au nouveau Worker, puis supprimez
  l'ancien.

Si vous ne faites rien et que les noms diffèrent, Cloudflare créera un second
Worker à côté de l'ancien : le site s'affichera, mais sur une autre adresse.

---

## Après le déploiement

1. Ouvrez `https://prestigetoursmarrakech.com` — vous devez arriver sur
   `/fr`.
2. Testez une adresse directe :
   `https://prestigetoursmarrakech.com/fr/excursions/desert-agafay`.
   Elle doit s'ouvrir directement, sans page 404.
3. Vérifiez `https://prestigetoursmarrakech.com/sitemap.xml` — 26 adresses.
4. Dans **Google Search Console**, ajoutez le domaine et envoyez le sitemap.

## Ce qu'il ne faut surtout pas faire

- **Ne créez pas de fichier `public/_redirects`.** Le routage est géré par
  `wrangler.jsonc`. C'est ce fichier qui avait provoqué l'erreur
  « Infinite loop detected » lors de votre premier déploiement.
- **Ne poussez pas les dossiers `node_modules` ni `dist`.** Ils sont déjà
  exclus par le fichier `.gitignore` fourni.
- **Ne modifiez pas `src/data/images.js`** : il est réécrit automatiquement
  à chaque build.
