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
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 2, sm: 3 },
                width: '100%'
            }}>
                {/* Всего бюджетов */}
                <Card elevation={2} sx={{
                    flex: 1, 
                    minWidth: 0,
                    backgroundColor: mode === 'dark' ? 'rgba(168, 163, 246, 0.15)' : 'rgba(168, 163, 246, 0.3)',
                    border: mode === 'dark' ? '1px solid rgba(168, 163, 246, 0.3)' : '1px solid rgba(168, 163, 246, 0.4)'
                }}>
                    <CardContent sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 1.5, sm: 2 },
                        '&:last-child': { pb: { xs: 1.5, sm: 2 } }
                    }}>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {t('totalBudgets')}
                        </Typography>
                        <Typography 
                            variant="h4" 
                            fontWeight="bold" 
                            sx={{ 
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: { xs: '1.5rem', sm: '2.125rem' }
                            }}
                        >
                            {budgets.length}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Превышено бюджетов */}
                <Card elevation={2} sx={{
                    flex: 1, 
                    minWidth: 0,
                    backgroundColor: exceededBudgets > 0 
                        ? (mode === 'dark' ? 'rgba(255, 59, 59, 0.2)' : 'rgba(255, 179, 186, 0.5)')
                        : (mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(254, 222, 233, 0.4)'),
                    border: exceededBudgets > 0 
                        ? (mode === 'dark' ? '1px solid rgba(255, 59, 59, 0.4)' : '1px solid rgba(255, 179, 186, 0.6)')
                        : (mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(254, 222, 233, 0.4)')
                }}>
                    <CardContent sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 1.5, sm: 2 },
                        '&:last-child': { pb: { xs: 1.5, sm: 2 } }
                    }}>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            {t('exceededBudgets')}
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ 
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: { xs: '1.5rem', sm: '2.125rem' }
                            }}
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
                gap: { xs: 2, sm: 3 }
            }}>
                {budgets.map((budget) => {
                    const category = getCategoryById(budget.category);
                    const spent = calculateBudgetSpent(budget, transactions);
                    const percentage = getBudgetPercentage(spent, budget.limit);
                    const status = getBudgetStatus(percentage);
                    const remaining = budget.limit - spent;
                    const daysLeft = getDaysLeftInPeriod(budget.period);
                    const categoryColor = category?.color || '#B5EAD7';

                    return (
                        <Card key={budget.id} elevation={2}
                              sx={{
                                  minHeight: { xs: 'auto', sm: 320 }, 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  backdropFilter: 'blur(40px) saturate(180%)',
                                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(252, 248, 245, 0.7)',
                                  border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(252, 248, 245, 0.9)',
                                  borderRadius: 2,
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
                            <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {/* Верхняя часть с иконкой и действиями */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 2, sm: 2.5 }, gap: 1 }}>
                                    <IconButton
                                        onClick={() => onEdit?.(budget.id)}
                                        sx={{
                                            width: { xs: 48, sm: 56 }, 
                                            height: { xs: 48, sm: 56 }, 
                                            borderRadius: 3,
                                            background: `linear-gradient(135deg, ${categoryColor}20 0%, ${categoryColor}40 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, ${categoryColor}30 0%, ${categoryColor}50 100%)`,
                                            }
                                        }}
                                    >
                                        {getCategoryIcon(category?.icon || 'more', 32)}
                                    </IconButton>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                if (window.confirm(t('confirmDeleteBudget'))) {
                                                    deleteBudget(budget.id);
                                                }
                                            }}
                                            sx={{
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                padding: { xs: 0.75, sm: 1 },
                                                '&:hover': {
                                                    color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6',
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize={window.innerWidth < 600 ? "small" : "medium"} />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Название */}
                                <Typography 
                                    variant="h6" 
                                    fontWeight="700"
                                    sx={{ 
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                        mb: 0.5,
                                        fontSize: { xs: '1rem', sm: '1.1rem' },
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {getCategoryName(budget.category, t)}
                                </Typography>

                                {/* Период и дни - скрыто на мобилке */}
                                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { xs: 0.75, sm: 1 }, alignItems: 'center', mb: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                                    <Chip
                                        label={t(budget.period === 'monthly' ? 'monthly' : 'weekly')}
                                        size="small"
                                        sx={{
                                            backgroundColor: `${categoryColor}20`,
                                            color: categoryColor,
                                            fontWeight: 600,
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                            height: { xs: 24, sm: 28 },
                                            borderRadius: 2
                                        }}
                                    />
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E', 
                                            opacity: 0.9, 
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                                            fontWeight: 600 
                                        }}
                                    >
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

                                {/* Warning for exceeded - упрощено на мобилке */}
                                {status === 'exceeded' && (
                                        <Alert 
                                        severity="error" 
                                        icon={<WarningIcon/>} 
                                        sx={{
                                            mb: { xs: 1.5, sm: 2 },
                                            backgroundColor: mode === 'dark' ? 'rgba(255, 179, 186, 0.2)' : '#FFB3BA',
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            border: mode === 'dark' ? '1px solid rgba(255, 179, 186, 0.3)' : '1px solid #FFB3BA',
                                            borderRadius: 3,
                                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                            py: { xs: 0.5, sm: 1 },
                                            '& .MuiAlert-icon': {
                                                color: mode === 'dark' ? '#FFB3BA' : '#272B3E',
                                                fontSize: { xs: '1rem', sm: '1.5rem' }
                                            },
                                            '& .MuiAlert-message': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                fontWeight: 500,
                                                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
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
                                            mb: { xs: 1.5, sm: 2 },
                                            backgroundColor: mode === 'dark' ? 'rgba(255, 215, 186, 0.2)' : '#FFD7BA',
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            border: mode === 'dark' ? '1px solid rgba(255, 215, 186, 0.3)' : '1px solid #FFD7BA',
                                            borderRadius: 3,
                                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                            py: { xs: 0.5, sm: 1 },
                                            '& .MuiAlert-icon': {
                                                color: mode === 'dark' ? '#FFD7BA' : '#272B3E',
                                                fontSize: { xs: '1rem', sm: '1.5rem' }
                                            },
                                            '& .MuiAlert-message': {
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                fontWeight: 500,
                                                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }}
                                    >
                                        {t('budgetAlmostExceeded')}
                                    </Alert>
                                )}

                                {/* Осталось - скрыто на мобилке */}
                                {remaining > 0 && (
                                    <Box 
                                        sx={{ 
                                            p: { xs: 1.5, sm: 2 }, 
                                            mb: { xs: 1.5, sm: 2 },
                                            borderRadius: 2,
                                            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#EFF0F6',
                                            display: { xs: 'none', sm: 'flex' },
                                            alignItems: 'baseline',
                                            gap: { xs: 0.75, sm: 1 },
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#272B3E',
                                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                                fontWeight: 600,
                                            }}
                                        >
                                            {t('remaining')}:
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            fontWeight="700"
                                            sx={{ 
                                                color: mode === 'dark' ? categoryColor : '#272B3E',
                                                fontSize: { xs: '0.875rem', sm: '0.95rem' }
                                            }}
                                        >
                                            {formatCurrency(remaining, currency)}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Прогресс */}
                                <Box sx={{ mb: { xs: 1.5, sm: 2 }, mt: 'auto' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, gap: 1, flexWrap: 'wrap' }}>
                                        <Typography 
                                            variant="body1" 
                                            fontWeight="700"
                                            sx={{ 
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                fontSize: { xs: '0.875rem', sm: '0.95rem' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {formatCurrency(spent, currency)}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            fontWeight="600"
                                            sx={{ 
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                opacity: 0.6,
                                                fontSize: { xs: '0.875rem', sm: '0.95rem' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {formatCurrency(budget.limit, currency)}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(percentage, 100)}
                                        sx={{
                                            height: { xs: 6, sm: 8 },
                                            borderRadius: 4,
                                            backgroundColor: '#EFF0F6',
                                            '& .MuiLinearProgress-bar': {
                                                borderRadius: 4,
                                                background: categoryColor,
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
};