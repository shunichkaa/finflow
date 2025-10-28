import React, { useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ru, fr, de, es } from 'date-fns/locale';
import type { Locale } from 'date-fns';

// Import and register locales
import 'date-fns/locale/ru';
import 'date-fns/locale/fr';
import 'date-fns/locale/de';
import 'date-fns/locale/es';

// Set Montenegrin locale to Serbian (similar enough for date formatting)
const srLatnLocale = {
    ...ru,
    code: 'me',
    formatDistance: (...args: any[]) => ru.formatDistance(...args).replace(/ru/g, 'me')
} as Locale;
import { useTranslation } from "react-i18next";
import { useNotificationStore } from "../../../Budgets/store/useNotificationStore.ts";
import { useThemeMode } from "../../../Budgets/theme/ThemeContext";
import i18n from 'i18next';

const notificationTranslations = {
    ru: {
        notifications: {
            title: 'Уведомления',
            markAllAsRead: 'Прочитать все',
            noNotifications: 'Нет уведомлений'
        }
    },
    en: {
        notifications: {
            title: 'Notifications',
            markAllAsRead: 'Mark all as read',
            noNotifications: 'No notifications'
        }
    },
    fr: {
        notifications: {
            title: 'Notifications',
            markAllAsRead: 'Tout marquer comme lu',
            noNotifications: 'Aucune notification'
        }
    },
    de: {
        notifications: {
            title: 'Benachrichtigungen',
            markAllAsRead: 'Alle als gelesen markieren',
            noNotifications: 'Keine Benachrichtigungen'
        }
    },
    es: {
        notifications: {
            title: 'Notificaciones',
            markAllAsRead: 'Marcar todo como leído',
            noNotifications: 'No hay notificaciones'
        }
    },
    me: {
        notifications: {
            title: 'Obavještenja',
            markAllAsRead: 'Označi sve kao pročitano',
            noNotifications: 'Nema obavještenja'
        }
    }
};

// Add translations to i18n
Object.entries(notificationTranslations).forEach(([lang, translations]) => {
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
});

const locales: Record<string, Locale> = {
    en: enUS,
    ru,
    fr,
    de,
    es,
    me: ru
};

const normalizeLang = (lang: string) => lang.split('-')[0];
const getLocale = (lang: string): Locale => {
    const base = normalizeLang(lang);
    return locales[base] || enUS;
};

export const NotificationCenter: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();
    const { mode } = useThemeMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const locale = getLocale(i18n.language);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const handleMarkAll = () => {
        markAllAsRead();
        handleClose();
    };

    return (
        <Box>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    backgroundColor: 'transparent',
                    borderRadius: '50%',
                    width: {xs: 36, sm: 40},
                    height: {xs: 36, sm: 40},
                    minWidth: {xs: 36, sm: 40},
                    minHeight: {xs: 36, sm: 40},
                    padding: 0,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                        transform: 'scale(1.1)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                        transition: 'transform 0.1s ease',
                    },
                }}
            >
                <Badge
                    badgeContent={unreadCount}
                    variant={unreadCount > 0 ? "standard" : "dot"}
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: unreadCount > 0 ? '#FF3B3B' : '#6C6FF9',
                            color: '#FFFFFF',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(255, 59, 59, 0.4)',
                        }
                    }}
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            width: 340,
                            maxHeight: 400,
                            backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #EFF0F6',
                            borderRadius: 3,
                            boxShadow: mode === 'dark'
                                ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                                : '0 8px 24px rgba(39, 43, 62, 0.15)',
                        }
                    }
                }}
            >
                <Box px={2} py={1.5} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontSize: '1rem'
                        }}
                    >
                        {t('notifications.title')}
                    </Typography>
                    <Button
                        onClick={handleMarkAll}
                        size="small"
                        sx={{
                            color: '#6C6FF9',
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline',
                            }
                        }}
                    >
                        {t('notifications.markAllAsRead')}
                    </Button>
                </Box>
                <Divider sx={{ mb: 1 }} />

                {notifications.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)'
                            }}
                        >
                            {t('notifications.noNotifications')}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        {notifications.slice(0, 8).map((n) => (
                            <MenuItem
                                key={n.id}
                                onClick={() => {
                                    markAsRead(n.id);
                                    handleClose();
                                }}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    backgroundColor: !n.read
                                        ? mode === 'dark'
                                            ? 'rgba(108, 111, 249, 0.1)'
                                            : 'rgba(108, 111, 249, 0.05)'
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.08)'
                                            : 'rgba(108, 111, 249, 0.08)',
                                        '& .MuiTypography-root': {
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                                        }
                                    }
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Typography
                                        fontWeight={600}
                                        sx={{
                                            color: n.severity === 'error'
                                                ? '#FFB3BA'
                                                : n.severity === 'success'
                                                    ? '#B5EAD7'
                                                    : mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            mb: 0.5
                                        }}
                                    >
                                        {n.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                                            mb: 0.5
                                        }}
                                    >
                                        {n.message}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)'
                                        }}
                                    >
                                        {formatDistanceToNow(new Date(n.timestamp), {
                                            addSuffix: true,
                                            locale: locale
                                        })}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </Box>
                )}
            </Menu>
        </Box>
    );
};