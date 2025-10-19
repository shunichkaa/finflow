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


export const Auth: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [mode, setMode] = useState<'login' | 'signup'>('login');

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
            if (mode === 'login') {
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
                background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.8) 0%, rgba(248, 229, 229, 0.6) 50%, rgba(255, 185, 141, 0.4) 100%)',
                p: 2,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23654633" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    zIndex: 0,
                }
            }}
        >
            <Fade in>
                <Paper
                    elevation={12}
                    sx={{
                        p: 4,
                        width: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Box sx={{textAlign: 'center', mb: 2}}>
                        <Typography variant="h4" fontWeight={700} sx={{color: '#1e293b', mb: 1}}>
                            💰 {t('appName', 'FinFlow')}
                        </Typography>
                        <Typography variant="subtitle1" sx={{color: '#64748b'}}>
                            {mode === 'login' ? t('auth.login', 'Вход в аккаунт') : t('auth.signup', 'Создание аккаунта')}
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
                                        borderColor: 'rgba(101, 70, 51, 0.6)',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(101, 70, 51, 0.8)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(101, 70, 51, 0.7)',
                                    '&.Mui-focused': {
                                        color: 'rgba(101, 70, 51, 0.8)',
                                    },
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#654633',
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
                                        borderColor: 'rgba(101, 70, 51, 0.6)',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(101, 70, 51, 0.8)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(101, 70, 51, 0.7)',
                                    '&.Mui-focused': {
                                        color: 'rgba(101, 70, 51, 0.8)',
                                    },
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#654633',
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
                                color: '#654633',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.9) 0%, rgba(248, 229, 229, 0.8) 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 20px rgba(101, 70, 51, 0.2)',
                                },
                                '&:disabled': {
                                    background: 'rgba(101, 70, 51, 0.2)',
                                    color: 'rgba(101, 70, 51, 0.5)',
                                }
                            }}
                            disabled={loading || !!oauthLoading}
                            startIcon={mode === 'login' ? <Login /> : <PersonAdd />}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> :
                                mode === 'login' ? t('auth.loginButton', 'Войти') : t('auth.signupButton', 'Зарегистрироваться')}
                        </Button>
                    </Box>

                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Typography variant="body2" sx={{color: '#64748b'}}>
                            {mode === 'login' ? t('auth.noAccount', 'Нет аккаунта?') : t('auth.hasAccount', 'Уже есть аккаунт?')}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError('');
                                setSuccess('');
                            }}
                            sx={{
                                textTransform: 'none',
                                color: 'rgba(101, 70, 51, 0.8)',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(101, 70, 51, 0.1)',
                                    color: '#654633',
                                }
                            }}
                            disabled={loading || !!oauthLoading}
                        >
                            {mode === 'login' ? t('auth.signup', 'Регистрация') : t('auth.login', 'Вход')}
                        </Button>
                    </Stack>
                </Paper>
            </Fade>
            
        </Box>
    );
};