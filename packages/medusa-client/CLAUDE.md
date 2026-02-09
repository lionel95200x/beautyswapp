# CLAUDE.MD - Medusa Client Package

## 📦 Imports/Exports

**❌ JAMAIS de barrel exports (index.ts qui ré-exporte)**
- Ne pas exporter les hooks depuis index.ts
- Ne pas exporter les utilitaires depuis index.ts
- Toujours importer directement depuis les fichiers sources
- Import direct améliore la performance et la clarté du code

**Exemples:**

```typescript
❌ Interdit (barrel export dans index.ts):
// src/index.ts
export { useProducts } from './hooks/useProducts'
export { useCategories } from './hooks/useCategories'

// autre fichier
import { useProducts } from '@beautyswapp/medusa-client'

✅ Correct (import direct):
// autre fichier
import { useProducts } from '@beautyswapp/medusa-client/src/hooks/useProducts'
import { useCategories } from '@beautyswapp/medusa-client/src/hooks/useCategories'
```

**Exception autorisée:**
- Types de @medusajs/types peuvent être ré-exportés pour simplifier les imports TypeScript
- Client SDK (sdk) peut être exporté car c'est l'API principale du package

```typescript
✅ OK dans index.ts:
export { sdk } from './client'
export type * from '@medusajs/types'
```
