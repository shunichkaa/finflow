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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'react-i18next';
import { TransactionType } from '../../Budgets/types';
import { ALL_CATEGORIES } from '../../Budgets/utils/categories';

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

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <FilterListIcon color="primary" />
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField
                            select
                            size="small"
                            label={t('type')}
                            value={type}
                            onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
                            fullWidth
                        >
                            <MenuItem value="all">{t('allTypes')}</MenuItem>
                            <MenuItem value="expense">{t('expense')}</MenuItem>
                            <MenuItem value="income">{t('income')}</MenuItem>
                        </TextField>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={onReset}
                    >
                        {t('reset')}
                    </Button>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        select
                        size="small"
                        label={t('category')}
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">{t('allCategories')}</MenuItem>
                        {ALL_CATEGORIES.map((cat) => {
                            const Icon = cat.icon || MoreHorizIcon;
                            return (
                                <MenuItem key={cat.id} value={cat.id}>
                                    <Icon sx={{ fontSize: 20, mr: 1 }} />
                                    {cat.name}
                                </MenuItem>
                            );
                        })}
                    </TextField>

                    <TextField
                        size="small"
                        label={t('from')}
                        type="date"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />

                    <TextField
                        size="small"
                        label={t('to')}
                        type="date"
                        value={dateTo}
                        onChange={(e) => onDateToChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};