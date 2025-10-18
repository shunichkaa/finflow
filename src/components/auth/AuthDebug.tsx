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
        <Paper sx={{ p: 3, m: 2, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
                🔍 Auth Debug Information
            </Typography>
            
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Error:</strong> {error || 'None'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Session:</strong> {session ? 'Active' : 'None'}
                </Typography>
                {session && (
                    <Typography variant="body2" color="text.secondary">
                        <strong>User ID:</strong> {session.user?.id}
                    </Typography>
                )}
                {session && (
                    <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {session.user?.email}
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" onClick={handleTestConnection}>
                    Test Connection
                </Button>
                {session && (
                    <Button variant="outlined" color="error" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                )}
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    Check browser console for detailed logs
                </Typography>
            </Box>
        </Paper>
    );
};
