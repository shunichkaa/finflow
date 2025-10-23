import React, { useMemo } from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from '../../../Budgets/store/useSettingsStore.ts';
import {formatCurrency} from '../../../Budgets/utils/formatters.ts';
import {useThemeMode} from '../../../Budgets/theme/ThemeContext';
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
    const {mode} = useThemeMode();

    const chartData = useMemo(() => {
        const now = new Date();
        const data: { date: string; income: number; expense: number }[] = [];

        // Защита от некорректных данных
        if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
            return data;
        }

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

        return data;
    }, [transactions, period]);

    const hasData = chartData.some(d => d.income > 0 || d.expense > 0);

    if (chartData.length === 0 || !hasData) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, width: '100%'}}>
                <Typography sx={{ 
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                    fontSize: '1rem'
                }}>
                    {t('noTransactionData', 'Нет данных для отображения')}
                </Typography>
            </Box>
        );
    }
    
    return (
        <Box sx={{ 
                width: '100%', 
                height: 350, 
                p: 2,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.02)'
                    : 'radial-gradient(circle at 50% 50%, rgba(108, 111, 249, 0.05) 0%, rgba(255, 204, 242, 0.03) 50%, transparent 100%)',
            borderRadius: 4,
            overflow: 'hidden'
        }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    data={chartData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                >
                    <defs>
                        {/* iOS 26 Liquid Glass Gradients for Lines */}
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#B5EAD7" stopOpacity={0.8}/>
                            <stop offset="50%" stopColor="#B5EAD7" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#B5EAD7" stopOpacity={0.4}/>
                        </linearGradient>
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={mode === 'dark' ? '#6C6FF9' : '#6C6FF9'} stopOpacity={0.8}/>
                                <stop offset="50%" stopColor={mode === 'dark' ? '#6C6FF9' : '#6C6FF9'} stopOpacity={0.6}/>
                                <stop offset="100%" stopColor={mode === 'dark' ? '#6C6FF9' : '#6C6FF9'} stopOpacity={0.4}/>
                            </linearGradient>
                        {/* Area gradients for glass effect */}
                        <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#B5EAD7" stopOpacity={0.3}/>
                            <stop offset="100%" stopColor="#B5EAD7" stopOpacity={0.05}/>
                        </linearGradient>
                            <linearGradient id="expenseArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={mode === 'dark' ? '#6C6FF9' : '#6C6FF9'} stopOpacity={0.3}/>
                                <stop offset="100%" stopColor={mode === 'dark' ? '#6C6FF9' : '#6C6FF9'} stopOpacity={0.05}/>
                            </linearGradient>
                        {/* Glass glow filter */}
                        <filter id="glassGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid 
                        strokeDasharray="8 8" 
                        stroke={mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(108, 111, 249, 0.15)'}
                        strokeWidth={1}
                    />
                    <XAxis
                        dataKey="date"
                        tick={{fontSize: 12, fill: mode === 'dark' ? '#FFFFFF' : '#272B3E', fontWeight: 500}}
                        interval={period === 'year' ? 1 : period === 'month' ? 4 : 0}
                        axisLine={{stroke: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(108, 111, 249, 0.2)', strokeWidth: 1.5}}
                        tickLine={{stroke: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(108, 111, 249, 0.2)'}}
                    />
                    <YAxis
                        tick={{fontSize: 12, fill: mode === 'dark' ? '#FFFFFF' : '#272B3E', fontWeight: 500}}
                        tickFormatter={(value) => formatCurrency(value, currency)}
                        axisLine={{stroke: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(108, 111, 249, 0.2)', strokeWidth: 1.5}}
                        tickLine={{stroke: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(108, 111, 249, 0.2)'}}
                    />
                    <Tooltip
                        formatter={(value: number) => formatCurrency(value, currency)}
                        contentStyle={{
                            backgroundColor: mode === 'dark' ? '#272B3E' : 'rgba(252, 248, 245, 0.98)',
                            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(108, 111, 249, 0.3)',
                            borderRadius: '16px',
                            backdropFilter: 'blur(40px) saturate(180%)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                : '0 12px 40px rgba(108, 111, 249, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            padding: '12px 16px',
                            fontWeight: 600
                        }}
                        labelStyle={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 700,
                            marginBottom: '8px'
                        }}
                    />
                    <Legend 
                        wrapperStyle={{ 
                            paddingTop: '20px',
                            fontSize: '14px',
                            fontWeight: 600
                        }}
                        iconType="line"
                        formatter={(value) => (
                            <span style={{ 
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontWeight: 600,
                                fontSize: '14px'
                            }}>
                                {value}
                            </span>
                        )}
                    />
                    <Line
                        type="monotone"
                        dataKey="income"
                        name={t('income')}
                        stroke="#B5EAD7"
                        strokeWidth={3}
                        dot={false}
                        activeDot={false}
                        animationBegin={200}
                        animationDuration={1200}
                        animationEasing="ease-out"
                        isAnimationActive={true}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        name={t('expense')}
                        stroke="#FFB3BA"
                        strokeWidth={3}
                        dot={false}
                        activeDot={false}
                        animationBegin={400}
                        animationDuration={1200}
                        animationEasing="ease-out"
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};