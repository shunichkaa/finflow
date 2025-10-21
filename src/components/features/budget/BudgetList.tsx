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
                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(6, 0, 171, 0.8)' }} gutterBottom>
                            {t('totalBudgets')}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#0600AB' }}>
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
                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.7)' }} gutterBottom>
                            {t('exceededBudgets')}
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: mode === 'dark' ? '#FFFFFF' : '#0600AB' }}
                        >
                            {exceededBudgets}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Список бюджетов */}
            <Box sx={{
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, 
                gap: 3
            }}>
                {budgets.map((budget) => {
                    const category = getCategoryById(budget.category);
                    const spent = calculateBudgetSpent(budget, transactions);
                    const percentage = getBudgetPercentage(spent, budget.limit);
                    const status = getBudgetStatus(percentage);
                    const statusColor = getBudgetStatusColor(status);
                    const remaining = budget.limit - spent;
                    const daysLeft = getDaysLeftInPeriod(budget.period);
                    const categoryColor = category?.color || '#96CEB4';

                    return (
                        <Card key={budget.id} elevation={2}
                              sx={{
                                  minHeight: 500, 
                                  aspectRatio: { xs: 'auto', sm: '1 / 1' },
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  backdropFilter: 'blur(40px) saturate(180%)',
                                  backgroundColor: mode === 'dark' ? 'rgba(28, 28, 30, 0.85)' : 'rgba(252, 248, 245, 0.7)',
                                  border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(252, 248, 245, 0.9)',
                                  borderRadius: 6,
                                  boxShadow: mode === 'dark' 
                                      ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                                      : '0 8px 32px rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: mode === 'dark'
                                          ? '0 16px 48px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                                          : '0 16px 48px rgba(31, 38, 135, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                                  },
                              }}>
                            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {/* Верхняя часть с иконкой и действиями */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                                    <Box 
                                        sx={{ 
                                            width: 72, 
                                            height: 72, 
                                            borderRadius: 4,
                                            background: `linear-gradient(135deg, ${categoryColor}20 0%, ${categoryColor}40 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {getCategoryIcon(category?.icon || 'more', 40)}
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                if (window.confirm(t('confirmDeleteBudget'))) {
                                                    deleteBudget(budget.id);
                                                }
                                            }}
                                            sx={{
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(6, 0, 171, 0.6)',
                                                '&:hover': {
                                                    color: '#FF6B6B',
                                                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Название */}
                                <Typography 
                                    variant="h5" 
                                    fontWeight="700"
                                    sx={{ 
                                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                        mb: 1,
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    {getCategoryName(budget.category, t)}
                                </Typography>

                                {/* Период и дни */}
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
                                    <Chip
                                        label={t(budget.period === 'monthly' ? 'monthly' : 'weekly')}
                                        sx={{
                                            backgroundColor: `${categoryColor}20`,
                                            color: categoryColor,
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            height: 36,
                                            borderRadius: 2
                                        }}
                                    />
                                    <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)', fontSize: '0.875rem' }}>
                                        {(() => {
                                            if (daysLeft === 0) {
                                                return t('lastDay');
                                            }
                                            if (daysLeft === 1) {
                                                return t('dayLeft');
                                            }
                                            return `${daysLeft} ${t('daysLeft')}`;
                                        })()}
                                    </Typography>
                                </Box>

                                {/* Warning for exceeded */}
                                {status === 'exceeded' && (
                                    <Alert 
                                        severity="error" 
                                        icon={<WarningIcon/>} 
                                        sx={{
                                            mb: 2,
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(255, 107, 107, 0.15)' 
                                                : 'rgba(255, 107, 107, 0.1)',
                                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                            border: mode === 'dark' 
                                                ? '1px solid rgba(255, 107, 107, 0.3)' 
                                                : '1px solid rgba(255, 107, 107, 0.2)',
                                            borderRadius: 3,
                                            '& .MuiAlert-icon': {
                                                color: '#FF6B6B',
                                            },
                                            '& .MuiAlert-message': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                                fontWeight: 500,
                                            }
                                        }}
                                    >
                                        {t('budgetExceeded')} {formatCurrency(spent - budget.limit, currency)}
                                    </Alert>
                                )}

                                {status === 'danger' && (
                                    <Alert 
                                        severity="warning" 
                                        sx={{
                                            mb: 2,
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(255, 179, 71, 0.15)' 
                                                : 'rgba(255, 179, 71, 0.1)',
                                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                            border: mode === 'dark' 
                                                ? '1px solid rgba(255, 179, 71, 0.3)' 
                                                : '1px solid rgba(255, 179, 71, 0.2)',
                                            borderRadius: 3,
                                            '& .MuiAlert-icon': {
                                                color: '#FFB347',
                                            },
                                            '& .MuiAlert-message': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                                fontWeight: 500,
                                            }
                                        }}
                                    >
                                        {t('budgetAlmostExceeded')}
                                    </Alert>
                                )}

                                {/* Прогресс */}
                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography 
                                            variant="h6" 
                                            fontWeight="700"
                                            sx={{ 
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(6, 0, 171, 0.9)',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            {formatCurrency(spent, currency)}
                                        </Typography>
                                        <Typography 
                                            variant="h6" 
                                            fontWeight="600"
                                            sx={{ 
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(6, 0, 171, 0.6)',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            {formatCurrency(budget.limit, currency)}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(percentage, 100)}
                                        sx={{
                                            height: 12,
                                            borderRadius: 6,
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(255, 255, 255, 0.1)' 
                                                : 'rgba(6, 0, 171, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                borderRadius: 4,
                                                background: `linear-gradient(90deg, ${categoryColor} 0%, ${categoryColor}CC 100%)`,
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Информация */}
                                <Box sx={{ mt: 'auto' }}>
                                    {remaining > 0 && (
                                        <Box 
                                            sx={{ 
                                                p: 2.5, 
                                                borderRadius: 3,
                                                backgroundColor: mode === 'dark' 
                                                    ? 'rgba(255, 255, 255, 0.05)' 
                                                    : 'rgba(6, 0, 171, 0.05)',
                                            }}
                                        >
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                                    display: 'block',
                                                    mb: 1,
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {t('remaining')}:
                                            </Typography>
                                            <Typography 
                                                variant="h6" 
                                                fontWeight="700"
                                                sx={{ 
                                                    color: categoryColor,
                                                    fontSize: '1.1rem'
                                                }}
                                            >
                                                {formatCurrency(remaining, currency)}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
};