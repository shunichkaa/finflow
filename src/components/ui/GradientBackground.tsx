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
                background: mode === 'dark'
                    ? 'linear-gradient(-45deg, #1a1a2e, #2d2d44, #3d3d5c, #4a4a6a, #2d2d44)'
                    : 'linear-gradient(-45deg, #F2E6EE, #FFCCF2, #977DFF, #FFCCF2, #F2E6EE)',
                backgroundSize: '400% 400%',
                animation: `${gradientAnimation} 20s cubic-bezier(0.4, 0.0, 0.2, 1) infinite`,
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: mode === 'dark'
                        ? `radial-gradient(circle at 20% 80%, rgba(74, 74, 106, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(151, 125, 255, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(184, 166, 255, 0.15) 0%, transparent 50%)`
                        : `radial-gradient(circle at 20% 80%, rgba(151, 125, 255, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 204, 242, 0.25) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                    animation: `${pulse} 10s cubic-bezier(0.4, 0.0, 0.2, 1) infinite`,
                    willChange: 'opacity, transform',
                },
                '&::after': {
                    content: '""',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: mode === 'dark'
                        ? 'radial-gradient(circle, rgba(74, 74, 106, 0.15) 0%, transparent 60%)'
                        : 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    filter: 'blur(100px)',
                    animation: `${float} 25s cubic-bezier(0.4, 0.0, 0.2, 1) infinite`,
                    willChange: 'transform',
                },
            }}
        >
            {/* Glass overlay */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(0px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {children}
            </Box>
        </Box>
    );
};
