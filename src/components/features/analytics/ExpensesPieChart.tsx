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
    '#fca5a5',
    '#7dd3fc',
    '#6ee7b7',
    '#fbbf24',
    '#a5b4fc',
    '#f9a8d4',
    '#67e8f9',
    '#94a3b8',
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
        if ((percent ?? 0) < 0.05) return null;

        const RADIAN = Math.PI / 180;
        const radius =
            Number(innerRadius) +
            (Number(outerRadius) - Number(innerRadius)) * 0.5;
        const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
        const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > Number(cx) ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(Number(percent) * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Динамически определяем высоту в зависимости от количества категорий
    const legendHeight = Math.max(36, chartData.length * 20 + 20);
    const chartHeight = 300 + legendHeight;

    return (
        <Box>
            <ResponsiveContainer width="100%" height={chartHeight}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="40%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
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
                        verticalAlign="bottom"
                        height={legendHeight}
                        wrapperStyle={{
                            paddingTop: '20px',
                            paddingBottom: '10px',
                        }}
                        formatter={(value, entry) => {
                            const payloadValue = entry.payload?.value;
                            if (typeof payloadValue !== 'number') return value;

                            const percentage = (
                                (payloadValue / totalExpenses) *
                                100
                            ).toFixed(1);
                            return `${value}: ${formatCurrency(
                                payloadValue,
                                currency
                            )} (${percentage}%)`;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};