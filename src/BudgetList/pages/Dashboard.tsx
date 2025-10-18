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
                            background: 'linear-gradient(135deg, #B8D4F0 0%, #7BA7D1 100%)',
                            color: '#2C3E50',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #A8C4E0 0%, #6B97C1 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(123, 167, 209, 0.4)',
                            }
                        }}
                    >
                        {t('addTransaction')}
                    </Button>
                    <ExportData />
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ px: 2, pb: 4 }}>
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
                    backgroundColor: mode === 'dark' ? '#1A2332' : '#ffffff',
                    color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'
                }} id="transactions-list">
                    <Typography variant="h6" gutterBottom sx={{ 
                        px: 1,
                        color: mode === 'dark' ? '#E8F4FD' : '#2C3E50'
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