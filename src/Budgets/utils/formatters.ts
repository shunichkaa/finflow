import {Currency, useSettingsStore} from '../store/useSettingsStore';

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
    const formatted = new Intl.NumberFormat(language, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `${formatted} ${currencySymbols[currency]}`;
};

export const formatDate = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};