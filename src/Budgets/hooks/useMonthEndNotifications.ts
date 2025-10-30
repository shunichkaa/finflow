import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useFinanceStore } from '../store/useFinanceStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { sendNotification } from '../utils/webNotifications';

export const useMonthEndNotifications = () => {
    const { notificationsEnabled, monthEndReportEnabled } = useSettingsStore();
    const addNotification = useNotificationStore(state => state.addNotification);
    const budgets = useFinanceStore(state => state.budgets);
    const transactions = useFinanceStore(state => state.transactions);
    const lastSentKeyRef = useRef<string>('');

    useEffect(() => {
        if (!notificationsEnabled || !monthEndReportEnabled) return;

        const checkMonthEnd = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const lastDay = new Date(year, month + 1, 0);
            const diffDays = Math.ceil((lastDay.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            // Send once per month when 3 or 2 days left
            if (diffDays <= 3 && diffDays >= 1) {
                const key = `${year}-${month + 1}-${diffDays}`;
                if (lastSentKeyRef.current === key) return;

                // Compute rough leftover total budget
                const totalLimit = budgets.reduce((sum, b) => sum + (b.limit || 0), 0);
                const totalSpent = budgets.reduce((sum, b) => {
                    const spent = transactions
                        .filter(t => t.category === b.category && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
                        .reduce((s, t) => s + (t.amount || 0), 0);
                    return sum + spent;
                }, 0);
                const left = Math.max(0, totalLimit - totalSpent);

                const title = 'Скоро конец месяца';
                const body = `Осталось около ${left.toFixed(2)} по суммарному бюджету. (${diffDays} дн.)`;
                addNotification({ type: 'reminder', severity: 'info', title, message: body });
                sendNotification('📅 Конец месяца', body, { tag: `month-end-${year}-${month + 1}-${diffDays}` });
                lastSentKeyRef.current = key;
            }
        };

        const interval = setInterval(checkMonthEnd, 60_000);
        checkMonthEnd();
        return () => clearInterval(interval);
    }, [notificationsEnabled, monthEndReportEnabled, budgets, transactions, addNotification]);
};


