import React, {useMemo} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from '../../Budgets/store/useSettingsStore';
import {formatCurrency} from '../../Budgets/utils/formatters';
import {getCategoryName} from '../../Budgets/utils/categories';
import type {Transaction} from '../../Budgets/types';

interface ExpensesPieChartProps {
    transactions: Transaction[];
}

const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#C9CBCF',
];

export const ExpensesPieChart: React.FC<ExpensesPieChartProps> = ({transactions}) => {
    const {t} = useTranslation();
    const {currency} = useSettingsStore();

    const chartData = useMemo(() => {
        const expensesByCategory = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
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
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300}}>
                <Typography color="text.secondary">{t('noExpenseData')}</Typography>
            </Box>
        );
    }

    const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

    const renderCustomLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}: any) => {
        if (percent < 0.05) return null; // Не показываем метки для маленьких сегментов

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="12"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
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
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
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
                        formatter={(value, entry: any) => {
                            const percentage = ((entry.payload.value / totalExpenses) * 100).toFixed(1);
                            return `${value}: ${formatCurrency(entry.payload.value, currency)} (${percentage}%)`;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};