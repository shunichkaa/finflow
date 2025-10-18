import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import {supabase} from "../../lib/supabaseClient";

export const OAuthCallback = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                console.log('OAuth callback started');

                // Ждем обработки OAuth Supabase
                const {data: {session}, error: sessionError} = await supabase.auth.getSession();

                console.log('Session:', session);
                console.log('Session error:', sessionError);

                if (sessionError) {
                    console.error('OAuth session error:', sessionError);
                    setError(sessionError.message);
                    return;
                }

                if (session) {
                    console.log('OAuth success, redirecting to dashboard');
                    navigate('/dashboard', {replace: true});
                } else {
                    // Проверяем hash параметры
                    const hashParams = new URLSearchParams(window.location.hash.substring(1));
                    const errorDescription = hashParams.get('error_description');

                    if (errorDescription) {
                        setError(errorDescription);
                    } else {
                        // Даем дополнительное время для обработки
                        setTimeout(async () => {
                            const {data: {session: retrySession}} = await supabase.auth.getSession();
                            if (retrySession) {
                                navigate('/dashboard', {replace: true});
                            } else {
                                setError('Не удалось войти. Попробуйте еще раз.');
                            }
                        }, 2000);
                    }
                }
            } catch (error) {
                console.error('OAuth callback error:', error);
                setError('Произошла неизвестная ошибка');
            }
        };

        handleOAuthCallback();
    }, [navigate]);

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
                <Alert severity="error" sx={{width: '100%', maxWidth: 400}}>
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
            <CircularProgress size={60}/>
            <Typography variant="h6">
                Завершаем вход...
            </Typography>
        </Box>
    );
};