import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';

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

    const borderColor = mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.08)';

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
                border: `1px solid ${borderColor}`,
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

    const gradients: Array<{
        gradient: string;
        title: string;
        subtitle: string;
        glowColor: string;
    }> = [
        {
            gradient: 'linear-gradient(135deg, #EFF0F6 0%, #6C6FF9 100%)',
            title: 'Доходы',
            subtitle: 'Месячная статистика',
            glowColor: 'rgba(108, 111, 249, 0.3)',
        },
        {
            gradient: 'linear-gradient(135deg, #FFE5F1 0%, #6C6FF9 50%, #6C6FF9 100%)',
            title: 'Расходы',
            subtitle: 'По категориям',
            glowColor: 'rgba(0, 51, 255, 0.3)',
        },
        {
            gradient: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 50%, #6C6FF9 100%)',
            title: 'Бюджет',
            subtitle: 'Остаток средств',
            glowColor: 'rgba(108, 111, 249, 0.3)',
        },
        {
            gradient: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 50%, #272B3E 100%)',
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
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    fontWeight: 600,
                    mb: 3,
                    textAlign: 'center',
                }}
            >
                📊 Графики и статистика
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: 3,
                }}
            >
                {gradients.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex'
                        }}
                    >
                        <GradientBar
                            gradient={item.gradient}
                            title={item.title}
                            subtitle={item.subtitle}
                            height={180}
                            glowColor={item.glowColor}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};