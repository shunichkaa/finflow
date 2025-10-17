import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';

export const Auth: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        setLoading(false);
    };

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
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
            <Paper
                elevation={3}
                sx={{ p: 4, width: 360, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <Typography variant="h5" textAlign="center">
                    💰 FinFlow
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />

                {error && (
                    <Typography color="error" variant="body2" textAlign="center">
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    disabled={loading}
                    fullWidth
                    sx={{ py: 1.5 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
                </Button>

                <Button
                    variant="text"
                    color="secondary"
                    onClick={handleSignup}
                    disabled={loading}
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </Paper>
        </Box>
    );
};