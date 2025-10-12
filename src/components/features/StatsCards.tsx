import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from "../../Budgets/store/useFinanceStore";
import {useSettingsStore} from "../../Budgets/store/useSettingsStore";
import {formatCurrency} from "../../Budgets/utils/formatters";

interface Stat {
    title: string;
    value: number;
    icon: React.ReactElement;
    color: string;
    bgGradient: string;
}

export const StatsCards: React.FC = () => {
    const {t} = useTranslation();
    const transactions = useFinanceStore((state) => state.transactions);
    const {currency} = useSettingsStore();

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
            icon: <AccountBalanceWalletIcon sx={{fontSize: 40}}/>,
            color: balance >= 0 ? 'primary' : 'error',
            bgGradient: balance >= 0
                ? 'linear-gradient(135deg, #da6580 0%, #d7ede2 100%)'
                : 'linear-gradient(135deg, #fcd9df 0%, #cfe0f8 100%)',
        },
        {
            title: t('income'),
            value: totalIncome,
            icon: <TrendingUpIcon sx={{fontSize: 40}}/>,
            color: 'success',
            bgGradient: 'linear-gradient(135deg, #DEE8FF 0%, #f8ad7c 100%)',
        },
        {
            title: t('expense'),
            value: totalExpense,
            icon: <TrendingDownIcon sx={{fontSize: 40}}/>,
            color: 'error',
            bgGradient: 'linear-gradient(135deg, #9fa5d5 0%, #e8f5c8 100%)',
        },
    ];

    return (
        <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', sm: 'repeat(3, 1fr)'}, gap: 2, mb: 3}}>
            {stats.map((stat) => (
                <Card
                    key={stat.title}
                    sx={{
                        background: stat.bgGradient,
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <CardContent>
                        <Box sx={{position: 'absolute', right: 16, top: 16, opacity: 0.3}}>
                            {stat.icon}
                        </Box>
                        <Typography variant="body2" sx={{opacity: 0.9, mb: 1}}>
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