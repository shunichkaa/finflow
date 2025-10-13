import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { getCategoryById, getCategoryName } from '../../Budgets/utils/categories';
import { formatCurrency } from '../../Budgets/utils/formatters';

interface ChartDataItem {
    name: string;
    value: number;
    color: string;
}

interface TooltipPayload {
    name: string;
    value: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: TooltipPayload }>;
}

interface LabelProps {
    name: string;
    percent: number;
}

export const ExpensesPieChart: React.FC = () => {
    const { t } = useTranslation();
    const transactions = useFinanceStore((state) => state.transactions);
    const { currency } = useSettingsStore();

    // Группировка расходов по категориям
    const expensesByCategory = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    // Преобразование в формат для Recharts
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

    if (chartData.length === 0) {
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

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
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

    const renderLabel = ({ name, percent }: LabelProps) => {
        return `${name} ${(percent * 100).toFixed(0)}%`;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
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