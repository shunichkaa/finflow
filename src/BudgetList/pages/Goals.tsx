import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

const Goals: React.FC = () => {
    console.log('Goals component is loading...');
    const { t } = useTranslation();
    const { mode } = useThemeMode();

    return (
        <Container 
            maxWidth="xl" 
            sx={{ 
                py: {xs: 0.5, sm: 1}, 
                px: {xs: 0.5, sm: 1, md: 1.5},
                transition: (theme) => theme.transitions.create(['padding', 'transform'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.complex,
                }),
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                    color: mode === 'dark' ? '#FFFFFF' : '#243168'
                }}>
                    🏦 {t('savings', 'Копилка')}
                </Typography>
                <Typography variant="body1" sx={{
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(36, 49, 104, 0.7)',
                    mb: 3
                }}>
                    {t('savingsDescription', 'Создавайте копилки для накопления на важные цели')}
                </Typography>
            </Box>
        </Container>
    );
};

export default Goals;
