import { Button, ButtonProps, Box } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GlassButtonProps extends ButtonProps {
    glowColor?: string;
    intensity?: 'low' | 'medium' | 'high';
    shimmer?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
    children, 
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
                    saturation: '150%',
                    shadow: '0 4px 12px',
                    hoverShadow: '0 8px 20px',
                };
            case 'high':
                return {
                    blur: '30px',
                    saturation: '200%',
                    shadow: '0 8px 24px',
                    hoverShadow: '0 16px 40px',
                };
            default: // medium
                return {
                    blur: '20px',
                    saturation: '180%',
                    shadow: '0 6px 16px',
                    hoverShadow: '0 12px 32px',
                };
        }
    };

    const intensityValues = getIntensityValues();

    return (
        <Button
            {...props}
            sx={{
                textTransform: 'none',
                fontWeight: 500,
                padding: '12px 24px',
                borderRadius: 4,
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                backgroundColor: mode === 'dark' 
                    ? 'rgba(28, 28, 30, 0.8)'
                    : 'rgba(252, 248, 245, 0.7)',
                border: mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(252, 248, 245, 0.9)',
                boxShadow: mode === 'dark'
                    ? `${intensityValues.shadow} rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                    : `${intensityValues.shadow} rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                        transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                }),
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: mode === 'dark'
                        ? `${intensityValues.hoverShadow} rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                        : `${intensityValues.hoverShadow} rgba(31, 38, 135, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(28, 28, 30, 0.9)'
                        : 'rgba(252, 248, 245, 0.85)',
                    ...(shimmer && {
                        '&::before': {
                            left: '100%',
                        },
                    }),
                },
                '&:active': {
                    transform: 'scale(0.98)',
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