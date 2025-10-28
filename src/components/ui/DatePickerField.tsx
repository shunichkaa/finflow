import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface DatePickerFieldProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    minDate?: string;
    maxDate?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    required?: boolean;
    inputFormat?: string;
    views?: Array<'year' | 'month' | 'day'>;
    openTo?: 'year' | 'month' | 'day';
    disableFuture?: boolean;
    disablePast?: boolean;
    clearable?: boolean;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
                                                                    label,
                                                                    value,
                                                                    onChange,
                                                                    error,
                                                                    helperText,
                                                                    disabled = false,
                                                                    minDate,
                                                                    maxDate,
                                                                    fullWidth = false,
                                                                    size = 'small',
                                                                    required = false,
                                                                    inputFormat = 'DD.MM.YYYY',
                                                                    views,
                                                                    openTo,
                                                                    disableFuture = false,
                                                                    disablePast = false,
                                                                    clearable = false,
                                                                }) => {
    const { i18n } = useTranslation();
    const { mode } = useThemeMode();

    const localeMap: Record<string, string> = {
        ru: 'ru',
        en: 'en',
        fr: 'fr',
        de: 'de',
        es: 'es',
        me: 'ru',
    };

    const currentLocale = localeMap[i18n.language] || 'en';

    const handleChange = (newValue: unknown) => {
        if (dayjs.isDayjs(newValue) && newValue.isValid()) {
            onChange(newValue.format('YYYY-MM-DD'));
        } else if (clearable) {
            onChange('');
        }
    };

    const dateValue = value ? dayjs(value) : null;
    const minDateValue = minDate ? dayjs(minDate) : undefined;
    const maxDateValue = maxDate ? dayjs(maxDate) : undefined;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLocale}>
            <DatePicker
                label={label}
                value={dateValue}
                onChange={handleChange}
                minDate={minDateValue}
                maxDate={maxDateValue}
                disabled={disabled}
                format={inputFormat}
                views={views}
                openTo={openTo}
                disableFuture={disableFuture}
                disablePast={disablePast}
                slotProps={{
                    textField: {
                        size,
                        error,
                        helperText,
                        required,
                        fullWidth,
                        sx: {
                            minWidth: fullWidth ? '100%' : 130,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(101, 70, 51, 0.8)',
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: size === 'small' ? '8.5px 14px' : '16.5px 14px',
                            },
                        },
                    },
                    actionBar: clearable ? {
                        actions: ['clear'],
                    } : undefined,
                }}
            />
        </LocalizationProvider>
    );
};