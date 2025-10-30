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
            background: mode === 'dark' 
                ? '#272B3E' 
                : '#F5F6FA', 
                backgroundSize: '100% 100%',
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {children}
            </Box>
        </Box>
    );
};