import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ru' | 'en' | 'me'; // ru - русский, en - английский, me - черногорский
export type Currency = 'EUR' | 'USD' | 'RUB';

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