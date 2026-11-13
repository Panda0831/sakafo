# Sakafo Gasy — La carte de la gastronomie malagasy

Sakafo Gasy est un site vitrine et catalogue gastronomique dédié à la cuisine malagasy. Le projet met en avant les plats traditionnels, les ingrédients, les régions, les recettes et le patrimoine culturel à travers une interface immersive et éditoriale, pensée pour mobile en priorité.

Le site utilise des données simulées (mock data) centralisées, avec des prix affichés en Ariary malgache (MGA) et explicitement présentés comme fictifs lorsque la donnée est indicative.

## 1. Objectif du projet

Le site a pour mission de :

- présenter la gastronomie malagasy avec un ton éditorial et chaleureux ;
- centraliser les données dans des fichiers de données propres, sans duplication ;
- exposer les plats avec leur prix indicatif en Ariary ;
- faire découvrir les recettes, les régions et les contenus culturels associés ;
- proposer une navigation riche : catalogue, fiches détaillées, quiz, comparateur, générateur de menu, favoris, etc.

## 2. Fonctionnalités principales

- Page d'accueil : hero, plats vedettes, budget Ariary, carte de Madagascar, recettes et galerie ;
- Catalogue des plats avec filtres, recherche et tri ;
- Fiches détaillées de plats avec description, ingrédients, prix fictif, note et tags ;
- Recettes et mode cuisine ;
- Exploration par catégories, régions, ingrédients, culture et dictionnaire ;
- Carte gastronomique et galerie photo ;
- Quiz, favoris, générateur de menu, comparateur, parcours thématiques ;
- Pages d’info : établissement, événements, blog, FAQ, mentions légales, confidentialité ;
- Motion riche et animations GSAP / Motion, avec gestion du reduced motion.

## 3. Stack technique

- React 19
- TypeScript
- Vite
- React Router
- GSAP
- Motion (animation)
- Zustand (états globaux)
- Tailwind CSS (via Vite plugin)
- Vitest + Testing Library

## 4. Prérequis

Avant de lancer le projet, vérifiez que votre environnement contient :

- Node.js 18 ou plus récent
- npm (ou pnpm/yarn si vous adaptez le dépôt)

## Configuration du formulaire de contact (EmailJS)

Le formulaire envoie les messages avec EmailJS depuis le navigateur. Pour l’activer :

1. Créez un compte EmailJS et configurez un service e-mail ainsi qu’un modèle de message.
2. Copiez `.env.example` vers `.env.local`.
3. Renseignez les identifiants EmailJS dans `.env.local` :

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

Le modèle EmailJS doit utiliser les variables `to_email`, `from_name`, `reply_to`, `subject` et `message`. Configurez son destinataire avec `{{to_email}}` et l’adresse de réponse avec `{{reply_to}}`. La clé publique EmailJS est destinée à l’intégration navigateur ; ne placez jamais de clé privée ou de mot de passe dans les variables `VITE_*`. Restreignez l’origine autorisée depuis les paramètres EmailJS.

Après avoir modifié `.env.local`, redémarrez le serveur de développement. Sans ces trois variables, le bouton d’envoi reste désactivé et le formulaire indique qu’il doit être configuré.

## 5. Installation

```bash
npm install
```

## 6. Lancer le projet

### Mode développement

```bash
npm run dev
```

Le site est généralement servi sur :

- http://localhost:5173

### Build de production

```bash
npm run build
```

### Prévisualisation du build

```bash
npm run preview
```

## 7. Scripts disponibles

```bash
npm run dev          # démarre Vite en mode développement
npm run build        # typecheck + build production
npm run preview      # prévisualise le build local
npm run typecheck    # vérifie les types TypeScript
npm run lint         # ESLint + validation du script de radius
npm run test         # exécute la suite de tests Vitest
npm run test:watch   # lance Vitest en mode watch
```

## 8. Structure du projet

```text
.
├── public/                     # fichiers statiques, images, robots, sitemap
├── scripts/                   # scripts utilitaires de validation
├── src/
│   ├── app/                   # routing et layout principal
│   ├── components/            # composants UI, cartes, pages, map, etc.
│   ├── data/                  # mock data centralisées (plats, régions, recettes, FAQ...)
│   ├── hooks/                 # hooks React personnalisés
│   ├── motion/                # configuration GSAP / tokens / variantes d'animation
│   ├── pages/                 # pages du site
│   ├── services/              # logique métier et utilitaires de données
│   ├── stores/                # stores Zustand
│   ├── styles/                # CSS global et design tokens
│   ├── types/                # types TypeScript partagés
│   ├── utils/                 # helpers et formatters
│   ├── main.tsx               # point d'entrée React
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
├── PROMPT_site_gastronomie_malagasy.md
├── LICENSE
└── README.md
```

## 9. Architecture des données

Le cœur du projet est dans le dossier `src/data/`.

Les données sont réparties comme suit :

- `plats.ts` : catalogue des plats
- `recettes.ts` : recettes et instructions
- `regions.ts` : régions et métadonnées
- `ingredients.ts` : ingrédients
- `categories.ts` : catégories
- `etablissements.ts` : lieux et restaurants
- `evenements.ts` : événements culturels
- `articles.ts` : contenus éditoriaux
- `galerie.ts` : images et médias
- `faq.ts` : questions fréquentes
- `quiz.ts` : quiz
- `dictionnaire.ts` : glossaire
- `contenusCulturels.ts` : dossiers culturels et patrimoine

