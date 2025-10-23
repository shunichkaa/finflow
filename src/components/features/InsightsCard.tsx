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
            backgroundColor: mode === 'dark' ? 'rgba(15, 15, 35, 0.8)' : 'rgba(255, 255, 255, 0.25)',
            color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    {t('insights.title', 'AI-инсайты')}
                </Typography>

                {insights.map(insight => (
                    <Box
                        key={insight.id}
                        sx={{
                            mb: 2,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(168, 163, 246, 0.05)'
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

                        <Typography variant="subtitle1" fontWeight={600} mt={1} sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                            {insight.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)' }}>
                            {insight.description}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};