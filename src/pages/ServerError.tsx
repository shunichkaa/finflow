import React from 'react';

import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../Budgets/theme/ThemeContext';

const ServerError: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {mode} = useThemeMode();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: '#F5F6FA',
                    border: '1px solid #94A3B81A',
                }}
            >
                {}
                <Box
                    sx={{
                        fontSize: '6rem',
                        mb: 2,
                        color: '#FFB3BA',
                    }}
                >
                    ⚡
                </Box>

                <Typography variant="h2" gutterBottom fontWeight="bold" color="text.primary">
                    500
                </Typography>

                <Typography variant="h5" gutterBottom fontWeight="600" color="text.primary">
                    {t('serverError.title', 'Что-то пошло не так')}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    {t('serverError.description', 'Произошла внутренняя ошибка сервера. Мы уже работаем над её исправлением.')}
                </Typography>

                {}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        onClick={handleGoHome}
                        size="large"
                        sx={{
                        background: mode === 'dark' 
                            ? '#65463380'
                            : '#EAEAF480',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                            background: mode === 'dark' 
                                ? '#654633B3'
                                : '#EAEAF4B3',
                                transform: 'translateY(-2px)',
                                boxShadow: mode === 'dark' 
                                    ? '0 6px 20px #65463366'
                                    : '0 6px 20px #EAEAF466',
                            },
                        }}
                    >
                        {t('serverError.goHome', 'Вернуться на главную')}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleReload}
                        size="large"
                        sx={{
                            borderColor: '#272B3E',
                            color: '#272B3E',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                borderColor: '#272B3E',
                                backgroundColor: '#64748B0A',
                            },
                        }}
                    >
                        {t('serverError.reload', 'Попробовать снова')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ServerError;
