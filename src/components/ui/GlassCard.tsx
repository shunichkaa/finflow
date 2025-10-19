import React from 'react';
import { Card, CardProps, Box } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GlassCardProps extends CardProps {
    children: React.ReactNode;
    glowColor?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
    children, 
    glowColor, 
    intensity = 'medium',
    sx,
    ...props 
}) => {
    const { mode } = useThemeMode();

    const getIntensityValues = () => {
        switch (intensity) {
            case 'low':
                return {
                    blur: '20px',
                    saturation: '120%',
                    shadow: '0 4px 16px',
                    hoverShadow: '0 8px 24px',
                };
            case 'high':
                return {
                    blur: '60px',
                    saturation: '200%',
                    shadow: '0 12px 48px',
                    hoverShadow: '0 24px 72px',
                };
            default: // medium
                return {
                    blur: '40px',
                    saturation: '180%',
                    shadow: '0 8px 32px',
                    hoverShadow: '0 16px 48px',
                };
        }
    };

    const intensityValues = getIntensityValues();
    const defaultGlowColor = mode === 'dark' 
        ? 'rgba(102, 51, 255, 0.3)' 
        : 'rgba(168, 163, 246, 0.3)';

    return (
        <Card
            {...props}
            sx={{
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                backgroundColor: mode === 'dark' 
                    ? 'rgba(26, 0, 77, 0.25)'
                    : 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: 4,
                boxShadow: `${intensityValues.shadow} ${glowColor || defaultGlowColor}, 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 50% 0%, ${glowColor || defaultGlowColor} 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                },
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `${intensityValues.hoverShadow} ${glowColor || defaultGlowColor}, 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(26, 0, 77, 0.35)'
                        : 'rgba(255, 255, 255, 0.35)',
                    '&::after': {
                        opacity: 0.1,
                    },
                },
                ...sx,
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Card>
    );
};
