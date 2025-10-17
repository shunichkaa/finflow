import React, {useState} from 'react';
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
                    setError(result.error.message);
                } else {
                    setSuccess(t('auth.loginSuccess', 'Вы успешно вошли!'));
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 500);
                }
            } else {
                result = await supabase.auth.signUp({email, password});
                if (result.error) {
                    setError(result.error.message);
                } else {
                    setSuccess(t('auth.signupSuccess', 'Регистрация успешна! Проверьте почту для подтверждения.'));
                }
            }
        } catch (error) {
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
                }
            });

            if (error) {
                if (error.message.includes('provider is not enabled')) {
                    setError(t('auth.providerNotEnabled', 'Этот способ входа временно недоступен. Пожалуйста, используйте вход по email.'));
                } else {
                    setError(error.message);
                }
            }
            // После успешного OAuth браузер автоматически перенаправит на /oauth-callback
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : t('auth.oauthError', 'Ошибка при входе через социальную сеть');
            setError(errorMessage);
        } finally {
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
                bgcolor: 'background.default',
                p: 2,
            }}
        >
            <Fade in>
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        width: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h4" textAlign="center" fontWeight={700}>
                        💰 {t('appName', 'FinFlow')}
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                        {mode === 'login' ? t('auth.login', 'Вход в аккаунт') : t('auth.signup', 'Создание аккаунта')}
                    </Typography>

                    {/* OAuth кнопки - только Google */}
                    <Stack spacing={1}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={oauthLoading === 'google' ? <CircularProgress size={20} /> : <Google />}
                            onClick={() => handleOAuthLogin('google')}
                            disabled={!!oauthLoading}
                            sx={{
                                py: 1.5,
                                borderColor: 'grey.300',
                                '&:hover': {
                                    borderColor: 'grey.400',
                                    backgroundColor: 'grey.50'
                                }
                            }}
                        >
                            {oauthLoading === 'google' ? t('auth.loading', 'Загрузка...') : t('auth.continueWithGoogle', 'Продолжить с Google')}
                        </Button>
                    </Stack>

                    <Divider>
                        <Typography variant="body2" color="text.secondary">
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
                        />
                        <TextField
                            label={t('auth.password', 'Пароль')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />

                        {error && (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ width: '100%' }}>
                                {success}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{py: 1.5}}
                            disabled={loading || !!oauthLoading}
                            startIcon={mode === 'login' ? <Login /> : <PersonAdd />}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> :
                                mode === 'login' ? t('auth.loginButton', 'Войти') : t('auth.signupButton', 'Зарегистрироваться')}
                        </Button>
                    </Box>

                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                            {mode === 'login' ? t('auth.noAccount', 'Нет аккаунта?') : t('auth.hasAccount', 'Уже есть аккаунт?')}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError('');
                                setSuccess('');
                            }}
                            sx={{textTransform: 'none'}}
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