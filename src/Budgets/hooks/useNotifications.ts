import { useEffect } from 'react';
import { useNotificationStore } from '../store/useNotificationStore';
import { notificationService } from '../utils/notificationService';


export function useNotifications() {
    const { addNotification } = useNotificationStore();

    useEffect(() => {
        const unsubscribe = notificationService.subscribe((notification) => {
            addNotification(notification);
        });
        return () => unsubscribe();
    }, [addNotification]);
}