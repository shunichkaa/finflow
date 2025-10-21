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
                    saturation: '150%',
                    shadow: '0 4px 16px',
                    hoverShadow: '0 8px 24px',
                };
            case 'high':
                return {
                    blur: '60px',
                    saturation: '200%',
                    shadow: '0 12px 48px',
                    hoverShadow: '0 20px 60px',
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
        ? 'rgba(10, 132, 255, 0.15)' 
        : 'rgba(0, 122, 255, 0.1)';

    return (
        <Card
            {...props}
            sx={{
                borderRadius: 6,
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                backgroundColor: mode === 'dark' 
                    ? 'rgba(28, 28, 30, 0.85)'
                    : 'rgba(252, 248, 245, 0.7)',
                border: mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(252, 248, 245, 0.9)',
                boxShadow: mode === 'dark'
                    ? `${intensityValues.shadow} rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                    : `${intensityValues.shadow} rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: mode === 'dark'
                        ? `${intensityValues.hoverShadow} rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
                        : `${intensityValues.hoverShadow} rgba(31, 38, 135, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
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
