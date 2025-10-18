import React from 'react';

import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                          error,
                                                          helperText,
                                                          required,
                                                      }) => {
    const handleChange = (newValue: Dayjs | null) => {
        if (newValue) {
            onChange(newValue.format('YYYY-MM-DD'));
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <MuiDatePicker
                label={label}
                value={value ? dayjs(value) : null}
                onChange={handleChange}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        required,
                        error,
                        helperText,
                    },
                }}
            />
        </LocalizationProvider>
    );
};