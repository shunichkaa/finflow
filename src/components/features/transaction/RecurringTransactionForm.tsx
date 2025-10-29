import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    InputAdornment,
    Typography
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Repeat} from '@mui/icons-material';
import {useRecurringStore} from "../../../Budgets/store/useRecurringStore.ts";
import {RecurringFrequency, RecurringTransaction} from "../../../Budgets/types/recurring.ts";

interface RecurringTransactionFormProps {
    open: boolean;
    onClose: () => void;
    editingTransaction?: RecurringTransaction | null;
}

export const RecurringTransactionForm: React.FC<RecurringTransactionFormProps> = ({open, onClose, editingTransaction}) => {
    const {t} = useTranslation();
    const addRecurring = useRecurringStore(state => state.addRecurring);
    const updateRecurring = useRecurringStore(state => state.updateRecurring);

    const [type, setType] = useState<'income' | 'expense'>(editingTransaction?.type || 'expense');
    const [amount, setAmount] = useState(editingTransaction?.amount.toString() || '');
    const [category, setCategory] = useState(editingTransaction?.category || '');
    const [description, setDescription] = useState(editingTransaction?.description || '');
    const [frequency, setFrequency] = useState<RecurringFrequency>(editingTransaction?.frequency || 'monthly');
    const [startDate, setStartDate] = useState(editingTransaction?.startDate || new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(editingTransaction?.endDate || '');
    const [dayOfMonth, setDayOfMonth] = useState(editingTransaction?.dayOfMonth?.toString() || '1');


    // Обновляем состояние при изменении редактируемой транзакции
    useEffect(() => {
        if (editingTransaction) {
            setType(editingTransaction.type);
            setAmount(editingTransaction.amount.toString());
            setCategory(editingTransaction.category);
            setDescription(editingTransaction.description);
            setFrequency(editingTransaction.frequency);
            setStartDate(editingTransaction.startDate);
            setEndDate(editingTransaction.endDate || '');
            setDayOfMonth(editingTransaction.dayOfMonth?.toString() || '1');
        }
    }, [editingTransaction]);

    const handleSubmit = () => {
        if (!amount || !category || parseFloat(amount) <= 0) return;
        
        // Валидация дня месяца
        const day = parseInt(dayOfMonth);
        if ((frequency === 'monthly' || frequency === 'yearly') && (day < 1 || day > 31)) {
            return;
        }

        const recurringData = {
            amount: parseFloat(amount),
            category,
            description,
            type,
            frequency,
            startDate,
            endDate: endDate || undefined,
            dayOfMonth: frequency === 'monthly' || frequency === 'yearly' ? parseInt(dayOfMonth) : undefined,
            isActive: true,
        };

        if (editingTransaction) {
            updateRecurring(editingTransaction.id, recurringData);
        } else {
            addRecurring(recurringData);
        }
        handleClose();
    };

    const handleClose = () => {
        setType('expense');
        setAmount('');
        setCategory('');
        setDescription('');
        setFrequency('monthly');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate('');
        setDayOfMonth('1');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Repeat />
                {editingTransaction ? t('editRecurring') : t('recurringTransaction')}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
                    <TextField
                        label={t('amount')}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>
                        }}
                    />

                    <TextField
                        label={t('description')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        placeholder={t('descriptionPlaceholder')}
                    />

                    {(frequency === 'monthly' || frequency === 'yearly') && (
                        <TextField
                            label={t('dayOfMonth')}
                            type="number"
                            value={dayOfMonth}
                            onChange={(e) => setDayOfMonth(e.target.value)}
                            fullWidth
                            inputProps={{min: 1, max: 31}}
                        />
                    )}

                    <TextField
                        label={t('endDate')}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        helperText={t('endDateOptional')}
                    />

                    <Typography variant="caption" color="text.secondary">
                        {t('recurringHint')}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('cancel')}</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!amount || !category}
                >
                    {t('save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};