# BeautySwapp Monorepo

Monorepo pnpm pour le projet BeautySwapp - Marketplace de produits de beauté d'occasion.

## Stack Technique

### Backend (bs-admin)
- **CMS :** Payload CMS 3.75
- **Framework :** Next.js 15.4
- **Database :** PostgreSQL (via @payloadcms/db-postgres)
- **API :** REST + GraphQL (auto-généré par Payload)
- **Auth :** JWT Payload intégré
- **Storage :** Payload Media Collection
- **Payment :** Stripe

### App Mobile (beautyswapp-app)
- **Framework :** Expo 54 + React Native 0.81
- **UI :** Tamagui 2.0
- **Routing :** Expo Router 6.0
- **State :** TanStack Query 5.90
- **API Client :** @beautyswapp/payload-client (SDK custom)

### Packages
- **@beautyswapp/payload-client :** SDK TypeScript pour communiquer avec Payload CMS API

## Structure

```
beautyswapp/
├── apps/
│   ├── beautyswapp-app/   # Application mobile Expo
│   └── bs-admin/          # Backend Payload CMS + Admin
└── packages/
    └── payload-client/    # SDK API Payload
```

## Installation

```bash
pnpm install
```

## Commandes

```bash
# Développement (tous les workspaces en parallèle)
pnpm dev

# Build (tous les workspaces)
pnpm build

# Lint (tous les workspaces)
pnpm lint

# Test (tous les workspaces)
pnpm test

# Exécuter une commande dans un workspace spécifique
pnpm --filter @beautyswapp/app dev
pnpm --filter @beautyswapp/admin dev
pnpm --filter @beautyswapp/domain build
pnpm --filter @beautyswapp/auth build
```

## Workspaces

- `@beautyswapp/app` - Application principale
- `@beautyswapp/admin` - Application admin
- `@beautyswapp/domain` - Package de domaine
- `@beautyswapp/auth` - Package d'authentification
