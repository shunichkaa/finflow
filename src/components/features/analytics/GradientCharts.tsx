import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

interface GradientBarProps {
    gradient: string;
    title: string;
    subtitle?: string;
    height?: number;
    glowColor?: string;
}

const GradientBar: React.FC<GradientBarProps> = ({ 
    gradient, 
    title, 
    subtitle, 
    height = 200,
    glowColor = 'rgba(255, 255, 255, 0.1)'
}) => {
    const { mode } = useThemeMode();

    return (
        <Box
            sx={{
                position: 'relative',
                height: height,
                width: '100%',
                borderRadius: 4,
                background: gradient,
                boxShadow: `0 8px 32px ${glowColor}, 0 2px 8px rgba(0, 0, 0, 0.1)`,
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                    background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 70%)`,
                    opacity: 0.3,
                    pointerEvents: 'none',
                },
                '&:hover': {
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: `0 16px 48px ${glowColor}, 0 4px 16px rgba(0, 0, 0, 0.15)`,
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    zIndex: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontWeight: 600,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                        mb: subtitle ? 0.5 : 0,
                    }}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export const GradientCharts: React.FC = () => {
    const { mode } = useThemeMode();
    const { t } = useTranslation();

    const gradients = [
        {
            gradient: 'linear-gradient(135deg, #F2E6EE 0%, #977DFF 100%)',
            title: 'Доходы',
            subtitle: 'Месячная статистика',
            glowColor: 'rgba(151, 125, 255, 0.3)',
        },
        {
            gradient: 'linear-gradient(135deg, #FFCCF2 0%, #0033FF 50%, #0600AF 100%)',
            title: 'Расходы',
            subtitle: 'По категориям',
            glowColor: 'rgba(0, 51, 255, 0.3)',
        },
        {
            gradient: 'linear-gradient(135deg, #977DFF 0%, #0033FF 50%, #0600AF 100%)',
            title: 'Бюджет',
            subtitle: 'Остаток средств',
            glowColor: 'rgba(151, 125, 255, 0.3)',
        },
        {
            gradient: 'linear-gradient(135deg, #0033FF 0%, #0600AB 50%, #00003D 100%)',
            title: 'Сбережения',
            subtitle: 'Накопления',
            glowColor: 'rgba(0, 51, 255, 0.4)',
        },
    ];

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h5"
                sx={{
                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
                    fontWeight: 600,
                    mb: 3,
                    textAlign: 'center',
                }}
            >
                📊 Графики и статистика
            </Typography>
            
            <Grid container spacing={3}>
                {gradients.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <GradientBar
                            gradient={item.gradient}
                            title={item.title}
                            subtitle={item.subtitle}
                            height={180}
                            glowColor={item.glowColor}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
