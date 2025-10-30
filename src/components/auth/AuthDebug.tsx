import React from 'react';

import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../../Budgets/hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';

export const AuthDebug: React.FC = () => {
    const { session, loading, error } = useAuth();

    const handleTestConnection = async () => {
        try {
            console.log('Testing Supabase connection...');
            const { data, error } = await supabase.auth.getSession();
            console.log('Test result:', { data, error });
            alert(`Connection test: ${error ? 'FAILED - ' + error.message : 'SUCCESS'}`);
        } catch (err) {
            console.error('Connection test error:', err);
            alert('Connection test: FAILED - ' + (err as Error).message);
        }
    };

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            console.log('Signed out successfully');
        } catch (err) {
            console.error('Sign out error:', err);
        }
    };

    return (
        <Paper 
            sx={{ 
                p: 3, 
                position: 'absolute',
                top: 20,
                right: 20,
                maxWidth: 300,
                background: '#FFFFFFF2',
                backdropFilter: 'blur(20px)',
                border: '1px solid #FFFFFF33',
                borderRadius: 3,
                zIndex: 10
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ color: '#272B3E' }}>
                🔍 Auth Debug Information
            </Typography>

                        <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#654633CC' }}>
                    <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#654633CC' }}>
                    <strong>Error:</strong> {error || 'None'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#654633CC' }}>
                    <strong>Session:</strong> {session ? 'Active' : 'None'}
                </Typography>
                {session && (
                    <Typography variant="body2" sx={{ color: '#654633CC' }}>
                        <strong>User ID:</strong> {session.user?.id}
                    </Typography>
                )}
                {session && (
                    <Typography variant="body2" sx={{ color: '#654633CC' }}>
                        <strong>Email:</strong> {session.user?.email}
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button 
                    variant="outlined" 
                    onClick={handleTestConnection}
                    sx={{
                        borderColor: '#6546334D',
                        color: '#272B3E',
                        '&:hover': {
                            borderColor: '#65463399',
                            backgroundColor: '#6546331A',
                        }
                    }}
                >
                    Test Connection
                </Button>
                {session && (
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={handleSignOut}
                        sx={{
                            borderColor: '#FFB98D99',
                            color: '#272B3E',
                            '&:hover': {
                                borderColor: '#FFB98DCC',
                                backgroundColor: '#FFB98D1A',
                            }
                        }}
                    >
                        Sign Out
                    </Button>
                )}
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#65463399' }}>
                    Check browser console for detailed logs
                </Typography>
            </Box>
        </Paper>
    );
};
