import React from 'react';

import {
    Box,
    TextField,
    MenuItem,
    Stack,
    Button,
    Paper,
    Typography,
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
            p: 2.5, 
            mb: 2,
            backdropFilter: 'blur(40px) saturate(180%)',
            backgroundColor: mode === 'dark' ? 'rgba(28, 28, 30, 0.85)' : 'rgba(252, 248, 245, 0.7)',
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(252, 248, 245, 0.9)',
            borderRadius: 6,
            boxShadow: mode === 'dark' 
                ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                : '0 8px 32px rgba(31, 38, 135, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            },
        }}>
            <Stack spacing={1.5}>
                {/* Компактная строка с фильтрами */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 1, sm: 0 } }}>
                        <FilterListIcon sx={{ 
                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                            fontSize: 20
                        }} />
                        <Typography variant="body2" sx={{ 
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(6, 0, 171, 0.8)',
                            fontWeight: 500,
                            display: { xs: 'block', sm: 'none' }
                        }}>
                            {t('filters')}
                        </Typography>
                    </Box>
                    
                    {/* Тип транзакции */}
                    <TextField
                        select
                        size="small"
                        label={t('type')}
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
                        sx={{
                            minWidth: { xs: '100%', sm: 120 },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: mode === 'dark' ? 'rgba(58, 58, 60, 0.6)' : 'rgba(252, 248, 245, 0.6)',
                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                borderRadius: 3,
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#977DFF' : '#977DFF',
                                },
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
                            minWidth: { xs: '100%', sm: 140 },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: mode === 'dark' ? 'rgba(58, 58, 60, 0.6)' : 'rgba(252, 248, 245, 0.6)',
                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                                borderRadius: 3,
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#977DFF' : '#977DFF',
                                },
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
                    <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
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
                    </Box>

                    {/* Кнопка сброса */}
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={onReset}
                        sx={{
                            minWidth: { xs: '100%', sm: 'auto' },
                            px: 2,
                            borderRadius: 3,
                            borderColor: mode === 'dark' ? 'rgba(151, 125, 255, 0.3)' : 'rgba(151, 125, 255, 0.3)',
                            color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                            backdropFilter: 'blur(20px)',
                            background: mode === 'dark' ? 'rgba(58, 58, 60, 0.4)' : 'rgba(151, 125, 255, 0.05)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: '#977DFF',
                                backgroundColor: mode === 'dark' ? 'rgba(151, 125, 255, 0.15)' : 'rgba(151, 125, 255, 0.1)',
                                transform: 'translateY(-2px)',
                                boxShadow: mode === 'dark' 
                                    ? '0 6px 20px rgba(151, 125, 255, 0.3)'
                                    : '0 6px 20px rgba(151, 125, 255, 0.15)',
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