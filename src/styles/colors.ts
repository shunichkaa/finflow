export const colors = {
  primary: '#6C6FF9',
  secondary: '#6B7280',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',

  brand: {
    cornflower: '#6C6FF9',
    midnight: '#272B3E',
  },

  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    appLight: '#F5F6FA',
    appDark: '#272B3E',
    glassLight: '#FFFFFF73',
    glassDark: '#1C1C1EBF',
  },

  text: {
    primary: '#272B3E',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    disabled: '#D1D5DB',
    inverted: '#FFFFFF',
  },

  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    glassLight: '#FFFFFF99',
    glassDark: '#FFFFFF2E',
  },

  shadows: {
    brandLight: '#6C6FF933',
    brand: '#6C6FF966',
  },
} as const;

export type Colors = typeof colors;


