import { createTamagui } from '@tamagui/core'
import { defaultConfig } from '@tamagui/config/v5'

// 🎨 Beautyswapp Colors (10 couleurs max de la maquette)
const beautyswappColors = {
  primary: '#e8e1f7',     // Rose/Magenta
  purpleText: '#8e6fe8',
  secondary: '#8B7EC8',   // Violet
  secondaryPurple: '#f2a5f0',
  accent: '#F4A261',      // Orange
  orangeButton: '#E9752A',
  background: '#E8D9F5',  // Violet clair
  backgroundHover: '#FFFFFF', // Blanc
  color: '#1A1A1A',       // Noir
  gray10: '#666666',      // Gris
  gray11: '#808080',      // Gris clair
  borderColor: '#E5E5E5', // Bordure
  red10: '#e60b0f',       // Error
  green10: '#4CAF50',     // Success
}

const config = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      ...beautyswappColors,
    },
    dark: {
      ...defaultConfig.themes.dark,
      ...beautyswappColors,
    },
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig { }
}

export default config


