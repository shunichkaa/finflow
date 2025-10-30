import React, {useMemo, useState} from 'react';
import {Box, Card, CardContent, Container, Paper, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from "../Budgets/store/useSettingsStore";
import {useFinanceStore} from "../Budgets/store/useFinanceStore";
import {formatCurrency} from "../Budgets/utils/formatters";
import {IncomeExpenseTrendChart} from "../components/features/analytics/IncomeExpenseTrendChart.tsx";
import {ExpensesPieChart} from "../components/features/analytics/ExpensesPieChart.tsx";
import {getCategoryName} from "../Budgets/utils/categories";
import { formatDate } from "../Budgets/utils/formatters";
import {useThemeMode} from "../Budgets/theme/ThemeContext";
import {AmountDisplay} from "../components/ui/AmountDisplay";

type Period = 'week' | 'month' | 'year';

const Analytics: React.FC = () => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const [period, setPeriod] = useState<Period>('month');
    const transactions = useFinanceStore(state => state.transactions);
    const {currency, nickname} = useSettingsStore();

    const filteredTransactions = useMemo(() => {
        const now = new Date();
        const startDate = new Date();

        switch (period) {
            case 'week':
                startDate.setDate(now.getDate() - 6);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'month':
                startDate.setDate(now.getDate() - 29);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'year':
                startDate.setDate(now.getDate() - 364);
                startDate.setHours(0, 0, 0, 0);
                break;
        }

        const filtered = transactions.filter(tx => {
            const txDate = new Date(tx.date);
            txDate.setHours(0, 0, 0, 0);
            return txDate >= startDate;
        });

        return filtered;
    }, [transactions, period]);

    const stats = useMemo(() => {
        const income = filteredTransactions
            .filter(tx => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const expenses = filteredTransactions
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const balance = income - expenses;
        const savingsRate = income > 0 ? (balance / income) * 100 : 0;

        return {income, expenses, balance, savingsRate};
    }, [filteredTransactions]);

    const cardBackgrounds = [
        mode === 'dark' ? '#BBF7D033' : '#DBFBE6', // greenish
        mode === 'dark' ? '#FDE68A33' : '#FFF6CC', // yellow
        mode === 'dark' ? '#FCA5A533' : '#FFE1E1', // red
        mode === 'dark' ? '#C7D2FE33' : '#EAEFFF', // purple/blue
    ];

    const getPaperBackground = () => {
        return mode === 'dark'
            ? 'linear-gradient(135deg, #6C6FF926 0%, #6C6FF940 100%)'
            : 'linear-gradient(135deg, #EFF0F6CC 0%, #EFF0F6E6 100%)';
    };

    const getTopExpensesBackground = () => {
        return mode === 'dark'
            ? '#6C6FF926'
            : '#EFF0F6CC';
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: {xs: 0.5, sm: 1},
                px: {xs: 0.5, sm: 1, md: 1.5},
                transition: (theme) => theme.transitions.create(['padding', 'transform'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.complex,
                }),
            }}
        >
            <Box sx={{mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap'}}>
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontSize: { xs: '1.5rem', sm: '2rem' },
                            mb: 0.5
                        }}
                    >
                        {t('analytics')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: mode === 'dark' ? '#FFFFFFB3' : '#0600AB99' }}>
                        {t('analytics.subtitle', 'Анализ ваших финансов и трендов')}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ToggleButtonGroup
                        value={period}
                        exclusive
                        onChange={(_, value) => value && setPeriod(value)}
                        sx={{
                            bgcolor: mode === 'dark' ? '#FFFFFF0D' : '#FFFFFF',
                            borderRadius: 3,
                            p: 0.5,
                            border: mode === 'dark' ? '1px solid #FFFFFF1F' : '1px solid #E5E7EB',
                        }}
                    >
                        <ToggleButton value="week" sx={{ borderRadius: 2, px: 2.5, py: 1, textTransform: 'none' }}>{t('week')}</ToggleButton>
                        <ToggleButton value="month" sx={{ borderRadius: 2, px: 2.5, py: 1, textTransform: 'none' }}>{t('month')}</ToggleButton>
                        <ToggleButton value="year" sx={{ borderRadius: 2, px: 2.5, py: 1, textTransform: 'none' }}>{t('year')}</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {filteredTransactions.length === 0 && transactions.length > 0 && (
                <Box sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: mode === 'dark' ? '#6C6FF91A' : '#EFF0F61A',
                    border: mode === 'dark' ? '1px solid #6C6FF94D' : '1px solid #EFF0F64D'
                }}>
                    <Typography variant="body2" sx={{
                        color: mode === 'dark' ? '#FFFFFFCC' : '#272B3EB3',
                        textAlign: 'center'
                    }}>
                        {t('noDataForPeriod', 'Нет данных для выбранного периода. Показаны все доступные транзакции.')}
                    </Typography>
                </Box>
            )}

            

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)'},
                    gap: {xs: 1.5, sm: 2, md: 3},
                    mb: 4
                }}
            >
                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: cardBackgrounds[0],
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px #6C6FF926'
                            : '0 8px 24px #6C6FF933',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 30px #6C6FF940'
                                : '0 12px 30px #6C6FF94D',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{
                            color: mode === 'dark' ? '#FFFFFFE6' : '#272B3ECC',
                            mb: 1
                        }}>
                            {t('income')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold"
                                    sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                            {formatCurrency(stats.income, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: cardBackgrounds[1],
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px #6C6FF926'
                            : '0 8px 24px #6C6FF933',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 30px #6C6FF940'
                                : '0 12px 30px #6C6FF94D',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{
                            color: mode === 'dark' ? '#FFFFFFE6' : '#272B3ECC',
                            mb: 1
                        }}>
                            {t('expense')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold"
                                    sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                            {formatCurrency(stats.expenses, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: cardBackgrounds[2],
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px #6C6FF926'
                            : '0 8px 24px #6C6FF933',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 30px #6C6FF940'
                                : '0 12px 30px #6C6FF94D',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{
                            color: mode === 'dark' ? '#FFFFFFE6' : '#272B3ECC',
                            mb: 1
                        }}>
                            {t('balance')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold"
                                    sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                            {formatCurrency(stats.balance, currency)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        background: cardBackgrounds[3],
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px #6C6FF926'
                            : '0 8px 24px #6C6FF933',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 30px #6C6FF940'
                                : '0 12px 30px #6C6FF94D',
                        }
                    }}
                >
                    <CardContent sx={{p: 3}}>
                        <Typography variant="body2" sx={{
                            color: mode === 'dark' ? '#FFFFFFE6' : '#272B3ECC',
                            mb: 1
                        }}>
                            {t('savingsRate')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold"
                                    sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                            {stats.savingsRate.toFixed(1)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'},
                gap: {xs: 1.5, sm: 2, md: 3},
                alignItems: 'stretch'
            }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: {xs: 2, sm: 3},
                        borderRadius: 3,
                        background: getPaperBackground(),
                        border: mode === 'dark'
                            ? '1px solid #6C6FF94D'
                            : '1px solid #EFF0F64D',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 8px 25px #6C6FF933'
                                : '0 8px 25px #6C6FF926',
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{
                        mb: 2,
                        textAlign: 'left',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                    }}>
                        {t('expenseDistribution')}
                    </Typography>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <ExpensesPieChart
                            transactions={filteredTransactions}
                            noDataMessage={t('noTransactionData')}
                            noDataTextColor={mode === 'dark' ? '#FFFFFF' : '#272B3E'}
                            noDataTextAlign="center"
                        />
                    </Box>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        p: {xs: 2, sm: 3},
                        borderRadius: 3,
                        background: getPaperBackground(),
                        border: mode === 'dark'
                            ? '1px solid #6C6FF94D'
                            : '1px solid #EFF0F64D',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 8px 25px #6C6FF933'
                                : '0 8px 25px #6C6FF926',
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{
                        mb: 2,
                        textAlign: 'left',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                    }}>
                        {t('incomeVsExpenses')}
                    </Typography>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <IncomeExpenseTrendChart
                            transactions={filteredTransactions}
                            period={period}
                            noDataMessage={t('noTransactionData')}
                        />
                    </Box>
                </Paper>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    mt: 3,
                    borderRadius: 3,
                    background: getTopExpensesBackground(),
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    position: 'relative',
                    overflow: 'hidden',
                    border: mode === 'dark'
                        ? '1px solid #6C6FF94D'
                        : '1px solid #EFF0F64D',
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{
                        mb: 3,
                        textAlign: 'left',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                    }}>
                        🏆 {t('topExpenses')}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        {filteredTransactions
                            .filter(t => t.type === 'expense')
                            .sort((a, b) => b.amount - a.amount)
                            .slice(0, 5)
                            .map((transaction, index) => (
                                <Box
                                    key={transaction.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: {xs: 1.5, sm: 2},
                                        bgcolor: mode === 'dark'
                                            ? '#E8F4FD1A'
                                            : '#FFFFFF99',
                                        borderRadius: 2,
                                        border: mode === 'dark'
                                            ? '1px solid #6C6FF966'
                                            : '1px solid #EFF0F666',
                                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        '&:hover': {
                                            bgcolor: mode === 'dark'
                                                ? '#E8F4FD26'
                                                : '#FFFFFFCC',
                                            transform: 'translateY(-2px)',
                                            boxShadow: mode === 'dark'
                                                ? '0 8px 25px #6C6FF94D'
                                                : '0 8px 25px #EFF0F64D',
                                        }
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: {xs: 1, sm: 1.5}}}>
                                        <Box
                                            sx={{
                                                width: {xs: 32, sm: 36},
                                                height: {xs: 32, sm: 36},
                                                borderRadius: '50%',
                                                bgcolor: mode === 'dark'
                                                    ? (index === 0 ? '#6C6FF980' : index === 1 ? '#6C6FF966' : index === 2 ? '#6C6FF94D' : index === 3 ? '#6C6FF933' : '#6C6FF91A')
                                                    : (index === 0 ? '#6C6FF94D' : index === 1 ? '#6C6FF940' : index === 2 ? '#6C6FF933' : index === 3 ? '#6C6FF926' : '#6C6FF91A'),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: {xs: '0.9rem', sm: '1rem'},
                                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                                border: mode === 'dark'
                                                    ? '2px solid #6C6FF94D'
                                                    : '2px solid #6C6FF933',
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold"
                                                        sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                                                {getCategoryName(transaction.category, t)}
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                color: mode === 'dark' ? '#FFFFFFCC' : '#272B3EB3',
                                                fontSize: '0.7rem'
                                            }}>
                                                {formatDate(transaction.date)}
                                            </Typography>
                                            {transaction.description && (
                                                <Typography variant="caption" sx={{
                                                    color: mode === 'dark' ? '#FFFFFFCC' : '#272B3EB3',
                                                    display: 'block',
                                                    fontSize: '0.7rem'
                                                }}>
                                                    {transaction.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    <AmountDisplay
                                        amount={transaction.amount}
                                        currency={currency}
                                        type="expense"
                                        size="medium"
                                        sx={{fontSize: {xs: '0.95rem', sm: '1.1rem'}}}
                                    />
                                </Box>
                            ))}
                        {filteredTransactions.filter(t => t.type === 'expense').length === 0 && (
                            <Box sx={{textAlign: 'center', py: 4}}>
                                <Typography sx={{
                                    color: mode === 'dark' ? '#FFFFFFCC' : '#272B3EB3',
                                    fontSize: '1.1rem'
                                }}>
                                    {t('noTransactionData')}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Analytics;