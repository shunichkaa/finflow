import React, { useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ru, fr, de, es } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import 'date-fns/locale/ru';
import 'date-fns/locale/fr';
import 'date-fns/locale/de';
import 'date-fns/locale/es';
import { useTranslation } from "react-i18next";
import { useNotificationStore } from "../../../Budgets/store/useNotificationStore.ts";
import { useThemeMode } from "../../../Budgets/theme/ThemeContext";

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
    const { t, i18n: i18nCtx } = useTranslation();
    const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();
    const { mode } = useThemeMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const locale = getLocale(i18nCtx.language);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const handleMarkAll = () => {
        markAllAsRead();
        handleClose();
    };

    const handleNotificationClick = (notificationId: string) => {
        markAsRead(notificationId);
        handleClose();
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'error':
                return '#FF6B6B';
            case 'warning':
                return '#FFD166';
            case 'success':
                return '#06D6A0';
            case 'info':
                return '#6C6FF9';
            default:
                return mode === 'dark' ? '#FFFFFF' : '#272B3E';
        }
    };

    const getNotificationBackground = (read: boolean, severity: string) => {
        if (!read) {
            if (severity === 'error') {
                return mode === 'dark' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 107, 107, 0.05)';
            } else if (severity === 'warning') {
                return mode === 'dark' ? 'rgba(255, 209, 102, 0.1)' : 'rgba(255, 209, 102, 0.05)';
            } else if (severity === 'success') {
                return mode === 'dark' ? 'rgba(6, 214, 160, 0.1)' : 'rgba(6, 214, 160, 0.05)';
            }
            return mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.05)';
        }
        return 'transparent';
    };

    return (
        <Box>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(39, 43, 62, 0.03)',
                    borderRadius: '12px',
                    width: { xs: 44, sm: 48 },
                    height: { xs: 44, sm: 48 },
                    minWidth: { xs: 44, sm: 48 },
                    minHeight: { xs: 44, sm: 48 },
                    padding: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(39, 43, 62, 0.08)',
                    '&:hover': {
                        backgroundColor: mode === 'dark'
                            ? 'rgba(108, 111, 249, 0.2)'
                            : 'rgba(108, 111, 249, 0.08)',
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 25px rgba(108, 111, 249, 0.3)'
                            : '0 8px 25px rgba(108, 111, 249, 0.15)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
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
                            fontSize: '0.7rem',
                            minWidth: 20,
                            height: 20,
                            borderRadius: 10,
                            boxShadow: `0 2px 8px ${unreadCount > 0 ? 'rgba(255, 59, 59, 0.4)' : 'rgba(108, 111, 249, 0.4)'}`,
                            ...(unreadCount > 0 && {
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                    '0%': { transform: 'scale(1)' },
                                    '50%': { transform: 'scale(1.1)' },
                                    '100%': { transform: 'scale(1)' }
                                }
                            })
                        }
                    }}
                >
                    <NotificationsIcon
                        sx={{
                            fontSize: { xs: 20, sm: 22 },
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                        }}
                    />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            width: 380,
                            maxHeight: 480,
                            backgroundColor: mode === 'dark' ? '#1E2235' : '#FFFFFF',
                            border: mode === 'dark'
                                ? '1px solid rgba(255, 255, 255, 0.12)'
                                : '1px solid #EFF0F6',
                            borderRadius: 3,
                            boxShadow: mode === 'dark'
                                ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                : '0 12px 40px rgba(39, 43, 62, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '1px',
                                background: mode === 'dark'
                                    ? 'linear-gradient(90deg, transparent, rgba(108, 111, 249, 0.5), transparent)'
                                    : 'linear-gradient(90deg, transparent, rgba(108, 111, 249, 0.3), transparent)',
                            }
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box px={2.5} py={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            fontSize: '1.1rem'
                        }}
                    >
                        {t('notifications.title')}
                    </Typography>
                    {unreadCount > 0 && (
                        <Button
                            onClick={handleMarkAll}
                            size="small"
                            sx={{
                                color: '#6C6FF9',
                                textTransform: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                p: '4px 8px',
                                borderRadius: 2,
                                minWidth: 'auto',
                                backgroundColor: mode === 'dark'
                                    ? 'rgba(108, 111, 249, 0.1)'
                                    : 'rgba(108, 111, 249, 0.05)',
                                '&:hover': {
                                    backgroundColor: mode === 'dark'
                                        ? 'rgba(108, 111, 249, 0.2)'
                                        : 'rgba(108, 111, 249, 0.1)',
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            {t('notifications.markAllAsRead')}
                        </Button>
                    )}
                </Box>
                <Divider sx={{
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)',
                    mb: 1
                }} />

                {notifications.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                backgroundColor: mode === 'dark'
                                    ? 'rgba(108, 111, 249, 0.1)'
                                    : 'rgba(108, 111, 249, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                            }}
                        >
                            <NotificationsIcon
                                sx={{
                                    fontSize: 28,
                                    color: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.4)'
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                fontWeight: 600,
                                mb: 0.5
                            }}
                        >
                            {t('notifications.noNotifications')}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.4)'
                            }}
                        >
                            {t('notifications.noNotificationsDesc', 'Новых уведомлений нет')}
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ maxHeight: 360, overflow: 'auto' }}>
                        {notifications.slice(0, 10).map((notification) => (
                            <MenuItem
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification.id)}
                                sx={{
                                    py: 2,
                                    px: 2.5,
                                    backgroundColor: getNotificationBackground(notification.read, notification.severity),
                                    borderLeft: !notification.read ? `3px solid ${getSeverityColor(notification.severity)}` : 'none',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.08)'
                                            : 'rgba(108, 111, 249, 0.08)',
                                        transform: 'translateX(4px)',
                                    },
                                    '&:not(:last-child)': {
                                        borderBottom: mode === 'dark'
                                            ? '1px solid rgba(255, 255, 255, 0.05)'
                                            : '1px solid rgba(39, 43, 62, 0.05)'
                                    }
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Box display="flex" alignItems="flex-start" gap={1.5}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: getSeverityColor(notification.severity),
                                                mt: 0.5,
                                                flexShrink: 0
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                fontWeight={!notification.read ? 700 : 600}
                                                sx={{
                                                    color: getSeverityColor(notification.severity),
                                                    mb: 0.5,
                                                    fontSize: '0.9rem',
                                                    lineHeight: 1.3
                                                }}
                                            >
                                                {notification.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(39, 43, 62, 0.8)',
                                                    mb: 1,
                                                    lineHeight: 1.4,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {notification.message}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {formatDistanceToNow(new Date(notification.timestamp), {
                                                    addSuffix: true,
                                                    locale: locale
                                                })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                    </Box>
                )}
            </Menu>
        </Box>
    );
};