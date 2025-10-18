import React, {useMemo, useState} from 'react';
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
        <Container maxWidth="lg" sx={{py: 4}}>
            <Box sx={{mb: 4}}>
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                    textAlign: 'left', 
                    color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'
                }}>
                    {t('analytics')}
                </Typography>
                <Typography variant="body1" sx={{
                    textAlign: 'left', 
                    color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E'
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
                        color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E', 
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
                        bgcolor: mode === 'dark' ? 'rgba(26, 35, 50, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 3,
                        p: 0.5,
                        boxShadow: mode === 'dark' 
                            ? '0 4px 12px rgba(123, 167, 209, 0.2)'
                            : '0 4px 12px rgba(184, 212, 240, 0.2)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(123, 167, 209, 0.3)'
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
                            color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'linear-gradient(135deg, #2D4A5A 0%, #1B2F3A 100%)'
                                    : 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                                color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'linear-gradient(135deg, #3D5A6A 0%, #2B3F4A 100%)'
                                        : 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
                                }
                            }
                        }}
                    >
                        📅 {t('week')}
                    </ToggleButton>
                    <ToggleButton 
                        value="month"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'linear-gradient(135deg, #2D4A5A 0%, #1B2F3A 100%)'
                                    : 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                                color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'linear-gradient(135deg, #3D5A6A 0%, #2B3F4A 100%)'
                                        : 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
                                }
                            }
                        }}
                    >
                        📆 {t('month')}
                    </ToggleButton>
                    <ToggleButton 
                        value="year"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                            '&.Mui-selected': {
                                bgcolor: mode === 'dark' 
                                    ? 'linear-gradient(135deg, #2D4A5A 0%, #1B2F3A 100%)'
                                    : 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                                color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                                '&:hover': {
                                    bgcolor: mode === 'dark' 
                                        ? 'linear-gradient(135deg, #3D5A6A 0%, #2B3F4A 100%)'
                                        : 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
                                }
                            }
                        }}
                    >
                        🗓️ {t('year')}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Stats Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)'},
                    gap: {xs: 2, sm: 3},
                    mb: 4
                }}
            >
                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, #2D5A3D 0%, #1B3A2A 100%)'
                            : 'linear-gradient(135deg, #A9DFBF 0%, #7DCEA0 100%)',
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(45, 90, 61, 0.4)'
                                : '0 12px 30px rgba(125, 206, 160, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E', mb: 1}}>
                            💰 {t('income')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'}}>
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, #5A2D2D 0%, #3A1B1B 100%)'
                            : 'linear-gradient(135deg, #F5B7B1 0%, #E8A59B 100%)',
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 30px rgba(90, 45, 45, 0.4)'
                                : '0 12px 30px rgba(232, 165, 155, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E', mb: 1}}>
                            💸 {t('expense')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'}}>
                            {formatCurrency(stats.expenses, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: stats.balance >= 0 
                            ? (mode === 'dark' 
                                ? 'linear-gradient(135deg, #2D4A5A 0%, #1B2F3A 100%)'
                                : 'linear-gradient(135deg, #AED6F1 0%, #85C1E9 100%)')
                            : (mode === 'dark' 
                                ? 'linear-gradient(135deg, #4A2D5A 0%, #2F1B3A 100%)'
                                : 'linear-gradient(135deg, #DDA0DD 0%, #BA55D3 100%)'),
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: stats.balance >= 0 
                                ? (mode === 'dark' 
                                    ? '0 12px 30px rgba(45, 74, 90, 0.4)'
                                    : '0 12px 30px rgba(133, 193, 233, 0.3)')
                                : (mode === 'dark' 
                                    ? '0 12px 30px rgba(74, 45, 90, 0.4)'
                                    : '0 12px 30px rgba(186, 85, 211, 0.3)'),
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E', mb: 1}}>
                            {stats.balance >= 0 ? '📈' : '📉'} {t('balance')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'}}>
                            {formatCurrency(stats.balance, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: stats.savingsRate >= 0 
                            ? (mode === 'dark' 
                                ? 'linear-gradient(135deg, #2D4A5A 0%, #1B2F3A 100%)'
                                : 'linear-gradient(135deg, #C7E0F4 0%, #8BB8E8 100%)')
                            : (mode === 'dark' 
                                ? 'linear-gradient(135deg, #5A4A2D 0%, #3A2F1B 100%)'
                                : 'linear-gradient(135deg, #F5B7B1 0%, #E8A59B 100%)'),
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: stats.savingsRate >= 0 
                                ? (mode === 'dark' 
                                    ? '0 12px 30px rgba(45, 74, 90, 0.4)'
                                    : '0 12px 30px rgba(139, 184, 232, 0.3)')
                                : (mode === 'dark' 
                                    ? '0 12px 30px rgba(90, 74, 45, 0.4)'
                                    : '0 12px 30px rgba(232, 165, 155, 0.3)'),
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E', mb: 1}}>
                            {stats.savingsRate >= 0 ? '🎯' : '⚠️'} {t('savingsRate')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'}}>
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: {xs: 2, sm: 3}}}>
                <Paper 
                    elevation={3} 
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, #1A2332 0%, #2A3441 100%)'
                            : 'linear-gradient(135deg, #F8FBFF 0%, #E8F4FD 100%)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(123, 167, 209, 0.2)'
                            : '1px solid rgba(184, 212, 240, 0.2)',
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
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'
                    }}>
                        📊 {t('expenseDistribution')}
                    </Typography>
                    <ExpensesPieChart transactions={filteredTransactions} noDataMessage={t('noTransactionData')}/>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, #1A2332 0%, #2A3441 100%)'
                            : 'linear-gradient(135deg, #F0F8FF 0%, #E8F4FD 100%)',
                        border: mode === 'dark' 
                            ? '1px solid rgba(123, 167, 209, 0.2)'
                            : '1px solid rgba(184, 212, 240, 0.2)',
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
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'
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
                        ? 'linear-gradient(135deg, #2D4A5A 0%, #1B2F3A 100%)'
                        : 'linear-gradient(135deg, #B8D4F0 0%, #C7E0F4 100%)',
                    color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                    position: 'relative',
                    overflow: 'hidden',
                    border: mode === 'dark' 
                        ? '1px solid rgba(123, 167, 209, 0.3)'
                        : '1px solid rgba(184, 212, 240, 0.3)',
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{
                        mb: 3, 
                        textAlign: 'left', 
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'
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
                                                    ? (index === 0 ? '#5A4A2D' : index === 1 ? '#2D4A5A' : index === 2 ? '#2D5A3D' : '#1A2332')
                                                    : (index === 0 ? '#f2da6b' : index === 1 ? '#AED6F1' : index === 2 ? '#A9DFBF' : '#E8F4FD'),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                color: mode === 'dark' ? '#E8F4FD' : '#2C3E50',
                                                border: mode === 'dark' 
                                                    ? '2px solid rgba(123, 167, 209, 0.5)'
                                                    : '2px solid rgba(184, 212, 240, 0.5)',
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold" sx={{color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'}}>
                                                {getCategoryName(transaction.category, t)}
                                            </Typography>
                                            <Typography variant="caption" sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E'}}>
                                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                                            </Typography>
                                            {transaction.description && (
                                                <Typography variant="body2" sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E'}}>
                                                    {transaction.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" sx={{color: mode === 'dark' ? '#FF6B6B' : '#bd5147'}}>
                                        {formatCurrency(transaction.amount, currency)}
                                    </Typography>
                                </Box>
                            ))}
                        {filteredTransactions.filter(t => t.type === 'expense').length === 0 && (
                            <Box sx={{textAlign: 'center', py: 4}}>
                                <Typography sx={{color: mode === 'dark' ? 'rgba(232, 244, 253, 0.8)' : '#5D6D7E', fontSize: '1.1rem'}}>
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