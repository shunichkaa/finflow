import React from 'react';
import { useMemo } from 'react';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    PieLabelRenderProps,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore.ts';
import { formatCurrency } from '../../../Budgets/utils/formatters.ts';
import { getCategoryName } from '../../../Budgets/utils/categories.tsx';
import type { Transaction } from '../../../Budgets/types';

export interface ExpensesPieChartProps {
    transactions: Transaction[];
    noDataMessage?: string;
}

const COLORS = [
    '#FF6B6B', // Красный
    '#4ECDC4', // Бирюзовый
    '#45B7D1', // Голубой
    '#96CEB4', // Зеленый
    '#FFEAA7', // Желтый
    '#DDA0DD', // Фиолетовый
    '#98D8C8', // Мятный
    '#F7DC6F', // Золотой
    '#BB8FCE', // Лавандовый
    '#85C1E9', // Светло-голубой
];

export const ExpensesPieChart: React.FC<ExpensesPieChartProps> = ({
                                                                      transactions,
                                                                      noDataMessage,
                                                                  }) => {
    const { t } = useTranslation();
    const { currency } = useSettingsStore();

    const chartData = useMemo(() => {
        const expensesByCategory = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, t) => {
                const currentAmount = acc[t.category] || 0;
                acc[t.category] = currentAmount + t.amount;
                return acc;
            }, {} as Record<string, number>);

        return Object.entries(expensesByCategory)
            .map(([category, amount]) => ({
                name: getCategoryName(category, t),
                value: amount,
                category,
            }))
            .sort((a, b) => b.value - a.value);
    }, [transactions, t]);

    if (chartData.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 300,
                }}
            >
                <Typography color="text.secondary">
                    {noDataMessage || t('noExpenseData')}
                </Typography>
            </Box>
        );
    }

    const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

    const renderCustomLabel = ({
                                   cx,
                                   cy,
                                   midAngle,
                                   innerRadius,
                                   outerRadius,
                                   percent,
                               }: PieLabelRenderProps) => {
        if ((percent ?? 0) < 0.08) return null; // Показываем проценты только для сегментов больше 8%

        const RADIAN = Math.PI / 180;
        const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
        const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
        const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

        const percentage = Math.round(Number(percent) * 100);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="12"
                fontWeight="600"
                style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                }}
            >
                {percentage}%
            </text>
        );
    };

    return (
        <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="45%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={110}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={3}
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                        paddingAngle={2}
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [formatCurrency(value, currency), 'Сумма']}
                        labelFormatter={(label) => `Категория: ${label}`}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                            fontSize: '14px',
                            color: '#2D3748',
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={80}
                        wrapperStyle={{
                            paddingTop: '20px',
                            paddingBottom: '10px',
                            fontSize: '12px',
                            color: '#2D3748',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}
                        iconType="rect"
                        iconSize={12}
                        formatter={(value, entry) => {
                            const payloadValue = entry.payload?.value;
                            if (typeof payloadValue !== 'number') return value;

                            const percentage = ((payloadValue / totalExpenses) * 100).toFixed(1);
                            return (
                                <span style={{ 
                                    color: '#2D3748', 
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    lineHeight: '1.4'
                                }}>
                                    {value}: {formatCurrency(payloadValue, currency)} ({percentage}%)
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};