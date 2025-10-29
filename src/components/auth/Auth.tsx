import { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Fade,
    Paper,
    TextField,
    Typography,
    Divider,
    Alert,
    Stack
} from '@mui/material';
import { Google, Login, PersonAdd } from '@mui/icons-material';
import {supabase} from '../../lib/supabaseClient';
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';


export const Auth: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError(t('auth.fillAllFields', 'Пожалуйста, заполните все поля'));
            return;
        }
        if (!email.includes('@')) {
            setError(t('auth.validEmail', 'Введите корректный email'));
            return;
        }
        if (password.length < 6) {
            setError(t('auth.passwordLength', 'Пароль должен быть минимум 6 символов'));
            return;
        }

        setLoading(true);

        try {
            let result;
            if (authMode === 'login') {
                result = await supabase.auth.signInWithPassword({email, password});
                if (result.error) {
                    console.error('Login error:', result.error);
                    setError(result.error.message);
                } else if (result.data.user) {
                    setSuccess(t('auth.loginSuccess', 'Вы успешно вошли!'));
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 500);
                } else {
                    setError(t('auth.loginFailed', 'Не удалось войти. Проверьте данные.'));
                }
            } else {
                result = await supabase.auth.signUp({email, password});
                if (result.error) {
                    console.error('Signup error:', result.error);
                    setError(result.error.message);
                } else if (result.data.user) {
                    setSuccess(t('auth.signupSuccess', 'Регистрация успешна! Проверьте почту для подтверждения.'));
                } else {
                    setError(t('auth.signupFailed', 'Не удалось зарегистрироваться.'));
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            setError(t('auth.unknownError', 'Произошла неизвестная ошибка'));
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'apple') => {
        try {
            setOauthLoading(provider);
            setError('');

            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/oauth-callback`,
                    queryParams: provider === 'google' ? {
                        access_type: 'offline',
                        prompt: 'consent',
                    } : undefined
                }
            });

            if (error) {
                console.error('OAuth error:', error);
                setError(error.message);
                setOauthLoading(null);
            }
            // Не устанавливаем setOauthLoading(null) здесь, так как происходит редирект
        } catch (error: unknown) {
            console.error('OAuth catch error:', error);
            const errorMessage = error instanceof Error
                ? error.message
                : t('auth.oauthError', 'Ошибка при входе через социальную сеть');
            setError(errorMessage);
            setOauthLoading(null);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                    background: mode === 'dark' 
                        ? '#272B3E'
                        : '#F5F6FA',
                backgroundAttachment: 'fixed',
                p: 2,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                        background: mode === 'dark'
                            ? 'radial-gradient(circle at 20% 80%, rgba(74, 74, 106, 0.2) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(108, 111, 249, 0.15) 0%, transparent 60%)'
                            : 'radial-gradient(circle at 20% 80%, rgba(108, 111, 249, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255, 204, 242, 0.12) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                },
                '&::after': {
                    content: '""',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    background: mode === 'dark'
                        ? 'radial-gradient(circle, rgba(108, 111, 249, 0.05) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    filter: 'blur(60px)',
                },
            }}
        >
            <Fade in>
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        width: 450,
                        maxWidth: '95vw',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 6,
                        backdropFilter: 'blur(40px) saturate(180%)',
                        backgroundColor: mode === 'dark' 
                            ? 'rgba(28, 28, 30, 0.85)' 
                            : 'rgba(252, 248, 245, 0.7)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.1)' 
                            : '1px solid rgba(252, 248, 245, 0.9)',
                        boxShadow: mode === 'dark' 
                            ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                            : '0 20px 60px rgba(31, 38, 135, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                        position: 'relative',
                        overflow: 'hidden',
                        zIndex: 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                        },
                    }}
                >
                    <Box sx={{textAlign: 'center', mb: 3}}>
                        <Typography variant="h3" fontWeight={700} sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E', 
                            mb: 1.5,
                            fontSize: {xs: '28px', md: '32px'},
                            letterSpacing: '-0.02em'
                        }}>
                            💰 {t('appName', 'FinFlow')}
                        </Typography>
                        <Typography variant="h6" sx={{
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#272B3E',
                            fontSize: {xs: '16px', md: '18px'},
                            fontWeight: 500
                        }}>
                            {authMode === 'login' ? t('auth.login', 'Вход в аккаунт') : t('auth.signup', 'Создание аккаунта')}
                        </Typography>
                    </Box>

                    <Stack spacing={1}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={oauthLoading === 'google' ? <CircularProgress size={20} /> : <Google />}
                            onClick={() => handleOAuthLogin('google')}
                            disabled={!!oauthLoading}
                            sx={{
                                py: 1.8,
                                borderRadius: 3,
                                borderColor: mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.2)' 
                                    : 'rgba(108, 111, 249, 0.3)',
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                backdropFilter: 'blur(20px)',
                                background: mode === 'dark' 
                                    ? 'rgba(58, 58, 60, 0.4)' 
                                    : 'rgba(252, 248, 245, 0.6)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(108, 111, 249, 0.15)' 
                                        : 'rgba(108, 111, 249, 0.1)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: mode === 'dark' 
                                        ? '0 8px 24px rgba(108, 111, 249, 0.3)'
                                        : '0 8px 24px rgba(108, 111, 249, 0.2)',
                                },
                                '&:active': {
                                    transform: 'scale(0.98)',
                                },
                                '&:disabled': {
                                    borderColor: mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.1)' 
                                        : 'rgba(108, 111, 249, 0.15)',
                                    color: mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.3)' 
                                        : 'rgba(39, 43, 62, 0.3)',
                                }
                            }}
                        >
                            {oauthLoading === 'google' ? t('auth.loading', 'Загрузка...') : t('auth.continueWithGoogle', 'Продолжить с Google')}
                        </Button>

                    </Stack>

                    <Divider sx={{
                        my: 2,
                        borderColor: mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(108, 111, 249, 0.2)'
                    }}>
                        <Typography variant="body1" sx={{
                            color: mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.6)' 
                                : '#272B3E', 
                            px: 2,
                            fontWeight: 500,
                            fontSize: {xs: '14px', md: '16px'}
                        }}>
                            {t('auth.or', 'или')}
                        </Typography>
                    </Divider>

