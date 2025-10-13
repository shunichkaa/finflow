import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    PieLabelRenderProps,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { getCategoryById, getCategoryName } from '../../Budgets/utils/categories';
import { formatCurrency } from '../../Budgets/utils/formatters';

// Update the interface to match recharts expectations
interface ChartDataItem {
    name: string;
    value: number;
    color: string;
    [key: string]: any; // Add index signature to satisfy recharts
}

// Alternative approach - use a type instead of interface
// type ChartDataItem = {
//     name: string;
//     value: number;
//     color: string;
// }

export const ExpensesPieChart: React.FC = () => {
    const { t } = useTranslation();
    const transactions = useFinanceStore((state) => state.transactions);
    const { currency } = useSettingsStore();

    // Считаем расходы по категориям
    const expensesByCategory = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    // Формируем данные для чарта
    const chartData: ChartDataItem[] = Object.entries(expensesByCategory)
        .map(([categoryId, amount]) => {
            const category = getCategoryById(categoryId);
            return {
                name: getCategoryName(categoryId, t),
                value: amount,
                color: category?.color || '#6b7280',
            };
        })
        .sort((a, b) => b.value - a.value);

    // Если нет данных — показываем заглушку
    if (chartData.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                    color: 'text.secondary',
                }}
            >
                <Typography>{t('noData')}</Typography>
            </Box>
        );
    }

    // Кастомный тултип
    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload as ChartDataItem;
            const totalValue = chartData.reduce((sum: number, item) => sum + item.value, 0);
            const percentage = ((data.value / totalValue) * 100).toFixed(1);

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
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatCurrency(data.value, currency)}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                        {percentage}%
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    // Подписи на секторах
    const renderLabel = (props: PieLabelRenderProps): string => {
        const { name, percent } = props;
        if (!name || percent == null) return '';
        const percentage = typeof percent === 'number' ? percent : 0;
        return `${name} ${(percentage * 100).toFixed(0)}%`;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    labelLine={false}
                    label={renderLabel}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};