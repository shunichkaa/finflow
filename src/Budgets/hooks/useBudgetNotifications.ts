import { useEffect, useRef } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { calculateBudgetSpent, getBudgetPercentage } from '../utils/budgetCalculations';
import { getCategoryName } from '../utils/categories';
import { useTranslation } from 'react-i18next';

export const useBudgetNotifications = () => {
    const { t } = useTranslation();
    const budgets = useFinanceStore(state => state.budgets);
    const transactions = useFinanceStore(state => state.transactions);
    const { notificationsEnabled } = useSettingsStore();
    const addNotification = useNotificationStore(state => state.addNotification);
    const lastNotifiedRef = useRef<Record<string, string>>({});

    useEffect(() => {
        if (!notificationsEnabled || budgets.length === 0) return;

        const nowKey = () => {
            const now = new Date();
            return `${now.getFullYear()}-${now.getMonth() + 1}`; 
        };

        const checkBudgets = () => {
            const keyScope = nowKey();
            budgets.forEach(b => {
                const spent = calculateBudgetSpent(b, transactions);
                const pct = getBudgetPercentage(spent, b.limit);
                const notifyKeyExceeded = `${b.id}:${keyScope}:exceeded`;
                const notifyKeyWarning = `${b.id}:${keyScope}:warning`;

                const categoryLabel = getCategoryName(b.category, t);
                if (pct >= 100 && lastNotifiedRef.current[notifyKeyExceeded] !== keyScope) {
                    addNotification({
                        type: 'budget',
                        severity: 'error',
                        title: 'Бюджет превышен',
                        message: `Вы превысили бюджет по категории "${categoryLabel}". Потрачено ${spent.toFixed(2)} / лимит ${b.limit.toFixed(2)}.`
                    });
                    lastNotifiedRef.current[notifyKeyExceeded] = keyScope;
                } else if (pct >= 80 && lastNotifiedRef.current[notifyKeyWarning] !== keyScope) {
                    addNotification({
                        type: 'budget',
                        severity: 'warning',
                        title: 'Близко к лимиту бюджета',
                        message: `Вы израсходовали ${pct.toFixed(0)}% бюджета по категории "${categoryLabel}".`
                    });
                    lastNotifiedRef.current[notifyKeyWarning] = keyScope;
                }
            });
        };

        const interval = setInterval(checkBudgets, 60_000);
        checkBudgets();
        return () => clearInterval(interval);
    }, [notificationsEnabled, budgets, transactions, addNotification]);
};


