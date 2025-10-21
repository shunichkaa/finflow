import React from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GradientBackgroundProps {
    children: React.ReactNode;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
    const { mode } = useThemeMode();

    const lightGradient = 'linear-gradient(135deg, #F2E6EE 0%, #FFCCF2 50%, #977DFF 100%)';
    const darkGradient = 'linear-gradient(135deg, #00003D 0%, #0600AB 50%, #0033FF 100%)';

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: mode === 'dark' ? darkGradient : lightGradient,
                backgroundAttachment: 'fixed',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: mode === 'dark' 
                        ? 'radial-gradient(circle at 20% 80%, rgba(0, 51, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(151, 125, 255, 0.3) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 20% 80%, rgba(151, 125, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 204, 242, 0.3) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    zIndex: -1,
                },
            }}
        >
            {children}
        </Box>
    );
};
