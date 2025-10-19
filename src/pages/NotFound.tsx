import React from 'react';

import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../Budgets/theme/ThemeContext';
import { GlassButton } from '../components/ui/GlassButton';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
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
                        ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.8) 0%, rgba(26, 0, 77, 0.6) 50%, rgba(99, 102, 241, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 255, 0.6) 50%, rgba(99, 102, 241, 0.05) 100%)',
                    border: mode === 'dark' 
                        ? '2px solid rgba(255, 255, 255, 0.2)' 
                        : '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: mode === 'dark' 
                        ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(99, 102, 241, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
                        : '0 20px 60px rgba(36, 49, 104, 0.2), 0 8px 24px rgba(99, 102, 241, 0.1), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
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
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(99, 102, 241, 0.3), rgba(255, 255, 255, 0.6), transparent)',
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
                            ? 'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
                            : 'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)',
                        borderRadius: 4,
                        zIndex: -1,
                    }
                }}
            >
                {/* Иллюстрация 404 */}
                <Box
                    sx={{
                        fontSize: '8rem',
                        mb: 3,
                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))',
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
                        color: mode === 'dark' ? '#FFFFFF' : '#4A5568',
                        fontSize: '6rem',
                        textShadow: mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.5)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
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
                        color: mode === 'dark' ? '#F5F5DC' : '#4A5568',
                        mb: 2,
                    }}
                >
                    Страница не найдена
                </Typography>

                <Typography 
                    variant="body1" 
                    sx={{ 
                        mb: 4,
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(74, 85, 104, 0.7)',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                    }}
                >
                    К сожалению, запрашиваемая страница не существует или была перемещена.
                </Typography>

                {/* Кнопка возврата */}
                <GlassButton
                    variant="contained"
                    onClick={handleGoHome}
                    size="large"
                    intensity="high"
                    glowColor={mode === 'dark' 
                        ? 'rgba(99, 102, 241, 0.4)' 
                        : 'rgba(99, 102, 241, 0.2)'}
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#4A5568',
                        fontWeight: 'bold',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                    }}
                >
                    Вернуться на главную
                </GlassButton>
            </Box>
        </Container>
    );
};

export default NotFound;
