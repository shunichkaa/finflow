import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { formatCurrency } from '../../Budgets/utils/formatters';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

export const BalanceLineChart: React.FC = () => {
    const { t } = useTranslation();
    const transactions = useFinanceStore((state) => state.transactions);
    const { currency } = useSettingsStore();

    if (transactions.length === 0) {
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

    // Определяем диапазон дат (текущий месяц)
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Сортируем транзакции по дате
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Вычисляем баланс для каждого дня
    let runningBalance = 0;
    const dailyBalances = new Map<string, number>();

    sortedTransactions.forEach((t) => {
        const dateStr = format(new Date(t.date), 'yyyy-MM-dd');
        const change = t.type === 'income' ? t.amount : -t.amount;
        runningBalance += change;
        dailyBalances.set(dateStr, runningBalance);
    });

    // Формируем данные для графика
    const chartData = allDays.map((day) => {
        const dayStr = format(day, 'yyyy-MM-dd');
        const balance = dailyBalances.get(dayStr);

        if (balance !== undefined) {
            runningBalance = balance;
        }

        return {
            date: format(day, 'dd MMM'),
            balance: runningBalance,
        };
    });

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
                    <Typography variant="body2" fontWeight="bold">
                        {payload[0].payload.date}
                    </Typography>
                    <Typography variant="body2" color="primary">
                        {formatCurrency(payload[0].value, currency)}
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    stroke="currentColor"
                />
                <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}€`}
                    stroke="currentColor"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={{ fill: '#7c3aed', r: 4 }}
                    activeDot={{ r: 6 }}
                    name={t('balance')}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};