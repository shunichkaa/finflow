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
import { TransactionType } from '../../Budgets/types';
import { useFinanceStore } from '../../Budgets/store/useFinanceStore';
import { getCategoriesByType } from '../../Budgets/utils/categories';

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
                        Тип транзакции
                    </Typography>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={(_, newType) => newType && setType(newType)}
                        fullWidth
                        color={type === 'income' ? 'success' : 'error'}
                    >
                        <ToggleButton value="expense">Расход</ToggleButton>
                        <ToggleButton value="income">Доход</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Укажите сумму',
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: 'Введите корректную сумму',
                        },
                        validate: (value) =>
                            parseFloat(value) > 0 || 'Сумма должна быть больше 0',
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Сумма"
                            type="number"
                            slotProps={{
                                input: {
                                    inputProps: { step: 0.01, min: 0 },
                                },
                            }}
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
                    rules={{ required: 'Выберите категорию' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            label="Категория"
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            fullWidth
                            required
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
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
                            label="Описание"
                            placeholder="Например: Покупка продуктов"
                            multiline
                            rows={2}
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Укажите дату' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Дата"
                            type="date"
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors.date}
                            helperText={errors.date?.message}
                            fullWidth
                            required
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
                    Добавить {type === 'income' ? 'доход' : 'расход'}
                </Button>
            </Stack>
        </Box>
    );
};