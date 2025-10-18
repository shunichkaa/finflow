import React from 'react';

import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

export interface Insight {
    id: string;
    type: 'warning' | 'info' | 'success' | 'tip';
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface InsightsCardProps {
    insights: Insight[];
}

const typeColor: Record<Insight['type'], 'error' | 'info' | 'success' | 'default'> = {
    warning: 'error',
    info: 'info',
    success: 'success',
    tip: 'default'
};

export const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();

    if (insights.length === 0) {
        return (
            <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {t('insights.title', 'AI-инсайты')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('insights.none', 'Пока нет инсайтов — всё стабильно.')}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2,
            backgroundColor: mode === 'dark' ? 'rgba(101, 70, 51, 0.5)' : 'rgba(234, 234, 244, 0.5)',
            color: mode === 'dark' ? '#FCF9F9' : '#654633'
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: mode === 'dark' ? '#FCF9F9' : '#654633' }}>
                    {t('insights.title', 'AI-инсайты')}
                </Typography>

                {insights.map(insight => (
                    <Box
                        key={insight.id}
                        sx={{
                            mb: 2,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: mode === 'dark' ? 'rgba(248, 229, 229, 0.05)' : 'rgba(101, 70, 51, 0.02)'
                        }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Chip
                                label={insight.type.toUpperCase()}
                                color={typeColor[insight.type]}
                                size="small"
                            />
                            {insight.action && (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={insight.action.onClick}
                                >
                                    {insight.action.label}
                                </Button>
                            )}
                        </Box>

                        <Typography variant="subtitle1" fontWeight={600} mt={1} sx={{ color: mode === 'dark' ? '#FCF9F9' : '#654633' }}>
                            {insight.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.6)' : 'rgba(101, 70, 51, 0.5)' }}>
                            {insight.description}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};