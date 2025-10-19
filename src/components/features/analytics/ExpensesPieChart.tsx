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
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import type { Transaction } from '../../../Budgets/types';

export interface ExpensesPieChartProps {
    transactions: Transaction[];
    noDataMessage?: string;
}

// Liquid Glass цветовая палитра с градиентами и прозрачностью
const LIQUID_GLASS_COLORS = [
    'url(#liquidGlass1)', // Индиго с градиентом
    'url(#liquidGlass2)', // Фиолетовый с градиентом
    'url(#liquidGlass3)', // Светло-фиолетовый с градиентом
    'url(#liquidGlass4)', // Бирюзовый с градиентом
    'url(#liquidGlass5)', // Зеленый с градиентом
    'url(#liquidGlass6)', // Лавандовый с градиентом
    'url(#liquidGlass7)', // Мятный с градиентом
    'url(#liquidGlass8)', // Светло-голубой с градиентом
    'url(#liquidGlass9)', // Светло-лавандовый с градиентом
    'url(#liquidGlass10)', // Очень светло-фиолетовый с градиентом
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
        if ((percent ?? 0) < 0.03) return null; // Показываем проценты только для сегментов больше 3%

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
                fontSize="11"
                fontWeight="700"
                style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5)',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))',
                    stroke: 'rgba(0, 0, 0, 0.3)',
                    strokeWidth: '0.5px'
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
            backdropFilter: 'blur(60px) saturate(200%)',
            background: mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.4) 0%, rgba(26, 0, 77, 0.3) 50%, rgba(15, 15, 35, 0.4) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(240, 240, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%)',
            border: mode === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: 4,
            boxShadow: mode === 'dark' 
                ? '0 12px 48px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                : '0 12px 48px rgba(36, 49, 104, 0.15), 0 4px 16px rgba(99, 102, 241, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                backdropFilter: 'blur(80px) saturate(250%)',
                boxShadow: mode === 'dark' 
                    ? '0 24px 72px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                    : '0 24px 72px rgba(36, 49, 104, 0.25), 0 8px 24px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                zIndex: 1,
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: mode === 'dark'
                    ? 'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
                    : 'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)',
                borderRadius: 4,
                zIndex: -1,
            }
        }}>
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
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth={2}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        isAnimationActive={true}
                        paddingAngle={1}
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