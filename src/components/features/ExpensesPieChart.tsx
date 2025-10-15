import React, { useMemo } from 'react';
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
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { formatCurrency } from '../../Budgets/utils/formatters';
import { getCategoryName } from '../../Budgets/utils/categories';
import type { Transaction } from '../../Budgets/types';

export interface ExpensesPieChartProps {
    transactions: Transaction[];
    noDataMessage?: string;
}

const COLORS = [
    '#FFB3BA',
    '#BAE1FF',
    '#BAFFC9',
    '#FFF3BA',
    '#D7BAFF',
    '#FFD8BA',
    '#E2F0CB',
    '#F0F0F0',
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

    return (
        <Box>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={100}
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
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
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