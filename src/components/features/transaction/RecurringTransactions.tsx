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
import {formatCurrency} from "../../../Budgets/utils/formatters.ts";
import {RecurringTransactionForm} from "./RecurringTransactionForm.tsx";
import {RecurringTransaction} from "../../../Budgets/types/recurring.ts";
import { formatDate } from "../../../Budgets/utils/formatters";

export const RecurringTransactions: React.FC = () => {
    const {t} = useTranslation();
    const {currency} = useSettingsStore();

    const recurring = useRecurringStore(state => state.recurring);
    const toggleRecurring = useRecurringStore(state => state.toggleRecurring);
    const deleteRecurring = useRecurringStore(state => state.deleteRecurring);
    const getDueRecurring = useRecurringStore(state => state.getDueRecurring);
    const updateRecurring = useRecurringStore(state => state.updateRecurring);
    const addTransaction = useFinanceStore(state => state.addTransaction);

    const [formOpen, setFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<RecurringTransaction | null>(null);
    const dueRecurring = getDueRecurring();

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
            addTransaction({
                amount: rec.amount,
                category: rec.category,
                description: rec.description ? `${rec.description} (автоматически)` : '(автоматически)',
                date: now,
                type: rec.type,
            });

            updateRecurring(rec.id, {lastCreated: now.toISOString()}); 
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

            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        setFormOpen(true);
                        setEditingTransaction(null);
                    }}
                    sx={{
                        background: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                        color: '#FFFFFF',
                    }}
                >
                    {t('addRecurring')}
                </Button>
            </Box>

            {recurring.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        {t('noRecurringTransactions')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('addFirstRecurring')}
                    </Typography>
                </Box>
            ) : (
                <List>
                    {recurring.map((rec) => {
                        const isDue = dueRecurring.some(dr => dr.id === rec.id);
                        return (
                            <Card key={rec.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1, justifyContent: 'space-between'}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {rec.description || t(`category.${rec.category}`)}
                                            </Typography>
                                            {isDue && <Chip label={t('due')} color="warning" size="small"
                                                            icon={<Warning/>}/>}
                                            {!rec.isActive &&
                                                <Chip label={t('inactive')} size="small" variant="outlined"/>}
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold" color={rec.type === 'income' ? 'success.main' : 'error.main'}>
                                            {formatCurrency(rec.amount, currency)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <Repeat fontSize="small" color="action"/>
                                            <Typography variant="body2" color="text.secondary">
                                                {getFrequencyLabel(rec.frequency)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <Schedule fontSize="small" color="action"/>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('nextPayment')}: {formatNextDue(rec.nextDue)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {rec.endDate && (
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            {t('until')}: {formatEndDate(rec.endDate)}
                                        </Typography>
                                    )}

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setEditingTransaction(rec);
                                                setFormOpen(true);
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => deleteRecurring(rec.id)}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                        <Switch
                                            checked={rec.isActive}
                                            onChange={() => toggleRecurring(rec.id)}
                                            size="small"
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })}
                </List>
            )}

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