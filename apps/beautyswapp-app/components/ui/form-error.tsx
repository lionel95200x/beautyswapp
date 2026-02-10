import { Text } from 'tamagui'

/**
 * Composant pour afficher les erreurs de formulaire
 */
export const FormError = ({ children }: { children: React.ReactNode }) => (
  <Text color="$red10" fontSize="$2" mt="$1" mb="$2">
    {children}
  </Text>
)
