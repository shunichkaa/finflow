import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
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
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, value, onChange }) => {
    const { i18n } = useTranslation();
    const { mode } = useThemeMode();

    // Маппинг языков
    const localeMap: Record<string, string> = {
        ru: 'ru',
        en: 'en',
        fr: 'fr',
        de: 'de',
        es: 'es',
        me: 'ru', // Черногорский используем русский формат
    };

    const currentLocale = localeMap[i18n.language] || 'en';

    const handleChange = (newValue: Dayjs | null) => {
        if (newValue) {
            onChange(newValue.format('YYYY-MM-DD'));
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLocale}>
            <DatePicker
                label={label}
                value={value ? dayjs(value) : null}
                onChange={handleChange}
                slotProps={{
                    textField: {
                        size: 'small',
                        sx: {
                            minWidth: 130,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: mode === 'dark' ? 'rgba(80, 75, 70, 0.3)' : 'rgba(248, 229, 229, 0.4)',
                                color: mode === 'dark' ? '#FFFFFF' : '#0600AB',
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? 'rgba(245, 245, 220, 0.8)' : 'rgba(101, 70, 51, 0.8)',
                            }
                        }
                    },
                }}
            />
        </LocalizationProvider>
    );
};