import {Notification} from '../store/useNotificationStore';

type NotificationListener = (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;

class NotificationService {
    private listeners: NotificationListener[] = [];

    subscribe(listener: NotificationListener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    trigger(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
        this.listeners.forEach((listener) => listener(notification));
    }

    // === Примеры триггеров ===
    budgetExceeded(category: string, amount: number) {
        this.trigger({
            type: 'budget',
            severity: 'error',
            title: 'Бюджет превышен',
            message: `Вы превысили бюджет по категории "${category}" на ${amount.toFixed(2)} €.`
        });
    }

    approachingLimit(category: string, percent: number) {
        this.trigger({
            type: 'budget',
            severity: 'warning',
            title: 'Приближение к лимиту',
            message: `Расходы по категории "${category}" достигли ${percent}%.`
        });
    }

    recurringPaymentReminder(name: string) {
        this.trigger({
            type: 'recurring',
            severity: 'info',
            title: 'Повторяющийся платёж завтра',
            message: `Завтра запланирован платёж: ${name}.`
        });
    }

    goalAchieved(goalName: string) {
        this.trigger({
            type: 'goal',
            severity: 'success',
            title: 'Цель достигнута!',
            message: `Поздравляем! Вы достигли цели "${goalName}".`
        });
    }

    unusualActivity(details: string) {
        this.trigger({
            type: 'insight',
            severity: 'warning',
            title: 'Необычная активность',
            message: details
        });
    }

    dailyReminder() {
        this.trigger({
            type: 'reminder',
            severity: 'info',
            title: 'Добавьте транзакции',
            message: 'Не забудьте внести сегодняшние расходы.'
        });
    }
}

export const notificationService = new NotificationService();