import React, { useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TransactionType } from '../../Budgets/types';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { getCategoriesByType, getCategoryIcon, getCategoryName } from '../../Budgets/utils/categories.tsx';
import {DatePickerField} from "../ui/DatePickerField.tsx";

interface TransactionFormData {
    amount: string;
    category: string;
    description: string;
    date: string;
}

interface TransactionFormProps {
    onSuccess?: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess }) => {
    const { t } = useTranslation();
    const [type, setType] = useState<TransactionType>('expense');
    const addTransaction = useFinanceStore((state) => state.addTransaction);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TransactionFormData>({
        defaultValues: {
            amount: '',
            category: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        },
    });

    const categories = getCategoriesByType(type);

    const onSubmit = (data: TransactionFormData) => {
        addTransaction({
            amount: parseFloat(data.amount),
            type,
            category: data.category,
            description: data.description,
            date: new Date(data.date),
        });
        reset();
        onSuccess?.();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        {t('type')}
                    </Typography>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={(_, newType) => newType && setType(newType)}
                        fullWidth
                        color={type === 'income' ? 'success' : 'error'}
                    >
                        <ToggleButton value="expense">{t('expense')}</ToggleButton>
                        <ToggleButton value="income">{t('income')}</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: t('amountRequired'),
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: t('invalidAmount'),
                        },
                        validate: (value) =>
                            parseFloat(value) > 0 || t('amountMustBePositive'),
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('amount')}
                            type="number"
                            inputProps={{ step: '0.01', min: '0' }}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            fullWidth
                            required
                        />
                    )}
                />

                <Controller
                    name="category"
                    control={control}
                    rules={{ required: t('categoryRequired') }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            label={t('category')}
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            fullWidth
                            required
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {getCategoryIcon(cat.icon, 20)}
                                        <span>{getCategoryName(cat.id, t)}</span>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('description')}
                            placeholder={t('descriptionPlaceholder')}
                            multiline
                            rows={2}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="date"
                    control={control}
                    rules={{ required: t('dateRequired') }}
                    render={({ field }) => (
                        <DatePickerField
                            label={t('date')}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color={type === 'income' ? 'success' : 'error'}
                    fullWidth
                >
                    {t('addTransaction')}
                </Button>
            </Stack>
        </Box>
    );
};