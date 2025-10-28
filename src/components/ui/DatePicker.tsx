import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    inputFormat?: string;
    clearable?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
    const {
        label,
        value,
        onChange,
        error,
        helperText,
        required,
        minDate,
        maxDate,
        disabled = false,
        fullWidth = true,
        size = 'medium',
        inputFormat = 'DD.MM.YYYY',
        clearable = false,
    } = props;

    const handleChange = (newValue: unknown) => {
        if (newValue && dayjs.isDayjs(newValue) && newValue.isValid()) {
            onChange(newValue.format('YYYY-MM-DD'));
        } else {
            onChange('');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <MuiDatePicker
                label={label}
                value={value ? dayjs(value) : null}
                onChange={handleChange}
                minDate={minDate ? dayjs(minDate) : undefined}
                maxDate={maxDate ? dayjs(maxDate) : undefined}
                disabled={disabled}
                format={inputFormat}
                slotProps={{
                    textField: {
                        fullWidth,
                        required,
                        error,
                        helperText,
                        size,
                    },
                    actionBar: clearable ? {
                        actions: ['clear'],
                    } : undefined,
                }}
            />
        </LocalizationProvider>
    );
};