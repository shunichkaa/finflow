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
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore.ts';
import { formatCurrency } from '../../../Budgets/utils/formatters.ts';
import { getCategoryName } from '../../../Budgets/utils/categories.tsx';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import type { Transaction } from '../../../Budgets/types';

export interface ExpensesPieChartProps {
    transactions: Transaction[];
    noDataMessage?: string;
}

// Минималистичная пастельная палитра (из categories)
const PASTEL_COLORS = [
    '#FFB3BA', // Еда
    '#BAE1DA', // Транспорт
    '#C7CEEA', // Жильё
    '#D4BBDD', // Развлечения
    '#B5EAD7', // Здоровье
    '#FFD7BA', // Образование
    '#FFE5F1', // Одежда
    '#C3E5E1', // Подписки
    '#E0D5F3', // Другое
    '#D4E5F3', // Дополнительный
];

export const ExpensesPieChart: React.FC<ExpensesPieChartProps> = ({
                                                                      transactions,
                                                                      noDataMessage,
                                                                  }) => {
    const { t } = useTranslation();
    const { currency } = useSettingsStore();
    const { mode } = useThemeMode();

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
        if ((percent ?? 0) < 0.05) return null; // Показываем проценты только для сегментов больше 5%

        const RADIAN = Math.PI / 180;
        const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
        const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
        const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

        const percentage = Math.round(Number(percent) * 100);

        return (
            <text
                x={x}
                y={y}
                fill="#272B3E"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fontWeight="600"
                style={{ 
                    fontFamily: 'Nunito, system-ui, sans-serif',
                }}
            >
                {percentage}%
            </text>
        );
    };

    return (
        <Box sx={{ 
            width: '100%', 
            height: 400,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            borderRadius: 4,
            overflow: 'hidden'
        }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="45%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={120}
                        innerRadius={0}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="#FFFFFF"
                        strokeWidth={2}
                        animationBegin={0}
                        animationDuration={800}
                        animationEasing="ease-out"
                        isAnimationActive={true}
                        paddingAngle={1}
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={PASTEL_COLORS[index % PASTEL_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [formatCurrency(value, currency), 'Сумма']}
                        labelFormatter={(label) => `${label}`}
                        contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #EFF0F6',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(39, 43, 62, 0.1)',
                            fontSize: '14px',
                            color: '#272B3E',
                            padding: '8px 12px',
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={80}
                        wrapperStyle={{
                            paddingTop: '20px',
                            paddingBottom: '10px',
                            fontSize: '13px',
                            color: '#272B3E',
                            fontFamily: 'Nunito, system-ui, sans-serif',
                        }}
                        iconType="circle"
                        iconSize={10}
                        formatter={(value, entry) => {
                            const payloadValue = entry.payload?.value;
                            if (typeof payloadValue !== 'number') return value;

                            const percentage = ((payloadValue / totalExpenses) * 100).toFixed(1);
                            return (
                                <span style={{ 
                                    color: '#272B3E', 
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    lineHeight: '1.5'
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