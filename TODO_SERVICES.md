# 🔧 Services Backend Manquants

## 📦 product.repository.ts / product.service.ts

### Workflow statuts
- [ ] `publishProduct(id)` - Change status → 'published' + set publishedAt
- [ ] `sendToSellerApproval(id)` - Change status → 'awaiting_seller_approval'
- [ ] `requestInfo(id)` - Change status → 'need_info'
- [ ] `blockProduct(id, reason)` - Change status → 'blocked' + adminNote
- [ ] `approveProduct(id)` - Vendeur valide → 'published' + publishedAt

### Photos
- [ ] `uploadProductPhoto(productId, slot, file)` - Upload vers Supabase Storage
- [ ] `getProductPhotos(productId)` - Liste photos par produit
- [ ] `deleteProductPhoto(photoId)` - Supprime une photo

### Queries spécifiques
- [ ] `findPublishedProducts()` - Products avec status='published' pour catalogue
- [ ] `findProductsByStatus(status)` - Déjà dans filters mais explicite
- [ ] `findProductsAwaitingApproval(sellerId)` - Pour vendeur

---

## 📝 product_correction_requests (nouvelle table)

### À créer: correction-request.repository.ts
- [ ] `create(productId, sellerId, message)` - Vendeur demande correction
- [ ] `findByProductId(productId)` - Liste demandes pour un produit
- [ ] `markAsResolved(id)` - Résoudre demande

### À créer: correction-request.service.ts
- [ ] `requestCorrection(productId, message)` - Vendeur demande modif
- [ ] `getCorrectionRequests(productId)`
- [ ] `resolveRequest(id)`

---

## 🔧 admin_requests (nouvelle table)

### À créer: admin-request.repository.ts
- [ ] `create(productId, adminId, message)` - Admin demande info
- [ ] `findByProductId(productId)` - Liste demandes pour un produit
- [ ] `addSellerResponse(id, response)` - Vendeur répond
- [ ] `markAsResolved(id)`

### À créer: admin-request.service.ts
- [ ] `requestInfo(productId, message)` - Admin demande info complémentaire
- [ ] `respondToRequest(requestId, response)` - Vendeur répond
- [ ] `getRequestsByProduct(productId)`
- [ ] `resolveRequest(id)`

---

## 📦 order.repository.ts / order.service.ts

### Création
- [ ] `createOrder(productId, buyerId, amount, stripePaymentId)` - Après paiement

### Workflow livraison
- [ ] `updateOrderStatus(id, status)` - Change statut commande
- [ ] `addTrackingInfo(id, trackingNumber, shippingLabelUrl)` - Admin ajoute tracking
- [ ] `markAsShipped(id)` - status → 'shipped' + shippedAt
- [ ] `confirmDelivery(id)` - status → 'delivered' + deliveredAt

### Queries
- [ ] `findByBuyerId(buyerId)` - Mes commandes acheteur
- [ ] `findBySellerId(sellerId)` - Mes ventes vendeur

---

## 🚨 disputes (nouvelle table)

### À créer: dispute.repository.ts
- [ ] `create(orderId, reportedBy, message)` - Créer litige
- [ ] `findByOrderId(orderId)` - Litiges d'une commande
- [ ] `findAll(filters?)` - Liste tous litiges pour admin
- [ ] `updateStatus(id, status)` - open/resolved/closed

### À créer: dispute.service.ts
- [ ] `reportDispute(orderId, message)` - Signaler problème
- [ ] `getDisputesByOrder(orderId)`
- [ ] `getAllDisputes()`
- [ ] `resolveDispute(id)`
- [ ] `closeDispute(id)`

---

## 👤 profile.repository.ts / profile.service.ts

### Gestion utilisateurs
- [ ] `suspendProfile(id)` - set isSuspended=true
- [ ] `reactivateProfile(id)` - set isSuspended=false
- [ ] `updateRole(id, role)` - Change user/admin

---

## 💳 payment (nouveau service)

### À créer: payment.service.ts
- [ ] `createPaymentIntent(amount, productId)` - Stripe Payment Intent
- [ ] `confirmPayment(paymentIntentId)` - Vérifie paiement
- [ ] `escrowPayment(orderId)` - Séquestre paiement
- [ ] `releasePayment(orderId)` - Libère au vendeur après livraison
- [ ] `refundPayment(orderId, reason)` - Remboursement si litige

---

## 📧 notification (nouveau service)

### À créer: notification.service.ts
- [ ] `notifySellerAnnouncementReady(productId)` - Email annonce prête
- [ ] `notifySellerInfoRequest(productId, message)` - Email demande info
- [ ] `notifySellerShippingLabel(orderId)` - Email étiquette
- [ ] `notifyBuyerShipped(orderId)` - Email expédition
- [ ] `notifyBuyerDelivered(orderId)` - Email livraison

---

## 📊 Résumé

### Existant (5 fonctions de base)
- [x] product: findAll, findById, create, update
- [x] order: findAll, findById
- [x] profile: findAll, findById

### À créer (42 fonctions)
#### Products (9)
- [ ] publishProduct, sendToSellerApproval, requestInfo, blockProduct, approveProduct
- [ ] uploadProductPhoto, getProductPhotos, deleteProductPhoto
- [ ] findPublishedProducts

#### Correction Requests (6)
- [ ] create, findByProductId, markAsResolved
- [ ] requestCorrection, getCorrectionRequests, resolveRequest

#### Admin Requests (7)
- [ ] create, findByProductId, addSellerResponse, markAsResolved
- [ ] requestInfo, respondToRequest, getRequestsByProduct

#### Orders (6)
- [ ] createOrder, updateOrderStatus, addTrackingInfo
- [ ] markAsShipped, confirmDelivery, findByBuyerId

#### Disputes (8)
- [ ] create, findByOrderId, findAll, updateStatus
- [ ] reportDispute, getDisputesByOrder, resolveDispute, closeDispute

#### Profiles (3)
- [ ] suspendProfile, reactivateProfile, updateRole

#### Payment (5)
- [ ] createPaymentIntent, confirmPayment, escrowPayment
- [ ] releasePayment, refundPayment

#### Notifications (5)
- [ ] notifySellerAnnouncementReady, notifySellerInfoRequest
- [ ] notifySellerShippingLabel, notifyBuyerShipped, notifyBuyerDelivered

**Total: 47 fonctions (5 existantes + 42 à créer)**
