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
    console.log('Dashboard component loaded - version 2.0');
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
                    <Typography variant="h4" gutterBottom fontWeight="bold" sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#243168'
                    }}>
                        {t('dashboard')}
                    </Typography>
                </Box>
                
                {/* Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: { xs: '100%', sm: 'auto' }
                }}>
                    <GlassButton
                        variant="outlined"
                        startIcon={<DataUsageIcon />}
                        onClick={() => addTestData()}
                        size="large"
                        intensity="medium"
                        glowColor={mode === 'dark' 
                            ? 'rgba(139, 92, 246, 0.3)' 
                            : 'rgba(139, 92, 246, 0.2)'}
                        sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#243168',
                            fontWeight: '600',
                            fontSize: '14px',
                            px: 3,
                            py: 1.5,
                            minWidth: { xs: '100%', sm: 160 },
                            '& .MuiButton-startIcon': {
                                marginRight: 1,
                                '& svg': {
                                    fontSize: '18px'
                                }
                            }
                        }}
                    >
                        Тестовые данные
                    </GlassButton>
                    <GlassButton
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                        size="large"
                        intensity="high"
                        glowColor={mode === 'dark' 
                            ? 'rgba(99, 102, 241, 0.5)' 
                            : 'rgba(168, 163, 246, 0.5)'}
                        sx={{
                            color: mode === 'dark' ? '#FFFFFF' : '#243168',
                            fontWeight: '600',
                            fontSize: '16px',
                            px: 4,
                            py: 1.5,
                            minWidth: { xs: '100%', sm: 200 },
                            '& .MuiButton-startIcon': {
                                marginRight: 1,
                                '& svg': {
                                    fontSize: '20px'
                                }
                            }
                        }}
                    >
                        {t('addTransaction')}
                    </GlassButton>
                </Box>
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

                {/* Transaction List */}
                <GlassCard 
                    sx={{ 
                        p: { xs: 1.5, sm: 2 }, 
                        color: mode === 'dark' ? '#FFFFFF' : '#243168'
                    }} 
                    id="transactions-list"
                    intensity="medium"
                    glowColor={mode === 'dark' 
                        ? 'rgba(102, 51, 255, 0.3)' 
                        : 'rgba(168, 163, 246, 0.3)'}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        px: 1
                    }}>
                        <Typography variant="h6" sx={{ 
                            color: mode === 'dark' ? '#FFFFFF' : '#243168',
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