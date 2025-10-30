import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Switch,
    Button,
    Alert,
    Paper
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { GlassCard } from '../ui/GlassCard';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { Toggle } from '../ui/Toggle';
import { useTranslation } from 'react-i18next';
 
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { requestNotificationPermission } from '../../Budgets/utils/webNotifications';

export type ReminderFrequency = 'daily' | 'every3days' | 'weekly';

interface ReminderSettingsData {
    enabled: boolean;
    frequency: ReminderFrequency;
    time: string;
}

interface ReminderSettingsProps {
    onSettingsChange?: (settings: ReminderSettingsData) => void;
}

const REMINDER_MESSAGE_KEYS = [
    'reminderMessages.walletMisses',
    'reminderMessages.timeToAdmit',
    'reminderMessages.moneyDontCount',
    'reminderMessages.forgotToAdd',
    'reminderMessages.budgetWantsToTalk',
    'reminderMessages.financialDetective',
    'reminderMessages.dontBeLikeOthers',
    'reminderMessages.whoDoesntTrack',
    'reminderMessages.minuteOfHonesty',
    'reminderMessages.updateFinancialKarma',
    'reminderMessages.sirTransactions',
    'reminderMessages.breakingNews',
    'reminderMessages.longerYouDelay',
    'reminderMessages.personalAccountant',
    'reminderMessages.dangerZone',
    'reminderMessages.someoneSpends',
    'reminderMessages.financialDetox',
    'reminderMessages.alexaAddExpenses',
];

const EMOJI_POOL = ['💰', '💸', '💵', '💴', '💶', '💷', '💳', '📊', '📈', '📉', '💼', '🎯', '🔥', '⚡', '✨', '🚀', '🎉', '💪', '🤔', '😎', '🕵️', '📱', '💬', '👀', '🤷', '🧠', '🤖', '🧘', '⚠️', '📰'];

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({ onSettingsChange }) => {
    const {
        notificationsEnabled,
        setNotificationsEnabled,
        dailyReminderEnabled,
        setDailyReminderEnabled,
    } = useSettingsStore();
    const { mode } = useThemeMode();
    const { t } = useTranslation();
    const [settings, setSettings] = useState<ReminderSettingsData>(() => {
        const saved = localStorage.getItem('reminder-settings');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
            }
        }
        return {
            enabled: false,
            frequency: 'daily',
            time: '20:00'
        };
    });

        const [supportsNotifications, setSupportsNotifications] = useState(true);
    const [testNotificationSent, setTestNotificationSent] = useState(false);
    

    useEffect(() => {
        setSupportsNotifications(typeof window !== 'undefined' && 'Notification' in window);
    }, []);

    useEffect(() => {
        localStorage.setItem('reminder-settings', JSON.stringify(settings));
        onSettingsChange?.(settings);
    }, [settings, onSettingsChange]);

    const sendVerificationNotification = async () => {
        if (!('Notification' in window)) {
            alert(t('reminders.browserNoNotifications'));
            return;
        }

        if (Notification.permission === 'denied') {
            alert(t('reminders.permissionDenied'));
            return;
        }

        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert(t('reminders.permissionRequired'));
                return;
            }
        }

        try {
            const body = t('reminders.enabledTest', 'Напоминания включены. Пример уведомления.');
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification(t('reminders.notificationTitle'), {
                    body,
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'verify-reminder',
                    requireInteraction: false
                });
            } else {
                new Notification(t('reminders.notificationTitle'), { body, icon: '/favicon.ico', badge: '/favicon.ico', tag: 'verify-reminder' });
            }
        } catch (e) {
            alert(t('reminders.notificationFailed'));
        }
    };

    const handleToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const enabled = event.target.checked;
        setSettings(prev => ({ ...prev, enabled }));
        setNotificationsEnabled(enabled);

        if (enabled) {
            const granted = await requestNotificationPermission();
            if (!granted) return;
            await sendVerificationNotification();
        }
    };

    const handleFrequencyChange = (_event: { target: { value: unknown } }) => {};

    const getRandomMessage = (): string => {
        const randomKey = REMINDER_MESSAGE_KEYS[Math.floor(Math.random() * REMINDER_MESSAGE_KEYS.length)];
        const randomMessage = t(randomKey);
        const randomEmoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
        return `${randomMessage} ${randomEmoji}`;
    };

    const handleTestNotification = async () => {
        if (!('Notification' in window)) {
            alert(t('reminders.browserNoNotifications'));
            return;
        }

        if (Notification.permission === 'denied') {
            alert(t('reminders.permissionDenied'));
            return;
        }

        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert(t('reminders.permissionRequired'));
                return;
            }
        }

        const testMessage = getRandomMessage();

                try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;

                                await registration.showNotification(t('reminders.notificationTitle'), {
                    body: testMessage,
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'test-reminder',
                    requireInteraction: false,
                    data: {
                        url: window.location.origin
                    }
                });
            } else {
                new Notification(t('reminders.notificationTitle'), {
                    body: testMessage,
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'test-reminder',
                });
            }

                        setTestNotificationSent(true);
            setTimeout(() => setTestNotificationSent(false), 3000);
        } catch (error) {
            console.error('Error sending test notification:', error);
            alert(t('reminders.notificationFailed'));
        }
    };

    if (!supportsNotifications) {
        return (
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF', border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E7EB' }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                    {t('reminders.browserNotSupported')}
                </Alert>
            </Paper>
        );
    }

    const enabledTextColor = '#272B3E';
    const disabledTextColor = mode === 'dark' ? '#FFFFFFB3' : '#272B3EB3';

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E7EB',
                color: settings.enabled ? enabledTextColor : disabledTextColor,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: settings.enabled ? enabledTextColor : disabledTextColor,
                            fontWeight: 600,
                            fontSize: { xs: '1.125rem', sm: '1.25rem' }
                        }}
                    >
                        {t('reminders.title')}
                    </Typography>
                </Box>
                {}
            </Box>
            {}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: settings.enabled
                        ? (mode === 'dark' ? '#FFFFFF0A' : '#FFFFFF')
                        : (mode === 'dark' ? '#6C6FF91A' : '#6C6FF90D'),
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Notifications sx={{ 
                            color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                            fontSize: 22 
                        }} />
                        <Typography
                            sx={{
                                color: settings.enabled ? enabledTextColor : disabledTextColor,
                                fontWeight: settings.enabled ? 700 : 500,
                                fontSize: { xs: '0.9rem', sm: '1.05rem' },
                                transition: 'color 0.2s ease, font-weight 0.2s ease'
                            }}
                        >
                            {t('reminders.enable')}
                        </Typography>
                    </Box>
                    <Toggle
                        checked={settings.enabled}
                        onChange={handleToggle}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: colors.primary,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: colors.primary,
                            },
                        }}
                    />
                </Box>

                {settings.enabled && (
                    <Box sx={{ mt: 1 }} />
                )}
            </Box>
        </Paper>
    );
};

