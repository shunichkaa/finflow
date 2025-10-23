import React from 'react';

import {Controller, useForm} from 'react-hook-form';
import {Box, Button, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography,} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useFinanceStore} from '../../../Budgets/store/useFinanceStore.ts';
import type {Budget} from '../../../Budgets/types';
import {BudgetPeriod} from '../../../Budgets/types';
import {EXPENSE_CATEGORIES, getCategoryIcon, getCategoryName} from '../../../Budgets/utils/categories.tsx';
import {useThemeMode} from '../../../Budgets/theme/ThemeContext';

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
                {/* Period Toggle */}
                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        {t('period')}
                    </Typography>
                    <Controller
                        name="period"
                        control={control}
                        render={({field}) => (
                            <ToggleButtonGroup
                                {...field}
                                exclusive
                                fullWidth
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        color: mode === 'dark' ? '#FCF9F9' : '#0600AB',
                                        borderColor: mode === 'dark' 
                                            ? 'rgba(100, 200, 150, 0.3)' 
                                            : 'rgba(254, 222, 233, 0.3)',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(100, 200, 150, 0.1)' 
                                                : 'rgba(254, 222, 233, 0.1)',
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(100, 200, 150, 0.8)' 
                                                : 'rgba(254, 222, 233, 0.8)',
                                            color: mode === 'dark' ? '#1A3A2A' : '#0600AB',
                                            '&:hover': {
                                                backgroundColor: mode === 'dark' 
                                                    ? 'rgba(100, 200, 150, 0.9)' 
                                                    : 'rgba(254, 222, 233, 0.9)',
                                            }
                                        }
                                    }
                                }}
                            >
                                <ToggleButton value="weekly">{t('weekly')}</ToggleButton>
                                <ToggleButton value="monthly">{t('monthly')}</ToggleButton>
                            </ToggleButtonGroup>
                        )}
                    />
                </Box>

                {/* Category */}
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

                {/* Limit */}
                <Controller
                    name="limit"
                    control={control}
                    rules={{
                        required: t('limitRequired'),
                        validate: (value) => parseFloat(value) > 0 || t('limitMustBePositive'),
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label={t('limit')}
                            type="number"
                            inputProps={{step: '0.01', min: '0'}}
                            error={!!errors.limit}
                            helperText={errors.limit?.message}
                            fullWidth
                            required
                        />
                    )}
                />

                {/* Info */}
                <Box sx={{
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(100, 200, 150, 0.1)' 
                        : 'rgba(254, 222, 233, 0.1)',
                    border: `1px solid ${mode === 'dark' 
                        ? 'rgba(100, 200, 150, 0.3)' 
                        : 'rgba(254, 222, 233, 0.3)'}`,
                    color: mode === 'dark' ? '#FCF9F9' : '#0600AB',
                    p: 2, 
                    borderRadius: 2
                }}>
                    <Typography variant="body2">
                        {selectedPeriod === 'monthly' ? t('monthlyBudgetInfo') : t('weeklyBudgetInfo')}
                    </Typography>
                </Box>

                {/* Submit */}
                <Button type="submit" variant="contained" size="large" fullWidth>
                    {t('createBudget')}
                </Button>
            </Stack>
        </Box>
    );
};