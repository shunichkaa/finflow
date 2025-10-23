import React, { useMemo, useState } from 'react';
import {Box, Card, CardContent, Container, Paper, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from "../../Budgets/store/useSettingsStore";
import {useFinanceStore} from "../../Budgets/store/useFinanceStore";
import {formatCurrency} from "../../Budgets/utils/formatters";
import {IncomeExpenseTrendChart} from "../../components/features/analytics/IncomeExpenseTrendChart.tsx";
import {ExpensesPieChart} from "../../components/features/analytics/ExpensesPieChart.tsx";
import {getCategoryName} from "../../Budgets/utils/categories";
import {useThemeMode} from "../../Budgets/theme/ThemeContext";

type Period = 'week' | 'month' | 'year';

const Analytics: React.FC = () => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const [period, setPeriod] = useState<Period>('month');
    const transactions = useFinanceStore(state => state.transactions);
    const addTestData = useFinanceStore(state => state.addTestData);
    const {currency} = useSettingsStore();

    const filteredTransactions = useMemo(() => {
        const now = new Date();
        const startDate = new Date();

        switch (period) {
            case 'week':
                startDate.setDate(now.getDate() - 6);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'month':
                startDate.setDate(now.getDate() - 29);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'year':
                startDate.setDate(now.getDate() - 364);
                startDate.setHours(0, 0, 0, 0);
                break;
        }

        const filtered = transactions.filter(tx => {
            const txDate = new Date(tx.date);
            txDate.setHours(0, 0, 0, 0);
            return txDate >= startDate;
        });
        
        return filtered;
    }, [transactions, period]);

    const stats = useMemo(() => {
        const income = filteredTransactions
            .filter(tx => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const expenses = filteredTransactions
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const balance = income - expenses;
        const savingsRate = income > 0 ? (balance / income) * 100 : 0;

        return {income, expenses, balance, savingsRate};
    }, [filteredTransactions]);

    return (
        <Container 
            maxWidth="xl" 
            sx={{
                py: {xs: 0.5, sm: 1}, 
                px: {xs: 0.5, sm: 1, md: 1.5},
                transition: (theme) => theme.transitions.create(['padding', 'transform'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.complex,
                }),
            }}
        >
            <Box sx={{mb: 4}}>
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    fontWeight="700"
                    sx={{ 
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                        mb: 1
                    }}
                >
                    {t('analytics')}
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.6)',
                    }}
                >
                    Анализ ваших финансов и трендов
                </Typography>
                <Typography variant="body1" sx={{
                    textAlign: 'left', 
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.7)'
                }}>
                    {t('analyticsDescription')}
                </Typography>
            </Box>

            {filteredTransactions.length === 0 && transactions.length > 0 && (
                <Box sx={{
                    mb: 3, 
                    p: 2, 
                    borderRadius: 2, 
                    backgroundColor: mode === 'dark' ? 'rgba(123, 167, 209, 0.1)' : 'rgba(184, 212, 240, 0.1)', 
                    border: mode === 'dark' ? '1px solid rgba(123, 167, 209, 0.3)' : '1px solid rgba(184, 212, 240, 0.3)'
                }}>
                    <Typography variant="body2" sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(74, 85, 104, 0.7)', 
                        textAlign: 'center'
                    }}>
                        {t('noDataForPeriod', 'Нет данных для выбранного периода. Показаны все доступные транзакции.')}
                    </Typography>
                </Box>
            )}

            {/* Period Selector */}
            <Box sx={{mb: 4, display: 'flex', justifyContent: 'flex-start'}}>
                <ToggleButtonGroup
                    value={period}
                    exclusive
                    onChange={(_, value) => value && setPeriod(value)}
                    sx={{
                        bgcolor: mode === 'dark' ? 'rgba(0, 51, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 3,
                        p: 0.5,
                        boxShadow: mode === 'dark' 
                            ? '0 4px 12px rgba(0, 51, 255, 0.3)'
                            : '0 4px 12px rgba(151, 125, 255, 0.2)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(0, 51, 255, 0.4)'
                            : '1px solid rgba(151, 125, 255, 0.3)',
                    }}
                >
                    <ToggleButton 
                        value="week"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'rgba(0, 51, 255, 0.5)'
                                    : 'rgba(151, 125, 255, 0.3)',
                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'rgba(0, 51, 255, 0.6)'
                                        : 'rgba(151, 125, 255, 0.4)',
                                }
                            }
                        }}
                    >
{t('week')}
                    </ToggleButton>
                    <ToggleButton 
                        value="month"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'rgba(0, 51, 255, 0.5)'
                                    : 'rgba(151, 125, 255, 0.3)',
                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'rgba(0, 51, 255, 0.6)'
                                        : 'rgba(151, 125, 255, 0.4)',
                                }
                            }
                        }}
                    >
{t('month')}
                    </ToggleButton>
                    <ToggleButton 
                        value="year"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'rgba(0, 51, 255, 0.5)'
                                    : 'rgba(151, 125, 255, 0.3)',
                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'rgba(0, 51, 255, 0.6)'
                                        : 'rgba(151, 125, 255, 0.4)',
                                }
                            }
                        }}
                    >
{t('year')}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Stats Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)'},
                    gap: {xs: 1.5, sm: 2, md: 3},
                    mb: 4
                }}
            >
                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(0, 51, 255, 0.6) 0%, rgba(0, 51, 255, 0.8) 100%)'
                            : 'linear-gradient(135deg, rgba(151, 125, 255, 0.6) 0%, rgba(151, 125, 255, 0.8) 100%)',
                        color: mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 24px rgba(0, 51, 255, 0.3)'
                            : '0 8px 24px rgba(151, 125, 255, 0.3)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(0, 51, 255, 0.5)'
                                : '0 12px 30px rgba(151, 125, 255, 0.5)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.9)', mb: 1}}>
                            {t('income')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: '#FFFFFF'}}>
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(151, 125, 255, 0.6) 0%, rgba(151, 125, 255, 0.8) 100%)'
                            : 'linear-gradient(135deg, rgba(255, 204, 242, 0.6) 0%, rgba(255, 204, 242, 0.9) 100%)',
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 24px rgba(151, 125, 255, 0.3)'
                            : '0 8px 24px rgba(255, 204, 242, 0.3)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(151, 125, 255, 0.5)'
                                : '0 12px 30px rgba(255, 204, 242, 0.5)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(6, 0, 171, 0.8)', mb: 1}}>
                            {t('expense')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FFFFFF' : '#0600AB'}}>
                            {formatCurrency(stats.expenses, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(6, 0, 107, 0.7) 0%, rgba(6, 0, 171, 0.8) 100%)'
                            : 'linear-gradient(135deg, rgba(242, 230, 238, 0.8) 0%, rgba(255, 204, 242, 0.6) 100%)',
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 24px rgba(6, 0, 171, 0.3)'
                            : '0 8px 24px rgba(242, 230, 238, 0.3)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(6, 0, 171, 0.5)'
                                : '0 12px 30px rgba(242, 230, 238, 0.5)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(6, 0, 171, 0.8)', mb: 1}}>
                            {t('balance')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FFFFFF' : '#0600AB'}}>
                            {formatCurrency(stats.balance, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(0, 51, 255, 0.5) 0%, rgba(151, 125, 255, 0.7) 100%)'
                            : 'linear-gradient(135deg, rgba(151, 125, 255, 0.4) 0%, rgba(242, 230, 238, 0.6) 100%)',
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 24px rgba(0, 51, 255, 0.3)'
                            : '0 8px 24px rgba(151, 125, 255, 0.3)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(0, 51, 255, 0.5)'
                                : '0 12px 30px rgba(151, 125, 255, 0.5)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(6, 0, 171, 0.8)', mb: 1}}>
                            {t('savingsRate')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FFFFFF' : '#0600AB'}}>
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: {xs: 1.5, sm: 2, md: 3}, alignItems: 'stretch'}}>
                <Paper 
                    elevation={3} 
                    sx={{
                        p: {xs: 2, sm: 3},
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(99, 102, 241, 0.8) 100%)'
                            : 'linear-gradient(135deg, rgba(234, 234, 244, 0.6) 0%, rgba(234, 234, 244, 0.8) 100%)',
                        border: mode === 'dark' 
                        ? '1px solid rgba(99, 102, 241, 0.3)'
                        : '1px solid rgba(234, 234, 244, 0.3)',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 8px 25px rgba(123, 167, 209, 0.2)'
                                : '0 8px 25px rgba(184, 212, 240, 0.2)',
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{
                        mb: 2, 
                        textAlign: 'left', 
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB'
                    }}>
                        {t('expenseDistribution')}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <ExpensesPieChart transactions={filteredTransactions} noDataMessage={t('noTransactionData')}/>
                    </Box>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{
                        p: {xs: 2, sm: 3},
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(99, 102, 241, 0.8) 100%)'
                            : 'linear-gradient(135deg, rgba(234, 234, 244, 0.6) 0%, rgba(234, 234, 244, 0.8) 100%)',
                        border: mode === 'dark' 
                        ? '1px solid rgba(99, 102, 241, 0.3)'
                        : '1px solid rgba(234, 234, 244, 0.3)',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 8px 25px rgba(123, 167, 209, 0.2)'
                                : '0 8px 25px rgba(184, 212, 240, 0.2)',
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{
                        mb: 2, 
                        textAlign: 'left', 
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB'
                    }}>
                        📈 {t('incomeVsExpenses')}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <IncomeExpenseTrendChart transactions={filteredTransactions} period={period}
                                                 noDataMessage={t('noTransactionData')}/>
                    </Box>
                </Paper>
            </Box>

            {/* Top 5 Expenses */}
            <Paper 
                elevation={3} 
                sx={{
                    p: 3, 
                    mt: 3,
                    borderRadius: 3,
                    background: mode === 'dark' 
                        ? 'rgba(99, 102, 241, 0.8)'
                        : 'rgba(234, 234, 244, 0.8)',
                    color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                    position: 'relative',
                    overflow: 'hidden',
                    border: mode === 'dark' 
                        ? '1px solid rgba(99, 102, 241, 0.3)'
                        : '1px solid rgba(234, 234, 244, 0.3)',
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{
                        mb: 3, 
                        textAlign: 'left', 
                        color: mode === 'dark' ? '#FFFFFF' : '#0600AB'
                    }}>
                        🏆 {t('topExpenses')}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        {filteredTransactions
                            .filter(t => t.type === 'expense')
                            .sort((a, b) => b.amount - a.amount)
                            .slice(0, 5)
                            .map((transaction, index) => (
                                <Box
                                    key={transaction.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 2.5,
                                        bgcolor: mode === 'dark' 
                                            ? 'rgba(232, 244, 253, 0.1)' 
                                            : 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: 2,
                                        border: mode === 'dark' 
                                            ? '1px solid rgba(123, 167, 209, 0.4)'
                                            : '1px solid rgba(184, 212, 240, 0.4)',
                                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        '&:hover': {
                                            bgcolor: mode === 'dark' 
                                                ? 'rgba(232, 244, 253, 0.15)' 
                                                : 'rgba(255, 255, 255, 0.8)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: mode === 'dark' 
                                                ? '0 8px 25px rgba(123, 167, 209, 0.3)'
                                                : '0 8px 25px rgba(184, 212, 240, 0.3)',
                                        }
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                bgcolor: mode === 'dark' 
                                                    ? (index === 0 ? 'rgba(255, 185, 141, 0.6)' : index === 1 ? 'rgba(254, 222, 233, 0.6)' : index === 2 ? 'rgba(248, 229, 229, 0.6)' : index === 3 ? 'rgba(234, 234, 244, 0.6)' : 'rgba(255, 185, 141, 0.6)')
                                                    : (index === 0 ? 'rgba(255, 185, 141, 0.6)' : index === 1 ? 'rgba(254, 222, 233, 0.6)' : index === 2 ? 'rgba(248, 229, 229, 0.6)' : index === 3 ? 'rgba(234, 234, 244, 0.6)' : 'rgba(255, 185, 141, 0.6)'),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                                border: mode === 'dark' 
                                                    ? '2px solid rgba(6, 0, 171, 0.3)'
                                                    : '2px solid rgba(6, 0, 171, 0.3)',
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold" sx={{color: mode === 'dark' ? '#FFFFFF' : '#0600AB'}}>
                                                {getCategoryName(transaction.category, t)}
                                            </Typography>
                                            <Typography variant="caption" sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.7)'}}>
                                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                                            </Typography>
                                            {transaction.description && (
                                                <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.7)'}}>
                                                    {transaction.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" sx={{color: mode === 'dark' ? '#FFFFFF' : '#0600AB'}}>
                                        {formatCurrency(transaction.amount, currency)}
                                    </Typography>
                                </Box>
                            ))}
                        {filteredTransactions.filter(t => t.type === 'expense').length === 0 && (
                            <Box sx={{textAlign: 'center', py: 4}}>
                                <Typography sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.7)', fontSize: '1.1rem'}}>
                                    {t('noExpenseData')}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Analytics;