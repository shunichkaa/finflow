import {useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from "react-i18next";
import {useFinanceStore} from '../../Budgets/store/useFinanceStore.ts';
import {TransactionType} from '../../Budgets/types';
import {StatsCards} from '../../components/features/StatsCards.tsx';
import {TransactionList} from '../../components/features/transaction/TransactionList.tsx';
import {TransactionFilters} from '../../components/features/transaction/TransactionFilters.tsx';
import {TransactionForm} from '../../components/features/transaction/TransactionForm.tsx';
import {Modal} from '../../components/ui/Modal.tsx';
import {GlassCard} from '../../components/ui/GlassCard.tsx';
import {useTransactionFilters} from '../../Budgets/hooks/useTransactionFilters.ts';
import {useThemeMode} from '../../Budgets/theme/ThemeContext';

const Dashboard = () => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const transactions = useFinanceStore((state) => state.transactions);

    const {
        filters,
        setType,
        setCategory,
        setDateFrom,
        setDateTo,
        reset,
        filteredTransactions,
    } = useTransactionFilters(transactions);

    // Функция для получения фона карточек как в аналитике
    const getCardBackground = () => {
        return mode === 'dark'
            ? 'linear-gradient(135deg, rgba(108, 111, 249, 0.2) 0%, rgba(108, 111, 249, 0.35) 100%)'
            : 'linear-gradient(135deg, rgba(239, 240, 246, 0.8) 0%, rgba(239, 240, 246, 0.9) 100%)';
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
            {/* Header with add button */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                flexDirection: {xs: 'column', sm: 'row'},
                gap: {xs: 2, sm: 0}
            }}>
                {/* Title */}
                <Box sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        fontWeight="700"
                        sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            mb: 1
                        }}
                    >
                        {t('dashboard')}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.6)',
                        }}
                    >
                        Управляйте своими финансами
                    </Typography>
                </Box>

                {/* Add Transaction Button */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                        background: mode === 'dark'
                            ? 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)'
                            : 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px rgba(108, 111, 249, 0.4)'
                            : '0 8px 24px rgba(168, 163, 246, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 32px rgba(108, 111, 249, 0.5)'
                                : '0 12px 32px rgba(168, 163, 246, 0.5)',
                        }
                    }}
                >
                    {t('addTransaction')}
                </Button>
            </Box>

            <Container maxWidth="xl" sx={{px: {xs: 0, sm: 0.5}, pb: 1}}>
                {/* Stats Cards */}
                <StatsCards onFilterClick={handleStatsCardClick}/>

                {/* Filters */}
                <TransactionFilters
                    type={filters.type}
                    category={filters.category}
                    dateFrom={filters.dateFrom}
                    dateTo={filters.dateTo}
                    onTypeChange={setType}
                    onCategoryChange={setCategory}
                    onDateFromChange={setDateFrom}
                    onDateToChange={setDateTo}
                    onReset={reset}
                />

                {/* Transaction List */}
                <GlassCard
                    sx={{
                        p: {xs: 2, sm: 3},
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        background: getCardBackground(),
                        border: mode === 'dark'
                            ? '1px solid rgba(108, 111, 249, 0.3)'
                            : '1px solid rgba(239, 240, 246, 0.3)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px rgba(108, 111, 249, 0.15)'
                            : '0 8px 24px rgba(108, 111, 249, 0.2)',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark'
                                ? '0 12px 30px rgba(108, 111, 249, 0.25)'
                                : '0 12px 30px rgba(108, 111, 249, 0.3)',
                        }
                    }}
                    id="transactions-list"
                    intensity="medium"
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}>
                        <Typography variant="h6" sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontWeight: 600,
                            letterSpacing: '-0.01em'
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
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                background: '#6C6FF9',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(108, 111, 249, 0.3)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: '#6C6FF9',
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 12px rgba(108, 111, 249, 0.4)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                }
                            }}
                        >
                            <AddIcon sx={{fontSize: 20}}/>
                        </Box>
                    </Box>
                    <TransactionList transactions={filteredTransactions}/>
                </GlassCard>
            </Container>

            {/* Add Transaction Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t('newTransaction')}
            >
                <TransactionForm onSuccess={() => setIsModalOpen(false)}/>
            </Modal>
        </Container>
    );
};

export default Dashboard;