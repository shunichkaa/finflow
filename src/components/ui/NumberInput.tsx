import React, { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type NumberInputProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
    value: string | number;
    onChange: (value: string) => void;
    allowDecimal?: boolean;
};

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
    ({ value, onChange, allowDecimal = true, ...props }, ref) => {
        // Форматирование числа с пробелами
        const formatNumber = (num: string): string => {
            // Удаляем все кроме цифр и точки/запятой
            const cleaned = num.replace(/[^\d.,]/g, '');
            
            // Заменяем запятую на точку для decimal
            const normalized = cleaned.replace(',', '.');
            
            // Разделяем на целую и дробную части
            const parts = normalized.split('.');
            let integerPart = parts[0];
            const decimalPart = parts[1];
            
            // Форматируем целую часть с пробелами (10000 → 10 000)
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            
            // Собираем обратно
            if (allowDecimal && decimalPart !== undefined) {
                return `${integerPart}.${decimalPart}`;
            }
            
            return integerPart;
        };

        // Обработка изменений
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            
            // Удаляем пробелы для получения чистого значения
            const cleanValue = inputValue.replace(/\s/g, '');
            
            // Валидация: только цифры и точка/запятая
            if (allowDecimal) {
                if (!/^[\d.,]*$/.test(cleanValue)) return;
                // Только одна точка/запятая
                if ((cleanValue.match(/[.,]/g) || []).length > 1) return;
            } else {
                if (!/^\d*$/.test(cleanValue)) return;
            }
            
            // Отправляем чистое значение (без пробелов) в родительский компонент
            onChange(cleanValue.replace(',', '.'));
        };

        // Форматируем отображаемое значение
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

