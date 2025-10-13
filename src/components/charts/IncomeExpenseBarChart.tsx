import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { formatCurrency } from '../../Budgets/utils/formatters';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

export const IncomeExpenseBarChart: React.FC = () => {
    const { t } = useTranslation();
    const transactions = useFinanceStore((state) => state.transactions);
    const { currency } = useSettingsStore();

    // Последние 6 месяцев
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 5);
    const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });

    const chartData = months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);

        const monthTransactions = transactions.filter((t) => {
            const tDate = new Date(t.date);
            return tDate >= monthStart && tDate <= monthEnd;
        });

        const income = monthTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = monthTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            month: format(month, 'MMM yyyy'),
            income,
            expense,
        };
    });

    if (chartData.every(d => d.income === 0 && d.expense === 0)) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                color: 'text.secondary'
            }}>
                <Typography>{t('noData')}</Typography>
            </Box>
        );
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        p: 1.5,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        {payload[0].payload.month}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                        {t('income')}: {formatCurrency(payload[0].value, currency)}
                    </Typography>
                    <Typography variant="body2" color="error.main">
                        {t('expense')}: {formatCurrency(payload[1].value, currency)}
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="currentColor" />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}€`} stroke="currentColor" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" fill="#22c55e" name={t('income')} radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" name={t('expense')} radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};