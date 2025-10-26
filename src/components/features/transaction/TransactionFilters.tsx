import {
    Box,
    TextField,
    MenuItem,
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
            p: 2.5, 
            mb: 2,
            backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #EFF0F6',
            borderRadius: 3,
            boxShadow: mode === 'dark' 
                ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                : '0 2px 8px rgba(39, 43, 62, 0.08)',
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
                
                {/* Тип транзакции */}
                <TextField
                    select
                    size="small"
                    label={t('type')}
                    value={type}
                    onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
                    sx={{
                        minWidth: { xs: '100%', sm: 140 },
                        flex: { sm: '1 1 auto' },
                        maxWidth: { sm: 160 },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#272B3E',
                            '&.Mui-focused': {
                                color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
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
                            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        },
                        '& .MuiInputLabel-root': {
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#272B3E',
                            '&.Mui-focused': {
                                color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
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

                {/* От */}
                <DatePickerField
                    label={t('from')}
                    value={dateFrom}
                    onChange={onDateFromChange}
                />

                {/* До */}
                <DatePickerField
                    label={t('to')}
                    value={dateTo}
                    onChange={onDateToChange}
                />

                {/* Кнопка сброса - только крестик */}
                <Box
                    onClick={onReset}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        minWidth: 40,
                        borderRadius: 2,
                        border: `1px solid ${mode === 'dark' ? '#6C6FF9' : '#6C6FF9'}`,
                        color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                        background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6',
                            transform: 'translateY(-2px)',
                        }
                    }}
                >
                    <ClearIcon sx={{ fontSize: 20 }} />
                </Box>
            </Box>
        </Paper>
    );
};