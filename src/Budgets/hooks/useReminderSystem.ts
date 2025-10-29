import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export type ReminderFrequency = 'daily' | 'every3days' | 'weekly';

interface ReminderSettings {
    enabled: boolean;
    frequency: ReminderFrequency;
    time: string;
}

// Reminder message keys - будут использоваться через i18n
const REMINDER_MESSAGE_KEYS = [
    'reminderMessages.walletMisses',
    'reminderMessages.timeToAdmit',
    'reminderMessages.moneyDontCount',
    'reminderMessages.forgotToAdd',
    'reminderMessages.budgetWantsToTalk',
    'reminderMessages.financialDetective',
    'reminderMessages.dontBeLikeOthers',
    'reminderMessages.whoDoesntTrack',
    'reminderMessages.minuteOfHonesty',
    'reminderMessages.updateFinancialKarma',
    'reminderMessages.sirTransactions',
    'reminderMessages.breakingNews',
    'reminderMessages.longerYouDelay',
    'reminderMessages.personalAccountant',
    'reminderMessages.dangerZone',
    'reminderMessages.someoneSpends',
    'reminderMessages.financialDetox',
    'reminderMessages.alexaAddExpenses',
];

const EMOJI_POOL = ['💰', '💸', '💵', '💴', '💶', '💷', '💳', '📊', '📈', '📉', '💼', '🎯', '🔥', '⚡', '✨', '🚀', '🎉', '💪', '🤔', '😎', '🕵️', '📱', '💬', '👀', '🤷', '🧠', '🤖', '🧘', '⚠️', '📰'];

// Функция для получения случайного сообщения (вызывается внутри useReminderSystem)
const getRandomMessage = (t: (key: string) => string): string => {
    const randomKey = REMINDER_MESSAGE_KEYS[Math.floor(Math.random() * REMINDER_MESSAGE_KEYS.length)];
    const randomMessage = t(randomKey);
    const randomEmoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
    return `${randomMessage} ${randomEmoji}`;
};

const getDaysUntilNext = (frequency: ReminderFrequency): number => {
    switch (frequency) {
        case 'daily':
            return 1;
        case 'every3days':
            return 3;
        case 'weekly':
            return 7;
        default:
            return 1;
    }
};

const shouldSendReminder = (
    settings: ReminderSettings,
    lastSentDate: string | null
): boolean => {
    if (!settings.enabled) return false;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Проверяем, настало ли время для отправки
    if (currentTime !== settings.time) {
        return false;
    }

    // Если никогда не отправляли, отправляем
    if (!lastSentDate) {
        return true;
    }

    const lastSent = new Date(lastSentDate);
    const daysDiff = Math.floor((now.getTime() - lastSent.getTime()) / (1000 * 60 * 60 * 24));
    const daysUntilNext = getDaysUntilNext(settings.frequency);

    // Проверяем, прошло ли достаточно дней
    return daysDiff >= daysUntilNext;
};

const sendReminder = async (message: string, notificationTitle: string): Promise<void> => {
    if (!('Notification' in window)) {
        console.warn('Notifications not supported');
        return;
    }

    if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
    }

    try {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            
            await registration.showNotification(notificationTitle, {
                body: message,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'finflow-reminder',
                requireInteraction: false,
                data: {
                    url: window.location.origin,
                    timestamp: Date.now()
                }
            });
        } else {
            new Notification(notificationTitle, {
                body: message,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'finflow-reminder',
            });
        }

        // Сохраняем время последней отправки
        localStorage.setItem('reminder-last-sent', new Date().toISOString());
    } catch (error) {
        console.error('Error sending reminder:', error);
    }
};

export const useReminderSystem = () => {
    const { t } = useTranslation();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastCheckRef = useRef<string>('');

    useEffect(() => {
        if (typeof window === 'undefined' || !window.localStorage) {
            return;
        }

        const checkAndSendReminder = async () => {
            const settingsJson = localStorage.getItem('reminder-settings');
            if (!settingsJson) return;

            let settings: ReminderSettings;
            try {
                settings = JSON.parse(settingsJson);
            } catch {
                return;
            }

            if (!settings.enabled) {
                return;
            }

            // Проверяем разрешение на уведомления
            if (Notification.permission === 'default') {
                await Notification.requestPermission();
            }

            if (Notification.permission !== 'granted') {
                return;
            }

            const lastSentDate = localStorage.getItem('reminder-last-sent');
            const now = new Date();
            const currentMinute = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            // Проверяем не более одного раза в минуту
            if (lastCheckRef.current === currentMinute) {
                return;
            }
            lastCheckRef.current = currentMinute;

            if (shouldSendReminder(settings, lastSentDate)) {
                const message = getRandomMessage(t);
                const notificationTitle = t('reminders.notificationTitle');
                await sendReminder(message, notificationTitle);
            }
        };

        // Проверяем каждую минуту
        intervalRef.current = setInterval(checkAndSendReminder, 60000);

        // Проверяем сразу при монтировании
        checkAndSendReminder();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [t]);

    // Также слушаем изменения в localStorage (если открыто несколько вкладок)
    useEffect(() => {
        const handleStorageChange = () => {
            // Просто триггерим перепроверку через небольшую задержку
            setTimeout(() => {
                const settingsJson = localStorage.getItem('reminder-settings');
                if (settingsJson) {
                    try {
                        const settings = JSON.parse(settingsJson);
                        if (!settings.enabled) {
                            localStorage.removeItem('reminder-last-sent');
                        }
                    } catch {
                        // Ignore
                    }
                }
            }, 1000);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
};

