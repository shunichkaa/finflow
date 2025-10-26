import { Fragment, useState } from 'react';
import { Box, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { useFinanceStore } from '../../../Budgets/store/useFinanceStore.ts';
import { useSettingsStore } from '../../../Budgets/store/useSettingsStore.ts';
import { getCategoryById, getCategoryIcon, getCategoryName } from '../../../Budgets/utils/categories.tsx';
import { formatDate } from '../../../Budgets/utils/formatters.ts';
import { Transaction } from '../../../Budgets/types';
import { Modal } from '../../ui/Modal.tsx';
import { TransactionForm } from './TransactionForm.tsx';
import { Text } from '../../ui/Text';
import { CustomIconButton } from '../../ui/CustomIconButton';
import { AmountDisplay } from '../../ui/AmountDisplay';
import { designTokens } from '../../../Budgets/theme/designTokens';

interface TransactionListProps {
    transactions?: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions: propTransactions }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { mode: _mode } = useThemeMode();
    const storeTransactions = useFinanceStore((state) => state.transactions);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
    const { currency } = useSettingsStore();
    const [editingTxId, setEditingTxId] = useState<string | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const transactions = propTransactions || storeTransactions;

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (transactions.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Text variant="h6" color="secondary" sx={{ mb: 2 }}>
                     {t('noTransactions')}
                </Text>
                <Text variant="body2" color="secondary">
                    {t('addFirst')}
                </Text>
            </Box>
        );
    }

    const handleDelete = (id: string) => {
        deleteTransaction(id);
    };

    return (
        <List sx={{ p: 0 }}>
            {sortedTransactions.map((transaction) => {
                const category = getCategoryById(transaction.category);

                const categoryName = getCategoryName(transaction.category, t);

                return (
                    <Fragment key={transaction.id}>
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
                            <Box sx={{ 
                                display: { xs: 'flex', sm: 'none' }, 
                                width: '100%', 
                                flexDirection: 'column', 
                                gap: designTokens.spacing.sm 
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm }}>
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
                                            borderRadius: designTokens.borderRadius.md,
                                            bgcolor: theme.palette.mode === 'dark' ? category?.color + '40' : category?.color,
                                            color: theme.palette.mode === 'dark' ? category?.color : designTokens.colors.light.text,
                                            flexShrink: 0,
                                            cursor: 'pointer',
                                            transition: designTokens.transitions.normal,
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            }
                                        }}
                                    >
                                        {category?.icon ? getCategoryIcon(category.icon, 20) : (
                                            <MoreHorizIcon sx={{ fontSize: 20 }} />
                                        )}
                                    </Box>
                                    
                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                        <Text variant="body1" weight="semibold" noWrap>
                                            {categoryName}
                                        </Text>
                                    </Box>
                                    
                                    <AmountDisplay
                                        amount={transaction.amount}
                                        currency={currency}
                                        type={transaction.type}
                                        size="large"
                                    />
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text variant="caption" color="secondary">
                                        {formatDate(transaction.date)}
                                    </Text>
                                    
                                    <CustomIconButton
                                        variant="danger"
                                        size="small"
                                        onClick={() => handleDelete(transaction.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </CustomIconButton>
                                </Box>
                                
                                {transaction.description && (
                                    <Text variant="body2" color="secondary" sx={{ fontSize: designTokens.typography.fontSize.sm }}>
                                        {transaction.description}
                                    </Text>
                                )}
                            </Box>

                            <Box sx={{ 
                                display: { xs: 'none', sm: 'flex' }, 
                                width: '100%', 
                                alignItems: 'center', 
                                gap: designTokens.spacing.md 
                            }}>
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
                                        borderRadius: designTokens.borderRadius.md,
                                        bgcolor: theme.palette.mode === 'dark' ? category?.color + '40' : category?.color,
                                        color: theme.palette.mode === 'dark' ? category?.color : designTokens.colors.light.text,
                                        flexShrink: 0,
                                        cursor: 'pointer',
                                        transition: designTokens.transitions.normal,
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                >
                                    {category?.icon ? getCategoryIcon(category.icon, 24) : (
                                        <MoreHorizIcon sx={{ fontSize: 24 }} />
                                    )}
                                </Box>

                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Text variant="body1" weight="semibold" noWrap sx={{ mb: 0.5 }}>
                                        {categoryName}
                                    </Text>
                                    {transaction.description && (
                                        <Text
                                            variant="body2"
                                            color="secondary"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {transaction.description}
                                        </Text>
                                    )}
                                    <Text variant="caption" color="secondary">
                                        {formatDate(transaction.date)}
                                    </Text>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm, flexShrink: 0 }}>
                                    <AmountDisplay
                                        amount={transaction.amount}
                                        currency={currency}
                                        type={transaction.type}
                                        size="medium"
                                    />
                                    
                                    <CustomIconButton
                                        variant="danger"
                                        size="small"
                                        onClick={() => handleDelete(transaction.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </CustomIconButton>
                                </Box>
                            </Box>
                        </ListItem>
                    </Fragment>
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