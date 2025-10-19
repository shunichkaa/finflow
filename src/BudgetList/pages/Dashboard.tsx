import { useState } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import { useFinanceStore } from '../../Budgets/store/useFinanceStore.ts';
import { TransactionType } from '../../Budgets/types';
import { StatsCards } from '../../components/features/StatsCards.tsx';
import { TransactionList } from '../../components/features/transaction/TransactionList.tsx';
import { TransactionFilters } from '../../components/features/transaction/TransactionFilters.tsx';
import { TransactionForm } from '../../components/features/transaction/TransactionForm.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useTransactionFilters } from '../../Budgets/hooks/useTransactionFilters.ts';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

const Dashboard = () => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();
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

    const handleStatsCardClick = (type: TransactionType | 'all') => {
        setType(type);
        document.getElementById('transactions-list')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header with add button */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 4,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 }
            }}>
                {/* Title */}
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                        color: mode === 'dark' ? '#FCF9F9' : '#654633'
                    }}>
                        {t('dashboard')}
                    </Typography>
                </Box>
                
                {/* Add Button */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{
                        backgroundColor: mode === 'dark' 
                            ? 'rgba(100, 200, 150, 0.8)'
                            : 'rgba(254, 222, 233, 0.8)',
                        color: mode === 'dark' ? '#1A3A2A' : '#654633',
                        fontWeight: '600',
                        fontSize: '16px',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: mode === 'dark' 
                            ? '0 8px 25px rgba(100, 200, 150, 0.3)'
                            : '0 8px 25px rgba(254, 222, 233, 0.4)',
                        border: 'none',
                        minWidth: { xs: '100%', sm: 200 },
                        '&:hover': {
                            backgroundColor: mode === 'dark' 
                                ? 'rgba(100, 200, 150, 0.9)'
                                : 'rgba(254, 222, 233, 0.9)',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 12px 35px rgba(100, 200, 150, 0.4)'
                                : '0 12px 35px rgba(254, 222, 233, 0.5)',
                        },
                        '&:active': {
                            transform: 'translateY(-1px)',
                        },
                        '& .MuiButton-startIcon': {
                            marginRight: 1,
                            '& svg': {
                                fontSize: '20px'
                            }
                        }
                    }}
                >
                    {t('addTransaction')}
                </Button>
            </Box>


            <Container maxWidth="lg" sx={{ px: {xs: 1, sm: 2}, pb: 4 }}>
                {/* Stats Cards */}
                <StatsCards onFilterClick={handleStatsCardClick} />

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
                <Paper sx={{ 
                    p: 2, 
                    backgroundColor: mode === 'dark' ? 'rgba(101, 70, 51, 0.8)' : 'rgba(234, 234, 244, 0.8)',
                    color: mode === 'dark' ? '#FCF9F9' : '#654633'
                }} id="transactions-list">
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        px: 1
                    }}>
                        <Typography variant="h6" sx={{ 
                            color: mode === 'dark' ? '#FCF9F9' : '#654633',
                            fontWeight: 'bold'
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
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: mode === 'dark' 
                                    ? 'rgba(100, 200, 150, 0.8)'
                                    : 'rgba(254, 222, 233, 0.8)',
                                color: mode === 'dark' ? '#1A3A2A' : '#654633',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(100, 200, 150, 0.9)'
                                        : 'rgba(254, 222, 233, 0.9)',
                                    transform: 'scale(1.1)',
                                }
                            }}
                        >
                            <AddIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => setIsModalOpen(true)}
                            sx={{
                                borderColor: mode === 'dark' 
                                    ? 'rgba(100, 200, 150, 0.5)' 
                                    : 'rgba(254, 222, 233, 0.5)',
                                color: mode === 'dark' 
                                    ? 'rgba(100, 200, 150, 0.8)' 
                                    : 'rgba(254, 222, 233, 0.8)',
                                fontWeight: '500',
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 2,
                                py: 0.5,
                                '&:hover': {
                                    borderColor: mode === 'dark' 
                                        ? 'rgba(100, 200, 150, 0.8)' 
                                        : 'rgba(254, 222, 233, 0.8)',
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(100, 200, 150, 0.1)' 
                                        : 'rgba(254, 222, 233, 0.1)',
                                    transform: 'translateY(-1px)',
                                },
                                '& .MuiButton-startIcon': {
                                    marginRight: 0.5,
                                    '& svg': {
                                        fontSize: '16px'
                                    }
                                }
                            }}
                        >
                            {t('addTransaction')}
                        </Button>
                    </Box>
                    <TransactionList transactions={filteredTransactions} />
                </Paper>
            </Container>

            {/* Add Transaction Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t('newTransaction')}
            >
                <TransactionForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </Container>
    );
};

export default Dashboard;