import { useEffect, useRef } from 'react';
import { useRecurringStore } from '../store/useRecurringStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useNotificationStore } from '../store/useNotificationStore';

export const useRecurringNotifications = () => {
    const recurring = useRecurringStore(state => state.recurring);
    const { notificationsEnabled } = useSettingsStore();
    const addNotification = useNotificationStore(state => state.addNotification);
    const lastNotifiedRef = useRef<Record<string, string>>({});

    useEffect(() => {
        if (!notificationsEnabled || recurring.length === 0) return;

        const checkRecurring = () => {
            const now = new Date();
            recurring.forEach(r => {
                if (!r.isActive) return;
                const nextDue = r.nextDue ? new Date(r.nextDue) : new Date(r.startDate);
                const dueKey = `${r.id}:${nextDue.toDateString()}`;
                if (nextDue <= now && lastNotifiedRef.current[dueKey] !== dueKey) {
                    addNotification({
                        type: 'reminder',
                        severity: 'info',
                        title: 'Регулярный платёж',
                        message: r.description || 'Наступил запланированный регулярный платёж'
                    });
                    lastNotifiedRef.current[dueKey] = dueKey;
                }
            });
        };

        const interval = setInterval(checkRecurring, 60_000);
        checkRecurring();
        return () => clearInterval(interval);
    }, [notificationsEnabled, recurring, addNotification]);
};


