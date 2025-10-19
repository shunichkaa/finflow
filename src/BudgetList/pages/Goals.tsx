import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

const Goals: React.FC = () => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                    color: mode === 'dark' ? '#FCF9F9' : '#654633'
                }}>
                    🏦 {t('savings', 'Копилка')}
                </Typography>
                <Typography variant="body1" sx={{
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)',
                    mb: 3
                }}>
                    {t('savingsDescription', 'Создавайте копилки для накопления на важные цели')}
                </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ 
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)', 
                    mb: 2 
                }}>
                    🏦 Страница копилки работает!
                </Typography>
                <Typography variant="body2" sx={{ 
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.5)' : 'rgba(101, 70, 51, 0.5)'
                }}>
                    Компонент загружен успешно
                </Typography>
            </Box>
        </Container>
    );
};

export default Goals;
