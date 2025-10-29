import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ru' | 'en' | 'fr' | 'de' | 'es' | 'me';
export type Currency = 'EUR' | 'USD' | 'RUB' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'SEK' | 'NOK' | 'DKK' | 'PLN' | 'CZK' | 'HUF' | 'BGN' | 'RON' | 'HRK' | 'TRY' | 'UAH' | 'KZT' | 'BYN' | 'MXN' | 'BRL' | 'INR';

interface SettingsStore {
    language: Language;
    currency: Currency;
    avatar: string | null;
    nickname: string;
    notificationsEnabled: boolean;
    notificationTime: string;
    dailyReminderEnabled: boolean;
    setLanguage: (language: Language) => void;
    setCurrency: (currency: Currency) => void;
    setAvatar: (avatar: string | null) => void;
    setNickname: (nickname: string) => void;
    setNotificationsEnabled: (enabled: boolean) => void;
    setNotificationTime: (time: string) => void;
    setDailyReminderEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            language: 'ru',
            currency: 'EUR',
            avatar: null,
            nickname: '',
            notificationsEnabled: true,
            notificationTime: '20:00',
            dailyReminderEnabled: true,

            setLanguage: (language) => set({ language }),
            setCurrency: (currency) => set({ currency }),
            setAvatar: (avatar) => set({ avatar }),
            setNickname: (nickname) => set({ nickname }),
            setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
            setNotificationTime: (time) => set({ notificationTime: time }),
            setDailyReminderEnabled: (enabled) => set({ dailyReminderEnabled: enabled }),
        }),
        {
            name: 'finflow-settings',
        }
    )
);