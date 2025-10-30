export const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        console.log('[Notifications] Not supported in this environment');
        return false;
    }
    try {
        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            console.log('[Notifications] Permission result:', permission);
            return permission === 'granted';
        }
        return Notification.permission === 'granted';
    } catch (e) {
        console.error('[Notifications] Permission request failed:', e);
        return false;
    }
};

export const sendNotification = (title: string, body: string, options?: NotificationOptions) => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        console.log('[Notifications] Not supported');
        return;
    }
    if (Notification.permission !== 'granted') {
        console.log('[Notifications] Skipped, permission:', Notification.permission);
        return;
    }
    try {
        const baseOptions: NotificationOptions = {
            body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'finflow',
            requireInteraction: false,
            ...options
        };

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(title, baseOptions).catch((err) => {
                    console.error('[Notifications] SW showNotification error:', err);
                    // Fallback to direct Notification
                    // eslint-disable-next-line no-new
                    new Notification(title, baseOptions);
                });
            });
        } else {
            // eslint-disable-next-line no-new
            new Notification(title, baseOptions);
        }
    } catch (error) {
        console.error('[Notifications] Error sending notification:', error);
    }
};


