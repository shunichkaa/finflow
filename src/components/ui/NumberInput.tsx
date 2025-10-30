import React, { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type NumberInputProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
    value: string | number;
    onChange: (value: string) => void;
    allowDecimal?: boolean;
};

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
    ({ value, onChange, allowDecimal = true, ...props }, ref) => {
        const formatNumber = (num: string): string => {
            const cleaned = num.replace(/[^\d.,]/g, '');

                        const normalized = cleaned.replace(',', '.');

                        const parts = normalized.split('.');
            let integerPart = parts[0];
            const decimalPart = parts[1];

                        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


                                    if (allowDecimal && decimalPart !== undefined) {
                return `${integerPart}.${decimalPart}`;
            }

                        return integerPart;
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;

                        const cleanValue = inputValue.replace(/\s/g, '');

                        if (allowDecimal) {
                if (!/^[\d.,]*$/.test(cleanValue)) return;
                if ((cleanValue.match(/[.,]/g) || []).length > 1) return;
            } else {
                if (!/^\d*$/.test(cleanValue)) return;
            }

                        onChange(cleanValue.replace(',', '.'));
        };

        const displayValue = formatNumber(String(value || ''));

        return (
            <TextField
                {...props}
                ref={ref}
                value={displayValue}
                onChange={handleChange}
                inputProps={{
                    inputMode: 'decimal',
                    pattern: allowDecimal ? '[0-9.,\\s]*' : '[0-9\\s]*',
                    ...props.inputProps,
                }}
            />
        );
    }
);

NumberInput.displayName = 'NumberInput';

