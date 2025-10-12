import { Currency } from '../store/useSettingsStore';

export const formatCurrency = (amount: number, currency: Currency = 'EUR') => {
    const currencySymbols: Record<Currency, string> = {
        EUR: '€',
        USD: '$',
        RUB: '₽',
    };

    return new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount) + ' ' + currencySymbols[currency];
};

export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date));
};

export const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
};

export const formatShortDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    }).format(new Date(date));
};