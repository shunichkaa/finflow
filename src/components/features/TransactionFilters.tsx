import React from 'react';
import {Box, Button, MenuItem, Paper, Stack, TextField,} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import {TransactionType} from "../../Budgets/types";
import {ALL_CATEGORIES} from "../../Budgets/utils/categories";

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
    return (
        <Paper sx={{p: 2, mb: 3}}>
            <Stack spacing={2}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                    <FilterListIcon color="primary"/>
                    <Box sx={{flexGrow: 1}}>
                        <TextField
                            select
                            size="small"
                            label="Тип"
                            value={type}
                            onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
                            fullWidth
                        >
                            <MenuItem value="all">Все типы</MenuItem>
                            <MenuItem value="expense">Расходы</MenuItem>
                            <MenuItem value="income">Доходы</MenuItem>
                        </TextField>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ClearIcon/>}
                        onClick={onReset}
                    >
                        Сбросить
                    </Button>
                </Box>

                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                    <TextField
                        select
                        size="small"
                        label="Категория"
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">Все категории</MenuItem>
                        {ALL_CATEGORIES.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.icon} {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        size="small"
                        label="От даты"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        InputLabelProps={{shrink: true}}
                        fullWidth
                    />

                    <TextField
                        size="small"
                        label="До даты"
                        type="date"
                        value={dateTo}
                        onChange={(e) => onDateToChange(e.target.value)}
                        InputLabelProps={{shrink: true}}
                        fullWidth
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};