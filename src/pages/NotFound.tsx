import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../Budgets/theme/ThemeContext';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const {mode} = useThemeMode();

    const handleGoHome = () => {
        navigate('/dashboard');
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
                {/* Иллюстрация 404 */}
                <Box
                    sx={{
                        fontSize: '6rem',
                        mb: 2,
                        color: '#0ea5e9',
                    }}
                >
                    🔍
                </Box>

                <Typography variant="h2" gutterBottom fontWeight="bold" color="text.primary">
                    404
                </Typography>

                <Typography variant="h5" gutterBottom fontWeight="600" color="text.primary">
                    Страница не найдена
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    К сожалению, запрашиваемая страница не существует или была перемещена.
                </Typography>

                {/* Кнопка возврата */}
                <Button
                    variant="contained"
                    onClick={handleGoHome}
                    size="large"
                    sx={{
                        background: mode === 'dark' 
                            ? 'rgba(101, 70, 51, 0.5)'
                            : 'rgba(234, 234, 244, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
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
            </Paper>
        </Container>
    );
};

export default NotFound;
