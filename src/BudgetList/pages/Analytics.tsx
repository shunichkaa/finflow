import React from 'react';
import { Container, Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { ExpensesPieChart } from '../components/charts/ExpensesPieChart';
import { BalanceLineChart } from '../components/charts/BalanceLineChart';
import { IncomeExpenseBarChart } from '../components/charts/IncomeExpenseBarChart';
import { useFinanceStore } from '../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../Budgets/store/useSettingsStore';
import { getCategoryById, getCategoryName } from '../Budgets/utils/categories';
import { formatCurrency } from '../Budgets/utils/formatters';

export const Analytics: React.FC = () => {
    const { t } = useTranslation();
    const transactions = useFinanceStore((state) => state.transactions);
    const { currency } = useSettingsStore();

    // Топ-3 категории расходов
    const topExpenseCategories = Object.entries(
        transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>)
    )
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([categoryId, amount]) => ({
            categoryId,
            name: getCategoryName(categoryId, t),
            amount,
            color: getCategoryById(categoryId)?.color || '#6b7280',
        }));

    // Средний расход в день
    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const daysWithTransactions = new Set(
        transactions.map((t) => new Date(t.date).toDateString())
    ).size;

    const avgDailyExpense = daysWithTransactions > 0 ? totalExpense / daysWithTransactions : 0;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                📊 {t('analytics')}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                {t('analyticsDescription')}
            </Typography>

            {/* Быстрая статистика */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <TrendingDownIcon />
                                <Typography variant="h6">{t('avgDailyExpense')}</Typography>
                            </Box>
                            <Typography variant="h4" fontWeight="bold">
                                {formatCurrency(avgDailyExpense, currency)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <TrendingUpIcon />
                                <Typography variant="h6">{t('totalTransactions')}</Typography>
                            </Box>
                            <Typography variant="h4" fontWeight="bold">
                                {transactions.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Графики */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t('expensesByCategory')}
                        </Typography>
                        <ExpensesPieChart />
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t('topCategories')}
                        </Typography>
                        {topExpenseCategories.length > 0 ? (
                            <Box sx={{ mt: 2 }}>
                                {topExpenseCategories.map((cat, index) => (
                                    <Box
                                        key={cat.categoryId}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mb: 2,
                                            p: 2,
                                            bgcolor: 'background.default',
                                            borderRadius: 2,
                                            borderLeft: 4,
                                            borderColor: cat.color,
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold">
                                                #{index + 1} {cat.name}
                                            </Typography>
                                            <Typography variant="h6" color={cat.color} fontWeight="bold">
                                                {formatCurrency(cat.amount, currency)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography color="text.secondary" sx={{ mt: 2 }}>
                                {t('noData')}
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t('balanceTrend')}
                        </Typography>
                        <BalanceLineChart />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t('incomeVsExpense')}
                        </Typography>
                        <IncomeExpenseBarChart />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};