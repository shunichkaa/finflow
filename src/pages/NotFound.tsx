import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

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
            </Paper>
        </Container>
    );
};

export default NotFound;
