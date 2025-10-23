import React from 'react';
import { Box, keyframes } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GradientBackgroundProps {
    children: React.ReactNode;
}

const gradientAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const float = keyframes`
    0%, 100% {
        transform: translate(0, 0) rotate(0deg);
    }
    33% {
        transform: translate(30px, -30px) rotate(120deg);
    }
    66% {
        transform: translate(-20px, 20px) rotate(240deg);
    }
`;

const pulse = keyframes`
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.1);
    }
`;

const smoothEasing = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

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
                    : '#EFF0F6', // Athens Gray для светлой темы
                backgroundSize: '100% 100%',
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {children}
            </Box>
        </Box>
    );
};
