import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Analytics: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Заголовок */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight="500" gutterBottom>
                {t('analytics')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {t('analyticsDescription')}
                </Typography>
            </Box>

            {/* Место под графики */}
            <Paper
                elevation={0}
                sx={{ p: 4, border: 1, borderColor: 'divider', borderRadius: 2, textAlign: 'center', width: '100%', maxWidth: 720 }}
            >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('chartsComingSoon')}
                </Typography>
            </Paper>
        </Container>
    );
};