import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Analytics: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                📊 {t('analytics')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {t('analyticsDescription')}
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                <Typography variant="h6">Графики появятся здесь</Typography>
                <Typography variant="body2">Продолжайте работу по Дню 3</Typography>
            </Box>
        </Container>
    );
};