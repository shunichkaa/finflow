import React from 'react';

import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../Budgets/theme/ThemeContext';

const ServerError: React.FC = () => {
    const navigate = useNavigate();
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
                    border: '1px solid rgba(148, 163, 184, 0.1)',
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
                    Что-то пошло не так
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Произошла внутренняя ошибка сервера. Мы уже работаем над её исправлением.
                </Typography>

                {}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        onClick={handleGoHome}
                        size="large"
                        sx={{
                        background: mode === 'dark' 
                            ? 'rgba(101, 70, 51, 0.5)'
                            : 'rgba(234, 234, 244, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(101, 70, 51, 0.7)'
                                : 'rgba(234, 234, 244, 0.7)',
                                transform: 'translateY(-2px)',
                                boxShadow: mode === 'dark' 
                                    ? '0 6px 20px rgba(101, 70, 51, 0.4)'
                                    : '0 6px 20px rgba(234, 234, 244, 0.4)',
                            },
                        }}
                    >
                        Вернуться на главную
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
                                backgroundColor: 'rgba(100, 116, 139, 0.04)',
                            },
                        }}
                    >
                        Попробовать снова
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ServerError;
