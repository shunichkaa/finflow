import React from 'react';

import { Box, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useFinanceStore } from '../../../Budgets/store/useFinanceStore.ts';
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore.ts';
import { getCategoryById, getCategoryIcon, getCategoryName } from '../../../Budgets/utils/categories.tsx';
import { formatCurrency, formatDate } from '../../../Budgets/utils/formatters.ts';
import { Transaction } from '../../../Budgets/types';
import { Modal } from '../../ui/Modal.tsx';
import { TransactionForm } from './TransactionForm.tsx';

interface TransactionListProps {
    transactions?: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions: propTransactions }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { mode } = useThemeMode();
    const storeTransactions = useFinanceStore((state) => state.transactions);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
    const { currency } = useSettingsStore();
    const [editingTxId, setEditingTxId] = React.useState<string | null>(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isAddOpen, setIsAddOpen] = React.useState(false);

    const transactions = propTransactions || storeTransactions;

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (transactions.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)', mb: 2 }}>
                     {t('noTransactions')}
                </Typography>
                <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.5)' : 'rgba(101, 70, 51, 0.5)' }}>
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

                const categoryName = getCategoryName(transaction.category, t);

                return (
                    <React.Fragment key={transaction.id}>
                        {index > 0 && <Divider />}
                        <ListItem
                            sx={{
                                display: 'flex',
                                py: 2,
                                px: { xs: 1, sm: 2 },
                                gap: { xs: 1, sm: 2 },
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'stretch', sm: 'center' },
                            }}
                        >
                            {/* Мобильная версия - вертикальная компоновка */}
                            <Box sx={{ 
                                display: { xs: 'flex', sm: 'none' }, 
                                width: '100%', 
                                flexDirection: 'column', 
                                gap: 1 
                            }}>
                                {/* Верхняя строка: иконка, название, сумма */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box
                                        onClick={() => { setEditingTxId(transaction.id); setIsEditOpen(true); }}
                                        role="button"
                                        aria-label={t('edit')}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 40,
                                            height: 40,
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
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {category?.icon ? getCategoryIcon(category.icon, 20) : (
                                            <MoreHorizIcon sx={{ fontSize: 20 }} />
                                        )}
                                    </Box>
                                    
                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                        <Typography variant="body1" fontWeight={600} noWrap>
                                            {categoryName}
                                        </Typography>
                                    </Box>
                                    
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{ 
                                            whiteSpace: 'nowrap',
                                            color: transaction.type === 'income' 
                                                ? (mode === 'dark' ? '#FCF9F9' : '#654633')
                                                : (mode === 'dark' ? '#FCF9F9' : '#654633')
                                        }}
                                    >
                                        {transaction.type === 'income' ? '+' : '-'}
                                        {formatCurrency(transaction.amount, currency)}
                                    </Typography>
                                </Box>
                                
                                {/* Нижняя строка: тип, дата, кнопки */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)',
                                                fontSize: '0.7rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            {t(transaction.type)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.5)' : 'rgba(101, 70, 51, 0.5)' }}>
                                            {formatDate(transaction.date)}
                                        </Typography>
                                    </Box>
                                    
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(transaction.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                
                                {/* Описание (если есть) */}
                                {transaction.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {transaction.description}
                                    </Typography>
                                )}
                            </Box>

                            {/* Десктопная версия - горизонтальная компоновка */}
                            <Box sx={{ 
                                display: { xs: 'none', sm: 'flex' }, 
                                width: '100%', 
                                alignItems: 'center', 
                                gap: 2 
                            }}>
                                {/* Иконка категории */}
                                <Box
                                    onClick={() => { setEditingTxId(transaction.id); setIsEditOpen(true); }}
                                    role="button"
                                    aria-label={t('edit')}
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
                                        cursor: 'pointer'
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
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 49, 104, 0.6)',
                                                fontSize: '0.7rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            {t(transaction.type)}
                                        </Typography>
                                    </Box>
                                    {transaction.description && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: mode === 'dark' ? 'rgba(252, 249, 249, 0.7)' : 'rgba(101, 70, 51, 0.7)'
                                            }}
                                        >
                                            {transaction.description}
                                        </Typography>
                                    )}
                                    <Typography variant="caption" sx={{ color: mode === 'dark' ? 'rgba(252, 249, 249, 0.5)' : 'rgba(101, 70, 51, 0.5)' }}>
                                        {formatDate(transaction.date)}
                                    </Typography>
                                </Box>

                                {/* Сумма и кнопки */}
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
                                        sx={{ 
                                            whiteSpace: 'nowrap',
                                            color: transaction.type === 'income' 
                                                ? (mode === 'dark' ? '#FCF9F9' : '#654633')
                                                : (mode === 'dark' ? '#FCF9F9' : '#654633')
                                        }}
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
                            </Box>
                        </ListItem>
                    </React.Fragment>
                );
            })}
            {/* Edit transaction modal */}
            <Modal
                open={isEditOpen}
                onClose={() => { setIsEditOpen(false); setEditingTxId(null); }}
                title={t('save')}
            >
                {editingTxId && (
                    <TransactionForm
                        initialTransaction={sortedTransactions.find(tx => tx.id === editingTxId)}
                        onSuccess={() => { setIsEditOpen(false); setEditingTxId(null); }}
                    />
                )}
            </Modal>
            
            {/* Add transaction modal */}
            <Modal
                open={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                title={t('newTransaction')}
            >
                <TransactionForm
                    onSuccess={() => setIsAddOpen(false)}
                />
            </Modal>
        </List>
    );
};