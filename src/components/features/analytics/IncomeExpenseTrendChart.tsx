import React, {useMemo} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from '../../../Budgets/store/useSettingsStore.ts';
import {formatCurrency} from '../../../Budgets/utils/formatters.ts';
import type {Transaction} from '../../../Budgets/types';

type Period = 'week' | 'month' | 'year';

export interface IncomeExpenseTrendChartProps {
    transactions: Transaction[];
    period: Period;
    noDataMessage?: string;
}

export const IncomeExpenseTrendChart: React.FC<IncomeExpenseTrendChartProps> = ({
                                                                                    transactions,
                                                                                    period,
                                                                                }) => {
    const {t} = useTranslation();
    const {currency} = useSettingsStore();

    const chartData = useMemo(() => {
        const now = new Date();
        const data: { date: string; income: number; expense: number }[] = [];

        // Защита от некорректных данных
        if (!transactions || !Array.isArray(transactions)) {
            return data;
        }

        if (period === 'week') {
            // Последние 7 дней
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];

                const dayTransactions = transactions.filter(
                    t => t && t.date && new Date(t.date).toISOString().split('T')[0] === dateStr
                );

                data.push({
                    date: date.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit'}),
                    income: dayTransactions
                        .filter(t => t.type === 'income')
                        .reduce((sum, t) => sum + t.amount, 0),
                    expense: dayTransactions
                        .filter(t => t.type === 'expense')
                        .reduce((sum, t) => sum + t.amount, 0),
                });
            }
        } else if (period === 'month') {
            // Последние 4 недели
            for (let i = 3; i >= 0; i--) {
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - (i * 7 + 6));
                const weekEnd = new Date(now);
                weekEnd.setDate(now.getDate() - (i * 7));

                const weekTransactions = transactions.filter(t => {
                    if (!t || !t.date) return false;
                    const tDate = new Date(t.date);
                    return tDate >= weekStart && tDate <= weekEnd;
                });

                data.push({
                    date: `${t('week')} ${4 - i}`,
                    income: weekTransactions
                        .filter(t => t.type === 'income')
                        .reduce((sum, t) => sum + t.amount, 0),
                    expense: weekTransactions
                        .filter(t => t.type === 'expense')
                        .reduce((sum, t) => sum + t.amount, 0),
                });
            }
        } else {
            // Последние 12 месяцев
            for (let i = 11; i >= 0; i--) {
                const monthDate = new Date(now);
                monthDate.setMonth(now.getMonth() - i);

                const monthTransactions = transactions.filter(t => {
                    if (!t || !t.date) return false;
                    const tDate = new Date(t.date);
                    return (
                        tDate.getMonth() === monthDate.getMonth() &&
                        tDate.getFullYear() === monthDate.getFullYear()
                    );
                });

                data.push({
                    date: monthDate.toLocaleDateString('ru-RU', {month: 'short'}),
                    income: monthTransactions
                        .filter(t => t.type === 'income')
                        .reduce((sum, t) => sum + t.amount, 0),
                    expense: monthTransactions
                        .filter(t => t.type === 'expense')
                        .reduce((sum, t) => sum + t.amount, 0),
                });
            }
        }

        return data;
    }, [transactions, period, t]);

    if (chartData.every(d => d.income === 0 && d.expense === 0)) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300}}>
                <Typography color="text.secondary">{t('noTransactionData')}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)"/>
                    <XAxis
                        dataKey="date"
                        tick={{fontSize: 12}}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tick={{fontSize: 12}}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        formatter={(value: number) => formatCurrency(value, currency)}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="income"
                        name={t('income')}
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{r: 4}}
                        activeDot={{r: 6}}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        name={t('expense')}
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{r: 4}}
                        activeDot={{r: 6}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};