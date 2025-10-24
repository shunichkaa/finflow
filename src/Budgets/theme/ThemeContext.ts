import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => console.warn('⚠️ toggleTheme called outside provider!'),
});

export const useThemeMode = () => useContext(ThemeContext);


