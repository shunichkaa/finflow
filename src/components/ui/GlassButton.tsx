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
            default: 
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
                    ? '#1C1C1ECC'
                    : '#FCF8F5B3',
                border: mode === 'dark'
                    ? '1px solid #FFFFFF1A'
                    : '1px solid #FCF8F5E6',
                boxShadow: mode === 'dark'
                    ? `${intensityValues.shadow} #0000004D, 0 2px 8px #00000033, inset 0 1px 0 #FFFFFF1A`
                    : `${intensityValues.shadow} #1F268726, 0 2px 8px #0000001A, inset 0 1px 0 #FFFFFF99`,
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
                        background: 'linear-gradient(90deg, transparent, #FFFFFF33, transparent)',
                        transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                }),
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: mode === 'dark'
                        ? `${intensityValues.hoverShadow} #00000066, 0 4px 12px #0000004D, inset 0 1px 0 #FFFFFF26`
                        : `${intensityValues.hoverShadow} #1F268733, 0 4px 12px #00000026, inset 0 1px 0 #FFFFFF99`,
                    backgroundColor: mode === 'dark' 
                        ? '#1C1C1EE6'
                        : '#FCF8F5D9',
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