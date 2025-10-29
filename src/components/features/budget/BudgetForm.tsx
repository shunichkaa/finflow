import React from 'react';

import {Controller, useForm} from 'react-hook-form';
import {Box, Button, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography,} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../../Budgets/store/useFinanceStore.ts';
import type {Budget} from '../../../Budgets/types';
import {BudgetPeriod} from '../../../Budgets/types';
import {EXPENSE_CATEGORIES, getCategoryIcon, getCategoryName} from '../../../Budgets/utils/categories.tsx';
import {useThemeMode} from '../../../Budgets/theme/ThemeContext';
import {NumberInput} from '../../ui/NumberInput.tsx';

interface BudgetFormData {
    category: string;
    limit: string;
    period: BudgetPeriod;
}

interface BudgetFormProps {
    onSuccess?: () => void;
    initialBudget?: Budget;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({onSuccess, initialBudget}) => {
    const {t} = useTranslation();
    const {mode} = useThemeMode();
    const addBudget = useFinanceStore((state) => state.addBudget);
    const updateBudget = useFinanceStore((state) => state.updateBudget);
    const budgets = useFinanceStore((state) => state.budgets);

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
    } = useForm<BudgetFormData>({
        defaultValues: {
            category: initialBudget?.category || '',
            limit: initialBudget ? String(initialBudget.limit) : '',
            period: initialBudget?.period || 'monthly',
        },
    });

    const selectedPeriod = watch('period');

    // Категории без бюджетов
    const availableCategories = initialBudget
        ? EXPENSE_CATEGORIES
        : EXPENSE_CATEGORIES.filter((cat) => !budgets.some((b) => b.category === cat.id));

    const onSubmit = (data: BudgetFormData) => {
        if (initialBudget) {
            updateBudget(initialBudget.id, {
                limit: parseFloat(data.limit),
                period: data.period,
            });
        } else {
            addBudget({
                category: data.category,
                limit: parseFloat(data.limit),
                period: data.period,
            });
        }

        reset();
        onSuccess?.();
    };

    if (availableCategories.length === 0) {
        return (
            <Box sx={{textAlign: 'center', py: 4}}>
                <Typography color="text.secondary">
                    {t('allCategoriesHaveBudgets')}
                </Typography>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Controller
                    name="category"
                    control={control}
                    rules={{required: t('categoryRequired')}}
                    render={({field}) => (
                        <TextField
                            {...field}
                            select
                            label={t('category')}
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            fullWidth
                            required
                            disabled={!!initialBudget}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300,
                                        },
                                    },
                                },
                            }}
                        >
                            {availableCategories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                        {getCategoryIcon(cat.icon, 20)}
                                        <span>{getCategoryName(cat.id, t)}</span>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Box sx={{
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(108, 111, 249, 0.1)' 
                        : 'rgba(199, 206, 234, 0.2)',
                    border: `1px solid ${mode === 'dark' 
                        ? 'rgba(108, 111, 249, 0.3)' 
                        : '#C7CEEA'}`,
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    p: 2, 
                    borderRadius: 2
                }}>
                    <Typography variant="body2">
                        {selectedPeriod === 'monthly' ? t('monthlyBudgetInfo') : t('weeklyBudgetInfo')}
                    </Typography>
                </Box>

