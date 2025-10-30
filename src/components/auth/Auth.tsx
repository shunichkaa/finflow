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
                            ? 'radial-gradient(circle at 20% 80%, #4A4A6A33 0%, transparent 60%), radial-gradient(circle at 80% 20%, #6C6FF926 0%, transparent 60%)'
                            : 'radial-gradient(circle at 20% 80%, #6C6FF926 0%, transparent 60%), radial-gradient(circle at 80% 20%, #FFCCF21F 0%, transparent 60%)',
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
                        ? 'radial-gradient(circle, #6C6FF90D 0%, transparent 70%)'
                        : 'radial-gradient(circle, #FFFFFF4D 0%, transparent 70%)',
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
                            ? '#1C1C1ED9' 
                            : '#FCF8F5B3',
                        border: mode === 'dark' 
                            ? '1px solid #FFFFFF1A' 
                            : '1px solid #FCF8F5E6',
                        boxShadow: mode === 'dark' 
                            ? '0 20px 60px #00000066, 0 8px 20px #0000004D, inset 0 1px 0 #FFFFFF0D'
                            : '0 20px 60px #1F268733, 0 8px 20px #00000026, inset 0 1px 0 #FFFFFF99',
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
                            background: 'linear-gradient(90deg, transparent, #FFFFFF66, transparent)',
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
                            color: mode === 'dark' ? '#FFFFFFCC' : '#272B3E',
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
                                    ? '#FFFFFF33' 
                                    : '#6C6FF94D',
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                backdropFilter: 'blur(20px)',
                                background: mode === 'dark' 
                                    ? '#3A3A3C66' 
                                    : '#FCF8F599',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                    backgroundColor: mode === 'dark' 
                                        ? '#6C6FF926' 
                                        : '#6C6FF91A',
                                    transform: 'translateY(-2px)',
                                    boxShadow: mode === 'dark' 
                                        ? '0 8px 24px #6C6FF94D'
                                        : '0 8px 24px #6C6FF933',
                                },
                                '&:active': {
                                    transform: 'scale(0.98)',
                                },
                                '&:disabled': {
                                    borderColor: mode === 'dark' 
                                        ? '#FFFFFF1A' 
                                        : '#6C6FF926',
                                    color: mode === 'dark' 
                                        ? '#FFFFFF4D' 
                                        : '#272B3E4D',
                                }
                            }}
                        >
                            {oauthLoading === 'google' ? t('auth.loading', 'Загрузка...') : t('auth.continueWithGoogle', 'Продолжить с Google')}
                        </Button>

                    </Stack>

                    <Divider sx={{
                        my: 2,
                        borderColor: mode === 'dark' 
                            ? '#FFFFFF1A' 
                            : '#6C6FF933'
                    }}>
                        <Typography variant="body1" sx={{
                            color: mode === 'dark' 
                                ? '#FFFFFF99' 
                                : '#272B3E', 
                            px: 2,
                            fontWeight: 500,
                            fontSize: {xs: '14px', md: '16px'}
                        }}>
                            {t('auth.or', 'или')}
                        </Typography>
                    </Divider>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {(error || success) && (
                            <Alert 
                                severity={error ? 'error' : 'success'}
                                sx={{
                                    borderRadius: 2,
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                {error || success}
                            </Alert>
                        )}

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
                                    backgroundColor: mode === 'dark' 
                                        ? '#3A3A3C4D' 
                                        : '#FCF8F580',
                                    '& fieldset': {
                                        borderColor: mode === 'dark' 
                                            ? '#FFFFFF33' 
                                            : '#6C6FF94D',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C6FF9',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: mode === 'dark' 
                                        ? '#FFFFFFB3' 
                                        : '#272B3E',
                                },
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
                                    backgroundColor: mode === 'dark' 
                                        ? '#3A3A3C4D' 
                                        : '#FCF8F580',
                                    '& fieldset': {
                                        borderColor: mode === 'dark' 
                                            ? '#FFFFFF33' 
                                            : '#6C6FF94D',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C6FF9',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: mode === 'dark' 
                                        ? '#FFFFFFB3' 
                                        : '#272B3E',
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : (authMode === 'login' ? <Login /> : <PersonAdd />)}
                            sx={{
                                py: 1.8,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #6C6FF9 0%, #5B5EE8 100%)',
                                color: '#FFFFFF',
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                boxShadow: mode === 'dark' 
                                    ? '0 8px 24px #6C6FF966'
                                    : '0 8px 24px #6C6FF94D',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5B5EE8 0%, #4A4DD7 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: mode === 'dark' 
                                        ? '0 12px 32px #6C6FF980'
                                        : '0 12px 32px #6C6FF966',
                                },
                                '&:active': {
                                    transform: 'scale(0.98)',
                                },
                                '&:disabled': {
                                    background: mode === 'dark' 
                                        ? '#6C6FF94D' 
                                        : '#6C6FF980',
                                }
                            }}
                        >
                            {loading 
                                ? t('auth.loading', 'Загрузка...') 
                                : (authMode === 'login' 
                                    ? t('auth.loginButton', 'Войти') 
                                    : t('auth.signupButton', 'Зарегистрироваться'))
                            }
                        </Button>

                        <Button
                            type="button"
                            variant="text"
                            fullWidth
                            onClick={() => {
                                setAuthMode(authMode === 'login' ? 'signup' : 'login');
                                setError('');
                                setSuccess('');
                            }}
                            sx={{
                                py: 1,
                                color: mode === 'dark' 
                                    ? '#FFFFFFB3' 
                                    : '#272B3E',
                                textTransform: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: mode === 'dark' 
                                        ? '#FFFFFF0D' 
                                        : '#6C6FF90D',
                                }
                            }}
                        >
                            {authMode === 'login' 
                                ? t('auth.noAccount', 'Нет аккаунта?') 
                                : t('auth.hasAccount', 'Уже есть аккаунт?')
                            }
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

