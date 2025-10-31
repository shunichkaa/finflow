import {Alert, Box, Card, CardContent, LinearProgress, Typography,} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../../Budgets/store/useFinanceStore.ts';
import {useThemeMode} from '../../../Budgets/theme/ThemeContext';
import {getCategoryById, getCategoryName} from '../../../Budgets/utils/categories.tsx';
import {formatCurrency} from '../../../Budgets/utils/formatters.ts';
import {useSettingsStore} from '../../../Budgets/store/useSettingsStore.ts';
import {
    calculateBudgetSpent,
    getBudgetPercentage,
    getBudgetStatus,
} from '../../../Budgets/utils/budgetCalculations.ts';

interface BudgetListProps {
    onEdit?: (id: string) => void;
    createButton?: React.ReactNode;
}

export const BudgetList: React.FC<BudgetListProps> = ({onEdit, createButton}) => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const budgets = useFinanceStore((state) => state.budgets);
    const transactions = useFinanceStore((state) => state.transactions);
    const {currency} = useSettingsStore();


    if (budgets.length === 0) {
        return null;
    }

    return (
        <Box>
                <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1.5, sm: 3, md: 4 }, 
                    mb: { xs: 2, sm: 2 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                }}>
                    <Card elevation={2} sx={{
                        flex: { xs: 1, sm: '1 1 auto' }, 
                        minWidth: 0,
                        maxWidth: { xs: 'none', sm: '400px', md: '350px' },
                        backgroundColor: mode === 'dark' ? '#A8A3F626' : '#A8A3F64D',
                        border: mode === 'dark' ? '1px solid #A8A3F64D' : '1px solid #A8A3F666',
                    }}>
                    <CardContent sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        px: { xs: 1.25, sm: 1.5 },
                        py: { xs: 0.75, sm: 1 },
                        '&:last-child': { pb: { xs: 0.75, sm: 1 } }
                    }}>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: { xs: '0.75rem', sm: '0.813rem' },
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
                                fontSize: { xs: '1.25rem', sm: '1.5rem' }
                            }}
                        >
                            {budgets.length}
                        </Typography>
                    </CardContent>
                    </Card>
                    {createButton && (
                        <Box sx={{ flexShrink: 0 }}>
                            {createButton}
                        </Box>
                    )}
                </Box>

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
                    const categoryColor = category?.color || '#B5EAD7';

                    return (
                        <Card key={budget.id} elevation={2}
                              sx={{
                                  minHeight: { xs: 'auto', sm: 320 }, 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  backdropFilter: 'blur(40px) saturate(180%)',
                                  backgroundColor: mode === 'dark' ? '#FFFFFF0D' : '#FCF8F5B3',
                                  border: mode === 'dark' ? '1px solid #FFFFFF1A' : '1px solid #FCF8F5E6',
                                  borderRadius: 2,
                                  boxShadow: mode === 'dark' 
                                      ? '0 8px 32px #0000004D, 0 2px 8px #00000033, inset 0 1px 0 #FFFFFF0D'
                                      : '0 8px 32px #1F268726, 0 2px 8px #0000001A, inset 0 1px 0 #FFFFFF99',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  cursor: onEdit ? 'pointer' : 'default',
                                  '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: mode === 'dark'
                                          ? '0 16px 48px #00000066, 0 8px 20px #0000004D, inset 0 1px 0 #FFFFFF14'
                                          : '0 16px 48px #1F268733, 0 8px 20px #00000026, inset 0 1px 0 #FFFFFFB3',
                                  },
                              }}
                              onClick={() => onEdit && onEdit(budget.id)}
                              role={onEdit ? 'button' : undefined}
                              aria-label={onEdit ? t('editBudget') : undefined}
                        >
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
                                            backgroundColor: mode === 'dark' ? '#FFB3BA33' : '#FFB3BA',
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            border: mode === 'dark' ? '1px solid #FFB3BA4D' : '1px solid #FFB3BA',
                                            borderRadius: 2,
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
                                            backgroundColor: mode === 'dark' ? '#FFD7BA33' : '#FFD7BA',
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            border: mode === 'dark' ? '1px solid #FFD7BA4D' : '1px solid #FFD7BA',
                                            borderRadius: 2,
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