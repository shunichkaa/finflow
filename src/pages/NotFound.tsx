import React from 'react';

import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../Budgets/theme/ThemeContext';
import { GlassButton } from '../components/ui/GlassButton';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {mode} = useThemeMode();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Box
                sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 4,
                    backdropFilter: 'blur(40px) saturate(200%)',
                    background: mode === 'dark' 
                        ? 'linear-gradient(135deg, #0F0F23CC 0%, #1A004D99 50%, #6C6FF91A 100%)'
                        : 'linear-gradient(135deg, #FFFFFFCC 0%, #F0F0FF99 50%, #6C6FF90D 100%)',
                    border: mode === 'dark' 
                        ? '2px solid #FFFFFF33' 
                        : '2px solid #FFFFFF4D',
                    boxShadow: mode === 'dark' 
                        ? '0 20px 60px #00000080, 0 8px 24px #6C6FF926, inset 0 2px 0 #FFFFFF1A'
                        : '0 20px 60px #0600AB33, 0 8px 24px #6C6FF91A, inset 0 2px 0 #FFFFFF4D',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #FFFFFF99, #6C6FF94D, #FFFFFF99, transparent)',
                        zIndex: 1,
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: mode === 'dark'
                            ? 'radial-gradient(circle at 30% 20%, #6C6FF91A 0%, transparent 50%), radial-gradient(circle at 70% 80%, #6C6FF914 0%, transparent 50%)'
                            : 'radial-gradient(circle at 30% 20%, #6C6FF90D 0%, transparent 50%), radial-gradient(circle at 70% 80%, #6C6FF90A 0%, transparent 50%)',
                        borderRadius: 4,
                        zIndex: -1,
                    }
                }}
            >
                {}
                <Box
                    sx={{
                        fontSize: '8rem',
                        mb: 3,
                        background: '#6C6FF9',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 8px #6C6FF94D)',
                        animation: 'float 3s ease-in-out infinite',
                        '@keyframes float': {
                            '0%, 100%': {
                                transform: 'translateY(0px)',
                            },
                            '50%': {
                                transform: 'translateY(-10px)',
                            },
                        },
                    }}
                >
                    🔍
                </Box>

                <Typography 
                    variant="h1" 
                    gutterBottom 
                    fontWeight="bold" 
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontSize: '6rem',
                        textShadow: mode === 'dark' ? '0 4px 8px #00000080' : '0 2px 4px #0000001A',
                        mb: 2,
                    }}
                >
                    404
                </Typography>

                <Typography 
                    variant="h4" 
                    gutterBottom 
                    fontWeight="600" 
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        mb: 2,
                    }}
                >
                    {t('notFound.title', 'Страница не найдена')}
                </Typography>

                <Typography 
                    variant="body1" 
                    sx={{ 
                        mb: 4,
                        color: mode === 'dark' ? '#FFFFFFCC' : '#4A5568B3',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                    }}
                >
                    {t('notFound.description', 'К сожалению, запрашиваемая страница не существует или была перемещена.')}
                </Typography>

                {}
                <GlassButton
                    variant="contained"
                    onClick={handleGoHome}
                    size="large"
                    intensity="high"
                    glowColor={mode === 'dark' 
                        ? '#6C6FF966' 
                        : '#6C6FF933'}
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontWeight: 'bold',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                    }}
                >
                    {t('notFound.goHome', 'Вернуться на главную')}
                </GlassButton>
            </Box>
        </Container>
    );
};

export default NotFound;