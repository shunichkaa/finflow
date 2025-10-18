import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {Insight} from "../../Budgets/utils/insights.ts";

interface InsightsCardProps {
    insights: Insight[];
}

const typeColor = {
    warning: 'error',
    info: 'info',
    success: 'success',
    tip: 'default'
} as const;

export const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
    const { t } = useTranslation();

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
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {t('insights.title', 'AI-инсайты')}
                </Typography>

                {insights.map(insight => (
                    <Box
                        key={insight.id}
                        sx={{
                            mb: 2,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: 'rgba(0,0,0,0.03)'
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

                        <Typography variant="subtitle1" fontWeight={600} mt={1}>
                            {insight.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {insight.description}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};