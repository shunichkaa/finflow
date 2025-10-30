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
                return mode === 'dark' ? '#FF6B6B1A' : '#FF6B6B0D';
            } else if (severity === 'warning') {
                return mode === 'dark' ? '#FFD1661A' : '#FFD1660D';
            } else if (severity === 'success') {
                return mode === 'dark' ? '#06D6A01A' : '#06D6A00D';
            }
            return mode === 'dark' ? '#6C6FF91A' : '#6C6FF90D';
        }
        return 'transparent';
    };

    return (
        <Box>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                    backgroundColor: mode === 'dark' ? '#FFFFFF0D' : '#272B3E08',
                    borderRadius: '12px',
                    width: { xs: 44, sm: 48 },
                    height: { xs: 44, sm: 48 },
                    minWidth: { xs: 44, sm: 48 },
                    minHeight: { xs: 44, sm: 48 },
                    padding: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: mode === 'dark'
                        ? '1px solid #FFFFFF1A'
                        : '1px solid #272B3E14',
                    '&:hover': {
                        backgroundColor: mode === 'dark'
                            ? '#6C6FF933'
                            : '#6C6FF914',
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'dark'
                            ? '0 8px 25px #6C6FF94D'
                            : '0 8px 25px #6C6FF926',
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
                            boxShadow: `0 2px 8px ${unreadCount > 0 ? '#FF3B3B66' : '#6C6FF966'}`,
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
                                ? '1px solid #FFFFFF1F'
                                : '1px solid #EFF0F6',
                            borderRadius: 3,
                            boxShadow: mode === 'dark'
                                ? '0 12px 40px #00000080, inset 0 1px 0 #FFFFFF1A'
                                : '0 12px 40px #272B3E26, inset 0 1px 0 #FFFFFFCC',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '1px',
                                background: mode === 'dark'
                                    ? 'linear-gradient(90deg, transparent, #6C6FF980, transparent)'
                                    : 'linear-gradient(90deg, transparent, #6C6FF94D, transparent)',
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
                                    ? '#6C6FF91A'
                                    : '#6C6FF90D',
                                '&:hover': {
                                    backgroundColor: mode === 'dark'
                                        ? '#6C6FF933'
                                        : '#6C6FF91A',
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            {t('notifications.markAllAsRead')}
                        </Button>
                    )}
                </Box>
                <Divider sx={{
                    borderColor: mode === 'dark' ? '#FFFFFF1A' : '#272B3E1A',
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
                                    ? '#6C6FF91A'
                                    : '#6C6FF90D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                            }}
                        >
                            <NotificationsIcon
                                sx={{
                                    fontSize: 28,
                                    color: mode === 'dark' ? '#6C6FF980' : '#6C6FF966'
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: mode === 'dark' ? '#FFFFFFB3' : '#272B3E99',
                                fontWeight: 600,
                                mb: 0.5
                            }}
                        >
                            {t('notifications.noNotifications')}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: mode === 'dark' ? '#FFFFFF80' : '#272B3E66'
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
                                            ? '#FFFFFF14'
                                            : '#6C6FF914',
                                        transform: 'translateX(4px)',
                                    },
                                    '&:not(:last-child)': {
                                        borderBottom: mode === 'dark'
                                            ? '1px solid #FFFFFF0D'
                                            : '1px solid #272B3E0D'
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
                                                    color: mode === 'dark' ? '#FFFFFFCC' : '#272B3ECC',
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
                                                    color: mode === 'dark' ? '#FFFFFF80' : '#272B3E80',
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