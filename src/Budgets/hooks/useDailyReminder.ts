import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../store/useSettingsStore';
import { useNotificationStore } from '../store/useNotificationStore';

export const useDailyReminder = () => {
    const { t } = useTranslation();
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
            const settings = useSettingsStore.getState();
            const currentNotificationTime = settings.notificationTime;
            
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            if (currentTime === currentNotificationTime) {
                const lastReminderDate = localStorage.getItem('lastReminderDate');
                const today = now.toDateString();

                if (lastReminderDate !== today) {
                    const notificationTitle = t('dailyReminder.notificationTitle', 'Reminder');
                    const notificationMessage = t('dailyReminder.notificationMessage', 'Don\'t forget to add your transactions for today! 📝');
                    
                    addNotification({
                        type: 'reminder',
                        severity: 'info',
                        title: notificationTitle,
                        message: notificationMessage,
                    });

                    if ('Notification' in window && Notification.permission === 'granted') {
                        try {
                            new Notification(`FinFlow - ${notificationTitle}`, {
                                body: notificationMessage,
                                icon: '/favicon.ico',
                                badge: '/favicon.ico',
                                tag: 'daily-reminder',
                                requireInteraction: false,
                                silent: false,
                            });
                        } catch (error) {
                            console.error('Notification error:', error);
                        }
                    }

                    localStorage.setItem('lastReminderDate', today);
                }
            }
        };

        requestNotificationPermission();

        const interval = setInterval(checkAndSendReminder, 60000);

        checkAndSendReminder();

        return () => clearInterval(interval);
    }, [notificationsEnabled, dailyReminderEnabled, notificationTime, addNotification, t]);
};

