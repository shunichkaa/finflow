import React from 'react';

import {
    Box,
    TextField,
    MenuItem,
    Stack,
    Button,
    Paper,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import { TransactionType } from '../../../Budgets/types';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { ALL_CATEGORIES, getCategoryIcon, getCategoryName } from '../../../Budgets/utils/categories.tsx';
import { DatePickerField } from '../../ui/DatePickerField.tsx';

interface TransactionFiltersProps {
    type: TransactionType | 'all';
    category: string;
    dateFrom: string;
    dateTo: string;
    onTypeChange: (type: TransactionType | 'all') => void;
    onCategoryChange: (category: string) => void;
    onDateFromChange: (date: string) => void;
    onDateToChange: (date: string) => void;
    onReset: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
                                                                          type,
                                                                          category,
                                                                          dateFrom,
                                                                          dateTo,
                                                                          onTypeChange,
                                                                          onCategoryChange,
                                                                          onDateFromChange,
                                                                          onDateToChange,
                                                                          onReset,
                                                                      }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();

    return (
        <Paper sx={{ 
            p: 2, 
            mb: 2,
            backgroundColor: mode === 'dark' ? 'rgba(60, 55, 50, 0.4)' : 'rgba(234, 234, 244, 0.2)',
            border: mode === 'dark' ? '1px solid rgba(80, 75, 70, 0.3)' : '1px solid rgba(234, 234, 244, 0.3)',
            borderRadius: 2
        }}>
            <Stack spacing={1.5}>
                {/* Компактная строка с фильтрами */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
                    <FilterListIcon sx={{ 
                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
                        fontSize: 20
                    }} />
                    
                    {/* Тип транзакции */}
                    <TextField
                        select
                        size="small"
                        label={t('type')}
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
                        sx={{
                            minWidth: 120,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(101, 70, 51, 0.8)',
                            }
                        }}
                    >
                        <MenuItem value="all">{t('allTypes')}</MenuItem>
                        <MenuItem value="expense">{t('expense')}</MenuItem>
                        <MenuItem value="income">{t('income')}</MenuItem>
                    </TextField>

                    {/* Категория */}
                    <TextField
                        select
                        size="small"
                        label={t('category')}
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        sx={{
                            minWidth: 140,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(101, 70, 51, 0.8)',
                            }
                        }}
                    >
                        <MenuItem value="">{t('allCategories')}</MenuItem>
                        {ALL_CATEGORIES.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {getCategoryIcon(cat.icon, 16)}
                                    <span>{getCategoryName(cat.id, t)}</span>
                                </Box>
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Даты */}
                    <DatePickerField
                        label={t('from')}
                        value={dateFrom}
                        onChange={onDateFromChange}
                    />

                    <DatePickerField
                        label={t('to')}
                        value={dateTo}
                        onChange={onDateToChange}
                    />

                    {/* Кнопка сброса */}
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={onReset}
                        sx={{
                            minWidth: 'auto',
                            px: 2,
                            borderColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.5)' : 'rgba(255, 185, 141, 0.5)',
                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.7)' : 'rgba(255, 185, 141, 0.7)',
                                backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.2)' : 'rgba(255, 185, 141, 0.1)',
                            }
                        }}
                    >
                        {t('reset')}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};