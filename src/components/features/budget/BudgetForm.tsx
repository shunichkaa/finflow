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
    const removeBudget = useFinanceStore((state) => state.deleteBudget);
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

    const handleDelete = () => {
        if (!initialBudget) return;
        if (confirm(t('confirmDeleteBudget'))) {
            removeBudget(initialBudget.id);
            onSuccess?.();
        }
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
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                                '& .MuiSelect-select': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                                '& .MuiSelect-select.Mui-disabled': {
                                    WebkitTextFillColor: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    opacity: 1,
                                },
                            }}
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

                <Controller
                    name="period"
                    control={control}
                    render={({field}) => (
                        <ToggleButtonGroup
                            {...field}
                            exclusive
                            fullWidth
                            value={field.value}
                            onChange={(_, value) => value && field.onChange(value)}
                            sx={{
                                width: '100%',
                                '& .MuiToggleButton-root': {
                                    borderColor: mode === 'dark' 
                                        ? '#6C6FF94D' 
                                        : '#6C6FF94D',
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    flex: 1,
                                    minWidth: 0,
                                    '&.Mui-selected': {
                                        backgroundColor: '#6C6FF9',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: '#5B5EE8',
                                        },
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="monthly">{t('month')}</ToggleButton>
                            <ToggleButton value="weekly">{t('week')}</ToggleButton>
                        </ToggleButtonGroup>
                    )}
                />

                <Controller
                    name="limit"
                    control={control}
                    rules={{
                        required: t('amountRequired'),
                        min: {value: 0.01, message: t('amountMin')},
                    }}
                    render={({field}) => (
                        <NumberInput
                            {...field}
                            label={t('limit')}
                            error={!!errors.limit}
                            helperText={errors.limit?.message}
                            fullWidth
                            required
                        />
                    )}
                />

                <Box sx={{
                    backgroundColor: mode === 'dark' 
                        ? '#6C6FF91A' 
                        : '#C7CEEA33',
                    border: `1px solid ${mode === 'dark' 
                        ? '#6C6FF94D' 
                        : '#C7CEEA'}`,
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    p: 2, 
                    borderRadius: 2
                }}>
                    <Typography variant="body2">
                        {selectedPeriod === 'monthly' ? t('monthlyBudgetInfo') : t('weeklyBudgetInfo')}
                    </Typography>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        background: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5B5EE8 0%, #5B5EE8 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px #6C6FF966',
                        }
                    }}
                >
                    {initialBudget ? t('save') : t('create')}
                </Button>

                {initialBudget && (
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleDelete}
                        sx={{
                            mt: 1,
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: '#FF3B3B',
                            color: '#FF3B3B',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                borderColor: '#FF3B3B',
                                backgroundColor: 'rgba(255,59,59,0.06)'
                            }
                        }}
                    >
                        {t('delete')}
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