Le projet s’appuie sur une logique de validation dans `src/data/index.ts` pour vérifier :

- unicité des slugs ;
- présence des photos ;
- validité des références de catégories/régions/ingrédients ;
- cohérence des prix fictifs ;
- intégrité des liens entre plats et recettes.

## 10. Règles métier importantes

Le projet est conçu avec plusieurs conventions fortes :

- toutes les données sont centralisées dans `src/data/` ;
- les prix sont affichés en Ariary avec une devise `MGA` ;
- la mention “prix fictif” est présente dans le contexte de démonstration ;
- les données sont à relire avant publication réelle ;
- les descriptions culturelles et les associations régionales sont parfois volontairement marquées comme partielles ou indicatives.

## 11. Ajouter un plat

Pour ajouter un plat, il faut généralement modifier les fichiers suivants :

1. `src/data/plats.ts` : ajouter le nouvel objet plat ;
2. `src/data/photosPlats.ts` : associer une photo si nécessaire ;
3. `src/data/ingredients.ts` et/ou `src/data/categories.ts` : si le plat référence de nouveaux éléments ;
4. eventuellement `src/data/regions.ts` : si le plat appartient à une région spécifique.

Exemple de structure typique :

```ts
plat({
  id: 'romazava',
  mg: 'Romazava',
  fr: 'Ragoût de zébu aux brèdes',
  en: 'Zebu and greens stew',
  desc: 'Description du plat.',
  accroche: 'Phrase d’accroche.',
  cats: ['plats-traditionnels', 'viandes'],
  regions: ['analamanga'],
  ings: ['zebu', 'bredes-mafane'],
  type: 'plat',
  mode: 'mijoté',
  arch: 'bol-ragout',
  pal: 'ragout',
  prix: 14500,
  unite: 'portion',
  prep: 25,
  cuis: 90,
  diff: 'facile',
  chaud: true,
  tags: ['national', 'mijoté', 'riz'],
  vedette: true,
})
```

### Conseils

- conservez des `slug` cohérents et uniques ;
- respectez le format des prix en Ariary, par exemple `14500` pour 14 500 MGA ;
- ajoutez des crédits d’image si la photo provient d’une source externe ;
- vérifiez que `photo.src` commence bien par `/images/...` si vous utilisez des assets locaux.

## 12. Ajouter ou remplacer une image

### Option A — utiliser une image locale

Placez l’image dans `public/images/` puis référencez-la depuis la donnée correspondante.

Exemple :

```ts
photo: {
  src: '/images/plats/mon-plat.jpg',
  alt: 'Description de l’image',
  credit: 'Crédit de la photo',
  source: 'https://example.com',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
}
```

### Option B — utiliser une image externe

Le projet autorise aussi des liens de sources externes. Dans ce cas, vérifiez que :

- la photo est correctement créditée ;
- la licence est mentionnée si nécessaire ;
- les fichiers de données restent cohérents avec les règles de validation.

## 13. Références visuelles et design

Le site a été pensé pour un rendu premium et éditorial, avec :

- formes arrondies partout ;
- palette inspirée des matières et des couleurs de la cuisine malagasy ;
- pages orientées “mobile first” ;
- animations fluides différentes selon les éléments ;
- typographie contrastée et identité marquée.

Le dossier de styles est centralisé dans :

- `src/styles/base.css`
- `src/styles/redesign.css`
- `src/styles/tokens.css`
- `src/styles/print.css`

## 14. Données à relire avant mise en production

Le projet contient des informations culturelles, géographiques et historiques qui doivent être relues par un humain avant diffusion commerciale ou publique. À vérifier notamment :

- noms malgaches et orthographes ;
- associations régionales et provenances ;
- descriptions historiques et patrimoniales ;
- informations de contact, événements et établissements ;
- crédits photo et licences ;
- contenu de FAQ et articles de blog ;
- éventuelles données “fictives” qui doivent rester clairement signalées.

Le site est bien adapté à un prototype ou à une démonstration de design, mais il reste utile d’effectuer une revue éditoriale avant publication réelle.

## 15. Développement recommandé

Pour poursuivre le projet, il est utile de garder les bonnes pratiques suivantes :

- ne pas dupliquer les données dans les composants ;
- toujours passer par `src/data/` pour ajouter ou modifier une entrée ;
- utiliser les services dans `src/services/` pour filtrer, trier et exposer les données ;
- maintenir les slugs cohérents et stables ;
- vérifier les types TypeScript lors de chaque ajout important ;
- tester les changements importants via `npm run test` et `npm run build`.

## 16. Licence

Ce projet est distribué sous la licence du dépôt, voir `LICENSE`.

## 17. À retenir

Sakafo Gasy est un site de démonstration et de design éditorial avec une forte identité visuelle. Son coeur est une architecture de données centralisée, pensée pour être facile à enrichir, à corriger, et à adapter à un vrai contenu de marque ou à une publication plus large.

Si vous voulez continuer le projet, les prochains points naturels sont :

- enrichir les contenus éditoriaux ;
- compléter les fiches géographiques et culturelles ;
- ajouter des illustrations réelles plus spécifiques à chaque région ;
- revoir les libellés et les noms malgaches avec un expert ;
- préparer la version production (SEO, données réelles, traduction, hébergement).
# sakafo
# sakafo
