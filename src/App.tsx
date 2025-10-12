import {useState} from 'react';
import {Box, Button, Container, IconButton, Paper, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useTranslation} from "react-i18next";
import {TransactionForm} from './components/features/TransactionForm';
import {TransactionList} from './components/features/TransactionList';
import {TransactionFilters} from './components/features/TransactionFilters';
import {StatsCards} from './components/features/StatsCards';
import {Modal} from './components/ui/Modal';
import {SettingsMenu} from './components/features/SettingsMenu';
import {useFinanceStore} from './Budgets/store/useFinanceStore.ts';
import {useTransactionFilters} from './Budgets/hooks/useTransactionFilters.ts';
import {useThemeMode} from "./Budgets/theme/ThemeProvider.tsx";

function App() {
    const {t} = useTranslation();
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

    const {mode, toggleTheme} = useThemeMode();

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            {/* Header */}
            <Box sx={{textAlign: 'center', mb: 4, position: 'relative'}}>
                <Box sx={{position: 'absolute', right: 0, top: 0, display: 'flex', gap: 1}}>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                    <SettingsMenu/>
                </Box>

                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                    💰 {t('appName')}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('tagline')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    sx={{mt: 2}}
                >
                    {t('addTransaction')}
                </Button>
            </Box>

            <StatsCards/>

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

            <Paper sx={{p: 2}}>
                <Typography variant="h6" gutterBottom sx={{px: 1}}>
                    {t('transactions')} ({filteredTransactions.length})
                </Typography>
                <TransactionList transactions={filteredTransactions}/>
            </Paper>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t('newTransaction')}
            >
                <TransactionForm onSuccess={() => setIsModalOpen(false)}/>
            </Modal>
        </Container>
    );
}

export default App;