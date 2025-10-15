import React, { useMemo, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {useSettingsStore} from "../../Budgets/store/useSettingsStore.ts";
import {useFinanceStore} from "../../Budgets/store/useFinanceStore.ts";
import {formatCurrency} from "../../Budgets/utils/formatters.ts";
import {ExpensesPieChart} from "../../components/charts/ExpensesPieChart.tsx";
import {IncomeExpenseTrendChart} from "../../components/features/IncomeExpenseTrendChart.tsx";

type Period = 'week' | 'month' | 'year';

const Analytics: React.FC = () => {
    const { t } = useTranslation();
    const [period, setPeriod] = useState<Period>('month');
    const transactions = useFinanceStore(state => state.transactions);
    const { currency } = useSettingsStore();

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

        return { income, expenses, balance, savingsRate };
    }, [filteredTransactions]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    {t('analytics')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {t('analyticsDescription')}
                </Typography>
            </Box>

            {/* Period Selector */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
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
                    gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 2,
                    mb: 4
                }}
            >
                {[
                    { label: t('totalIncome'), value: stats.income, color: 'success.main' },
                    { label: t('totalExpenses'), value: stats.expenses, color: 'error.main' },
                    {
                        label: t('balance'),
                        value: stats.balance,
                        color: stats.balance >= 0 ? 'success.main' : 'error.main'
                    },
                    {
                        label: t('savingsRate'),
                        value: stats.savingsRate,
                        color: stats.savingsRate >= 0 ? 'success.main' : 'error.main',
                        isPercent: true
                    }
                ].map((stat, idx) => (
                    <Card key={idx} elevation={2}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {stat.label}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" color={stat.color}>
                                {stat.isPercent ? `${stat.value.toFixed(1)}%` : formatCurrency(stat.value, currency)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Charts */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                        {t('expensesByCategory')}
                    </Typography>
                    <ExpensesPieChart transactions={filteredTransactions} noDataMessage={t('noTransactionData')} />
                </Paper>

                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                        {t('incomeExpenseTrend')}
                    </Typography>
                    <IncomeExpenseTrendChart transactions={filteredTransactions} period={period} noDataMessage={t('noTransactionData')} />
                </Paper>
            </Box>
        </Container>
    );
};

export default Analytics;