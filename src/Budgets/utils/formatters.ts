import { Currency, useSettingsStore } from '../store/useSettingsStore';

export const formatCurrency = (amount: number, currency: Currency = 'EUR') => {
    const currencySymbols: Record<Currency, string> = {
        EUR: '€',
        USD: '$',
        RUB: '₽',
        GBP: '£',
        JPY: '¥',
        CAD: 'C$',
        AUD: 'A$',
        CHF: 'CHF',
        CNY: '¥',
        SEK: 'kr',
        NOK: 'kr',
        DKK: 'kr',
        PLN: 'zł',
        CZK: 'Kč',
        HUF: 'Ft',
        BGN: 'лв',
        RON: 'lei',
        HRK: 'kn',
        TRY: '₺',
        UAH: '₴',
        KZT: '₸',
        BYN: 'Br',
        MXN: '$',
        BRL: 'R$',
        INR: '₹',
    };

    const language = useSettingsStore.getState().language || 'ru';
    return new Intl.NumberFormat(language, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount) + ' ' + currencySymbols[currency];
};

export const formatDate = (date: Date) => {
    const language = useSettingsStore.getState().language || 'ru';
    return new Intl.DateTimeFormat(language, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date));
};
