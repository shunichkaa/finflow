import React from 'react';
import { Button, ButtonProps, Box, keyframes } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GlassButtonProps extends ButtonProps {
    glowColor?: string;
    intensity?: 'low' | 'medium' | 'high' | 'premium';
    shimmer?: boolean;
}

const shimmer = keyframes`
    0% {
        transform: translateX(-100%) rotate(45deg);
    }
    100% {
        transform: translateX(300%) rotate(45deg);
    }
`;

const pulse = keyframes`
    0%, 100% {
        box-shadow: 0 0 20px rgba(151, 125, 255, 0.4);
    }
    50% {
        box-shadow: 0 0 40px rgba(151, 125, 255, 0.6);
    }
`;

const ripple = keyframes`
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
`;

export const GlassButton: React.FC<GlassButtonProps> = ({ 
    children, 
    glowColor, 
    intensity = 'premium',
    shimmer: showShimmer = true,
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
                    shadow: '0 4px 12px',
                    hoverShadow: '0 8px 24px',
                };
            case 'high':
                return {
                    blur: '60px',
                    saturation: '200%',
                    shadow: '0 12px 32px',
                    hoverShadow: '0 20px 48px',
                };
            case 'premium':
                return {
                    blur: '80px',
                    saturation: '220%',
                    shadow: '0 16px 48px',
                    hoverShadow: '0 24px 64px',
                };
            default: // medium
                return {
                    blur: '40px',
                    saturation: '180%',
                    shadow: '0 8px 24px',
                    hoverShadow: '0 16px 40px',
                };
        }
    };

    const intensityValues = getIntensityValues();

    return (
        <Button
            {...props}
            sx={{
                textTransform: 'none',
                fontWeight: 600,
                padding: '14px 28px',
                fontSize: '1rem',
                borderRadius: 2,
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                WebkitBackdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                backgroundColor: mode === 'dark' 
                    ? 'rgba(28, 28, 30, 0.6)'
                    : 'rgba(255, 255, 255, 0.3)',
                border: mode === 'dark'
                    ? '1.5px solid rgba(255, 255, 255, 0.2)'
                    : '1.5px solid rgba(255, 255, 255, 0.6)',
                boxShadow: mode === 'dark'
                    ? `${intensityValues.shadow} rgba(151, 125, 255, 0.3), 
                       0 4px 12px rgba(0, 0, 0, 0.3), 
                       inset 0 1px 0 rgba(255, 255, 255, 0.2),
                       inset 0 -1px 0 rgba(255, 255, 255, 0.1)`
                    : `${intensityValues.shadow} rgba(151, 125, 255, 0.2), 
                       0 4px 12px rgba(31, 38, 135, 0.1), 
                       inset 0 1px 0 rgba(255, 255, 255, 0.9),
                       inset 0 -1px 0 rgba(255, 255, 255, 0.5)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': showShimmer ? {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: mode === 'dark'
                        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                    pointerEvents: 'none',
                } : {},
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: mode === 'dark'
                        ? 'linear-gradient(90deg, transparent, rgba(151, 125, 255, 0.8), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)',
                    opacity: 0.8,
                },
                '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: mode === 'dark'
                        ? `${intensityValues.hoverShadow} rgba(151, 125, 255, 0.5), 
                           0 8px 20px rgba(0, 0, 0, 0.4), 
                           inset 0 1px 0 rgba(255, 255, 255, 0.3),
                           inset 0 -1px 0 rgba(255, 255, 255, 0.15),
                           0 0 60px rgba(151, 125, 255, 0.3)`
                        : `${intensityValues.hoverShadow} rgba(151, 125, 255, 0.35), 
                           0 8px 20px rgba(31, 38, 135, 0.2), 
                           inset 0 1px 0 rgba(255, 255, 255, 1),
                           inset 0 -1px 0 rgba(255, 255, 255, 0.7),
                           0 0 60px rgba(151, 125, 255, 0.2)`,
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(28, 28, 30, 0.75)'
                        : 'rgba(255, 255, 255, 0.5)',
                    border: mode === 'dark'
                        ? '1.5px solid rgba(151, 125, 255, 0.4)'
                        : '1.5px solid rgba(151, 125, 255, 0.5)',
                },
                '&:active': {
                    transform: 'scale(0.97)',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: mode === 'dark'
                            ? 'rgba(151, 125, 255, 0.3)'
                            : 'rgba(151, 125, 255, 0.2)',
                        animation: `${ripple} 0.6s ease-out`,
                        pointerEvents: 'none',
                    },
                },
                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    transform: 'none',
                },
                ...sx,
            }}
        >
            {/* Ambient glow */}
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: mode === 'dark'
                    ? 'radial-gradient(circle, rgba(151, 125, 255, 0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(151, 125, 255, 0.1) 0%, transparent 70%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
                zIndex: 0,
                '.MuiButton-root:hover &': {
                    opacity: 1,
                }
            }} />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Button>
    );
};
