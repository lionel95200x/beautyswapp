# Architecture Base de Données - BeautySwapp MVP V1

## Tables nécessaires

### 1. **users** (gérée par Supabase Auth + métadonnées)
```sql
-- Extension de auth.users avec métadonnées
profiles
├── id (uuid, PK, FK → auth.users.id)
├── role (enum: 'user', 'admin')
├── is_suspended (boolean, default: false)
├── created_at (timestamp)
└── updated_at (timestamp)
```

**Relations:**
- Lié à `auth.users` de Supabase
- Un utilisateur peut être vendeur ET acheteur

---

### 2. **products**
```sql
products
├── id (uuid, PK)
├── seller_id (uuid, FK → profiles.id)
├── status (enum)
│   ├── 'submitted'
│   ├── 'need_info'
│   ├── 'draft_prepared'
│   ├── 'awaiting_seller_approval'
│   ├── 'published'
│   └── 'blocked'
├── brand (text, nullable)
├── category (text, nullable)
├── condition (enum, nullable)
│   ├── 'sealed_new'
│   ├── 'unsealed_new'
│   ├── 'swatched'
│   └── 'used_very_little'
├── batch_code (text, nullable)
├── pao_or_expiry (text, nullable)
├── title (text, nullable)
├── description (text, nullable)
├── price (decimal, nullable)
├── admin_note (text, nullable)
├── seller_commitment_accepted (boolean)
├── seller_commitment_accepted_at (timestamp, nullable)
├── created_at (timestamp)
├── updated_at (timestamp)
└── published_at (timestamp, nullable)
```

**Index:**
- `seller_id`
- `status`
- `published_at` (pour tri des annonces)

---

### 3. **product_photos**
```sql
product_photos
├── id (uuid, PK)
├── product_id (uuid, FK → products.id, ON DELETE CASCADE)
├── slot (enum)
│   ├── 'front'              # Face du produit
│   ├── 'back'               # Dos / étiquette
│   ├── 'batch_code'         # Batch code / numéro de lot
│   ├── 'ingredients'        # Ingrédients (INCI)
│   ├── 'pao'                # PAO / date d'expiration
│   ├── 'seal_proof'         # Preuve du scellé (si neuf scellé)
│   └── 'cap'                # Bouchon / pompe (si ouvert)
├── url (text)               # URL Supabase Storage
├── order (integer)          # Ordre d'affichage
└── created_at (timestamp)
```

**Index:**
- `product_id`
- `(product_id, slot)` unique

**Contrainte:**
- Minimum 3 photos obligatoires (front, back, batch_code)

---

### 4. **orders**
```sql
orders
├── id (uuid, PK)
├── product_id (uuid, FK → products.id)
├── buyer_id (uuid, FK → profiles.id)
├── seller_id (uuid, FK → profiles.id)
├── status (enum)
│   ├── 'paid'
│   ├── 'label_generated'
│   ├── 'shipped'
│   ├── 'delivered'
│   └── 'disputed'
├── amount (decimal)
├── stripe_payment_id (text)
├── tracking_number (text, nullable)
├── shipping_label_url (text, nullable)
├── created_at (timestamp)
├── paid_at (timestamp, nullable)
├── shipped_at (timestamp, nullable)
└── delivered_at (timestamp, nullable)
```

**Index:**
- `product_id`
- `buyer_id`
- `seller_id`
- `status`
- `stripe_payment_id`

---

### 5. **disputes**
```sql
disputes
├── id (uuid, PK)
├── order_id (uuid, FK → orders.id)
├── reported_by (uuid, FK → profiles.id)
├── message (text)
├── status (enum: 'open', 'resolved', 'closed')
└── created_at (timestamp)
```

**Index:**
- `order_id`
- `status`

---

### 6. **product_correction_requests**
```sql
product_correction_requests
├── id (uuid, PK)
├── product_id (uuid, FK → products.id, ON DELETE CASCADE)
├── seller_id (uuid, FK → profiles.id)
├── message (text)                    # Demande de correction du vendeur
├── is_resolved (boolean, default: false)
└── created_at (timestamp)
```

**Index:**
- `product_id`
- `is_resolved`

---

### 7. **admin_requests** (optionnel - demandes info complémentaire)
```sql
admin_requests
├── id (uuid, PK)
├── product_id (uuid, FK → products.id, ON DELETE CASCADE)
├── admin_id (uuid, FK → profiles.id)
├── message (text)                    # Info demandée
├── seller_response (text, nullable)
├── is_resolved (boolean, default: false)
└── created_at (timestamp)
```

**Index:**
- `product_id`
- `is_resolved`

---

## Enums à créer dans Supabase

```sql
-- Rôle utilisateur
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Statut produit
CREATE TYPE product_status AS ENUM (
  'submitted',
  'need_info',
  'draft_prepared',
  'awaiting_seller_approval',
  'published',
  'blocked'
);

-- Condition produit
CREATE TYPE product_condition AS ENUM (
  'sealed_new',
  'unsealed_new',
  'swatched',
  'used_very_little'
);

-- Slot photo
CREATE TYPE photo_slot AS ENUM (
  'front',
  'back',
  'batch_code',
  'ingredients',
  'pao',
  'seal_proof',
  'cap'
);

-- Statut commande
CREATE TYPE order_status AS ENUM (
  'paid',
  'label_generated',
  'shipped',
  'delivered',
  'disputed'
);

-- Statut litige
CREATE TYPE dispute_status AS ENUM ('open', 'resolved', 'closed');
```

---

## Storage Buckets Supabase

```
product-photos/
├── {product_id}/
│   ├── front.jpg
│   ├── back.jpg
│   ├── batch_code.jpg
│   ├── ingredients.jpg (optionnel)
│   ├── pao.jpg (optionnel)
│   ├── seal_proof.jpg (optionnel)
│   └── cap.jpg (optionnel)
```

**Policies:**
- Upload : uniquement utilisateurs authentifiés
- Read : public pour produits publiés, privé pour autres statuts

---

## Résumé des tables

| Table | Description | Priorité MVP |
|-------|-------------|--------------|
| `profiles` | Métadonnées utilisateurs | ✅ Critique |
| `products` | Produits | ✅ Critique |
| `product_photos` | Photos produits | ✅ Critique |
| `orders` | Commandes | ✅ Critique |
| `disputes` | Litiges | ✅ Critique |
| `product_correction_requests` | Demandes correction vendeur | ✅ Critique |
| `admin_requests` | Demandes info admin | 🟡 Utile |

**Total : 7 tables principales**

---

## Relations principales

```
profiles (1) ──< (N) products [seller_id]
products (1) ──< (N) product_photos
products (1) ──< (N) orders
profiles (1) ──< (N) orders [buyer_id]
profiles (1) ──< (N) orders [seller_id]
orders (1) ──< (N) disputes
products (1) ──< (N) product_correction_requests
products (1) ──< (N) admin_requests
```

---

## Remarques importantes

1. **Supabase Auth** gère `auth.users` automatiquement
2. **Profiles** étend `auth.users` avec métadonnées métier
3. **Row Level Security (RLS)** à configurer pour chaque table
4. **Triggers** utiles :
   - `updated_at` auto-update
   - Validation contraintes métier
   - Notifications
