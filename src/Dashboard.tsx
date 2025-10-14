import { useState } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import { useFinanceStore } from './Budgets/store/useFinanceStore';
import { TransactionType } from './Budgets/types';
import { StatsCards } from './components/features/StatsCards';
import { TransactionList } from './components/features/TransactionList';
import { TransactionFilters } from './components/features/TransactionFilters';
import { TransactionForm } from './components/features/TransactionForm';
import { Modal } from './components/ui/Modal';
import { useTransactionFilters } from './Budgets/hooks/useTransactionFilters';

const Dashboard = () => {
    const { t } = useTranslation();
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
                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                    💰 {t('appName')}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('tagline')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{ mt: 2 }}
                >
                    {t('addTransaction')}
                </Button>
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
            <Paper sx={{ p: 2 }} id="transactions-list">
                <Typography variant="h6" gutterBottom sx={{ px: 1 }}>
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
export default Dashboard