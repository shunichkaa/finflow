import React from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useTranslation } from 'react-i18next';
import { useFinanceStore } from "../../Budgets/store/useFinanceStore";
import { useSettingsStore } from "../../Budgets/store/useSettingsStore";
import { formatCurrency } from "../../Budgets/utils/formatters";
import { TransactionType } from '../../Budgets/types';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface Stat {
    title: string;
    value: number;
    icon: React.ReactElement;
    color: string;
    bgGradient: string;
    filterType?: TransactionType | 'all';
}

interface StatsCardsProps {
    onFilterClick?: (type: TransactionType | 'all') => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ onFilterClick }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
    const transactions = useFinanceStore((state) => state.transactions);
    const { currency } = useSettingsStore();

    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const stats: Stat[] = [
        {
            title: t('balance'),
            value: balance,
            icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
            color: balance >= 0 ? 'primary' : 'error',
            bgGradient: balance >= 0
                ? 'linear-gradient(135deg, #BDE3FB 0%, #92BCFA 100%)'
                : 'linear-gradient(135deg, #FDF0EC 0%, #AEE1F9 100%)',
            filterType: 'all',
        },
        {
            title: t('income'),
            value: totalIncome,
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            color: 'success',
            bgGradient: 'linear-gradient(135deg, #C2D1EC 0%, #6A92C8 100%)',
            filterType: 'income',
        },
        {
            title: t('expense'),
            value: totalExpense,
            icon: <TrendingDownIcon sx={{ fontSize: 40 }} />,
            color: 'error',
            bgGradient: 'linear-gradient(135deg, #9DB2DC 0%, #0E2D6C 100%)',
            filterType: 'expense',
        },
    ];

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: {xs: 1.5, sm: 2}, mb: 3 }}>
            {stats.map((stat) => (
                <Card
                    key={stat.title}
                    sx={{
                        background: mode === 'dark' 
                            ? 'rgba(101, 70, 51, 0.5)'
                            : 'rgba(234, 234, 244, 0.5)',
                        color: mode === 'dark' ? '#FCF9F9' : '#654633',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: onFilterClick ? 'pointer' : 'default',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': onFilterClick ? {
                            transform: 'translateY(-4px)',
                            boxShadow: 6,
                        } : {},
                    }}
                    onClick={() => onFilterClick && stat.filterType && onFilterClick(stat.filterType)}
                >
                    <CardContent>
                        <Box sx={{ position: 'absolute', right: 16, top: 16, opacity: mode === 'dark' ? 0.2 : 0.3 }}>
                            {stat.icon}
                        </Box>
                        <Typography variant="body2" sx={{ opacity: mode === 'dark' ? 0.8 : 0.9, mb: 1 }}>
                            {stat.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {stat.title === t('income') && '+'}
                            {stat.title === t('expense') && '-'}
                            {formatCurrency(Math.abs(stat.value), currency)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};