import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton,
    Typography
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Repeat, TrendingUp, TrendingDown} from '@mui/icons-material';
import {useRecurringStore} from "../../Budgets/store/useRecurringStore.ts";
import {RecurringFrequency} from "../../Budgets/types/recurring.ts";

interface RecurringTransactionFormProps {
    open: boolean;
    onClose: () => void;
}

const expenseCategories = [
    'food',
    'transport',
    'housing',
    'entertainment',
    'health',
    'education',
    'clothing',
    'subscriptions',
    'other'
];
const incomeCategories = ['salary', 'freelance', 'investment', 'gift'];

export const RecurringTransactionForm: React.FC<RecurringTransactionFormProps> = ({open, onClose}) => {
    const {t} = useTranslation();
    const addRecurring = useRecurringStore(state => state.addRecurring);

    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState<RecurringFrequency>('monthly');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState('1');

    const categories = type === 'income' ? incomeCategories : expenseCategories;

    const handleSubmit = () => {
        if (!amount || !category) return;

        const recurringData = {
            amount: parseFloat(amount),
            category,
            description,
            type,
            frequency,
            startDate,
            endDate: endDate || undefined,
            dayOfMonth: frequency === 'monthly' || frequency === 'yearly' ? parseInt(dayOfMonth) : undefined,
            isActive: true, // добавлено для соответствия типу RecurringTransaction
        };

        addRecurring(recurringData);
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
                {t('recurringTransaction')}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
                    {/* Тип транзакции */}
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={(_, value) => {
                            if (value) {
                                setType(value);
                                setCategory('');
                            }
                        }}
                        fullWidth
                        color={type === 'income' ? 'success' : 'error'}
                    >
                        <ToggleButton value="income">
                            <TrendingUp sx={{mr: 1}} />
                            {t('income')}
                        </ToggleButton>
                        <ToggleButton value="expense">
                            <TrendingDown sx={{mr: 1}} />
                            {t('expense')}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Сумма */}
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

                    {/* Категория */}
                    <FormControl fullWidth required>
                        <InputLabel>{t('category')}</InputLabel>
                        <Select
                            value={category}
                            label={t('category')}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {t(`category.${cat}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Описание */}
                    <TextField
                        label={t('description')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        placeholder={t('descriptionPlaceholder')}
                    />

                    {/* Частота */}
                    <FormControl fullWidth required>
                        <InputLabel>{t('frequency')}</InputLabel>
                        <Select
                            value={frequency}
                            label={t('frequency')}
                            onChange={(e) => setFrequency(e.target.value as RecurringFrequency)}
                        >
                            <MenuItem value="daily">{t('daily')}</MenuItem>
                            <MenuItem value="weekly">{t('weekly')}</MenuItem>
                            <MenuItem value="monthly">{t('monthly')}</MenuItem>
                            <MenuItem value="yearly">{t('yearly')}</MenuItem>
                        </Select>
                    </FormControl>

                    {/* День месяца для monthly/yearly */}
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

                    {/* Дата начала */}
                    <TextField
                        label={t('startDate')}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{shrink: true}}
                    />

                    {/* Дата окончания (опционально) */}
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