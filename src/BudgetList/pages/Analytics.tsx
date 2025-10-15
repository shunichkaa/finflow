import React, {useMemo, useState} from 'react';
import {Box, Card, CardContent, Container, Paper, ToggleButton, ToggleButtonGroup, Typography,} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../Budgets/store/useFinanceStore';
import {useSettingsStore} from '../../Budgets/store/useSettingsStore';
import {formatCurrency} from '../../Budgets/utils/formatters';
import {IncomeExpenseTrendChart} from '../../components/features/IncomeExpenseTrendChart';
import {ExpensesPieChart} from "../../components/charts/ExpensesPieChart.tsx";

type Period = 'week' | 'month' | 'year';

const Analytics: React.FC = () => {
    const {t} = useTranslation();
    const [period, setPeriod] = useState<Period>('month');
    const transactions = useFinanceStore((state) => state.transactions);
    const {currency} = useSettingsStore();

    // Фильтрация транзакций по периоду
    const filteredTransactions = useMemo(() => {
        const now = new Date();
        let startDate = new Date();

        switch (period) {
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        return transactions.filter(t => new Date(t.date) >= startDate);
    }, [transactions, period]);

    // Расчет статистики
    const stats = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses;
        const savingsRate = income > 0 ? ((balance / income) * 100) : 0;

        const expensesByCategory = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        const topCategory = Object.entries(expensesByCategory)
            .sort(([, a], [, b]) => b - a)[0];

        const daysCount = period === 'week' ? 7 : period === 'month' ? 30 : 365;
        const avgDailyExpense = expenses / daysCount;

        return {
            income,
            expenses,
            balance,
            savingsRate,
            topCategory: topCategory ? topCategory[0] : null,
            topCategoryAmount: topCategory ? topCategory[1] : 0,
            avgDailyExpense,
        };
    }, [filteredTransactions, period]);

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            {/* Header */}
            <Box sx={{mb: 4}}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    {t('analytics')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {t('analyticsDescription')}
                </Typography>
            </Box>

            {/* Period Selector */}
            <Box sx={{mb: 4, display: 'flex', justifyContent: 'center'}}>
                <ToggleButtonGroup
                    value={period}
                    exclusive
                    onChange={(_, value) => value && setPeriod(value)}
                    color="primary"
                >
                    <ToggleButton value="week">{t('week')}</ToggleButton>
                    <ToggleButton value="month">{t('month')}</ToggleButton>
                    <ToggleButton value="year">{t('year')}</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Stats Cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr'},
                gap: 2,
                mb: 4
            }}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('totalIncome')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="success.main">
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('totalExpenses')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="error.main">
                            {formatCurrency(stats.expenses, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('balance')}
                        </Typography>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color={stats.balance >= 0 ? 'success.main' : 'error.main'}
                        >
                            {formatCurrency(stats.balance, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('savingsRate')}
                        </Typography>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color={stats.savingsRate >= 0 ? 'success.main' : 'error.main'}
                        >
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Additional Stats */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'}, gap: 2, mb: 4}}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('avgDailyExpense')}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {formatCurrency(stats.avgDailyExpense, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('topCategory')}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {stats.topCategory ? t(stats.topCategory) : t('noData')}
                        </Typography>
                        {stats.topCategory && (
                            <Typography variant="body2" color="text.secondary">
                                {formatCurrency(stats.topCategoryAmount, currency)}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* Charts */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: 3}}>
                {/* Pie Chart */}
                <Paper elevation={2} sx={{p: 3}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        {t('expensesByCategory')}
                    </Typography>
                    <ExpensesPieChart transactions={filteredTransactions}/>
                </Paper>

                {/* Line Chart */}
                <Paper elevation={2} sx={{p: 3}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        {t('incomeExpenseTrend')}
                    </Typography>
                    <IncomeExpenseTrendChart transactions={filteredTransactions} period={period}/>
                </Paper>
            </Box>
        </Container>
    );
};

export default Analytics;