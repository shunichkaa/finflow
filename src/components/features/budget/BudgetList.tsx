import React from 'react';

import {Alert, Box, Card, CardContent, Chip, IconButton, LinearProgress, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../../Budgets/store/useFinanceStore.ts';
import {useThemeMode} from '../../../Budgets/theme/ThemeContext';
import {useSettingsStore} from '../../../Budgets/store/useSettingsStore.ts';
import {getCategoryById, getCategoryIcon, getCategoryName} from '../../../Budgets/utils/categories.tsx';
import {formatCurrency} from '../../../Budgets/utils/formatters.ts';
import {
    calculateBudgetSpent,
    getBudgetPercentage,
    getBudgetStatus,
    getBudgetStatusColor,
    getDaysLeftInPeriod,
} from '../../../Budgets/utils/budgetCalculations.ts';

interface BudgetListProps {
    onEdit?: (id: string) => void;
}

export const BudgetList: React.FC<BudgetListProps> = ({onEdit}) => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const budgets = useFinanceStore((state) => state.budgets);
    const transactions = useFinanceStore((state) => state.transactions);
    const deleteBudget = useFinanceStore((state) => state.deleteBudget);
    const {currency} = useSettingsStore();

    // Подсчет превышенных бюджетов
    const exceededBudgets = budgets.filter((budget) => {
        const spent = calculateBudgetSpent(budget, transactions);
        const percentage = getBudgetPercentage(spent, budget.limit);
        const status = getBudgetStatus(percentage);
        return status === 'exceeded';
    }).length;

    if (budgets.length === 0) {
        return null;
    }

    return (
        <Box>
            {/* Карточки статистики */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                mb: 3,
                width: '100%'
            }}>
                {/* Всего бюджетов */}
                <Card elevation={2} sx={{
                    flex: 1, 
                    minWidth: 0,
                    backgroundColor: mode === 'dark' ? 'rgba(234, 234, 244, 0.3)' : 'rgba(234, 234, 244, 0.4)',
                    border: mode === 'dark' ? '1px solid rgba(234, 234, 244, 0.3)' : '1px solid rgba(234, 234, 244, 0.4)'
                }}>
                    <CardContent>
                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.9)' : 'rgba(101, 70, 51, 0.8)' }} gutterBottom>
                            {t('totalBudgets')}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#654633' }}>
                            {budgets.length}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Превышено бюджетов */}
                <Card elevation={2} sx={{
                    flex: 1, 
                    minWidth: 0,
                    backgroundColor: exceededBudgets > 0 
                        ? (mode === 'dark' ? 'rgba(255, 185, 141, 0.3)' : 'rgba(255, 185, 141, 0.4)')
                        : (mode === 'dark' ? 'rgba(254, 222, 233, 0.3)' : 'rgba(254, 222, 233, 0.4)'),
                    border: exceededBudgets > 0 
                        ? (mode === 'dark' ? '1px solid rgba(255, 185, 141, 0.3)' : '1px solid rgba(255, 185, 141, 0.4)')
                        : (mode === 'dark' ? '1px solid rgba(254, 222, 233, 0.3)' : '1px solid rgba(254, 222, 233, 0.4)')
                }}>
                    <CardContent>
                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.9)' : 'rgba(101, 70, 51, 0.8)' }} gutterBottom>
                            {t('exceededBudgets')}
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: mode === 'dark' ? '#FFFFFF' : '#654633' }}
                        >
                            {exceededBudgets}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Список бюджетов */}
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {budgets.map((budget) => {
                    const category = getCategoryById(budget.category);
                    const spent = calculateBudgetSpent(budget, transactions);
                    const percentage = getBudgetPercentage(spent, budget.limit);
                    const status = getBudgetStatus(percentage);
                    const statusColor = getBudgetStatusColor(status);
                    const remaining = budget.limit - spent;
                    const daysLeft = getDaysLeftInPeriod(budget.period);
                    console.log('Budget:', budget.category, 'Period:', budget.period, 'Days left:', daysLeft);

                    return (
                        <Card key={budget.id} elevation={2}
                              sx={{
                                  minHeight: 160, 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  backgroundColor: mode === 'dark' ? 'rgba(101, 70, 51, 0.3)' : 'rgba(234, 234, 244, 0.3)',
                                  border: mode === 'dark' ? '1px solid rgba(101, 70, 51, 0.3)' : '1px solid rgba(234, 234, 244, 0.3)'
                              }}>
                            <CardContent sx={{flexGrow: 1}}>
                                {/* Header */}
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
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
                                            <Typography variant="h6" fontWeight="bold" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#654633' }}>
                                                {getCategoryName(budget.category, t)}
                                            </Typography>
                                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                                <Chip
                                                    label={t(budget.period === 'monthly' ? 'monthly' : 'weekly')}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        color: mode === 'dark' ? '#FFFFFF' : '#654633',
                                                        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(101, 70, 51, 0.3)'
                                                    }}
                                                />
                                                <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(101, 70, 51, 0.8)' }}>
                                                    {(() => {
                                                        console.log('Displaying days left for', budget.category, ':', daysLeft);
                                                        if (daysLeft === 0) return t('lastDay');
                                                        if (daysLeft === 1) return t('dayLeft');
                                                        return `${daysLeft} ${t('daysLeft')}`;
                                                    })()}
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
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>

                                {/* Warning for exceeded */}
                                {status === 'exceeded' && (
                                    <Alert severity="error" icon={<WarningIcon/>} sx={{mb: 2}}>
                                        {t('budgetExceeded')} {formatCurrency(spent - budget.limit, currency)}
                                    </Alert>
                                )}

                                {status === 'danger' && (
                                    <Alert severity="warning" sx={{mb: 2}}>
                                        {t('budgetAlmostExceeded')}
                                    </Alert>
                                )}

                                {/* Progress Bar */}
                                <Box sx={{mb: 1}}>
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
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(101, 70, 51, 0.8)' }}>
                                            {t('spent')}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#654633' }}>
                                            {formatCurrency(spent, currency)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{textAlign: 'right'}}>
                                        <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(101, 70, 51, 0.8)' }}>
                                            {remaining >= 0 ? t('remaining') : t('exceeded')}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ color: mode === 'dark' ? '#FFFFFF' : '#654633' }}
                                        >
                                            {formatCurrency(Math.abs(remaining), currency)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{textAlign: 'right'}}>
                                        <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(101, 70, 51, 0.8)' }}>
                                            {t('limit')}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#654633' }}>
                                            {formatCurrency(budget.limit, currency)}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Percentage */}
                                <Box sx={{mt: 2, textAlign: 'center'}}>
                                    <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(101, 70, 51, 0.8)' }}>
                                        {percentage.toFixed(1)}% {t('used')}
                                    </Typography>
                                </Box>
                            </CardContent>
                            {onEdit && (
                                <Box sx={{px: 2, pb: 2, display: 'flex', justifyContent: 'flex-end'}}>
                                    <Chip
                                        label={t('edit')}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => onEdit(budget.id)}
                                        size="small"
                                    />
                                </Box>
                            )}
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
};