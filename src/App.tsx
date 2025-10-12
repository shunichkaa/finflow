import { useState } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TransactionForm } from './components/features/TransactionForm';
import { TransactionList } from './components/features/TransactionList';
import { TransactionFilters } from './components/features/TransactionFilters';
import { StatsCards } from './components/features/StatsCards';
import { Modal } from './components/ui/Modal';
import {useFinanceStore} from "./Budgets/store/useFinanceStore.ts";
import { useTransactionFilters } from './Budgets/hooks/useTransactionFilters.ts';

function App() {
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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                    💰 FinFlow
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Умное управление финансами
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{ mt: 2 }}
                >
                    Добавить транзакцию
                </Button>
            </Box>

            <StatsCards />

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

            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ px: 1 }}>
                    Транзакции ({filteredTransactions.length})
                </Typography>
                <TransactionList />
            </Paper>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Новая транзакция"
            >
                <TransactionForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </Container>
    );
}

export default App;