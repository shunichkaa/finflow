import React, {useState} from 'react';
import {Box, Button, CircularProgress, Fade, Paper, Stack, TextField, Typography,} from '@mui/material';
import {supabase} from '../../lib/supabaseClient';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useNavigate} from "react-router-dom";

export const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
        }
        if (!email.includes('@')) {
            setError('Введите корректный email');
            return;
        }
        if (password.length < 6) {
            setError('Пароль должен быть минимум 6 символов');
            return;
        }

        setLoading(true);

        let result;
        if (mode === 'login') {
            result = await supabase.auth.signInWithPassword({email, password});
            if (result.error) setError(result.error.message);
            else {
                setSuccess('Вы успешно вошли!');
                // редирект на dashboard через 500ms, чтобы пользователь успел увидеть сообщение
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);
            }
        } else {
            result = await supabase.auth.signUp({email, password});
            if (result.error) setError(result.error.message);
            else setSuccess('Регистрация успешна! Проверьте почту для подтверждения.');
        }

        setLoading(false);
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
                        width: 380,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h4" textAlign="center" fontWeight={700}>
                        💰 FinFlow
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                        {mode === 'login' ? 'Вход в аккаунт' : 'Создание аккаунта'}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}
                         sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />

                        {error && (
                            <Typography color="error" variant="body2" textAlign="center">
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography color="success.main" variant="body2" textAlign="center">
                                {success}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{py: 1.5}}
                            disabled={loading}
                            startIcon={mode === 'login' ? <LoginIcon/> : <PersonAddIcon/>}
                        >
                            {loading ? <CircularProgress size={24}
                                                         color="inherit"/> : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Box>

                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                            {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError('');
                                setSuccess('');
                            }}
                            sx={{textTransform: 'none'}}
                        >
                            {mode === 'login' ? 'Регистрация' : 'Вход'}
                        </Button>
                    </Stack>
                </Paper>
            </Fade>
        </Box>
    );
};