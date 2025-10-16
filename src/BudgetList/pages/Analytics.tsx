import React, {useMemo, useState} from 'react';
import {Box, Card, CardContent, Container, Paper, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from "../../Budgets/store/useSettingsStore.ts";
import {useFinanceStore} from "../../Budgets/store/useFinanceStore.ts";
import {formatCurrency} from "../../Budgets/utils/formatters.ts";
import {IncomeExpenseTrendChart} from "../../components/features/IncomeExpenseTrendChart.tsx";
import {ExpensesPieChart} from "../../components/features/ExpensesPieChart.tsx";

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
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        return transactions.filter(tx => new Date(tx.date) >= startDate);
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
            {/* Header */}
            <Box sx={{mb: 4, textAlign: 'center'}}>
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
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr 1fr', md: 'repeat(4, 1fr)'},
                    gap: 2,
                    mb: 4
                }}
            >
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('income')}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {t('expense')}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="error.main">
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
                            variant="h6"
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
                            variant="h6"
                            fontWeight="bold"
                            color={stats.savingsRate >= 0 ? 'success.main' : 'error.main'}
                        >
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: 3}}>
                <Paper elevation={2} sx={{p: 3}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{mb: 2}}>
                        {t('expenseDistribution')}
                    </Typography>
                    <ExpensesPieChart transactions={filteredTransactions} noDataMessage={t('noTransactionData')}/>
                </Paper>

                <Paper elevation={2} sx={{p: 3}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{mb: 2}}>
                        {t('incomeVsExpenses')}
                    </Typography>
                    <IncomeExpenseTrendChart transactions={filteredTransactions} period={period}
                                             noDataMessage={t('noTransactionData')}/>
                </Paper>
            </Box>

            {/* Top 5 Expenses */}
            <Paper elevation={2} sx={{p: 3, mt: 3}}>
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{mb: 2}}>
                    {t('topExpenses')}
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
                                    p: 2,
                                    bgcolor: 'grey.50',
                                    borderRadius: 2,
                                    borderLeft: '4px solid',
                                    borderLeftColor: 'error.main',
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    <Typography variant="h6" color="text.secondary">
                                        #{index + 1}
                                    </Typography>
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {t(`category.${transaction.category}`)}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(transaction.date).toLocaleDateString('ru-RU')}
                                        </Typography>
                                        {transaction.description && (
                                            <Typography variant="body2" color="text.secondary">
                                                {transaction.description}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                                <Typography variant="h6" fontWeight="bold" color="error.main">
                                    {formatCurrency(transaction.amount, currency)}
                                </Typography>
                            </Box>
                        ))}
                    {filteredTransactions.filter(t => t.type === 'expense').length === 0 && (
                        <Typography color="text.secondary" textAlign="center">
                            {t('noExpenseData')}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Analytics;