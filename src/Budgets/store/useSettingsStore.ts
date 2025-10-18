import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ru' | 'en' | 'fr' | 'de' | 'es' | 'me'; // ru - русский, en - английский, fr - французский, de - немецкий, es - испанский, me - черногорский
export type Currency = 'EUR' | 'USD' | 'RUB' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'SEK' | 'NOK' | 'DKK' | 'PLN' | 'CZK' | 'HUF' | 'BGN' | 'RON' | 'HRK' | 'TRY' | 'UAH' | 'KZT' | 'BYN' | 'MXN' | 'BRL' | 'INR';

interface SettingsStore {
    language: Language;
    currency: Currency;
    setLanguage: (language: Language) => void;
    setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            language: 'ru',
            currency: 'EUR',

            setLanguage: (language) => set({ language }),
            setCurrency: (currency) => set({ currency }),
        }),
        {
            name: 'finflow-settings',
        }
    )
);