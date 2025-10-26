import React from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GradientBackgroundProps {
    children: React.ReactNode;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
    const { mode } = useThemeMode();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                // Минимализм: ТОЛЬКО #EFF0F6 для светлой темы
            background: mode === 'dark' 
                ? '#272B3E' // Midnight Blue для темной темы
                : '#F5F6FA', // Светлый фон для светлой темы
                backgroundSize: '100% 100%',
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {children}
            </Box>
        </Box>
    );
};