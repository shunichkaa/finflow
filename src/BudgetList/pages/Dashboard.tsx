import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import { useFinanceStore } from '../../Budgets/store/useFinanceStore.ts';
import { TransactionType } from '../../Budgets/types';
import { StatsCards } from '../../components/features/StatsCards.tsx';
import { TransactionList } from '../../components/features/transaction/TransactionList.tsx';
import { TransactionFilters } from '../../components/features/transaction/TransactionFilters.tsx';
import { TransactionForm } from '../../components/features/transaction/TransactionForm.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { GlassButton } from '../../components/ui/GlassButton.tsx';
import { GlassCard } from '../../components/ui/GlassCard.tsx';
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
        <Container 
            maxWidth="xl" 
            sx={{ 
                py: 1, 
                px: { xs: 0.5, sm: 1, md: 1.5 },
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
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 }
            }}>
                {/* Title */}
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="h4" gutterBottom sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                        fontWeight: 700,
                        letterSpacing: '-0.02em'
                    }}>
                        {t('dashboard')}
                    </Typography>
                </Box>
                
                {/* Add Transaction Button - Gradient Style */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{
                        background: 'linear-gradient(135deg, #977DFF 0%, #0033FF 100%)',
                        color: '#FFFFFF',
                        fontWeight: '500',
                        fontSize: '16px',
                        px: 4,
                        py: 1.5,
                        borderRadius: 4,
                        minWidth: { xs: '100%', sm: 200 },
                        boxShadow: '0 4px 12px rgba(151, 125, 255, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #7B5EE6 0%, #0028CC 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(151, 125, 255, 0.4)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
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


            <Container maxWidth="xl" sx={{ px: {xs: 0, sm: 0.5}, pb: 1 }}>
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

                {/* Transaction List - iOS Card */}
                <GlassCard 
                    sx={{ 
                        p: { xs: 2, sm: 3 }, 
                        color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                        '&:hover': {
                            transform: 'translateY(-2px)',
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
                            color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
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
                                background: 'linear-gradient(135deg, #977DFF 0%, #0033FF 100%)',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(151, 125, 255, 0.3)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #7B5EE6 0%, #0028CC 100%)',
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 6px 16px rgba(151, 125, 255, 0.4)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                }
                            }}
                        >
                            <AddIcon sx={{ fontSize: 20 }} />
                        </Box>
                    </Box>
                    <TransactionList transactions={filteredTransactions} />
                </GlassCard>
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