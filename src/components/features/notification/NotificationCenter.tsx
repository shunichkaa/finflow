import React, { useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';
import {useNotificationStore} from "../../../Budgets/store/useNotificationStore.ts";
import {useThemeMode} from "../../../Budgets/theme/ThemeContext";

export const NotificationCenter: React.FC = () => {
    const {notifications, markAsRead, markAllAsRead, unreadCount} = useNotificationStore();
    const {mode} = useThemeMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#F5F5F5',
                    borderRadius: '20px', // Еще более скругленные углы
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    minHeight: 48,
                    padding: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: mode === 'dark' 
                        ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#E8E8E8',
                        transform: 'scale(1.05)',
                        boxShadow: mode === 'dark' 
                            ? '0 6px 16px rgba(0, 0, 0, 0.4)' 
                            : '0 6px 16px rgba(0, 0, 0, 0.15)',
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
                    <NotificationsIcon/>
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
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
                }}
            >
                <Box px={2} py={1.5} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography 
                        variant="subtitle1" 
                        fontWeight={600}
                        sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}
                    >
                        Уведомления
                    </Typography>
                    <Button 
                        onClick={handleMarkAll} 
                        size="small"
                        sx={{
                            color: '#6C6FF9',
                            fontSize: '0.75rem',
                            '&:hover': {
                                background: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.05)',
                            }
                        }}
                    >
                        Прочитать все
                    </Button>
                </Box>
                <Divider sx={{ borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6' }}/>

                {notifications.length === 0 ? (
                    <MenuItem disabled>
                        <Typography 
                            variant="body2"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)' }}
                        >
                            Нет уведомлений
                        </Typography>
                    </MenuItem>
                ) : (
                    notifications.slice(0, 8).map((n) => (
                        <MenuItem
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            sx={{
                                opacity: n.read ? 0.6 : 1,
                                whiteSpace: 'normal',
                                alignItems: 'flex-start',
                                py: 1.5,
                                borderRadius: 1,
                                mx: 0.5,
                                my: 0.25,
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#EFF0F6',
                                }
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography 
                                        fontWeight={600}
                                        sx={{
                                            color: n.severity === 'error' 
                                                ? '#FFB3BA' 
                                                : n.severity === 'success'
                                                ? '#B5EAD7'
                                                : mode === 'dark' ? '#FFFFFF' : '#272B3E'
                                        }}
                                    >
                                        {n.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography 
                                            variant="body2"
                                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }}
                                        >
                                            {n.message}
                                        </Typography>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)' }}
                                        >
                                            {formatDistanceToNow(n.timestamp, {addSuffix: true, locale: ru})}
                                        </Typography>
                                    </>
                                }
                            />
                        </MenuItem>
                    ))
                )}

                {notifications.length > 8 && (
                    <>
                        <Divider sx={{ borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6' }}/>
                        <MenuItem sx={{ justifyContent: 'center', py: 1 }}>
                            <Button 
                                fullWidth 
                                size="small" 
                                onClick={() => {/* open full page */}}
                                sx={{
                                    color: '#6C6FF9',
                                    fontWeight: 600,
                                    '&:hover': {
                                        background: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.05)',
                                    }
                                }}
                            >
                                Показать все
                            </Button>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </Box>
    );
};

// Отдельно — вариант страницы всех уведомлений:
export const NotificationsPage: React.FC = () => {
    const {notifications, markAsRead} = useNotificationStore();

    return (
        <Card sx={{borderRadius: 3, boxShadow: 2, maxWidth: 600, mx: 'auto', mt: 4}}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Все уведомления</Typography>
                <Divider sx={{mb: 2}}/>

                {notifications.map((n) => (
                    <Box key={n.id} mb={2} onClick={() => markAsRead(n.id)}>
                        <Typography fontWeight={600}>{n.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{n.message}</Typography>
                        <Typography variant="caption" color="text.disabled">
                            {formatDistanceToNow(n.timestamp, {addSuffix: true, locale: ru})}
                        </Typography>
                        <Divider sx={{mt: 1}}/>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};