import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Switch,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Alert
} from '@mui/material';
import {
    Bell,
    Clock,
    CalendarToday,
    CheckCircle
} from '@mui/icons-material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { GlassCard } from '../ui/GlassCard';

export type ReminderFrequency = 'daily' | 'every3days' | 'weekly';

interface ReminderSettingsData {
    enabled: boolean;
    frequency: ReminderFrequency;
    time: string;
}

interface ReminderSettingsProps {
    onSettingsChange?: (settings: ReminderSettingsData) => void;
}

const REMINDER_MESSAGES = [
    "Эй, твой кошелек скучает! Внеси расходы 💰",
    "Время признаться, на что ты потратился сегодня 👀",
    "Деньги не считают себя сами, знаешь ли 🤑",
    "Пссс... забыл внести данные? Я помню всё 📊",
    "Твой бюджет хочет с тобой поговорить 💬",
    "Финансовый детектив на связи! Где расходы? 🕵️",
    "Не будь как все, веди учёт! 🚀",
    "Кто не ведёт учёт - тот не знает куда деньги ушли 🤷",
    "Минутка честности: сколько потратил? 💳",
    "Время обновить финансовую карму ✨",
    "Сэр, ваши транзакции не внесут себя сами ⚡",
    "Breaking news: твой бюджет требует внимания 📰",
    "Чем дольше откладываешь - тем больше забудешь 🧠",
    "Ваш личный бухгалтер напоминает... (это вы сами) 🤓",
    "Danger zone! Данные устарели! ⚠️",
    "Кажется, кто-то тратит деньги и молчит... 🤐",
    "Финансовый детокс начинается с учёта 🧘",
    "Alexa, внеси расходы! Ой, это не работает так... 🤖",
];

const EMOJI_POOL = ['💰', '💸', '💵', '💴', '💶', '💷', '💳', '📊', '📈', '📉', '💼', '🎯', '🔥', '⚡', '✨', '🚀', '🎉', '💪', '🤔', '😎', '🕵️', '📱', '💬', '👀', '🤷', '🧠', '🤖', '🧘', '⚠️', '📰'];

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({ onSettingsChange }) => {
    const { mode } = useThemeMode();
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

    const handleFrequencyChange = (event: any) => {
        setSettings(prev => ({ ...prev, frequency: event.target.value as ReminderFrequency }));
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings(prev => ({ ...prev, time: event.target.value }));
    };

    const getRandomMessage = (): string => {
        const randomMessage = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
        const randomEmoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
        return `${randomMessage} ${randomEmoji}`;
    };

    const handleTestNotification = async () => {
        if (!('Notification' in window)) {
            alert('Ваш браузер не поддерживает уведомления');
            return;
        }

        if (Notification.permission === 'denied') {
            alert('Разрешение на уведомления отклонено. Проверьте настройки браузера.');
            return;
        }

        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Необходимо разрешение для отправки уведомлений');
                return;
            }
        }

        const testMessage = getRandomMessage();
        
        try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                
                await registration.showNotification('FinFlow - Напоминание', {
                    body: testMessage,
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'test-reminder',
                    requireInteraction: false,
                    vibrate: [200, 100, 200],
                    data: {
                        url: window.location.origin
                    }
                });
            } else {
                new Notification('FinFlow - Напоминание', {
                    body: testMessage,
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'test-reminder',
                });
            }
            
            setTestNotificationSent(true);
            setTimeout(() => setTestNotificationSent(false), 3000);
        } catch (error) {
            console.error('Ошибка отправки тестового уведомления:', error);
            alert('Не удалось отправить уведомление. Проверьте консоль для деталей.');
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
                    Ваш браузер не поддерживает push-уведомления. Используйте современный браузер для этой функции.
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
                <Bell sx={{ 
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
                    Напоминания
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
                            Включить напоминания
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
                                    Частота
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
                                    <MenuItem value="daily">Каждый день</MenuItem>
                                    <MenuItem value="every3days">Каждые 3 дня</MenuItem>
                                    <MenuItem value="weekly">Раз в неделю</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Time Picker */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <Clock sx={{ 
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
                                    Время
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
                            startIcon={testNotificationSent ? <CheckCircle /> : <Bell />}
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
                            {testNotificationSent ? 'Отправлено!' : 'Тестовое уведомление'}
                        </Button>
                    </>
                )}
            </Box>
        </GlassCard>
    );
};

