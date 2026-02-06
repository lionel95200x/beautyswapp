import { Link } from '@tanstack/react-router';
import { Package } from 'lucide-react';
import type { Product } from '@beautyswapp/domain/types';
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

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Marque</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <EmptyState icon={Package} message="Aucun produit publié" />
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link
                    to="/products/$productId"
                    params={{ productId: product.id }}
                    className="font-medium hover:underline hover:text-primary"
                  >
                    {product.title}
                  </Link>
                  {product.description && (
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {product.description}
                    </div>
                  )}
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.condition}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {product.price && `${product.price} €`}
                </TableCell>
                <TableCell>
                  <Badge>{product.status}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
