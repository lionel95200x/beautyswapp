import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import type { Order } from '@beautyswapp/domain/types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { EmptyState } from './ui/empty-state';

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Commande</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Acheteur</TableHead>
            <TableHead>Vendeur</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState icon={ShoppingCart} message="Aucune commande" />
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    to="/orders/$orderId"
                    params={{ orderId: order.id }}
                    className="font-mono text-sm hover:underline hover:text-primary"
                  >
                    {order.id.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to="/products/$productId"
                    params={{ productId: order.productId }}
                    className="text-sm hover:underline hover:text-primary"
                  >
                    {order.productId.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to="/profiles/$profileId"
                    params={{ profileId: order.buyerId }}
                    className="font-mono text-xs hover:underline hover:text-primary"
                  >
                    {order.buyerId.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to="/profiles/$profileId"
                    params={{ profileId: order.sellerId }}
                    className="font-mono text-xs hover:underline hover:text-primary"
                  >
                    {order.sellerId.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell className="font-medium">{order.amount} €</TableCell>
                <TableCell>
                  <Badge>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
