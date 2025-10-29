import { useEffect, useRef } from 'react';

export type ReminderFrequency = 'daily' | 'every3days' | 'weekly';

interface ReminderSettings {
    enabled: boolean;
    frequency: ReminderFrequency;
    time: string;
}

const REMINDER_MESSAGES = [
    "Эй, твой кошелек скучает! Внеси расходы 💰",
    "Время признаться, на что ты потратился сегодня 👀",
    "Деньги не считают себя сами, знаешь ли 🤑",
    "Пссс... забыл внести данные? Я помню всё 📊",
    "Твой бюджет хочет с тобой поговорить 💬",
    "Финансовый детектив на связи! Где расходы? 🕵️",
    "Не будь как все, веди учёт! 🚀",
    "Кто не ведёт учёт - тот не знает куда деньги ушли 🤷",
    "Минутка честности: сколько потратил? 💳",
    "Время обновить финансовую карму ✨",
    "Сэр, ваши транзакции не внесут себя сами ⚡",
    "Breaking news: твой бюджет требует внимания 📰",
    "Чем дольше откладываешь - тем больше забудешь 🧠",
    "Ваш личный бухгалтер напоминает... (это вы сами) 🤓",
    "Danger zone! Данные устарели! ⚠️",
    "Кажется, кто-то тратит деньги и молчит... 🤐",
    "Финансовый детокс начинается с учёта 🧘",
    "Alexa, внеси расходы! Ой, это не работает так... 🤖",
];

const EMOJI_POOL = ['💰', '💸', '💵', '💴', '💶', '💷', '💳', '📊', '📈', '📉', '💼', '🎯', '🔥', '⚡', '✨', '🚀', '🎉', '💪', '🤔', '😎', '🕵️', '📱', '💬', '👀', '🤷', '🧠', '🤖', '🧘', '⚠️', '📰'];

const getRandomMessage = (): string => {
    const randomMessage = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
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

const sendReminder = async (message: string): Promise<void> => {
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
            
            await registration.showNotification('FinFlow - Напоминание', {
                body: message,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'finflow-reminder',
                requireInteraction: false,
                vibrate: [200, 100, 200],
                data: {
                    url: window.location.origin,
                    timestamp: Date.now()
                }
            });
        } else {
            new Notification('FinFlow - Напоминание', {
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
                const message = getRandomMessage();
                await sendReminder(message);
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
    }, []);

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

