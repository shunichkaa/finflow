import {
    Box,
    TextField,
    MenuItem,
    Paper,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { TransactionType } from '../../../Budgets/types';
import { useThemeMode } from '../../../Budgets/theme/ThemeContext';
import { getCategoriesByType, getCategoryIcon, getCategoryName } from '../../../Budgets/utils/categories.tsx';
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
                                                                          onTypeChange: _onTypeChange,
                                                                          onCategoryChange,
                                                                          onDateFromChange,
                                                                          onDateToChange,
                                                                          onReset,
                                                                      }) => {
    const { t } = useTranslation();
    const { mode } = useThemeMode();

    const filteredCategories = useMemo(() => {
        if (type === 'all') {
            return [];
        }
        return getCategoriesByType(type);
    }, [type]);


    return (
        <Paper sx={{ 
            p: 2.5, 
            mb: 2,
            backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
            border: mode === 'dark' ? '1px solid #FFFFFF1A' : '1px solid #EFF0F6',
            borderRadius: 3,
            boxShadow: mode === 'dark' 
                ? '0 2px 8px #0000004D' 
                : '0 2px 8px #272B3E14',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                gap: 2, 
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%'
            }}>
                <Box 
                    onClick={onReset}
                    sx={{ 
                        display: { xs: 'none', sm: 'flex' }, 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                >
                    <FilterListIcon sx={{ 
                        color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                        fontSize: 24
                    }} />
                </Box>
                
                <TextField
                    select
                    size="small"
                    label={t('category')}
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    SelectProps={{
                        MenuProps: {
                            PaperProps: {
                                style: {
                                    maxHeight: 300,
                                },
                            },
                        },
                    }}
                    sx={{
                        minWidth: { xs: '100%', sm: 180 },
                        flex: { sm: '1 1 auto' },
                        maxWidth: { sm: 280 },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#FFFFFF0D' : '#FFFFFF',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? '#FFFFFFB3' : '#272B3E',
                            '&.Mui-focused': {
                                color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                            },
                        }
                    }}
                >
                    <MenuItem value="">{t('allCategories')}</MenuItem>
                    {type === 'all' ? null : (
                        filteredCategories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {getCategoryIcon(cat.icon, 16)}
                                    <span>{getCategoryName(cat.id, t)}</span>
                                </Box>
                            </MenuItem>
                        ))
                    )}
                </TextField>
                
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
                
                <Box
                    onClick={onReset}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                >
                    <ClearIcon sx={{ 
                        color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                        fontSize: 24
                    }} />
                </Box>
            </Box>
        </Paper>
    );
};
