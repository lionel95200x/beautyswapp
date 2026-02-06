import * as orderRepository from '../repository/order.repository';

export type { OrderFilters } from '../repository/order.repository';

export async function listOrders(filters?: orderRepository.OrderFilters) {
  return orderRepository.findAll(filters);
}

export async function getOrderById(id: string) {
  return orderRepository.findById(id);
}
