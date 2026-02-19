import { YStack, Text } from 'tamagui';
import { useRouter } from 'expo-router';
import { ProfileSubPageLayout } from '@/components/ProfileSubPageLayout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ImageBanner } from '@/components/ImageBanner';
import { ProductsGrid } from '@/components/ProductsGrid';
import { OrdersList } from '@/components/OrdersList';
import { Tabs } from '@/components/Tabs';
import { useProductsBySeller } from '@beautyswapp/payload-client/hooks/useProducts';
import { useOrdersByCustomer } from '@beautyswapp/payload-client/hooks/useOrders';

export default function VanityScreen() {
  const { data: user } = useCurrentUser();
  const router = useRouter();

  const { data: productsData, isLoading, error } = useProductsBySeller(user?.id as number);
  const products = productsData?.docs;

  const { data: ordersData, isLoading: ordersLoading, error: ordersError } = useOrdersByCustomer(user?.id as number);
  const orders = ordersData?.docs;

  const handleEdit = (productId: number) => {
    router.push(`/vanity/edit/${productId}`);
  };

  const tabs = [
    {
      id: 'selling',
      label: 'Mes produits en vente',
      content: (
        <ProductsGrid
          products={products}
          isLoading={isLoading}
          error={error}
          emptyMessage="Aucun produit en vente"
          onEdit={handleEdit}
        />
      ),
    },
    {
      id: 'purchases',
      label: 'Mes achats',
      content: (
        <OrdersList
          orders={orders}
          emptyMessage="Aucun achat"
        />
      ),
    },
  ];

  return (
    <ProfileSubPageLayout title="MON VANITY">
      // @ts-ignore - Tamagui types issue
      <YStack ai="center">
        <Text color="$accent" style={{ textTransform: 'uppercase', textAlign: 'center' }}>
          Bienvenue dans ton Vanity !
          Publie, gère et retrouve tous tes produits
        </Text>
      </YStack>

      <ImageBanner
        title="MES PRODUITS"
        subtitle="Gérez vos produits et vos achats"
        image={require('../../assets/images/product/product-kosas-separateur.jpg')}
      />

      <Tabs tabs={tabs} defaultTab="selling" />
    </ProfileSubPageLayout>
  );
}
