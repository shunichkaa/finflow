import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ru' | 'en' | 'fr' | 'de' | 'es' | 'me'; // ru - русский, en - английский, fr - французский, de - немецкий, es - испанский, me - черногорский
export type Currency = 'EUR' | 'USD' | 'RUB' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'SEK' | 'NOK' | 'DKK' | 'PLN' | 'CZK' | 'HUF' | 'BGN' | 'RON' | 'HRK' | 'TRY' | 'UAH' | 'KZT' | 'BYN' | 'MXN' | 'BRL' | 'INR';

interface SettingsStore {
    language: Language;
    currency: Currency;
    avatar: string | null;
    nickname: string;
    setLanguage: (language: Language) => void;
    setCurrency: (currency: Currency) => void;
    setAvatar: (avatar: string | null) => void;
    setNickname: (nickname: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            language: 'ru',
            currency: 'EUR',
            avatar: null,
            nickname: '',

            setLanguage: (language) => set({ language }),
            setCurrency: (currency) => set({ currency }),
            setAvatar: (avatar) => set({ avatar }),
            setNickname: (nickname) => set({ nickname }),
        }),
        {
            name: 'finflow-settings',
        }
    )
);