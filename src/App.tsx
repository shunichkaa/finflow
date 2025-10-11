import { useEffect } from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useFinanceStore } from './Budgets/store/useFinanceStore';
import { useThemeMode } from './Budgets/theme/ThemeProvider';
import { formatCurrency, formatDate } from './Budgets/utils/formatters';

function App() {
    const transactions = useFinanceStore((state) => state.transactions);
    const addTransaction = useFinanceStore((state) => state.addTransaction);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
    const clearAllData = useFinanceStore((state) => state.clearAllData);

    const { mode, toggleTheme } = useThemeMode();

    useEffect(() => {
        console.log('Theme mode changed:', mode);
    }, [mode]);

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
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center', position: 'relative' }}>
                <IconButton onClick={toggleTheme} sx={{ position: 'absolute', right: 0, top: 0 }} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                    💰 FinFlow
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Тест Store + MUI
                </Typography>
            </Box>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Транзакций: {transactions.length}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddTest} fullWidth>
                        Добавить тестовую
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={clearAllData} fullWidth>
                        Очистить всё
                    </Button>
                </Stack>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Список транзакций
                </Typography>

                {transactions.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Транзакций пока нет</Typography>
                    </Box>
                ) : (
                    <List>
                        {transactions.map((t, i) => (
                            <Box key={t.id}>
                                {i > 0 && <Divider />}
                                <ListItem sx={{ display: 'flex', alignItems: 'center', py: 2, gap: 2 }}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                                <Typography variant="body1">{t.description}</Typography>
                                                <Chip
                                                    label={t.type === 'income' ? 'Доход' : 'Расход'}
                                                    color={t.type === 'income' ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </Box>
                                        }
                                        secondary={formatDate(t.date)}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: t.type === 'income' ? 'success.main' : 'error.main',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t.type === 'income' ? '+' : '-'}
                                        {formatCurrency(t.amount)}
                                    </Typography>
                                    <IconButton onClick={() => deleteTransaction(t.id)} color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
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