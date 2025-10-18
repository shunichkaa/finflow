import React, {useState} from 'react';
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

export const NotificationCenter: React.FC = () => {
    const {notifications, markAsRead, markAllAsRead, unreadCount} = useNotificationStore();
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
            <IconButton color="inherit" onClick={handleOpen}>
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon/>
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{sx: {width: 340, maxHeight: 400}}}
            >
                <Box px={2} py={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={600}>
                        Уведомления
                    </Typography>
                    <Button onClick={handleMarkAll} size="small">Отметить все прочитанными</Button>
                </Box>
                <Divider/>

                {notifications.length === 0 ? (
                    <MenuItem disabled>
                        <Typography variant="body2">Нет уведомлений</Typography>
                    </MenuItem>
                ) : (
                    notifications.slice(0, 8).map((n) => (
                        <MenuItem
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            sx={{
                                opacity: n.read ? 0.6 : 1,
                                whiteSpace: 'normal',
                                alignItems: 'flex-start'
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography fontWeight={600}
                                                color={n.severity === 'error' ? 'error.main' : undefined}>
                                        {n.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body2">{n.message}</Typography>
                                        <Typography variant="caption" color="text.secondary">
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
                        <Divider/>
                        <MenuItem>
                            <Button fullWidth size="small" onClick={() => {/* open full page */
                            }}>
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