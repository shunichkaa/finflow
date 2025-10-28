import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
type PickerChangeHandlerContext<T = unknown> = T;
type DateValidationError = unknown;
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

type PickerValue = Dayjs | null;

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    minDate?: Dayjs | string;
    maxDate?: Dayjs | string;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    inputFormat?: string;
    views?: Array<'year' | 'month' | 'day'>;
    openTo?: 'year' | 'month' | 'day';
    disableFuture?: boolean;
    disablePast?: boolean;
    showTodayButton?: boolean;
    disableHighlightToday?: boolean;
    autoOk?: boolean;
    clearable?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
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
    inputFormat,
    views,
    openTo,
    disableFuture = false,
    disablePast = false,
    showTodayButton = false,
    disableHighlightToday = false,
    // autoOk removed in MUI v6
    clearable = false,
}) => {
    const handleChange = (value: PickerValue, _context: PickerChangeHandlerContext<DateValidationError>) => {
        if (value) {
            onChange(value.format('YYYY-MM-DD'));
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
                minDate={minDate ? (typeof minDate === 'string' ? dayjs(minDate) : minDate) : undefined}
                maxDate={maxDate ? (typeof maxDate === 'string' ? dayjs(maxDate) : maxDate) : undefined}
                disabled={disabled}
                format={inputFormat || 'DD.MM.YYYY'}
                views={views}
                openTo={openTo}
                disableFuture={disableFuture}
                disablePast={disablePast}
                showTodayButton={showTodayButton}
                disableHighlightToday={disableHighlightToday}
                // autoOk removed in MUI v6
                slotProps={{
                    textField: {
                        fullWidth: fullWidth !== false,
                        required,
                        error,
                        helperText,
                        size: size || 'medium',
                    },
                    actionBar: {
                        actions: clearable ? ['clear'] : [],
                    },
                }}
            />
        </LocalizationProvider>
    );
};