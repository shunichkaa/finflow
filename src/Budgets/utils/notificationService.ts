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

    budgetExceeded(category: string, amount: number) {
        this.trigger({
            type: 'budget',
            severity: 'error',
            title: 'Бюджет превышен',
            message: `Вы превысили бюджет по категории "${category}" на ${amount.toFixed(2)} €.`
        });
    }
}

export const notificationService = new NotificationService();