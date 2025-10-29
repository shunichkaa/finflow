import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Switch,
    FormControl,
    Select,
    MenuItem,
    Button,
    Alert
} from '@mui/material';
import {
    Notifications,
    AccessTime,
    CalendarToday,
    CheckCircle
} from '@mui/icons-material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { GlassCard } from '../ui/GlassCard';
import { useTranslation } from 'react-i18next';

export type ReminderFrequency = 'daily' | 'every3days' | 'weekly';

interface ReminderSettingsData {
    enabled: boolean;
    frequency: ReminderFrequency;
    time: string;
}

interface ReminderSettingsProps {
    onSettingsChange?: (settings: ReminderSettingsData) => void;
}

// Reminder message keys - будут использоваться через i18n
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
    const { mode } = useThemeMode();
    const { t } = useTranslation();
    const [settings, setSettings] = useState<ReminderSettingsData>(() => {
        const saved = localStorage.getItem('reminder-settings');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                // Fallback to defaults
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
        setSupportsNotifications(
            'Notification' in window && 
            'serviceWorker' in navigator &&
            'PushManager' in window
        );
    }, []);

    useEffect(() => {
        localStorage.setItem('reminder-settings', JSON.stringify(settings));
        onSettingsChange?.(settings);
    }, [settings, onSettingsChange]);

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enabled = event.target.checked;
        setSettings(prev => ({ ...prev, enabled }));
        
        if (enabled && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    setSettings(prev => ({ ...prev, enabled: false }));
                }
            });
        }
    };

    const handleFrequencyChange = (event: { target: { value: unknown } }) => {
        setSettings(prev => ({ ...prev, frequency: event.target.value as ReminderFrequency }));
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings(prev => ({ ...prev, time: event.target.value }));
    };

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
            <GlassCard
                sx={{
                    p: 3,
                    background: mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(108, 111, 249, 0.2) 0%, rgba(108, 111, 249, 0.35) 100%)'
                        : 'linear-gradient(135deg, rgba(239, 240, 246, 0.8) 0%, rgba(239, 240, 246, 0.9) 100%)',
                }}
            >
                <Alert severity="info" sx={{ mb: 2 }}>
                    {t('reminders.browserNotSupported')}
                </Alert>
            </GlassCard>
        );
    }

    return (
        <GlassCard
            sx={{
                p: { xs: 2, sm: 3 },
                background: mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(108, 111, 249, 0.2) 0%, rgba(108, 111, 249, 0.35) 100%)'
                    : 'linear-gradient(135deg, rgba(239, 240, 246, 0.8) 0%, rgba(239, 240, 246, 0.9) 100%)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Notifications sx={{ 
                    color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                    fontSize: 28 
                }} />
                <Typography
                    variant="h6"
                    sx={{
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontWeight: 600,
                        fontSize: { xs: '1.125rem', sm: '1.25rem' }
                    }}
                >
                    {t('reminders.title')}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Toggle Enable/Disable */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.05)',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography
                            sx={{
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontWeight: 500,
                                fontSize: { xs: '0.875rem', sm: '1rem' }
                            }}
                        >
                            {t('reminders.enable')}
                        </Typography>
                    </Box>
                    <Switch
                        checked={settings.enabled}
                        onChange={handleToggle}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#6C6FF9',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#6C6FF9',
                            },
                        }}
                    />
                </Box>

                {settings.enabled && (
                    <>
                        {/* Frequency Selection */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <CalendarToday sx={{ 
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                    fontSize: 20 
                                }} />
                                <Typography
                                    sx={{
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(39, 43, 62, 0.8)',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', sm: '0.95rem' }
                                    }}
                                >
                                    {t('reminders.frequency')}
                                </Typography>
                            </Box>
                            <FormControl 
                                fullWidth
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.15)' : 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: 2,
                                        '& fieldset': {
                                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : 'rgba(108, 111, 249, 0.2)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#6C6FF9',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#6C6FF9',
                                        },
                                    },
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                        fontSize: { xs: '0.875rem', sm: '0.95rem' },
                                    },
                                }}
                            >
                                <Select
                                    value={settings.frequency}
                                    onChange={handleFrequencyChange}
                                >
                                    <MenuItem value="daily">{t('reminders.frequencyDaily')}</MenuItem>
                                    <MenuItem value="every3days">{t('reminders.frequencyEvery3Days')}</MenuItem>
                                    <MenuItem value="weekly">{t('reminders.frequencyWeekly')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Time Picker */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <AccessTime sx={{ 
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                    fontSize: 20 
                                }} />
                                <Typography
                                    sx={{
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(39, 43, 62, 0.8)',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', sm: '0.95rem' }
                                    }}
                                >
                                    {t('reminders.time')}
                                </Typography>
                            </Box>
                            <Box
                                component="input"
                                type="time"
                                value={settings.time}
                                onChange={handleTimeChange}
                                sx={{
                                    width: '100%',
                                    p: 1.5,
                                    borderRadius: 2,
                                    border: `2px solid ${mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : 'rgba(108, 111, 249, 0.2)'}`,
                                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.15)' : 'rgba(255, 255, 255, 0.6)',
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    fontFamily: 'system-ui, sans-serif',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:focus': {
                                        borderColor: '#6C6FF9',
                                        boxShadow: `0 0 0 3px ${mode === 'dark' ? 'rgba(108, 111, 249, 0.2)' : 'rgba(108, 111, 249, 0.15)'}`,
                                    },
                                    '&:hover': {
                                        borderColor: '#6C6FF9',
                                        backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                                    },
                                }}
                            />
                        </Box>

                        {/* Test Notification Button */}
                        <Button
                            variant="outlined"
                            onClick={handleTestNotification}
                            startIcon={testNotificationSent ? <CheckCircle /> : <Notifications />}
                            sx={{
                                borderColor: '#6C6FF9',
                                color: '#6C6FF9',
                                borderRadius: 2,
                                py: 1.25,
                                fontSize: { xs: '0.875rem', sm: '0.95rem' },
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: '#6C6FF9',
                                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.2)' : 'rgba(108, 111, 249, 0.1)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(108, 111, 249, 0.3)',
                                },
                            }}
                        >
                            {testNotificationSent ? t('reminders.testNotificationSent') : t('reminders.testNotification')}
                        </Button>
                    </>
                )}
            </Box>
        </GlassCard>
    );
};

