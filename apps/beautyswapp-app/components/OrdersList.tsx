import { YStack, XStack, Card, Text } from 'tamagui';
import type { Order } from '@beautyswapp/payload-client/types';

interface OrdersListProps {
  orders: Order[] | undefined;
  emptyMessage?: string;
}

export function OrdersList({ orders, emptyMessage }: OrdersListProps) {
  if (!orders || orders.length === 0) {
    return (
      <YStack flex={1} ai="center" jc="center" padding="$4">
        <Text color="$gray10" ta="center">
          {emptyMessage}
        </Text>
      </YStack>
    );
  }


  console.log({ orders, ordesItems: orders?.[0]?.items });
  return (
    <YStack gap="$3" padding="$2">
      {orders.map((order) => (
        <Card key={order.id} elevate size="$4" bordered>
          <Card.Header>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" color="$secondary">
                Commande #{order.id}
              </Text>
              <Text fontSize="$2" color="$gray10">
                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
              </Text>
            </XStack>
          </Card.Header>

          <YStack padding="$3" gap="$2">
            <XStack justifyContent="space-between">
              <Text color="$gray11">Statut:</Text>
              <Text color="$secondary" fontWeight="600">
                {order.status === 'processing' && 'En cours'}
                {order.status === 'completed' && 'Terminée'}
                {order.status === 'cancelled' && 'Annulée'}
                {order.status === 'refunded' && 'Remboursée'}
              </Text>
            </XStack>

            <XStack justifyContent="space-between">
              <Text color="$gray11">Montant:</Text>
              <Text color="$accent" fontWeight="700">
                {order.amount ? `${order.amount} ${order.currency || 'USD'}` : '-'}
              </Text>
            </XStack>

            {order.items && order.items.length > 0 && (
              <YStack gap="$1" marginTop="$2">
                <Text color="$gray11" fontSize="$2">
                  {order.items.length} article{order.items.length > 1 ? 's' : ''}
                </Text>
              </YStack>
            )}
          </YStack>
        </Card>
      ))}
    </YStack>
  );
}
