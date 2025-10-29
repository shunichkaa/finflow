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