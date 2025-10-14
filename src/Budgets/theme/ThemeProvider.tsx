import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { ThemeContext, ThemeMode } from './ThemeContext';

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme-mode');
        return saved === 'dark' || saved === 'light' ? saved : 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
    }, [mode]);

    const toggleTheme = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};