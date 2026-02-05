import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as schema from './schema';

export type Profile = InferSelectModel<typeof schema.profiles>;
export type Product = InferSelectModel<typeof schema.products>;
export type ProductPhoto = InferSelectModel<typeof schema.productPhotos>;
export type Order = InferSelectModel<typeof schema.orders>;
export type Dispute = InferSelectModel<typeof schema.disputes>;
export type ProductCorrectionRequest = InferSelectModel<typeof schema.productCorrectionRequests>;
export type AdminRequest = InferSelectModel<typeof schema.adminRequests>;

export type NewProfile = InferInsertModel<typeof schema.profiles>;
export type NewProduct = InferInsertModel<typeof schema.products>;
export type NewProductPhoto = InferInsertModel<typeof schema.productPhotos>;
export type NewOrder = InferInsertModel<typeof schema.orders>;
export type NewDispute = InferInsertModel<typeof schema.disputes>;
export type NewProductCorrectionRequest = InferInsertModel<typeof schema.productCorrectionRequests>;
export type NewAdminRequest = InferInsertModel<typeof schema.adminRequests>;

export type UserRole = typeof schema.userRole.enumValues[number];
export type ProductStatus = typeof schema.productStatus.enumValues[number];
export type ProductCondition = typeof schema.productCondition.enumValues[number];
export type PhotoSlot = typeof schema.photoSlot.enumValues[number];
export type OrderStatus = typeof schema.orderStatus.enumValues[number];
export type DisputeStatus = typeof schema.disputeStatus.enumValues[number];
