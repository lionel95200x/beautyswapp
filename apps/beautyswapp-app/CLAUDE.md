# CLAUDE.MD - Beautyswapp App (Expo + Tamagui)

## 🎨 Tamagui Design System

**🚨 RÈGLE CRITIQUE - Styling et Composants UI**

**❌ INTERDIT:**
- StyleSheet.create() de React Native
- Styles inline custom (style={{ ... }})
- CSS-in-JS custom ou styled-components
- Créer des composants UI custom quand Tamagui en fournit

**✅ OBLIGATOIRE:**
- **Toujours utiliser les composants Tamagui** : View, Text, Button, Input, etc.
- **Toujours utiliser les tokens du thème Tamagui** avec la syntaxe `$`
- **Vérifier la documentation Tamagui** avant de créer un composant

**🎨 RÈGLE CRITIQUE - Couleurs:**
- **❌ JAMAIS inventer de couleurs** (#8e6fe8, rgb(), rgba(), etc.)
- **✅ UNIQUEMENT les tokens définis dans tamagui.config.ts**
- Toutes les couleurs DOIVENT provenir de `beautyswappColors`


- Espacements : `$space.1` à `$space.12`, ou directement `$1` à `$12`
- Tailles : `$size.1` à `$size.20`
- Radius : `$radius.1` à `$radius.12`

**Exemples:**

```tsx
❌ INTERDIT - StyleSheet React Native:
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: '#ffffff',
    padding: 16,
  }
})

<View style={styles.container}>
  <Text>Hello</Text>
</View>

❌ INTERDIT - Styles inline:
<View style={{ width: 200, backgroundColor: '#fff' }}>
  <Text>Hello</Text>
</View>

❌ INTERDIT - Couleurs inventées:
import { Ionicons } from '@expo/vector-icons'
<Ionicons name="mail-outline" size={20} color="#8e6fe8" />
<Text color="#666666">Texte gris</Text>

✅ CORRECT - Composants et tokens Tamagui:
import { View, Text } from 'tamagui'

<View width={200} height={200} backgroundColor="$background" padding="$4">
  <Text color="$color">Hello</Text>
</View>

✅ CORRECT - Couleurs avec tokens uniquement:
import { Ionicons } from '@expo/vector-icons'
<Ionicons name="mail-outline" size={20} color="$purpleText" />
<Text color="$gray10">Texte gris</Text>

✅ CORRECT - Responsive avec Tamagui:
<View
  width={200}
  $gtSm={{ width: 400 }}
  backgroundColor="$background"
  padding="$4"
>
  <Text fontSize="$5" fontWeight="600" color="$purpleText">Hello</Text>
</View>
```

**Composants Tamagui à vérifier en priorité:**
- Layout : `View`, `Stack`, `XStack`, `YStack`, `ZStack`, `Group`
- Texte : `Text`, `Heading`, `Paragraph`, `SizableText`
- Formulaires : `Input`, `TextArea`, `Label`, `Form`, `Select`, `Checkbox`, `RadioGroup`, `Switch`
- Boutons : `Button`, `ToggleGroup`
- Cartes : `Card`
- Autres : `Avatar`, `Image`, `Separator`, `ScrollView`, `Sheet`, `Dialog`, `Popover`, `Tooltip`

**Documentation Tamagui:** https://tamagui.dev/docs/components

**Process avant de coder un composant UI:**
1. ✅ Vérifier si le composant existe dans Tamagui
2. ✅ Utiliser les tokens du thème (`$background`, `$color`, etc.)
3. ✅ Utiliser les props Tamagui pour le layout (padding, margin, flex, etc.)
4. ❌ Ne PAS créer de StyleSheet custom
5. ❌ Ne PAS utiliser de couleurs hard-codées (#fff, rgb(), etc.)

## 📱 Expo Router

**Routing et Navigation:**
- Utiliser Expo Router pour la navigation
- Suivre la structure de fichiers dans `app/` pour les routes
- Ne pas mélanger flat files et nested folders pour les routes dynamiques (voir CLAUDE.md racine)

## 🔐 Variables d'Environnement

**Convention Expo:**
- Utiliser le préfixe `EXPO_PUBLIC_*` pour les variables accessibles côté client
- Définir dans `.env` à la racine de l'app (ignoré par git)
- Documenter dans `.env.example` (versionné)

**❌ INTERDIT (violation règle no-fallback):**
```ts
const url = process.env.EXPO_PUBLIC_API_URL || 'http://localhost'
```

**✅ CORRECT (fail-fast avec erreur explicite):**
```ts
const url = process.env.EXPO_PUBLIC_API_URL
if (!url) {
  throw new Error('EXPO_PUBLIC_API_URL is required')
}
