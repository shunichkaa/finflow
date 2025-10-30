import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export type ReminderFrequency = 'daily' | 'every3days' | 'weekly';

interface ReminderSettings {
    enabled: boolean;
    frequency: ReminderFrequency;
    time: string;
}

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

    if (currentTime !== settings.time) {
        return false;
    }

    if (!lastSentDate) {
        return true;
    }

    const lastSent = new Date(lastSentDate);
    const daysDiff = Math.floor((now.getTime() - lastSent.getTime()) / (1000 * 60 * 60 * 24));
    const daysUntilNext = getDaysUntilNext(settings.frequency);

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

            if (Notification.permission === 'default') {
                await Notification.requestPermission();
            }

            if (Notification.permission !== 'granted') {
                return;
            }

            const lastSentDate = localStorage.getItem('reminder-last-sent');
            const now = new Date();
            const currentMinute = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

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

        intervalRef.current = setInterval(checkAndSendReminder, 60000);

        checkAndSendReminder();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [t]);

    useEffect(() => {
        const handleStorageChange = () => {
            setTimeout(() => {
                const settingsJson = localStorage.getItem('reminder-settings');
                if (settingsJson) {
                    try {
                        const settings = JSON.parse(settingsJson);
                        if (!settings.enabled) {
                            localStorage.removeItem('reminder-last-sent');
                        }
                    } catch {
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

