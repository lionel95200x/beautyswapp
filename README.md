# BeautySwapp Monorepo

Monorepo pnpm pour le projet BeautySwapp.

## Structure

```
beautyswapp/
├── apps/
│   ├── beautyswapp/    # Application principale
│   └── admin/          # Application admin
└── packages/
    ├── domain/         # Logique métier partagée
    └── auth/           # Module d'authentification
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
