import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert, Button } from '@mui/material';
import {supabase} from "../../lib/supabaseClient";


export const OAuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                // Получаем текущую сессию после OAuth редиректа
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error('OAuth session error:', sessionError);
                    setError(sessionError.message);
                    return;
                }

                if (session) {
                    // Успешный вход, перенаправляем на dashboard
                    navigate('/dashboard', { replace: true });
                } else {
                    // Проверяем ошибки в URL параметрах
                    const errorDescription = searchParams.get('error_description');
                    if (errorDescription) {
                        setError(errorDescription);
                    } else {
                        setError('Не удалось войти. Попробуйте еще раз.');
                    }
                }
            } catch (error) {
                console.error('OAuth callback error:', error);
                setError('Произошла неизвестная ошибка');
            }
        };

        handleOAuthCallback();
    }, [navigate, searchParams]);

    if (error) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    p: 3
                }}
            >
                <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                >
                    Вернуться к входу
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="h6">
                Завершаем вход...
            </Typography>
        </Box>
    );
};