import { useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useNotificationStore } from '../store/useNotificationStore';

export const useDailyReminder = () => {
    const { notificationsEnabled, dailyReminderEnabled, notificationTime } = useSettingsStore();
    const addNotification = useNotificationStore(state => state.addNotification);

    useEffect(() => {
        if (!notificationsEnabled || !dailyReminderEnabled) {
            return;
        }

        const requestNotificationPermission = async () => {
            if ('Notification' in window && Notification.permission === 'default') {
                await Notification.requestPermission();
            }
        };

        const checkAndSendReminder = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            if (currentTime === notificationTime) {
                const lastReminderDate = localStorage.getItem('lastReminderDate');
                const today = now.toDateString();

                if (lastReminderDate !== today) {
                    addNotification({
                        type: 'reminder',
                        severity: 'info',
                        title: 'Напоминание',
                        message: 'Не забудьте внести свои транзакции за сегодня! 📝',
                    });

                    if ('Notification' in window && Notification.permission === 'granted') {
                        new Notification('FinFlow - Напоминание', {
                            body: 'Не забудьте внести свои транзакции за сегодня! 📝',
                            icon: '/favicon.ico',
                            badge: '/favicon.ico',
                            tag: 'daily-reminder',
                            requireInteraction: false,
                            silent: false,
                        });
                    }

                    localStorage.setItem('lastReminderDate', today);
                }
            }
        };

        requestNotificationPermission();

        const interval = setInterval(checkAndSendReminder, 60000);

        checkAndSendReminder();

        return () => clearInterval(interval);
    }, [notificationsEnabled, dailyReminderEnabled, notificationTime, addNotification]);
};

