import { createFileRoute } from '@tanstack/react-router';
import { useOrders } from '@beautyswapp/domain/hooks/useOrders';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { OrdersTable } from '@/components/OrdersTable';

export const Route = createFileRoute('/orders/')({
  component: OrdersPage,
});

function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!orders) {
    return null;
  }

  return (
    <PageLayout>
      <PageHeader
        title="Commandes"
        description="Liste de toutes les commandes sur BeautySwapp"
      />

      <OrdersTable orders={orders} />
    </PageLayout>
  );
}
