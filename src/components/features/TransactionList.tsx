import React from 'react';
import {Box, Chip, Divider, IconButton, List, ListItem, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFinanceStore} from "../../Budgets/store/useFinanceStore";
import {getCategoryById} from "../../Budgets/utils/categories";
import {formatCurrency, formatDate} from "../../Budgets/utils/formatters";

export const TransactionList: React.FC = () => {
    const transactions = useFinanceStore((state) => state.transactions);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (transactions.length === 0) {
        return (
            <Box sx={{textAlign: 'center', py: 8}}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    📝 Транзакций пока нет
                </Typography>
                <Typography variant="body2" color="text.disabled">
                    Добавьте первую транзакцию
                </Typography>
            </Box>
        );
    }

    const handleDelete = (id: string) => {
        if (window.confirm('Удалить транзакцию?')) {
            deleteTransaction(id);
        }
    };

    return (
        <List sx={{p: 0}}>
            {sortedTransactions.map((transaction, index) => {
                const category = getCategoryById(transaction.category);

                return (
                    <React.Fragment key={transaction.id}>
                        {index > 0 && <Divider/>}
                        <ListItem
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 2,
                                px: 2,
                                gap: 2,
                            }}
                        >
                            {/* Иконка категории */}
                            <Box
                                sx={{
                                    fontSize: 32,
                                    lineHeight: 1,
                                    flexShrink: 0,
                                }}
                            >
                                {category?.icon}
                            </Box>

                            {/* Информация о транзакции */}
                            <Box sx={{flexGrow: 1, minWidth: 0}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                                    <Typography variant="body1" fontWeight={600} noWrap>
                                        {category?.name}
                                    </Typography>
                                    <Chip
                                        label={transaction.type === 'income' ? 'Доход' : 'Расход'}
                                        color={transaction.type === 'income' ? 'success' : 'error'}
                                        size="small"
                                    />
                                </Box>
                                {transaction.description && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {transaction.description}
                                    </Typography>
                                )}
                                <Typography variant="caption" color="text.disabled">
                                    {formatDate(transaction.date)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    flexShrink: 0,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                                    sx={{whiteSpace: 'nowrap'}}
                                >
                                    {transaction.type === 'income' ? '+' : '-'}
                                    {formatCurrency(transaction.amount)}
                                </Typography>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                        </ListItem>
                    </React.Fragment>
                );
            })}
        </List>
    );
};