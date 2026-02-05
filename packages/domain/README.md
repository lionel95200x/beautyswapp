# @beautyswapp/domain

Package de logique métier partagée pour BeautySwapp.

## 🎯 Philosophie Architecture

**Contexte**: BeautySwapp = App mobile (React Native) + Admin web (React)

### Principe: Hooks communs dans domain

Les **hooks React sont de la logique métier**, pas de l'UI. Ils doivent être partagés.

**✅ Hooks dans domain** (logique métier):
- Gestion d'état (loading, error, data)
- Cache et invalidation
- Mutations et optimistic updates
- Appels services

**❌ Dans chaque app** (UI spécifique):
- Composants UI (Button, Card, Form)
- Navigation/routing
- Styles
- Configuration plateforme

### Structure cible

```
@beautyswapp/domain/
├── schema.ts
├── types.ts
├── repository/       # Accès données (Drizzle queries)
├── services/         # Logique métier pure (business rules)
└── hooks/            # Hooks React partagés (état + cache)
    ├── useProducts.ts
    ├── useProduct.ts
    ├── useCreateProduct.ts
    ├── useUpdateProduct.ts
    ├── useOrders.ts
    └── useUsers.ts
```

**Avantages**:
- Zéro duplication entre mobile et admin
- Logique métier centralisée et testable
- Cohérence garantie des comportements
- Un fix = corrigé partout

## Structure

```
src/
├── schema.ts              # Schéma Drizzle ORM
├── types.ts               # Types TypeScript inférés
├── repository/            # Couche d'accès aux données
│   └── product.repository.ts
├── services/              # Logique métier
│   └── product.service.ts
└── index.ts               # Exports (schema et types uniquement)
```

## Utilisation

⚠️ **Toujours importer directement depuis les fichiers sources**

### Product Service

```typescript
import { listPublishedProducts, getProductById } from '@beautyswapp/domain/services/product.service';
import { db } from './db'; // Votre instance Drizzle

// Liste tous les produits publiés
const products = await listPublishedProducts(db);

// Récupère un produit par ID
const product = await getProductById(db, 'uuid-here');
```

### Product Repository

```typescript
import { findAllPublished, findById } from '@beautyswapp/domain/repository/product.repository';
import { db } from './db';

// Accès direct au repository
const products = await findAllPublished(db);
const product = await findById(db, 'uuid-here');
```

## Exemple de routes API

### GET /products

```typescript
import { listPublishedProducts } from '@beautyswapp/domain/services/product.service';

app.get('/products', async (req, res) => {
  const products = await listPublishedProducts(db);
  res.json(products);
});
```

### GET /products/:id

```typescript
import { getProductById } from '@beautyswapp/domain/services/product.service';

app.get('/products/:id', async (req, res) => {
  const product = await getProductById(db, req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
```
