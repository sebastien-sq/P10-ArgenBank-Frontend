# ArgenBank - Application Frontend

Application bancaire moderne développée avec React Router, Redux Toolkit et TypeScript. Cette application permet aux utilisateurs de se connecter, gérer leur profil et consulter leurs comptes bancaires.

## 🚀 Technologies utilisées

- **React 19.1.1** - Bibliothèque JavaScript pour construire des interfaces utilisateur
- **React Router 7.9.2** - Framework de routage pour React
- **Redux Toolkit 2.9.0** - Gestion d'état prévisible pour les applications JavaScript
- **RTK Query** - Outil de récupération de données puissant pour Redux
- **TypeScript 5.9.2** - Typage statique pour JavaScript
- **TailwindCSS 4.1.13** - Framework CSS utilitaire
- **Vitest 3.2.4** - Framework de tests rapide et moderne
- **Vite 7.1.7** - Build tool rapide et optimisé

## 📋 Prérequis

- **Node.js** 20 ou supérieur
- **npm**, **pnpm**, **yarn** ou **bun** (package manager)
- API backend ArgenBank en cours d'exécution sur `http://localhost:3001`

## 📦 Installation

1. Clonez le repository :
```bash
git clone <url-du-repository>
cd P10-ArgenBank-Frontend
```

2. Installez les dépendances :
```bash
npm install
# ou
pnpm install
# ou
yarn install
```

## 🛠️ Développement

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173` avec le Hot Module Replacement (HMR) activé.

### Vérification des types TypeScript

```bash
npm run typecheck
```

### Exécution des tests

```bash
# Exécuter tous les tests
npm run test

# Exécuter les tests avec interface utilisateur
npm run test:ui

# Exécuter les tests avec couverture de code
npm run test:coverage
```

## 🏗️ Construction pour la production

Créez une build de production optimisée :

```bash
npm run build
```

Cette commande génère les fichiers optimisés dans le dossier `build/` :
```
build/
├── client/    # Assets statiques
└── server/    # Code serveur
```

### Démarrer l'application en production

```bash
npm run start
```



## 📁 Structure du projet

```
P10-ArgenBank-Frontend/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── Features.tsx
│   │   └── Hero.tsx
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useAuthenticated.ts
│   │   ├── useInitializeAuth.ts
│   │   └── useUserProfile.ts
│   ├── layout/              # Composants de layout
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   ├── pages/               # Pages de l'application
│   │   ├── Home.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── User.tsx
│   ├── routes/              # Routes React Router
│   │   ├── home.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── user.tsx
│   ├── services/            # Services API (RTK Query)
│   │   ├── authApi.ts
│   │   └── userApi.ts
│   ├── slices/              # Slices Redux
│   │   ├── authSlice.ts
│   │   └── userSlice.ts
│   ├── utils/               # Utilitaires
│   │   └── validateForm.ts
│   ├── root.tsx             # Point d'entrée
│   ├── routes.ts            # Configuration des routes
│   └── store.ts             # Configuration du store Redux
├── __tests__/               # Tests unitaires et d'intégration
├── public/                  # Assets statiques
│   └── img/                 # Images
├── Dockerfile               # Configuration Docker
├── package.json             # Dépendances et scripts
├── react-router.config.ts   # Configuration React Router
├── tsconfig.json            # Configuration TypeScript
└── vite.config.ts           # Configuration Vite
```

## 🔐 Fonctionnalités

### Authentification
- **Connexion** (`/sign-in`) : Connexion avec email et mot de passe
- **Inscription** (`/sign-up`) : Création d'un nouveau compte utilisateur
- Gestion des tokens JWT avec stockage optionnel dans `localStorage`
- Option "Se souvenir de moi" pour la persistance de session

### Gestion du profil utilisateur
- **Consultation du profil** : Affichage des informations utilisateur (nom, prénom, email)
- **Modification du profil** : Mise à jour du nom et prénom avec validation
- Synchronisation automatique avec le store Redux

### Comptes bancaires
- Affichage des comptes :
  - Compte courant (Checking)
  - Compte épargne (Savings)
  - Carte de crédit (Credit Card)
- Affichage des soldes disponibles

## 🔌 API Backend

L'application communique avec l'API backend ArgenBank sur `http://localhost:3001/api/v1/`.

### Endpoints utilisés

- `POST /user/login` - Authentification utilisateur
- `POST /user/signup` - Inscription utilisateur
- `POST /user/profile` - Récupération du profil utilisateur
- `PUT /user/profile` - Mise à jour du profil utilisateur

### Authentification

Les requêtes authentifiées nécessitent un header `Authorization` avec un token Bearer :
```
Authorization: Bearer <token>
```

## 🧪 Tests

Les tests sont écrits avec Vitest et React Testing Library. La structure de tests inclut :

- Tests unitaires des slices Redux (`authSlice.test.js`, `userSlice.test.js`)
- Tests des services API (`authApi.test.js`, `userApi.test.js`)
- Tests des hooks personnalisés (`hooks.test.jsx`)
- Tests d'intégration (`integration.test.jsx`)
- Tests de validation (`validation.test.js`)

## 🎨 Styling

L'application utilise **TailwindCSS** pour le styling. Les styles personnalisés peuvent être définis dans `app/app.css`.

## ⚙️ Configuration

### Variables d'environnement

Assurez-vous que l'API backend est configurée et accessible sur `http://localhost:3001`. Les URLs de base sont définies dans :
- `app/services/authApi.ts`
- `app/services/userApi.ts`

### Mode SSR

Par défaut, le mode SSR (Server-Side Rendering) est désactivé dans `react-router.config.ts`. Pour l'activer, modifiez :

```typescript
ssr: true
```

## 📝 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run start` | Démarre l'application en mode production |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm run test` | Exécute tous les tests |
| `npm run test:ui` | Lance l'interface de test Vitest |
| `npm run test:coverage` | Génère un rapport de couverture de code |

## 🐛 Dépannage

### L'API backend n'est pas accessible

Vérifiez que :
1. Le serveur backend est démarré sur le port 3001
2. Les URLs dans `authApi.ts` et `userApi.ts` sont correctes
3. Aucun proxy ou firewall ne bloque les requêtes

### Erreurs de token

Si vous rencontrez des problèmes d'authentification :
1. Vérifiez que le token est correctement stocké dans Redux
2. Videz le `localStorage` si nécessaire
3. Vérifiez que le header `Authorization` est correctement formaté

## 📄 Licence

Ce projet a été développé dans le cadre d'un projet OpenClassrooms.



---

**Note** : Cette application nécessite que l'API backend ArgenBank soit en cours d'exécution pour fonctionner correctement.
