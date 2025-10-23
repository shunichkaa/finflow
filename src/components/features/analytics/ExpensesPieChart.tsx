import React, { useMemo } from 'react';
import {
    Cell,
    Pie,
    PieChart,
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

// Современная градиентная палитра как на картинке
const GRADIENT_COLORS = [
    '#6C6FF9', // Фиолетовый
    '#FF6B9D', // Розовый
    '#FFB946', // Желтый
    '#4ECDC4', // Бирюзовый
    '#B5EAD7', // Мятный
    '#C7CEEA', // Лавандовый
    '#FFD7BA', // Персиковый
    '#BAE1DA', // Светло-бирюзовый
    '#FFB3BA', // Светло-розовый
    '#D4BBDD', // Светло-фиолетовый
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
    const topCategory = chartData[0]; // Самая большая категория для отображения в центре

    return (
        <Box sx={{ 
            width: '100%', 
            height: 450,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'radial-gradient(circle at 50% 50%, rgba(108, 111, 249, 0.05) 0%, rgba(255, 204, 242, 0.03) 50%, transparent 100%)',
            borderRadius: 4,
            overflow: 'visible'
        }}>
            {/* Текст в центре */}
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <Typography sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                    mb: 0.5,
                    fontFamily: 'Nunito, system-ui, sans-serif'
                }}>
                    {topCategory?.name}
                </Typography>
                <Typography sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    fontFamily: 'Nunito, system-ui, sans-serif'
                }}>
                    {formatCurrency(topCategory?.value || 0, currency)}
                </Typography>
                <Typography sx={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)',
                    mt: 0.5,
                    fontFamily: 'Nunito, system-ui, sans-serif'
                }}>
                    {((topCategory?.value || 0) / totalExpenses * 100).toFixed(1)}% {t('spent', 'потрачено')}
                </Typography>
            </Box>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        innerRadius={110}
                        fill="#6C6FF9"
                        dataKey="value"
                        stroke="none"
                        animationBegin={0}
                        animationDuration={1200}
                        animationEasing="ease-out"
                        isAnimationActive={true}
                        paddingAngle={2}
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={GRADIENT_COLORS[index % GRADIENT_COLORS.length]}
                                style={{
                                    filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.1))',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name: string) => [formatCurrency(value, currency), name + ':']}
                        separator=" "
                        contentStyle={{
                            backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(108, 111, 249, 0.2)',
                            borderRadius: '12px',
                            boxShadow: mode === 'dark' 
                                ? '0 8px 24px rgba(0, 0, 0, 0.5)' 
                                : '0 8px 24px rgba(108, 111, 249, 0.15)',
                            fontSize: '14px',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            padding: '12px 16px',
                            fontWeight: 600,
                            fontFamily: 'Nunito, system-ui, sans-serif'
                        }}
                        labelStyle={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 600,
                            marginBottom: '4px'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};