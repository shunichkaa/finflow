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
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                zIndex: 10
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ color: '#0600AB' }}>
                🔍 Auth Debug Information
            </Typography>
            
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(101, 70, 51, 0.8)' }}>
                    <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(101, 70, 51, 0.8)' }}>
                    <strong>Error:</strong> {error || 'None'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(101, 70, 51, 0.8)' }}>
                    <strong>Session:</strong> {session ? 'Active' : 'None'}
                </Typography>
                {session && (
                    <Typography variant="body2" sx={{ color: 'rgba(101, 70, 51, 0.8)' }}>
                        <strong>User ID:</strong> {session.user?.id}
                    </Typography>
                )}
                {session && (
                    <Typography variant="body2" sx={{ color: 'rgba(101, 70, 51, 0.8)' }}>
                        <strong>Email:</strong> {session.user?.email}
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button 
                    variant="outlined" 
                    onClick={handleTestConnection}
                    sx={{
                        borderColor: 'rgba(101, 70, 51, 0.3)',
                        color: '#0600AB',
                        '&:hover': {
                            borderColor: 'rgba(101, 70, 51, 0.6)',
                            backgroundColor: 'rgba(101, 70, 51, 0.1)',
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
                            borderColor: 'rgba(255, 185, 141, 0.6)',
                            color: '#0600AB',
                            '&:hover': {
                                borderColor: 'rgba(255, 185, 141, 0.8)',
                                backgroundColor: 'rgba(255, 185, 141, 0.1)',
                            }
                        }}
                    >
                        Sign Out
                    </Button>
                )}
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: 'rgba(101, 70, 51, 0.6)' }}>
                    Check browser console for detailed logs
                </Typography>
            </Box>
        </Paper>
    );
};
