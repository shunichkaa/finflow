import { Box, Typography, Grid } from '@mui/material';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import React from 'react';

interface GlassmorphismCardProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    gradient?: string;
    glowColor?: string;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
                                                                 title,
                                                                 subtitle,
                                                                 icon,
                                                                 gradient = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                                                                 glowColor = 'rgba(255, 255, 255, 0.1)'
                                                             }) => {
    const { mode } = useThemeMode();

    // Use mode in styling to avoid unused variable warning
    const borderColor = mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.08)';

    return (
        <Box
            sx={{
                position: 'relative',
                height: 160,
                width: '100%',
                borderRadius: 4,
                background: gradient,
                backdropFilter: 'blur(40px) saturate(180%)',
                border: `1px solid ${borderColor}`,
                boxShadow: `0 8px 32px ${glowColor}, 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                overflow: 'hidden',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
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
                    opacity: 0,
                    transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    pointerEvents: 'none',
                },
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 20px 60px ${glowColor}, 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                    '&::after': {
                        opacity: 0.1,
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                }}
            >
                {icon && (
                    <Box
                        sx={{
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        {icon}
                    </Box>
                )}

                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
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
                            textAlign: 'center',
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

export const GlassmorphismCards: React.FC = () => {
    const { mode } = useThemeMode();

    const cards = [
        {
            title: 'Development',
            subtitle: 'Low-code platforms',
            gradient: 'linear-gradient(135deg, rgba(0, 51, 255, 0.2) 0%, rgba(0, 51, 255, 0.1) 100%)',
            glowColor: 'rgba(0, 51, 255, 0.3)',
        },
        {
            title: 'Support',
            subtitle: 'Customer service',
            gradient: 'linear-gradient(135deg, rgba(108, 111, 249, 0.2) 0%, rgba(108, 111, 249, 0.1) 100%)',
            glowColor: 'rgba(108, 111, 249, 0.3)',
        },
        {
            title: 'Design',
            subtitle: 'UI/UX Design',
            gradient: 'linear-gradient(135deg, rgba(255, 204, 242, 0.2) 0%, rgba(255, 204, 242, 0.1) 100%)',
            glowColor: 'rgba(255, 204, 242, 0.3)',
        },
        {
            title: 'DataLens',
            subtitle: 'Yandex',
            gradient: 'linear-gradient(135deg, rgba(6, 0, 175, 0.2) 0%, rgba(6, 0, 175, 0.1) 100%)',
            glowColor: 'rgba(6, 0, 175, 0.3)',
        },
        {
            title: 'Data Integration',
            subtitle: 'Analytics',
            gradient: 'linear-gradient(135deg, rgba(0, 0, 61, 0.2) 0%, rgba(0, 0, 61, 0.1) 100%)',
            glowColor: 'rgba(0, 0, 61, 0.3)',
        },
        {
            title: 'Dashboards',
            subtitle: 'Reports',
            gradient: 'linear-gradient(135deg, rgba(242, 230, 238, 0.2) 0%, rgba(242, 230, 238, 0.1) 100%)',
            glowColor: 'rgba(242, 230, 238, 0.3)',
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
                🎨 Glassmorphism карточки
            </Typography>

            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{
                            display: 'flex'
                        }}
                    >
                        <GlassmorphismCard
                            title={card.title}
                            subtitle={card.subtitle}
                            gradient={card.gradient}
                            glowColor={card.glowColor}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};