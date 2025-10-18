import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServerError: React.FC = () => {
    const navigate = useNavigate();

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
                    backgroundColor: '#f8fafc',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                }}
            >
                {/* Иллюстрация 500 */}
                <Box
                    sx={{
                        fontSize: '6rem',
                        mb: 2,
                        color: '#ef4444',
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

                {/* Кнопки действий */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        onClick={handleGoHome}
                        size="large"
                        sx={{
                            backgroundColor: '#0ea5e9',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#0284c7',
                                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)',
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
                            borderColor: '#64748b',
                            color: '#64748b',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                borderColor: '#475569',
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
