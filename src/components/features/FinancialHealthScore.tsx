import React from 'react';

import {Box, Card, CardContent, LinearProgress, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface FinancialHealthScoreProps {
    income: number;
    expenses: number;
    budgetsExceeded: number;
    totalBudgets: number;
}

export const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({
                                                                              income,
                                                                              expenses,
                                                                              budgetsExceeded,
                                                                              totalBudgets,
                                                                          }) => {
    const {t} = useTranslation();
    const { mode } = useThemeMode();

    // Расчет скора (0-100)
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
    const budgetScore = totalBudgets > 0 ? ((totalBudgets - budgetsExceeded) / totalBudgets) * 100 : 100;
    const healthScore = Math.round((savingsRate * 0.6 + budgetScore * 0.4));

    const getScoreColor = (score: number) => {
        if (score >= 70) return 'success.main';
        if (score >= 40) return 'warning.main';
        return 'error.main';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 70) return t('excellent');
        if (score >= 40) return t('good');
        return t('needsImprovement');
    };

    return (
        <Card elevation={2}>
            <CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                    {healthScore >= 50 ? (
                        <TrendingUpIcon color="success"/>
                    ) : (
                        <TrendingDownIcon color="error"/>
                    )}
                    <Typography variant="h6" fontWeight="bold">
                        {t('financialHealth')}
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'baseline', gap: 1, mb: 2}}>
                    <Typography variant="h3" fontWeight="bold" color={getScoreColor(healthScore)}>
                        {healthScore}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        / 100
                    </Typography>
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={healthScore}
                    sx={{
                        height: 12,
                        borderRadius: 6,
                        mb: 2,
                        backgroundColor: mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(6, 0, 171, 0.1)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(90deg, ${getScoreColor(healthScore)} 0%, ${getScoreColor(healthScore)}CC 100%)`,
                        },
                    }}
                />

                <Typography variant="body2" color="text.secondary">
                    {getScoreLabel(healthScore)}
                </Typography>
            </CardContent>
        </Card>
    );
};