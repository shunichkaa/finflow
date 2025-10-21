import React from 'react';
import { Card, CardProps, Box, keyframes } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GlassCardProps extends CardProps {
    children: React.ReactNode;
    glowColor?: string;
    intensity?: 'low' | 'medium' | 'high' | 'premium';
    animated?: boolean;
}

const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

const float = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
`;

const glow = keyframes`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`;

const premiumEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const GlassCard: React.FC<GlassCardProps> = ({ 
    children, 
    glowColor, 
    intensity = 'premium',
    animated = true,
    sx,
    ...props 
}) => {
    const { mode } = useThemeMode();

    const getIntensityValues = () => {
        switch (intensity) {
            case 'low':
                return {
                    blur: '20px',
                    saturation: '150%',
                    shadow: '0 4px 16px',
                    hoverShadow: '0 8px 24px',
                    scale: 1.01,
                };
            case 'high':
                return {
                    blur: '60px',
                    saturation: '200%',
                    shadow: '0 12px 48px',
                    hoverShadow: '0 20px 60px',
                    scale: 1.02,
                };
            case 'premium':
                return {
                    blur: '80px',
                    saturation: '220%',
                    shadow: '0 16px 64px',
                    hoverShadow: '0 24px 80px',
                    scale: 1.02,
                };
            default: // medium
                return {
                    blur: '40px',
                    saturation: '180%',
                    shadow: '0 8px 32px',
                    hoverShadow: '0 16px 48px',
                    scale: 1.015,
                };
        }
    };

    const intensityValues = getIntensityValues();

    return (
        <Card
            {...props}
            sx={{
                borderRadius: 2,
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                WebkitBackdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                backgroundColor: mode === 'dark' 
                    ? 'rgba(28, 28, 30, 0.75)'
                    : 'rgba(255, 255, 255, 0.45)',
                border: mode === 'dark'
                    ? '1.5px solid rgba(255, 255, 255, 0.18)'
                    : '1.5px solid rgba(255, 255, 255, 0.6)',
                boxShadow: mode === 'dark'
                    ? `${intensityValues.shadow} rgba(0, 0, 0, 0.5), 
                       0 4px 12px rgba(0, 0, 0, 0.3), 
                       inset 0 1px 0 rgba(255, 255, 255, 0.15),
                       inset 0 -1px 0 rgba(255, 255, 255, 0.05)`
                    : `${intensityValues.shadow} rgba(151, 125, 255, 0.12), 
                       0 4px 12px rgba(31, 38, 135, 0.08), 
                       inset 0 1px 0 rgba(255, 255, 255, 0.8),
                       inset 0 -1px 0 rgba(255, 255, 255, 0.4)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: mode === 'dark'
                        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: mode === 'dark'
                        ? 'linear-gradient(90deg, transparent, rgba(151, 125, 255, 0.5), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
                    opacity: 0.6,
                },
                '&:hover': {
                    transform: `translateY(-4px) scale(${intensityValues.scale})`,
                    boxShadow: mode === 'dark'
                        ? `${intensityValues.hoverShadow} rgba(151, 125, 255, 0.3), 
                           0 12px 28px rgba(0, 0, 0, 0.4), 
                           inset 0 1px 0 rgba(255, 255, 255, 0.2),
                           inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                           0 0 40px rgba(151, 125, 255, 0.2)`
                        : `${intensityValues.hoverShadow} rgba(151, 125, 255, 0.25), 
                           0 12px 28px rgba(31, 38, 135, 0.15), 
                           inset 0 1px 0 rgba(255, 255, 255, 1),
                           inset 0 -1px 0 rgba(255, 255, 255, 0.6),
                           0 0 40px rgba(151, 125, 255, 0.15)`,
                    border: mode === 'dark'
                        ? '1.5px solid rgba(151, 125, 255, 0.3)'
                        : '1.5px solid rgba(151, 125, 255, 0.4)',
                },
                ...sx,
            }}
        >
            {/* Ambient glow effect */}
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: mode === 'dark'
                    ? 'radial-gradient(circle, rgba(151, 125, 255, 0.08) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(151, 125, 255, 0.05) 0%, transparent 70%)',
                opacity: 0,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
                zIndex: 0,
                animation: `${glow} 4s ease-in-out infinite`,
                '.MuiCard-root:hover &': {
                    opacity: 1,
                }
            }} />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Card>
    );
};
