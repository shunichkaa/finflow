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

// Liquid Glass цветовая палитра с градиентами
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
                background: mode === 'dark'
                    ? 'radial-gradient(circle at 50% 50%, rgba(74, 74, 106, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)',
            borderRadius: 4,
            overflow: 'hidden'
        }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <defs>
                        {/* Ultra Glass градиенты с новой палитрой */}
                        <linearGradient id="liquidGlass1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0, 51, 255, 0.4)" />
                            <stop offset="20%" stopColor="rgba(0, 51, 255, 0.6)" />
                            <stop offset="40%" stopColor="rgba(0, 51, 255, 0.5)" />
                            <stop offset="60%" stopColor="rgba(0, 51, 255, 0.7)" />
                            <stop offset="80%" stopColor="rgba(0, 51, 255, 0.4)" />
                            <stop offset="100%" stopColor="rgba(0, 51, 255, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(151, 125, 255, 0.4)" />
                            <stop offset="20%" stopColor="rgba(151, 125, 255, 0.6)" />
                            <stop offset="40%" stopColor="rgba(151, 125, 255, 0.5)" />
                            <stop offset="60%" stopColor="rgba(151, 125, 255, 0.7)" />
                            <stop offset="80%" stopColor="rgba(151, 125, 255, 0.4)" />
                            <stop offset="100%" stopColor="rgba(151, 125, 255, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 204, 242, 0.4)" />
                            <stop offset="20%" stopColor="rgba(255, 204, 242, 0.6)" />
                            <stop offset="40%" stopColor="rgba(255, 204, 242, 0.5)" />
                            <stop offset="60%" stopColor="rgba(255, 204, 242, 0.7)" />
                            <stop offset="80%" stopColor="rgba(255, 204, 242, 0.4)" />
                            <stop offset="100%" stopColor="rgba(255, 204, 242, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(242, 230, 238, 0.4)" />
                            <stop offset="20%" stopColor="rgba(242, 230, 238, 0.6)" />
                            <stop offset="40%" stopColor="rgba(242, 230, 238, 0.5)" />
                            <stop offset="60%" stopColor="rgba(242, 230, 238, 0.7)" />
                            <stop offset="80%" stopColor="rgba(242, 230, 238, 0.4)" />
                            <stop offset="100%" stopColor="rgba(242, 230, 238, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass5" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(6, 0, 171, 0.4)" />
                            <stop offset="20%" stopColor="rgba(6, 0, 171, 0.6)" />
                            <stop offset="40%" stopColor="rgba(6, 0, 171, 0.5)" />
                            <stop offset="60%" stopColor="rgba(6, 0, 171, 0.7)" />
                            <stop offset="80%" stopColor="rgba(6, 0, 171, 0.4)" />
                            <stop offset="100%" stopColor="rgba(6, 0, 171, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass6" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(96, 0, 175, 0.4)" />
                            <stop offset="20%" stopColor="rgba(96, 0, 175, 0.6)" />
                            <stop offset="40%" stopColor="rgba(96, 0, 175, 0.5)" />
                            <stop offset="60%" stopColor="rgba(96, 0, 175, 0.7)" />
                            <stop offset="80%" stopColor="rgba(96, 0, 175, 0.4)" />
                            <stop offset="100%" stopColor="rgba(96, 0, 175, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass7" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(77, 111, 255, 0.4)" />
                            <stop offset="20%" stopColor="rgba(77, 111, 255, 0.6)" />
                            <stop offset="40%" stopColor="rgba(77, 111, 255, 0.5)" />
                            <stop offset="60%" stopColor="rgba(77, 111, 255, 0.7)" />
                            <stop offset="80%" stopColor="rgba(77, 111, 255, 0.4)" />
                            <stop offset="100%" stopColor="rgba(77, 111, 255, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass8" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(184, 166, 255, 0.4)" />
                            <stop offset="20%" stopColor="rgba(184, 166, 255, 0.6)" />
                            <stop offset="40%" stopColor="rgba(184, 166, 255, 0.5)" />
                            <stop offset="60%" stopColor="rgba(184, 166, 255, 0.7)" />
                            <stop offset="80%" stopColor="rgba(184, 166, 255, 0.4)" />
                            <stop offset="100%" stopColor="rgba(184, 166, 255, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass9" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 179, 237, 0.4)" />
                            <stop offset="20%" stopColor="rgba(255, 179, 237, 0.6)" />
                            <stop offset="40%" stopColor="rgba(255, 179, 237, 0.5)" />
                            <stop offset="60%" stopColor="rgba(255, 179, 237, 0.7)" />
                            <stop offset="80%" stopColor="rgba(255, 179, 237, 0.4)" />
                            <stop offset="100%" stopColor="rgba(255, 179, 237, 0.3)" />
                        </linearGradient>
                        <linearGradient id="liquidGlass10" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 221, 246, 0.4)" />
                            <stop offset="20%" stopColor="rgba(255, 221, 246, 0.6)" />
                            <stop offset="40%" stopColor="rgba(255, 221, 246, 0.5)" />
                            <stop offset="60%" stopColor="rgba(255, 221, 246, 0.7)" />
                            <stop offset="80%" stopColor="rgba(255, 221, 246, 0.4)" />
                            <stop offset="100%" stopColor="rgba(255, 221, 246, 0.3)" />
                        </linearGradient>
                        
                        {/* Сложные радиальные градиенты для максимального glass эффекта */}
                        <radialGradient id="liquidGlassRadial1" cx="50%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                            <stop offset="25%" stopColor="rgba(255, 255, 255, 0.3)" />
                            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.4)" />
                            <stop offset="75%" stopColor="rgba(99, 102, 241, 0.2)" />
                            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
                        </radialGradient>
                        <radialGradient id="liquidGlassRadial2" cx="50%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                            <stop offset="25%" stopColor="rgba(255, 255, 255, 0.3)" />
                            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)" />
                            <stop offset="75%" stopColor="rgba(139, 92, 246, 0.2)" />
                            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                        </radialGradient>
                        <radialGradient id="liquidGlassRadial3" cx="50%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                            <stop offset="25%" stopColor="rgba(255, 255, 255, 0.3)" />
                            <stop offset="50%" stopColor="rgba(167, 139, 250, 0.4)" />
                            <stop offset="75%" stopColor="rgba(167, 139, 250, 0.2)" />
                            <stop offset="100%" stopColor="rgba(167, 139, 250, 0.1)" />
                        </radialGradient>
                        <radialGradient id="liquidGlassRadial4" cx="50%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                            <stop offset="25%" stopColor="rgba(255, 255, 255, 0.3)" />
                            <stop offset="50%" stopColor="rgba(78, 205, 196, 0.4)" />
                            <stop offset="75%" stopColor="rgba(78, 205, 196, 0.2)" />
                            <stop offset="100%" stopColor="rgba(78, 205, 196, 0.1)" />
                        </radialGradient>
                        <radialGradient id="liquidGlassRadial5" cx="50%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                            <stop offset="25%" stopColor="rgba(255, 255, 255, 0.3)" />
                            <stop offset="50%" stopColor="rgba(150, 206, 180, 0.4)" />
                            <stop offset="75%" stopColor="rgba(150, 206, 180, 0.2)" />
                            <stop offset="100%" stopColor="rgba(150, 206, 180, 0.1)" />
                        </radialGradient>
                        
                        {/* Дополнительные фильтры для glass эффекта */}
                        <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
                        </filter>
                        <filter id="glassGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
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
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth={1}
                        animationBegin={0}
                        animationDuration={3000}
                        animationEasing="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        isAnimationActive={true}
                        paddingAngle={2}
                        filter="url(#glassGlow)"
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={LIQUID_GLASS_COLORS[index % LIQUID_GLASS_COLORS.length]}
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