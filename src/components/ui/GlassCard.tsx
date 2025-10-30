import { Card, CardProps } from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface GlassCardProps extends CardProps {
    children: React.ReactNode;
    glowColor?: string;
    intensity?: 'low' | 'medium' | 'high' | 'premium';
    animated?: boolean;
}


export const GlassCard: React.FC<GlassCardProps> = ({ 
    children, 
    intensity = 'premium',
    glowColor,
    animated,
    sx,
    ...restProps 
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
            default: 
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
            {...restProps}
            sx={{
                borderRadius: 2,
                backdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                WebkitBackdropFilter: `blur(${intensityValues.blur}) saturate(${intensityValues.saturation})`,
                backgroundColor: mode === 'dark' 
                    ? '#1C1C1EBF'
                    : '#FFFFFF73',
                border: mode === 'dark'
                    ? '1.5px solid #FFFFFF2E'
                    : '1.5px solid #FFFFFF99',
                boxShadow: mode === 'dark'
                    ? `${intensityValues.shadow} #00000080, 
                       0 4px 12px #0000004D, 
                       inset 0 1px 0 #FFFFFF26,
                       inset 0 -1px 0 #FFFFFF0D`
                    : `${intensityValues.shadow} #6C6FF91F, 
                       0 4px 12px #1F268714, 
                       inset 0 1px 0 #FFFFFFCC,
                       inset 0 -1px 0 #FFFFFF66`,
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
                        ? 'linear-gradient(90deg, transparent, #FFFFFF08, transparent)'
                        : 'linear-gradient(90deg, transparent, #FFFFFF99, transparent)',
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
                        ? 'linear-gradient(90deg, transparent, #6C6FF980, transparent)'
                        : 'linear-gradient(90deg, transparent, #FFFFFFE6, transparent)',
                    opacity: 0.6,
                },
                '&:hover': {
                    transform: `translateY(-4px) scale(${intensityValues.scale})`,
                    boxShadow: mode === 'dark'
                        ? `${intensityValues.hoverShadow} #6C6FF94D, 
                           0 12px 28px #00000066, 
                           inset 0 1px 0 #FFFFFF33,
                           inset 0 -1px 0 #FFFFFF1A,
                           0 0 40px ${glowColor || '#6C6FF933'}`
                        : `${intensityValues.hoverShadow} #6C6FF940, 
                           0 12px 28px #1F268726, 
                           inset 0 1px 0 #FFFFFFFF,
                           inset 0 -1px 0 #FFFFFF99,
                           0 0 40px ${glowColor || '#6C6FF926'}`,
                    border: mode === 'dark'
                        ? '1.5px solid #6C6FF94D'
                        : '1.5px solid #6C6FF966',
                },
                ...sx,
            }}
        >
            {children}
        </Card>
    );
};
