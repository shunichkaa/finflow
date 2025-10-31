import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, Paper } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
 
import { colors } from '../../styles/colors';
import { Toggle } from '../ui/Toggle';
import { useTranslation } from 'react-i18next';
import IOSTimePicker from '../ui/IOSTimePicker';
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

 

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({ onSettingsChange }) => {
    const { setNotificationsEnabled } = useSettingsStore();
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
    const [timePickerOpen, setTimePickerOpen] = useState(false);

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

    const handleTimePickerChange = (time: string) => {
        setSettings(prev => ({ ...prev, time }));
    };

    const getNextReminderText = (): string => {
        const [hh, mm] = settings.time.split(':');
        return `${hh}:${mm}`;
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

    const enabledTextColor = mode === 'dark' ? '#FFFFFF' : '#272B3E';
    const disabledTextColor = mode === 'dark' ? '#FFFFFFCC' : '#272B3EB3';

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                border: mode === 'dark' ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E5E7EB',
                color: settings.enabled ? enabledTextColor : disabledTextColor,
                boxShadow: mode === 'dark' 
                    ? '0 2px 8px rgba(0,0,0,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.08)',
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
                    backgroundColor: 'transparent',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Notifications sx={{ 
                            color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                            fontSize: 22 
                        }} />
                        <Typography
                            sx={{
                                color: settings.enabled ? enabledTextColor : disabledTextColor,
                                fontWeight: 500,
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                transition: 'color 0.2s ease, font-weight 0.2s ease'
                            }}
                        >
                            {settings.enabled
                                ? t('reminders.disable', 'Выключить напоминания')
                                : t('reminders.enable', 'Включить напоминания')}
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
                    <>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
                                <Box
                                    onClick={() => setTimePickerOpen(true)}
                                    sx={{
                                        display: 'inline-flex',
                                        gap: 1,
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            minWidth: 140,
                                            backgroundColor: settings.enabled
                                                ? (mode === 'dark' ? '#FFFFFF1A' : '#EFF0F6')
                                                : (mode === 'dark' ? '#6C6FF926' : '#6C6FF914'),
                                            borderRadius: '12px',
                                            border: `2px solid ${settings.enabled ? (mode === 'dark' ? '#FFFFFF33' : '#EFF0F6') : (mode === 'dark' ? '#6C6FF966' : '#6C6FF933' )}`,
                                            py: 1.25,
                                            px: 2,
                                            textAlign: 'center',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: settings.enabled
                                                    ? (mode === 'dark' ? '#FFFFFF26' : '#EFF0F6')
                                                    : (mode === 'dark' ? '#6C6FF933' : '#6C6FF91F') ,
                                                transform: 'translateY(-1px)',
                                                borderColor: settings.enabled ? (mode === 'dark' ? '#FFFFFF4D' : '#EFF0F6') : '#6C6FF9',
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: settings.enabled ? enabledTextColor : disabledTextColor,
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                fontFamily: 'system-ui, sans-serif',
                                            }}
                                        >
                                            {getNextReminderText()}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Button
                                    variant="outlined"
                                    onClick={() => setTimePickerOpen(true)}
                                    sx={{
                                        borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                        color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                        borderRadius: 2,
                                        px: 2.5,
                                        py: 1,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderWidth: mode === 'dark' ? '2px' : '1px',
                                        '&:hover': {
                                            borderColor: '#6C6FF9',
                                            backgroundColor: mode === 'dark' ? '#6C6FF91F' : '#6C6FF914',
                                            borderWidth: mode === 'dark' ? '2px' : '1px',
                                        }
                                    }}
                                >
                                    {t('reminders.changeTime', 'Изменить время')}
                                </Button>
                            </Box>

                            <IOSTimePicker
                                open={timePickerOpen}
                                onClose={() => setTimePickerOpen(false)}
                                value={settings.time}
                                onChange={(time) => {
                                    handleTimePickerChange(time);
                                }}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Paper>
    );
};

