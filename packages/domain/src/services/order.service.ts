import * as orderRepository from '../repository/order.repository';

export type { OrderFilters } from '../repository/order.repository';

export async function listOrders(filters?: orderRepository.OrderFilters) {
  return orderRepository.findAll(filters);
}

export async function getOrderById(id: string) {
  return orderRepository.findById(id);
}

export async function createOrder(data: {
  productId: string;
  buyerId: string;
  sellerId: string;
  amount: string;
  stripePaymentId: string;
  status: orderRepository.OrderFilters['status'];
  paidAt: Date;
}) {
  return orderRepository.create(data);
}
