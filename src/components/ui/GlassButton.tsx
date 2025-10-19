import React from 'react';
import { Button, ButtonProps, Box } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GlassButtonProps extends ButtonProps {
    glowColor?: string;
    intensity?: 'low' | 'medium' | 'high';
    shimmer?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
    children, 
    glowColor, 
    intensity = 'medium',
    shimmer = true,
    sx,
    ...props 
}) => {
    const { mode } = useThemeMode();

    const getIntensityValues = () => {
        switch (intensity) {
            case 'low':
                return {
                    blur: '10px',
                    saturation: '120%',
                    shadow: '0 4px 16px',
                    hoverShadow: '0 8px 24px',
                };
            case 'high':
                return {
                    blur: '30px',
                    saturation: '200%',
                    shadow: '0 8px 32px',
                    hoverShadow: '0 16px 48px',
                };
            default: // medium
                return {
                    blur: '20px',
                    saturation: '180%',
                    shadow: '0 6px 24px',
                    hoverShadow: '0 12px 36px',
                };
        }
    };

    const intensityValues = getIntensityValues();
    const defaultGlowColor = mode === 'dark' 
        ? 'rgba(102, 51, 255, 0.4)' 
        : 'rgba(168, 163, 246, 0.4)';

    return (
        <Button
            {...props}
            sx={{
                textTransform: 'none',
                fontWeight: 600,
                padding: '14px 28px',
                borderRadius: 3,
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: `${intensityValues.shadow} ${glowColor || defaultGlowColor}, 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                ...(shimmer && {
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        transition: 'left 0.5s',
                    },
                }),
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 50% 50%, ${glowColor || defaultGlowColor} 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                },
                '&:hover': {
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: `${intensityValues.hoverShadow} ${glowColor || defaultGlowColor}, 0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
                    ...(shimmer && {
                        '&::before': {
                            left: '100%',
                        },
                    }),
                    '&::after': {
                        opacity: 0.1,
                    },
                },
                '&:active': {
                    transform: 'translateY(-2px) scale(1.02)',
                },
                ...sx,
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Button>
    );
};
