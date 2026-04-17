# Countries Search

Une application React moderne pour rechercher et explorer des pays du monde entier.

## Fonctionnalités

- **Recherche de pays** : Recherchez des pays par nom, code ou région
- **Filtrage avancé** : Filtrez par région et code pays
- **Détails des pays** : Consultez les informations détaillées de chaque pays
- **Favoris** : Sauvegardez vos pays préférés avec Zustand
- **Interface moderne** : UI construite avec shadcn/ui et Tailwind CSS
- **Routing client-side** : Navigation fluide avec TanStack Router
- **Responsive design** : Adapté pour tous les écrans
- **Animations** : Animations fluides avec Motion

## 🚀 Stack Technique

- **React 19** avec TypeScript
- **Vite** pour le build et le dev server
- **TanStack Router** pour le routing client-side
- **Tailwind CSS 4** pour le styling
- **shadcn/ui** pour les composants UI
- **Zustand** pour la gestion d'état
- **Radix UI** pour les composants accessibles
- **Lucide React** pour les icônes
- **Motion** pour les animations

## 📦 Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur `http://localhost:5173`

## 📜 Scripts Disponibles

- `pnpm dev` - Lance le serveur de développement
- `pnpm build` - Compile le projet pour la production
- `pnpm lint` - Exécute ESLint
- `pnpm preview` - Prévisualise le build de production
- `pnpm deploy` - Déploie sur GitHub Pages (nécessite configuration)

## 🌐 Déploiement

Le projet est configuré pour être déployé sur GitHub Pages.

### Déploiement automatique avec GitHub Actions

Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement à chaque push sur la branche `master` et déploie le site.

### Configuration requise

1. Dans le repository GitHub, allez dans **Settings** → **Pages**
2. Configurez **Source** : Deploy from a branch
3. Sélectionnez **Branch** : `gh-pages` et dossier `/(root)`
4. Cliquez sur **Save**

## 📁 Structure du Projet

```
countries-search/
├── public/
│   ├── 404.html         # Page 404 pour GitHub Pages
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   └── ui/          # Composants shadcn/ui
│   ├── lib/
│   │   └── utils.ts     # Utilitaires
│   ├── routes/          # Routes TanStack Router
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── search.tsx
│   │   ├── country.$code.tsx
│   │   └── dashboard.tsx
│   ├── store/
│   │   └── favorites.ts # Store Zustand
│   ├── types/
│   │   └── country.ts   # Types TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx       # Configuration TanStack Router
├── .github/
│   └── workflows/
│       └── deploy.yml   # Workflow GitHub Actions
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API

Cette application utilise l'API [REST Countries](https://restcountries.com/) pour récupérer les données des pays.

## 📝 Développement

### Ajouter de nouveaux composants UI

```bash
npx shadcn@latest add [component-name]
```

### Configuration TanStack Router

Le router est configuré avec un `basepath` pour GitHub Pages dans `src/router.tsx`.

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📄 Licence

Ce projet est un projet éducatif.

## 🔗 Liens

- **Demo** : https://devlm.github.io/cloud_campus_countries_search
- **Repository** : https://github.com/DevlM/cloud_campus_countries_search
