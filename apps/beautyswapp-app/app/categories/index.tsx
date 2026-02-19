import { useState } from 'react'
import { Stack } from 'expo-router'
import { useCategories } from '@beautyswapp/payload-client/hooks/useCategories'
import { ListingScreen } from '../../components/ListingScreen'
import { CategoryGrid } from '../../components/CategoryGrid'
import { Button } from 'tamagui'
import * as Sentry from '@sentry/react-native';

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading, error } = useCategories()

  const filteredCategories = data?.docs?.filter((category) =>
    category.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Stack.Screen options={{ title: 'Catégories' }} />
      <ListingScreen
        subtitle="Explorez toutes nos catégories"
        searchPlaceholder="Rechercher une catégorie..."
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        countLabel={filteredCategories ? `${filteredCategories.length} catégories` : undefined}
      >
        <CategoryGrid
          categories={filteredCategories}
          isLoading={isLoading}
          error={error}
        />
      </ListingScreen>
    </>
  )
}
