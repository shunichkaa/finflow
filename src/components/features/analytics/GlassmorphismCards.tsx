import { Box, Typography } from '@mui/material';
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
                                                                 gradient = 'linear-gradient(135deg, #FFFFFF1A 0%, #FFFFFF0D 100%)',
                                                                 glowColor = '#FFFFFF1A'
                                                             }) => {
    const { mode } = useThemeMode();

    const borderColor = mode === 'dark' ? '#FFFFFF2E' : '#00000014';

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
                boxShadow: `0 8px 32px ${glowColor}, 0 2px 8px #0000001A, inset 0 1px 0 #FFFFFF1A`,
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
                    background: 'linear-gradient(90deg, transparent, #FFFFFF66, transparent)',
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
                    boxShadow: `0 20px 60px ${glowColor}, 0 8px 20px #00000026, inset 0 1px 0 #FFFFFF33`,
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
                            background: '#FFFFFF1A',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid #FFFFFF33',
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
                        textShadow: '0 2px 8px #0000004D',
                        mb: subtitle ? 0.5 : 0,
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#FFFFFFCC',
                            textAlign: 'center',
                            textShadow: '0 1px 4px #0000004D',
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
            gradient: 'linear-gradient(135deg, #0033FF33 0%, #0033FF1A 100%)',
            glowColor: '#0033FF4D',
        },
        {
            title: 'Support',
            subtitle: 'Customer service',
            gradient: 'linear-gradient(135deg, #6C6FF933 0%, #6C6FF91A 100%)',
            glowColor: '#6C6FF94D',
        },
        {
            title: 'Design',
            subtitle: 'UI/UX Design',
            gradient: 'linear-gradient(135deg, #FFCCF233 0%, #FFCCF21A 100%)',
            glowColor: '#FFCCF24D',
        },
        {
            title: 'DataLens',
            subtitle: 'Yandex',
            gradient: 'linear-gradient(135deg, #0600AF33 0%, #0600AF1A 100%)',
            glowColor: '#0600AF4D',
        },
        {
            title: 'Data Integration',
            subtitle: 'Analytics',
            gradient: 'linear-gradient(135deg, #00003D33 0%, #00003D1A 100%)',
            glowColor: '#00003D4D',
        },
        {
            title: 'Dashboards',
            subtitle: 'Reports',
            gradient: 'linear-gradient(135deg, #F2E6EE33 0%, #F2E6EE1A 100%)',
            glowColor: '#F2E6EE4D',
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

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: 3,
                }}
            >
                {cards.map((card, index) => (
                    <GlassmorphismCard
                        key={index}
                        title={card.title}
                        subtitle={card.subtitle}
                        gradient={card.gradient}
                        glowColor={card.glowColor}
                    />
                ))}
            </Box>
        </Box>
    );
};