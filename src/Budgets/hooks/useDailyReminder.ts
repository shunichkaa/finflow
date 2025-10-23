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

        const checkAndSendReminder = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            // Проверяем, совпадает ли текущее время с установленным временем напоминания
            if (currentTime === notificationTime) {
                const lastReminderDate = localStorage.getItem('lastReminderDate');
                const today = now.toDateString();

                // Отправляем напоминание только один раз в день
                if (lastReminderDate !== today) {
                    addNotification({
                        type: 'reminder',
                        severity: 'info',
                        title: 'Напоминание',
                        message: 'Не забудьте внести свои транзакции за сегодня! 📝',
                    });

                    localStorage.setItem('lastReminderDate', today);
                }
            }
        };

        // Проверяем каждую минуту
        const interval = setInterval(checkAndSendReminder, 60000);

        // Проверяем сразу при монтировании
        checkAndSendReminder();

        return () => clearInterval(interval);
    }, [notificationsEnabled, dailyReminderEnabled, notificationTime, addNotification]);
};

