import React from 'react';
import {useMemo} from 'react';
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
    
    console.log('IncomeExpenseTrendChart props:', { 
        transactionsCount: transactions?.length, 
        period, 
        transactions: transactions?.slice(0, 3) 
    });

    const chartData = useMemo(() => {
        const now = new Date();
        const data: { date: string; income: number; expense: number }[] = [];

        // Защита от некорректных данных
        if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
            console.log('No transactions data:', transactions);
            return data;
        }

        console.log('Processing transactions:', transactions.length, 'for period:', period);

        if (period === 'week') {
            // Последние 7 дней
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];

                const dayTransactions = transactions.filter(t => {
                    if (!t || !t.date) return false;
                    const tDate = new Date(t.date);
                    const tDateStr = tDate.toISOString().split('T')[0];
                    return tDateStr === dateStr;
                });

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
            // Последние 30 дней (как в Analytics.tsx)
            for (let i = 29; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];

                const dayTransactions = transactions.filter(t => {
                    if (!t || !t.date) return false;
                    const tDate = new Date(t.date);
                    const tDateStr = tDate.toISOString().split('T')[0];
                    return tDateStr === dateStr;
                });

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

        console.log('Generated chart data:', data);
        console.log('Chart data length:', data.length);
        console.log('Has data with values:', data.some(d => d.income > 0 || d.expense > 0));
        console.log('Sample data points:', data.slice(0, 3));
        return data;
    }, [transactions, period, t]);

    if (chartData.length === 0) {
        console.log('No chart data available');
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300}}>
                <Typography color="text.secondary">{t('noTransactionData')}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.3)"/>
                    <XAxis
                        dataKey="date"
                        tick={{fontSize: 12, fill: '#64748b'}}
                        interval="preserveStartEnd"
                        axisLine={{stroke: '#e2e8f0'}}
                        tickLine={{stroke: '#e2e8f0'}}
                    />
                    <YAxis
                        tick={{fontSize: 12, fill: '#64748b'}}
                        tickFormatter={(value) => formatCurrency(value, currency)}
                        axisLine={{stroke: '#e2e8f0'}}
                        tickLine={{stroke: '#e2e8f0'}}
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
                    <Legend 
                        wrapperStyle={{ 
                            paddingTop: '20px',
                            fontSize: '14px',
                            color: '#64748b'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="income"
                        name={t('income')}
                        stroke="#4ECDC4"
                        strokeWidth={3}
                        dot={{r: 5, fill: '#4ECDC4', stroke: '#fff', strokeWidth: 2}}
                        activeDot={{r: 7, fill: '#4ECDC4', stroke: '#fff', strokeWidth: 2}}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        name={t('expense')}
                        stroke="#FF6B6B"
                        strokeWidth={3}
                        dot={{r: 5, fill: '#FF6B6B', stroke: '#fff', strokeWidth: 2}}
                        activeDot={{r: 7, fill: '#FF6B6B', stroke: '#fff', strokeWidth: 2}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};