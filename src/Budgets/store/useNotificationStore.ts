import {create} from 'zustand';
import { v4 as uuid } from 'uuid';

export interface Notification {
    id: string;
    type: 'budget' | 'recurring' | 'goal' | 'insight' | 'reminder';
    severity: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}

interface NotificationStore {
    notifications: Notification[];
    addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    unreadCount: number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],

    addNotification: (n) =>
        set((state) => ({
            notifications: [
                {
                    ...n,
                    id: uuid(),
                    timestamp: new Date(),
                    read: false
                },
                ...state.notifications
            ]
        })),

    markAsRead: (id) =>
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id ? {...n, read: true} : n
            )
        })),

    markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({...n, read: true}))
        })),

    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
        })),

    get unreadCount() {
        return get().notifications.filter((n) => !n.read).length;
    }
}));