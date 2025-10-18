import React, { useState } from 'react';
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
import { ExportData } from '../../components/features/ExportData.tsx';
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
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>

                {/* Кнопки добавления и экспорта */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                        size="large"
                        sx={{
                        background: mode === 'dark' 
                            ? 'rgba(101, 70, 51, 0.5)'
                            : 'rgba(234, 234, 244, 0.5)',
                            color: mode === 'dark' ? '#FCF9F9' : '#654633',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: mode === 'dark' 
                                    ? 'rgba(101, 70, 51, 0.7)'
                                    : 'rgba(234, 234, 244, 0.7)',
                                transform: 'translateY(-2px)',
                                boxShadow: mode === 'dark' 
                                    ? '0 6px 20px rgba(101, 70, 51, 0.4)'
                                    : '0 6px 20px rgba(234, 234, 244, 0.4)',
                            }
                        }}
                    >
                        {t('addTransaction')}
                    </Button>
                    <ExportData />
                </Box>
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
                    backgroundColor: mode === 'dark' ? 'rgba(101, 70, 51, 0.5)' : 'rgba(234, 234, 244, 0.5)',
                    color: mode === 'dark' ? '#FCF9F9' : '#654633'
                }} id="transactions-list">
                    <Typography variant="h6" gutterBottom sx={{ 
                        px: 1,
                        color: mode === 'dark' ? '#FCF9F9' : '#654633'
                    }}>
                        {t('transactions')} ({filteredTransactions.length})
                    </Typography>
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