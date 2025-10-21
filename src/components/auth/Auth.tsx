import React from 'react';
import {useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Fade,
    Paper,
    Stack,
    TextField,
    Typography,
    Divider,
    Alert
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

    const handleOAuthLogin = async (provider: 'google') => {
        try {
            setOauthLoading(provider);
            setError('');

            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/oauth-callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
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
                    ? 'linear-gradient(135deg, #0F0F23 0%, #1E1B4B 50%, #312E81 100%)'
                    : 'linear-gradient(135deg, #F8FFA1 0%, #F6D5EE 50%, #A8A3F6 100%)',
                p: 2,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: mode === 'dark' 
                        ? 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 20% 80%, rgba(168, 163, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(246, 213, 238, 0.3) 0%, transparent 50%)',
                    zIndex: 0,
                }
            }}
        >
            <Fade in>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        width: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 4,
                        backdropFilter: 'blur(40px) saturate(180%)',
                        backgroundColor: mode === 'dark' ? 'rgba(15, 15, 35, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                        border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : '0 8px 32px rgba(6, 0, 171, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        position: 'relative',
                        overflow: 'hidden',
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
                    <Box sx={{textAlign: 'center', mb: 2}}>
                        <Typography variant="h4" fontWeight={700} sx={{color: mode === 'dark' ? '#FFFFFF' : '#0600AB', mb: 1}}>
                            💰 {t('appName', 'FinFlow')}
                        </Typography>
                        <Typography variant="subtitle1" sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.7)'}}>
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
                                py: 1.5,
                                borderRadius: 2,
                                borderColor: '#e2e8f0',
                                color: '#374151',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: '#cbd5e1',
                                    backgroundColor: '#f8fafc',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }
                            }}
                        >
                            {oauthLoading === 'google' ? t('auth.loading', 'Загрузка...') : t('auth.continueWithGoogle', 'Продолжить с Google')}
                        </Button>
                    </Stack>

                    <Divider sx={{my: 2}}>
                        <Typography variant="body2" sx={{color: '#64748b', px: 2}}>
                            {t('auth.or', 'или')}
                        </Typography>
                    </Divider>

                    {/* Форма email/пароль */}
                    <Box component="form" onSubmit={handleSubmit}
                         sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            label={t('auth.email', 'Email')}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(6, 0, 171, 0.6)',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(6, 0, 171, 0.8)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(6, 0, 171, 0.7)',
                                    '&.Mui-focused': {
                                        color: 'rgba(6, 0, 171, 0.8)',
                                    },
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#0600AB',
                                }
                            }}
                        />
                        <TextField
                            label={t('auth.password', 'Пароль')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(6, 0, 171, 0.6)',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(6, 0, 171, 0.8)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(6, 0, 171, 0.7)',
                                    '&.Mui-focused': {
                                        color: 'rgba(6, 0, 171, 0.8)',
                                    },
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#0600AB',
                                }
                            }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ width: '100%', borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ width: '100%', borderRadius: 2 }}>
                                {success}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.8) 0%, rgba(248, 229, 229, 0.6) 100%)',
                                color: '#0600AB',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.9) 0%, rgba(248, 229, 229, 0.8) 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 20px rgba(6, 0, 171, 0.2)',
                                },
                                '&:disabled': {
                                    background: 'rgba(6, 0, 171, 0.2)',
                                    color: 'rgba(6, 0, 171, 0.5)',
                                }
                            }}
                            disabled={loading || !!oauthLoading}
                            startIcon={authMode === 'login' ? <Login /> : <PersonAdd />}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> :
                                authMode === 'login' ? t('auth.loginButton', 'Войти') : t('auth.signupButton', 'Зарегистрироваться')}
                        </Button>
                    </Box>

                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Typography variant="body2" sx={{color: '#64748b'}}>
                            {authMode === 'login' ? t('auth.noAccount', 'Нет аккаунта?') : t('auth.hasAccount', 'Уже есть аккаунт?')}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => {
                                setAuthMode(authMode === 'login' ? 'signup' : 'login');
                                setError('');
                                setSuccess('');
                            }}
                            sx={{
                                textTransform: 'none',
                                color: 'rgba(6, 0, 171, 0.8)',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(6, 0, 171, 0.1)',
                                    color: '#0600AB',
                                }
                            }}
                            disabled={loading || !!oauthLoading}
                        >
                            {authMode === 'login' ? t('auth.signup', 'Регистрация') : t('auth.login', 'Вход')}
                        </Button>
                    </Stack>
                </Paper>
            </Fade>
            
        </Box>
    );
};