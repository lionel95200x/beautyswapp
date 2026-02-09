# CLAUDE.MD - Beautyswapp

**🚨 CETTE RÈGLE EST LA PLUS IMPORTANTE - ELLE NE SOUFFRE AUCUNE EXCEPTION 🚨**

- ❌ **JAMAIS** de fallback `|| ''`, `|| 'valeur'`, `|| undefined`, `?? 'valeur'`
- ❌ **JAMAIS** de valeur par défaut dans les paramètres de fonction
- ❌ **JAMAIS** de fallback dans les variables d'environnement
- ❌ **JAMAIS** de fallback dans les props React
- ❌ **AUCUNE EXCEPTION**, même pour "éviter une erreur"

**Exemples interdits:**

```typescript
❌ const url = process.env.API_URL || 'http://localhost:3000'
❌ const name = user.name || 'Anonymous'
❌ function foo(bar = 'default') { }
❌ const value = props.value ?? ''
```

**✅ Exception valide : Multi-source sans valeur arbitraire**

```typescript
// ✅ OK : Chercher dans plusieurs sources + fail-fast si AUCUNE n'existe
const url = process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL
if (!url) {
  throw new Error('API_URL required (NEXT_PUBLIC_API_URL or EXPO_PUBLIC_API_URL)')
}

// ❌ INTERDIT : Fallback sur valeur arbitraire
const url = process.env.API_URL || 'http://localhost:3000'
```

## 📦 Imports/Exports

**❌ JAMAIS de barrel exports (index.ts qui ré-exporte)**
- Toujours importer directement depuis les fichiers sources
- Ne pas créer de fichiers index.ts qui font `export * from './module'`
- Import direct améliore la performance et la clarté du code

**Exemples:**

```typescript
❌ Interdit (barrel export):
// index.ts
export * from './services/product.service'
export * as productRepo from './repository/product.repository'

// autre fichier
import { productService } from '@beautyswapp/domain'

✅ Correct (import direct):
// autre fichier
import { listPublishedProducts } from '@beautyswapp/domain/services/product.service'
import { findAllPublished } from '@beautyswapp/domain/repository/product.repository'
```

## 🛣️ TanStack Router

**❌ JAMAIS mélanger flat files et nested folders pour le même paramètre dynamique**

**Exemples:**

```
❌ Interdit (mélange flat + nested):
routes/products/$productId.tsx       (fichier flat)
routes/products/$productId/edit.tsx  (dossier nested)
→ CONFLIT! Ne fonctionne pas!

✅ Correct (tout nested):
routes/products/$productId/index.tsx → /products/$productId
routes/products/$productId/edit.tsx  → /products/$productId/edit
```

## 🔄 Data Fetching

**❌ JAMAIS de fetch/axios dans les fichiers .tsx**
- Toujours utiliser `useQuery` de TanStack Query pour les GET
- Toujours utiliser `useMutation` de TanStack Query pour les POST/PUT/DELETE
- Pas de `fetch()`, `axios()`, ou appels HTTP directs dans les composants

**Exemples:**

```typescript
❌ Interdit (fetch direct):
const [data, setData] = useState([])
useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(setData)
}, [])

❌ Interdit (async dans useEffect):
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('/api/products')
    setData(await res.json())
  }
  fetchData()
}, [])

✅ Correct (useQuery):
const { data, isLoading } = useQuery({
  queryFn: () => sdk.admin.product.list(),
  queryKey: ['products'],
})

✅ Correct (useMutation):
const updateProduct = useMutation({
  mutationFn: (id: string) => sdk.admin.product.update(id, data),
  onSuccess: () => queryClient.invalidateQueries(['products']),
})
```

## 📱 Apps Spécifiques

- **beautyswapp-app** : Voir [apps/beautyswapp-app/CLAUDE.md](apps/beautyswapp-app/CLAUDE.md) pour les règles Tamagui et Expo
