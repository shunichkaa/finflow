import React, {useMemo, useState} from 'react';
import {Box, Card, CardContent, Container, Paper, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from "../../Budgets/store/useSettingsStore";
import {useFinanceStore} from "../../Budgets/store/useFinanceStore";
import {formatCurrency} from "../../Budgets/utils/formatters";
import {IncomeExpenseTrendChart} from "../../components/features/IncomeExpenseTrendChart";
import {ExpensesPieChart} from "../../components/features/ExpensesPieChart";
import {getCategoryName} from "../../Budgets/utils/categories";

type Period = 'week' | 'month' | 'year';

const Analytics: React.FC = () => {
    const {t} = useTranslation();
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

        if (filtered.length === 0 && transactions.length > 0) {
            return transactions;
        }

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
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{textAlign: 'left', color: '#2C3E50'}}>
                    {t('analytics')}
                </Typography>
                <Typography variant="body1" sx={{textAlign: 'left', color: '#5D6D7E'}}>
                    {t('analyticsDescription')}
                </Typography>
            </Box>

            {filteredTransactions.length === 0 && transactions.length > 0 && (
                <Box sx={{mb: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(184, 212, 240, 0.1)', border: '1px solid rgba(184, 212, 240, 0.3)'}}>
                    <Typography variant="body2" sx={{color: '#5D6D7E', textAlign: 'center'}}>
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
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 3,
                        p: 0.5,
                        boxShadow: '0 4px 12px rgba(184, 212, 240, 0.2)',
                        border: '1px solid rgba(184, 212, 240, 0.3)',
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
                            '&.Mui-selected': {
                                bgcolor: 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                                color: '#2C3E50',
                                '&:hover': {
                                    bgcolor: 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
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
                            '&.Mui-selected': {
                                bgcolor: 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                                color: '#2C3E50',
                                '&:hover': {
                                    bgcolor: 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
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
                            '&.Mui-selected': {
                                bgcolor: 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                                color: '#2C3E50',
                                '&:hover': {
                                    bgcolor: 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
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
                    gridTemplateColumns: {xs: '1fr 1fr', md: 'repeat(4, 1fr)'},
                    gap: 3,
                    mb: 4
                }}
            >
                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #A9DFBF 0%, #7DCEA0 100%)',
                        color: '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 30px rgba(125, 206, 160, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: '#5D6D7E', mb: 1}}>
                            💰 {t('income')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: '#2C3E50'}}>
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #F5B7B1 0%, #E8A59B 100%)',
                        color: '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 30px rgba(232, 165, 155, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: '#5D6D7E', mb: 1}}>
                            💸 {t('expense')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: '#2C3E50'}}>
                            {formatCurrency(stats.expenses, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: stats.balance >= 0 
                            ? 'linear-gradient(135deg, #AED6F1 0%, #85C1E9 100%)'
                            : 'linear-gradient(135deg, #F9E79F 0%, #F4D03F 100%)',
                        color: '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: stats.balance >= 0 
                                ? '0 12px 30px rgba(133, 193, 233, 0.3)'
                                : '0 12px 30px rgba(244, 208, 63, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: '#5D6D7E', mb: 1}}>
                            {stats.balance >= 0 ? '📈' : '📉'} {t('balance')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: '#2C3E50'}}>
                            {formatCurrency(stats.balance, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: stats.savingsRate >= 0 
                            ? 'linear-gradient(135deg, #C7E0F4 0%, #8BB8E8 100%)'
                            : 'linear-gradient(135deg, #F5B7B1 0%, #E8A59B 100%)',
                        color: '#2C3E50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: stats.savingsRate >= 0 
                                ? '0 12px 30px rgba(139, 184, 232, 0.3)'
                                : '0 12px 30px rgba(232, 165, 155, 0.3)',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{color: '#5D6D7E', mb: 1}}>
                            {stats.savingsRate >= 0 ? '🎯' : '⚠️'} {t('savingsRate')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{color: '#2C3E50'}}>
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: 3}}>
                <Paper 
                    elevation={3} 
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #F8FBFF 0%, #E8F4FD 100%)',
                        border: '1px solid rgba(184, 212, 240, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(184, 212, 240, 0.2)',
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{mb: 2, textAlign: 'left', color: '#2C3E50'}}>
                        📊 {t('expenseDistribution')}
                    </Typography>
                    <ExpensesPieChart transactions={filteredTransactions} noDataMessage={t('noTransactionData')}/>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #F0F8FF 0%, #E8F4FD 100%)',
                        border: '1px solid rgba(184, 212, 240, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(184, 212, 240, 0.2)',
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{mb: 2, textAlign: 'left', color: '#2C3E50'}}>
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
                    background: 'linear-gradient(135deg, #B8D4F0 0%, #C7E0F4 100%)',
                    color: '#2C3E50',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(184, 212, 240, 0.3)',
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{mb: 3, textAlign: 'left', color: '#2C3E50'}}>
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
                                        bgcolor: 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: 2,
                                        border: '1px solid rgba(184, 212, 240, 0.4)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 25px rgba(184, 212, 240, 0.3)',
                                        }
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                bgcolor: index === 0 ? '#f2da6b' : index === 1 ? '#AED6F1' : index === 2 ? '#A9DFBF' : '#E8F4FD',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                color: '#2C3E50',
                                                border: '2px solid rgba(184, 212, 240, 0.5)',
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold" sx={{color: '#2C3E50'}}>
                                                {getCategoryName(transaction.category, t)}
                                            </Typography>
                                            <Typography variant="caption" sx={{color: '#5D6D7E'}}>
                                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                                            </Typography>
                                            {transaction.description && (
                                                <Typography variant="body2" sx={{color: '#5D6D7E'}}>
                                                    {transaction.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" sx={{color: '#bd5147'}}>
                                        {formatCurrency(transaction.amount, currency)}
                                    </Typography>
                                </Box>
                            ))}
                        {filteredTransactions.filter(t => t.type === 'expense').length === 0 && (
                            <Box sx={{textAlign: 'center', py: 4}}>
                                <Typography sx={{color: '#5D6D7E', fontSize: '1.1rem'}}>
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