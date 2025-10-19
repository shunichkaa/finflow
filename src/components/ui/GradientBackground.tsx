import React from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GradientBackgroundProps {
    children: React.ReactNode;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
    const { mode } = useThemeMode();

    const lightGradient = 'linear-gradient(135deg, #F8FFA1 0%, #F6D5EE 50%, #A8A3F6 100%)';
    const darkGradient = 'linear-gradient(135deg, #0F0F23 0%, #1E1B4B 50%, #312E81 100%)';

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
                        ? 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 20% 80%, rgba(168, 163, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(246, 213, 238, 0.3) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    zIndex: -1,
                },
            }}
        >
            {children}
        </Box>
    );
};
