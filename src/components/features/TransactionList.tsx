import React from 'react';
import { Box, Chip, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { getCategoryById } from '../../Budgets/utils/categories.tsx';
import { getCategoryIcon } from '../../Budgets/utils/categories.tsx';
import { formatCurrency, formatDate } from '../../Budgets/utils/formatters';
import { Transaction } from '../../Budgets/types';

interface TransactionListProps {
    transactions?: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions: propTransactions }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const storeTransactions = useFinanceStore((state) => state.transactions);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
    const { currency } = useSettingsStore();

    const transactions = propTransactions || storeTransactions;

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (transactions.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    📝 {t('noTransactions')}
                </Typography>
                <Typography variant="body2" color="text.disabled">
                    {t('addFirst')}
                </Typography>
            </Box>
        );
    }

    const handleDelete = (id: string) => {
        if (window.confirm(t('confirmDelete'))) {
            deleteTransaction(id);
        }
    };

    return (
        <List sx={{ p: 0 }}>
            {sortedTransactions.map((transaction, index) => {
                const category = getCategoryById(transaction.category);

                const categoryName = category?.name ? t(category.name) : t('uncategorized');

                return (
                    <React.Fragment key={transaction.id}>
                        {index > 0 && <Divider />}
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor:
                                        theme.palette.mode === 'dark'
                                            ? category?.color + '40'
                                            : category?.color,
                                    color:
                                        theme.palette.mode === 'dark'
                                            ? category?.color
                                            : '#4a5568',
                                    flexShrink: 0,
                                }}
                            >
                                {category?.icon ? getCategoryIcon(category.icon, 24) : (
                                    <MoreHorizIcon sx={{ fontSize: 24 }} />
                                )}
                            </Box>

                            {/* Информация о транзакции */}
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography variant="body1" fontWeight={600} noWrap>
                                        {categoryName}
                                    </Typography>
                                    <Chip
                                        label={t(transaction.type)}
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

                            {/* Сумма и кнопка удаления */}
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
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {transaction.type === 'income' ? '+' : '-'}
                                    {formatCurrency(transaction.amount, currency)}
                                </Typography>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </ListItem>
                    </React.Fragment>
                );
            })}
        </List>
    );
};