import {useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from "react-i18next";
import {useFinanceStore} from '../Budgets/store/useFinanceStore.ts';
import {TransactionType} from '../Budgets/types';
import {StatsCards} from '../components/features/StatsCards.tsx';
import {TransactionList} from '../components/features/transaction/TransactionList.tsx';
import {TransactionFilters} from '../components/features/transaction/TransactionFilters.tsx';
import {GlassCard} from '../components/ui/GlassCard.tsx';
import {useTransactionFilters} from '../Budgets/hooks/useTransactionFilters.ts';
import {useThemeMode} from '../Budgets/theme/ThemeContext';

const Dashboard = () => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const transactions = useFinanceStore((state) => state.transactions);

    const {
        filters: { type, category, dateFrom, dateTo },
        setType,
        setCategory,
        setDateFrom,
        setDateTo,
        reset,
        filteredTransactions,
    } = useTransactionFilters(transactions);

        const [_isModalOpen, setIsModalOpen] = useState(false);

    const getCardBackground = () => {
        return mode === 'dark'
            ? 'linear-gradient(135deg, #6C6FF933 0%, #6C6FF959 100%)'
            : 'linear-gradient(135deg, #EFF0F6CC 0%, #EFF0F6E6 100%)';
    };

    const handleStatsCardClick = (type: TransactionType | 'all') => {
        setType(type);
        document.getElementById('transactions-list')?.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: 1,
                px: {xs: 0.5, sm: 1, md: 1.5},
                transition: (theme) => theme.transitions.create(['padding', 'transform'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.complex,
                }),
            }}
        >
                <Box sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        fontWeight="700"
                        sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            mb: 1,
                            fontSize: { xs: '1.5rem', sm: '2rem' }
                        }}
                    >
                        {t('dashboard')}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: mode === 'dark' ? '#FFFFFFB3' : '#0600AB99',
                        }}
                    >
                        {t('dashboard.subtitle')}
                    </Typography>
                </Box>

                <StatsCards onFilterClick={handleStatsCardClick}/>

                <TransactionFilters
                    type={type}
                    category={category}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    onTypeChange={setType}
                    onCategoryChange={setCategory}
                    onDateFromChange={setDateFrom}
                    onDateToChange={setDateTo}
                    onReset={reset}
                />

                <GlassCard
                    sx={{
                        p: {xs: 2, sm: 3},
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        background: getCardBackground(),
                        border: mode === 'dark'
                            ? '1px solid #6C6FF94D'
                            : '1px solid #EFF0F64D',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px #6C6FF926'
                            : '0 8px 24px #6C6FF933',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 30px #6C6FF940'
                                : '0 12px 30px #6C6FF94D',
                        }
                    }}
                    id="transactions-list"
                    intensity="medium"
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignSelf: 'stretch'
                    }}>
                        <Typography variant="h6" sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            alignSelf: { xs: 'flex-start', sm: 'auto' }
                        }}>
                            {t('transactions')} ({filteredTransactions.length})
                        </Typography>

                        <Box
                            onClick={() => setIsModalOpen(true)}
                            role="button"
                            aria-label={t('addTransaction')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 44, sm: 36 },
                                height: { xs: 44, sm: 36 },
                                borderRadius: '50%',
                                background: '#6C6FF9',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px #6C6FF94D',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: '#6C6FF9',
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 12px #6C6FF966',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                }
                            }}
                        >
                            <AddIcon sx={{fontSize: { xs: 22, sm: 20 }}}/>
                        </Box>
                    </Box>
                    <TransactionList transactions={filteredTransactions}/>
                </GlassCard>
        </Container>
    );
};

export default Dashboard;

