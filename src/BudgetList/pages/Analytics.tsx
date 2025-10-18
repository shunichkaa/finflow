import React from 'react';
import {useMemo, useState} from 'react';
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

        // Возвращаем отфильтрованные транзакции, даже если их нет
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
        <Container maxWidth="lg" sx={{py: {xs: 2, sm: 4}, px: {xs: 1, sm: 2}}}>
            <Box sx={{mb: 4}}>
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                    textAlign: 'left', 
                    color: mode === 'dark' ? '#FCF9F9' : '#654633'
                }}>
                    {t('analytics')}
                </Typography>
                <Typography variant="body1" sx={{
                    textAlign: 'left', 
                    color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)'
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
                        color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)', 
                        textAlign: 'center'
                    }}>
                        📅 {t('noDataForPeriod', 'Нет данных для выбранного периода. Показаны все доступные транзакции.')}
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
                        bgcolor: mode === 'dark' ? 'rgba(60, 55, 50, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 3,
                        p: 0.5,
                        boxShadow: mode === 'dark' 
                            ? '0 4px 12px rgba(80, 75, 70, 0.3)'
                            : '0 4px 12px rgba(184, 212, 240, 0.2)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(80, 75, 70, 0.4)'
                            : '1px solid rgba(184, 212, 240, 0.3)',
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
                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'rgba(80, 75, 70, 0.6)'
                                    : 'rgba(234, 234, 244, 0.5)',
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'rgba(100, 95, 90, 0.4)'
                                        : 'rgba(255, 185, 141, 0.3)',
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
                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'rgba(80, 75, 70, 0.6)'
                                    : 'rgba(234, 234, 244, 0.5)',
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'rgba(100, 95, 90, 0.4)'
                                        : 'rgba(255, 185, 141, 0.3)',
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
                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'rgba(80, 75, 70, 0.6)'
                                    : 'rgba(234, 234, 244, 0.5)',
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'rgba(100, 95, 90, 0.4)'
                                        : 'rgba(255, 185, 141, 0.3)',
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
                            ? 'rgba(101, 70, 51, 0.5)'
                            : 'rgba(234, 234, 244, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(63, 95, 118, 0.4)'
                                : '0 12px 30px rgba(181, 201, 214, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.6)' : 'rgba(101, 70, 51, 0.7)', mb: 1}}>
                            💰 {t('income')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FCF9F9' : '#654633'}}>
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'rgba(255, 185, 141, 0.5)'
                            : 'rgba(255, 185, 141, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(163, 133, 101, 0.4)'
                                : '0 12px 30px rgba(163, 133, 101, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.6)' : 'rgba(101, 70, 51, 0.7)', mb: 1}}>
                            💸 {t('expense')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FCF9F9' : '#654633'}}>
                            {formatCurrency(stats.expenses, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'rgba(254, 222, 233, 0.5)'
                            : 'rgba(254, 222, 233, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(252, 221, 157, 0.4)'
                                : '0 12px 30px rgba(252, 221, 157, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.6)' : 'rgba(101, 70, 51, 0.7)', mb: 1}}>
                            {stats.balance >= 0 ? '📈' : '📉'} {t('balance')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FCF9F9' : '#654633'}}>
                            {formatCurrency(stats.balance, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'rgba(248, 229, 229, 0.5)'
                            : 'rgba(248, 229, 229, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(241, 100, 46, 0.4)'
                                : '0 12px 30px rgba(241, 100, 46, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.6)' : 'rgba(101, 70, 51, 0.7)', mb: 1}}>
                            {stats.savingsRate >= 0 ? '🎯' : '⚠️'} {t('savingsRate')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#FCF9F9' : '#654633'}}>
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: {xs: 1.5, sm: 2, md: 3}}}>
                <Paper 
                    elevation={3} 
                    sx={{
                        p: {xs: 2, sm: 3},
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(101, 70, 51, 0.3) 0%, rgba(101, 70, 51, 0.5) 100%)'
                            : 'linear-gradient(135deg, rgba(234, 234, 244, 0.3) 0%, rgba(234, 234, 244, 0.5) 100%)',
                        border: mode === 'dark' 
                        ? '1px solid rgba(101, 70, 51, 0.2)'
                        : '1px solid rgba(234, 234, 244, 0.2)',
                        transition: 'all 0.3s ease',
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
                        color: mode === 'dark' ? '#FCF9F9' : '#654633'
                    }}>
                        📊 {t('expenseDistribution')}
                    </Typography>
                    <ExpensesPieChart transactions={filteredTransactions} noDataMessage={t('noTransactionData')}/>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{
                        p: {xs: 2, sm: 3},
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(101, 70, 51, 0.3) 0%, rgba(101, 70, 51, 0.5) 100%)'
                            : 'linear-gradient(135deg, rgba(234, 234, 244, 0.3) 0%, rgba(234, 234, 244, 0.5) 100%)',
                        border: mode === 'dark' 
                        ? '1px solid rgba(101, 70, 51, 0.2)'
                        : '1px solid rgba(234, 234, 244, 0.2)',
                        transition: 'all 0.3s ease',
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
                        color: mode === 'dark' ? '#FCF9F9' : '#654633'
                    }}>
                        📈 {t('incomeVsExpenses')}
                    </Typography>
                    <IncomeExpenseTrendChart transactions={filteredTransactions} period={period}
                                             noDataMessage={t('noTransactionData')}/>
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
                        ? 'rgba(101, 70, 51, 0.5)'
                        : 'rgba(234, 234, 244, 0.5)',
                    color: mode === 'dark' ? '#FCF9F9' : '#654633',
                    position: 'relative',
                    overflow: 'hidden',
                    border: mode === 'dark' 
                        ? '1px solid rgba(101, 70, 51, 0.3)'
                        : '1px solid rgba(234, 234, 244, 0.3)',
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{
                        mb: 3, 
                        textAlign: 'left', 
                        color: mode === 'dark' ? '#FCF9F9' : '#654633'
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
                                        transition: 'all 0.3s ease',
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
                                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                                border: mode === 'dark' 
                                                    ? '2px solid rgba(101, 70, 51, 0.3)'
                                                    : '2px solid rgba(101, 70, 51, 0.3)',
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold" sx={{color: mode === 'dark' ? '#FCF9F9' : '#654633'}}>
                                                {getCategoryName(transaction.category, t)}
                                            </Typography>
                                            <Typography variant="caption" sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)'}}>
                                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                                            </Typography>
                                            {transaction.description && (
                                                <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)'}}>
                                                    {transaction.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" sx={{color: mode === 'dark' ? '#FCF9F9' : '#654633'}}>
                                        {formatCurrency(transaction.amount, currency)}
                                    </Typography>
                                </Box>
                            ))}
                        {filteredTransactions.filter(t => t.type === 'expense').length === 0 && (
                            <Box sx={{textAlign: 'center', py: 4}}>
                                <Typography sx={{color: mode === 'dark' ? 'rgba(252, 249, 249, 0.8)' : 'rgba(101, 70, 51, 0.7)', fontSize: '1.1rem'}}>
                                    📊 {t('noExpenseData')}
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