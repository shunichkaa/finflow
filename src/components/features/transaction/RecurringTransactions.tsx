import React, { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    IconButton,
    List,
    Switch,
    Typography
} from '@mui/material';
import {Add, Delete, Edit, Repeat, Schedule, Warning} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';
import {useSettingsStore} from "../../../Budgets/store/useSettingsStore.ts";
import {useRecurringStore} from "../../../Budgets/store/useRecurringStore.ts";
import {useFinanceStore} from "../../../Budgets/store/useFinanceStore.ts";
import {useThemeMode} from "../../../Budgets/theme/ThemeContext";
import {formatCurrency} from "../../../Budgets/utils/formatters.ts";
import {RecurringTransactionForm} from "./RecurringTransactionForm.tsx";
import {RecurringTransaction} from "../../../Budgets/types/recurring.ts";
import { formatDate } from "../../../Budgets/utils/formatters";

export const RecurringTransactions: React.FC = () => {
    const {t} = useTranslation();
    const {currency} = useSettingsStore();
    const {mode} = useThemeMode();

    const recurring = useRecurringStore(state => state.recurring);
    const toggleRecurring = useRecurringStore(state => state.toggleRecurring);
    const deleteRecurring = useRecurringStore(state => state.deleteRecurring);
    const getDueRecurring = useRecurringStore(state => state.getDueRecurring);
    const updateRecurring = useRecurringStore(state => state.updateRecurring);
    const addTransaction = useFinanceStore(state => state.addTransaction);

    const [formOpen, setFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<RecurringTransaction | null>(null);
    const dueRecurring = getDueRecurring();

    // Функции форматирования должны быть внутри компонента чтобы иметь доступ к t()
    const formatNextDue = (dateString?: string) => {
        if (!dateString) return '-';

        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return t('overdue');
        if (diffDays === 0) return t('today');
        if (diffDays === 1) return t('tomorrow');
        return `${diffDays} ${t('daysLeft')}`;
    };

    const formatEndDate = (dateString?: string) => {
        if (!dateString) return '';
        return formatDate(new Date(dateString));
    };

    const handleCreateDueTransactions = () => {
        const now = new Date();

        dueRecurring.forEach(rec => {
            // Добавляем транзакцию
            addTransaction({
                amount: rec.amount,
                category: rec.category,
                description: rec.description ? `${rec.description} (автоматически)` : '(автоматически)',
                date: now,
                type: rec.type,
            });

            // Обновляем lastCreated в сторе повторяющихся транзакций
            updateRecurring(rec.id, {lastCreated: now.toISOString()}); // Конвертируем в ISO string
        });
    };

    const getFrequencyLabel = (freq: RecurringTransaction['frequency']) => {
        const labels: Record<string, string> = {
            daily: t('daily'),
            weekly: t('weekly'),
            monthly: t('monthly'),
            yearly: t('yearly')
        };
        return labels[freq] || freq;
    };

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            {dueRecurring.length > 0 && (
                <Alert
                    severity="info"
                    sx={{mb: 3}}
                    action={
                        <Button color="inherit" size="small" onClick={handleCreateDueTransactions}>
                            {t('createAll')}
                        </Button>
                    }
                >
                    <Typography variant="subtitle2" fontWeight="bold">
                        {t('dueTransactions')}: {dueRecurring.length}
                    </Typography>
                    <Typography variant="body2">{t('dueTransactionsHint')}</Typography>
                </Alert>
            )}

                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {rec.description || t(`category.${rec.category}`)}
                                                </Typography>
                                                {isDue && <Chip label={t('due')} color="warning" size="small"
												                icon={<Warning/>}/>}
                                                {!rec.isActive &&
													<Chip label={t('inactive')} size="small" variant="outlined"/>}
                                            </Box>

                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Schedule fontSize="small" color="action"/>
                                                <Typography variant="body2" color="text.secondary">
                                                    {t('nextPayment')}: {formatNextDue(rec.nextDue)}
                                                </Typography>
                                            </Box>

                                            {rec.endDate && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {t('until')}: {formatEndDate(rec.endDate)}
                                                </Typography>
                                            )}
                                        </Box>

            <RecurringTransactionForm 
                open={formOpen} 
                onClose={() => {
                    setFormOpen(false);
                    setEditingTransaction(null);
                }}
                editingTransaction={editingTransaction}
            />
        </Container>
    );
};