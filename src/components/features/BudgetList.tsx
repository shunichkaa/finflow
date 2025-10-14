import React from 'react';
import {
    Box,
    Typography,
    LinearProgress,
    IconButton,
    Card,
    CardContent,
    Chip,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { getCategoryById, getCategoryIcon, getCategoryName } from '../../Budgets/utils/categories';
import { formatCurrency } from '../../Budgets/utils/formatters';
import {
    calculateBudgetSpent,
    getBudgetPercentage,
    getBudgetStatus,
    getBudgetStatusColor,
    getDaysLeftInPeriod,
} from '../../Budgets/utils/budgetCalculations';

export const BudgetList: React.FC = () => {
    const { t } = useTranslation();
    const budgets = useFinanceStore((state) => state.budgets);
    const transactions = useFinanceStore((state) => state.transactions);
    const deleteBudget = useFinanceStore((state) => state.deleteBudget);
    const { currency } = useSettingsStore();

    if (budgets.length === 0) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {budgets.map((budget) => {
                const category = getCategoryById(budget.category);
                const spent = calculateBudgetSpent(budget, transactions);
                const percentage = getBudgetPercentage(spent, budget.limit);
                const status = getBudgetStatus(percentage);
                const statusColor = getBudgetStatusColor(status);
                const remaining = budget.limit - spent;
                const daysLeft = getDaysLeftInPeriod(budget.period);

                return (
                    <Card key={budget.id} elevation={2}>
                        <CardContent>
                            {/* Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            bgcolor: category?.color,
                                            color: '#fff',
                                        }}
                                    >
                                        {getCategoryIcon(category?.icon || 'more', 24)}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {getCategoryName(budget.category, t)}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            <Chip
                                                label={t(budget.period === 'monthly' ? 'monthly' : 'weekly')}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {daysLeft} {t('daysLeft')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                        if (window.confirm(t('confirmDeleteBudget'))) {
                                            deleteBudget(budget.id);
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            {/* Warning for exceeded */}
                            {status === 'exceeded' && (
                                <Alert severity="error" icon={<WarningIcon />} sx={{ mb: 2 }}>
                                    {t('budgetExceeded')} {formatCurrency(spent - budget.limit, currency)}
                                </Alert>
                            )}

                            {status === 'danger' && (
                                <Alert severity="warning" sx={{ mb: 2 }}>
                                    {t('budgetAlmostExceeded')}
                                </Alert>
                            )}

                            {/* Progress Bar */}
                            <Box sx={{ mb: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={Math.min(percentage, 100)}
                                    sx={{
                                        height: 12,
                                        borderRadius: 6,
                                        bgcolor: 'grey.200',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: statusColor,
                                            borderRadius: 6,
                                        },
                                    }}
                                />
                            </Box>

                            {/* Stats */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {t('spent')}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold" color={statusColor}>
                                        {formatCurrency(spent, currency)}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {remaining >= 0 ? t('remaining') : t('exceeded')}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color={remaining >= 0 ? 'success.main' : 'error.main'}
                                    >
                                        {formatCurrency(Math.abs(remaining), currency)}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {t('limit')}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        {formatCurrency(budget.limit, currency)}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Percentage */}
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {percentage.toFixed(1)}% {t('used')}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
};