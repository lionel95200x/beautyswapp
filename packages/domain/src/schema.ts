import { pgTable, uuid, text, timestamp, boolean, decimal, integer, pgEnum } from 'drizzle-orm/pg-core';

// ==================== ENUMS ====================

export const userRole = pgEnum('user_role', ['user', 'admin']);

export const productStatus = pgEnum('product_status', [
  'submitted',
  'need_info',
  'draft_prepared',
  'awaiting_seller_approval',
  'published',
  'blocked',
  'sold',
  'completed',
]);

export const productCondition = pgEnum('product_condition', [
  'sealed_new',
  'unsealed_new',
  'swatched',
  'used_very_little',
]);

export const photoSlot = pgEnum('photo_slot', [
  'front',
  'back',
  'batch_code',
  'ingredients',
  'pao',
  'seal_proof',
  'cap',
]);

export const orderStatus = pgEnum('order_status', [
  'paid',
  'label_generated',
  'shipped',
  'delivered',
  'disputed',
]);

export const disputeStatus = pgEnum('dispute_status', ['open', 'resolved', 'closed']);

// ==================== TABLES ====================

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  role: userRole('role').notNull().default('user'),
  isSuspended: boolean('is_suspended').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => profiles.id),
  status: productStatus('status').notNull().default('submitted'),

  brand: text('brand'),
  category: text('category'),
  condition: productCondition('condition'),
  batchCode: text('batch_code'),
  paoOrExpiry: text('pao_or_expiry'),

  title: text('title'),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),

  adminNote: text('admin_note'),

  sellerCommitmentAccepted: boolean('seller_commitment_accepted').notNull().default(false),
  sellerCommitmentAcceptedAt: timestamp('seller_commitment_accepted_at'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  publishedAt: timestamp('published_at'),
});

export const productPhotos = pgTable('product_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  slot: photoSlot('slot').notNull(),
  url: text('url').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id),
  buyerId: uuid('buyer_id').notNull().references(() => profiles.id),
  sellerId: uuid('seller_id').notNull().references(() => profiles.id),

  status: orderStatus('status').notNull().default('paid'),

  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  stripePaymentId: text('stripe_payment_id').notNull(),

  trackingNumber: text('tracking_number'),
  shippingLabelUrl: text('shipping_label_url'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
  shippedAt: timestamp('shipped_at'),
  deliveredAt: timestamp('delivered_at'),
});

export const disputes = pgTable('disputes', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  reportedBy: uuid('reported_by').notNull().references(() => profiles.id),
  message: text('message').notNull(),
  status: disputeStatus('status').notNull().default('open'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const productCorrectionRequests = pgTable('product_correction_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sellerId: uuid('seller_id').notNull().references(() => profiles.id),
  message: text('message').notNull(),
  isResolved: boolean('is_resolved').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const adminRequests = pgTable('admin_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  adminId: uuid('admin_id').notNull().references(() => profiles.id),
  message: text('message').notNull(),
  sellerResponse: text('seller_response'),
  isResolved: boolean('is_resolved').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
