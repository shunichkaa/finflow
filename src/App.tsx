import {useEffect} from 'react';
import {Box, Button, Chip, Container, Divider, List, ListItem, ListItemText, Paper, Typography,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFinanceStore} from './store/useFinanceStore';
import {formatCurrency, formatDate} from './utils/formatters';
import type {Transaction} from './types';
import type {FinanceStore} from "./Budgets/store/useFinanceStore.ts";

function App() {
    const transactions = useFinanceStore((state: FinanceStore) => state.transactions);
    const addTransaction = useFinanceStore((state: FinanceStore) => state.addTransaction);
    const deleteTransaction = useFinanceStore((state: FinanceStore) => state.deleteTransaction);
    const clearAllData = useFinanceStore((state: FinanceStore) => state.clearAllData);

    useEffect(() => {
        console.log('Current transactions:', transactions);
    }, [transactions]);

    const handleAddTest = () => {
        addTransaction({
            amount: Math.random() * 100,
            type: Math.random() > 0.5 ? 'income' : 'expense',
            category: '1',
            description: `Тестовая транзакция #${transactions.length + 1}`,
            date: new Date(),
        });
    };

    return (
        <Container maxWidth="md" sx={{py: 4}}>
            {/* Header */}
            <Box sx={{mb: 4, textAlign: 'center'}}>
                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                    💰 FinFlow
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Тест Store + MUI
                </Typography>
            </Box>

            {/* Actions */}
            <Paper sx={{p: 3, mb: 3}}>
                <Typography variant="h6" gutterBottom>
                    Транзакций: {transactions.length}
                </Typography>

                <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={handleAddTest}
                        fullWidth
                    >
                        Добавить тестовую
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon/>}
                        onClick={clearAllData}
                        fullWidth
                    >
                        Очистить всё
                    </Button>
                </Box>
            </Paper>

            {/* Transaction List */}
            <Paper sx={{p: 2}}>
                <Typography variant="h6" gutterBottom>
                    Список транзакций
                </Typography>

                {transactions.length === 0 ? (
                    <Box sx={{textAlign: 'center', py: 4}}>
                        <Typography color="text.secondary">
                            Транзакций пока нет
                        </Typography>
                    </Box>
                ) : (
                    <List>
                        {transactions.map((transaction: Transaction, index: number) => (
                            <Box key={transaction.id}>
                                {index > 0 && <Divider/>}
                                <ListItem
                                    secondaryAction={
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => deleteTransaction(transaction.id)}
                                        >
                                            Удалить
                                        </Button>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <span>{transaction.description}</span>
                                                <Chip
                                                    label={transaction.type === 'income' ? 'Доход' : 'Расход'}
                                                    color={transaction.type === 'income' ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </Box>
                                        }
                                        secondary={formatDate(transaction.date)}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: transaction.type === 'income' ? 'success.main' : 'error.main',
                                            fontWeight: 'bold',
                                            mr: 2,
                                        }}
                                    >
                                        {transaction.type === 'income' ? '+' : '-'}
                                        {formatCurrency(transaction.amount)}
                                    </Typography>
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
}

export default App;