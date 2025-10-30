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
                ? 'linear-gradient(135deg, #B5EAD7 0%, #B5EAD7 100%)'
                : 'linear-gradient(135deg, #FFB3BA 0%, #6C6FF9 100%)',
            filterType: 'all',
        },
        {
            title: t('income'),
            value: totalIncome,
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            color: 'success',
            bgGradient: 'linear-gradient(135deg, #B5EAD7 0%, #B5EAD7 100%)',
            filterType: 'income',
        },
        {
            title: t('expense'),
            value: totalExpense,
            icon: <TrendingDownIcon sx={{ fontSize: 40 }} />,
            color: 'error',
            bgGradient: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
            filterType: 'expense',
        },
    ];

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: {xs: 1.5, sm: 2}, mb: 3 }}>
            {stats.map((stat) => (
                <Card
                    key={stat.title}
                    sx={{
                        backdropFilter: 'blur(40px) saturate(180%)',
                        background: mode === 'dark' 
                            ? '#0F0F2366'
                            : '#FFFFFF33',
                        border: mode === 'dark' ? '1px solid #FFFFFF1A' : '1px solid #FFFFFF33',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: onFilterClick ? 'pointer' : 'default',
                        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #FFFFFF66, transparent)',
                        },
                        '&:hover': onFilterClick ? {
                            transform: 'translateY(-8px) scale(1.02)',
                            boxShadow: mode === 'dark' 
                                ? '0 20px 60px #00000066, inset 0 1px 0 #FFFFFF33'
                                : '0 20px 60px #0600AB33, inset 0 1px 0 #FFFFFF66',
                            background: mode === 'dark' 
                                ? '#0F0F2399'
                                : '#FFFFFF4D',
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
                            {stat.title === t('balance') && stat.value < 0 && '-'}
                            {formatCurrency(Math.abs(stat.value), currency)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};