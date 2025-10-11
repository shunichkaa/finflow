import {useEffect} from 'react';
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
import {useFinanceStore} from './store/useFinanceStore';
import {formatCurrency, formatDate} from './utils/formatters';
import {useThemeMode} from "./Budgets/theme/ThemeContext.tsx";

;

function App() {
    const transactions = useFinanceStore((state) => state.transactions);
    const addTransaction = useFinanceStore((state) => state.addTransaction);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
    const clearAllData = useFinanceStore((state) => state.clearAllData);

    const {mode, toggleTheme} = useThemeMode();

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
            {/* Header with Theme Toggle */}
            <Box sx={{mb: 4, textAlign: 'center', position: 'relative'}}>
                <IconButton
                    onClick={toggleTheme}
                    sx={{position: 'absolute', right: 0, top: 0}}
                    color="inherit"
                >
                    {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>

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

                <Stack direction="row" spacing={2} sx={{mt: 2}}>
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
                </Stack>
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
                        {transactions.map((transaction, index) => (
                            <Box key={transaction.id}>
                                {index > 0 && <Divider/>}
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        py: 2,
                                        gap: 2,
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap'}}>
                                                <Typography variant="body1" component="span">
                                                    {transaction.description}
                                                </Typography>
                                                <Chip
                                                    label={transaction.type === 'income' ? 'Доход' : 'Расход'}
                                                    color={transaction.type === 'income' ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </Box>
                                        }
                                        secondary={formatDate(transaction.date)}
                                        sx={{flexGrow: 1, minWidth: 0}}
                                    />

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        flexShrink: 0,
                                    }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: transaction.type === 'income' ? 'success.main' : 'error.main',
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {transaction.type === 'income' ? '+' : '-'}
                                            {formatCurrency(transaction.amount)}
                                        </Typography>

                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => deleteTransaction(transaction.id)}
                                            sx={{ml: 1}}
                                        >
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </Box>
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