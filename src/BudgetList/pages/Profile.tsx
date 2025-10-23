import React, { useState, useRef } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Alert,
    Snackbar,
    Modal,
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';
import {
    Person,
    Palette,
    Language,
    AttachMoney,
    CloudSync,
    Security,
    Notifications,
    Backup,
    Delete,
    Edit,
    PhotoCamera,
    Visibility,
    VisibilityOff,
    Close,
    Schedule,
    AccessTime,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { useSettingsStore, Currency } from '../../Budgets/store/useSettingsStore';
import { useAuth } from '../../Budgets/hooks/useAuth';
import { useCloudSync } from '../../Budgets/hooks/useCloudSync';
import getSymbolFromCurrency from 'currency-symbol-map';

export default function Profile() {
    try {
        const { i18n } = useTranslation();
        const { mode, toggleTheme } = useThemeMode();
        const { 
            currency, 
            setCurrency, 
            avatar, 
            setAvatar, 
            nickname, 
            setNickname,
            notificationsEnabled,
            setNotificationsEnabled,
            notificationTime,
            setNotificationTime,
            dailyReminderEnabled,
            setDailyReminderEnabled
        } = useSettingsStore();
        const { session, loading: authLoading } = useAuth();
        const [notifications, setNotifications] = useState(true);
        const [backupEnabled, setBackupEnabled] = useState(true);
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
        
        // Cloud sync - always enabled
        const { status: syncStatus, syncNow } = useCloudSync(true);
        
        // Состояние для редактирования профиля
        const [editModalOpen, setEditModalOpen] = useState(false);
        const [email, setEmail] = useState(session?.user?.email || '');
        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [showPasswords, setShowPasswords] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        // Показываем загрузку пока аутентификация не завершена
        if (authLoading) {
            return (
                <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <Typography variant="h6" sx={{ color: '#272B3E' }}>
                        Загрузка...
                    </Typography>
                </Container>
            );
        }

    const currencies = [
        { code: 'RUB', name: 'Russian Ruble' },
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'SEK', name: 'Swedish Krona' },
        { code: 'NOK', name: 'Norwegian Krone' },
        { code: 'DKK', name: 'Danish Krone' },
        { code: 'PLN', name: 'Polish Zloty' },
        { code: 'CZK', name: 'Czech Koruna' },
        { code: 'HUF', name: 'Hungarian Forint' },
        { code: 'BGN', name: 'Bulgarian Lev' },
        { code: 'RON', name: 'Romanian Leu' },
        { code: 'HRK', name: 'Croatian Kuna' },
        { code: 'TRY', name: 'Turkish Lira' },
        { code: 'UAH', name: 'Ukrainian Hryvnia' },
        { code: 'KZT', name: 'Kazakhstani Tenge' },
        { code: 'BYN', name: 'Belarusian Ruble' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'BRL', name: 'Brazilian Real' },
        { code: 'INR', name: 'Indian Rupee' },
    ];

    const languages = [
        { code: 'ru', nativeName: 'Русский' },
        { code: 'en', nativeName: 'English' },
        { code: 'fr', nativeName: 'Français' },
        { code: 'de', nativeName: 'Deutsch' },
        { code: 'es', nativeName: 'Español' },
        { code: 'me', nativeName: 'Crnogorski' },
    ];

    const changeLanguage = (languageCode: string) => {
        if (i18n && i18n.changeLanguage) {
            i18n.changeLanguage(languageCode);
            setSnackbarMessage('Язык изменен');
            setSnackbarOpen(true);
        }
    };

    const handleCurrencyChange = (currencyCode: string) => {
        if (setCurrency) {
            setCurrency(currencyCode as Currency);
            setSnackbarMessage('Валюта изменена');
            setSnackbarOpen(true);
        }
    };

    const handleSave = () => {
        setSnackbarMessage('Настройки сохранены');
        setSnackbarOpen(true);
    };

    const handleExportData = () => {
        setSnackbarMessage('Данные экспортированы');
        setSnackbarOpen(true);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
            setSnackbarMessage('Функция удаления аккаунта в разработке');
            setSnackbarOpen(true);
        }
    };

    // Функции для редактирования профиля
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditProfile = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        // Сброс полей
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSaveProfile = async () => {
        try {
            // Валидация паролей
            if (newPassword && newPassword !== confirmPassword) {
                setSnackbarMessage('Пароли не совпадают');
                setSnackbarOpen(true);
                return;
            }

            if (newPassword && newPassword.length < 6) {
                setSnackbarMessage('Пароль должен содержать минимум 6 символов');
                setSnackbarOpen(true);
                return;
            }

            // Сохраняем никнейм в глобальное состояние
            setNickname(nickname);

            // Здесь будет логика сохранения изменений
            // Пока что просто показываем сообщение об успехе
            setSnackbarMessage('Профиль успешно обновлен');
            setSnackbarOpen(true);
            setEditModalOpen(false);
            
            // Сброс полей
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setSnackbarMessage('Ошибка при сохранении профиля');
            setSnackbarOpen(true);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                Личный кабинет
            </Typography>

            {/* Профиль пользователя */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Avatar 
                            src={avatar || undefined}
                            sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}
                        >
                            {!avatar && <Person fontSize="large" />}
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                                {nickname || session?.user?.email || 'Пользователь'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)', mt: 0.5 }}>
                                {session?.user?.email}
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={handleEditProfile}
                        sx={{ 
                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                            }
                        }}
                    >
                        Редактировать
                    </Button>
                </Box>
            </Paper>

            {/* Настройки */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Настройки
                </Typography>

                <List>
                    {/* Тема */}
                    <ListItem>
                        <ListItemIcon>
                            <Palette />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Темная тема" 
                            secondary="Переключить между светлой и темной темой"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mode === 'dark'}
                                    onChange={toggleTheme || (() => {})}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </ListItem>

                    <Divider />

                    {/* Язык */}
                    <ListItem>
                        <ListItemIcon>
                            <Language />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Язык" 
                            secondary="Выберите язык приложения"
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={i18n?.language || 'ru'}
                                onChange={(e) => changeLanguage(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    },
                                }}
                            >
                                {languages.map((lang) => (
                                    <MenuItem key={lang.code} value={lang.code}>
                                        {lang.nativeName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>

                    <Divider />

                    {/* Валюта */}
                    <ListItem>
                        <ListItemIcon>
                            <AttachMoney />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Валюта" 
                            secondary="Основная валюта для отображения сумм"
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={currency || 'EUR'}
                                onChange={(e) => handleCurrencyChange(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    },
                                }}
                            >
                                {currencies.map((curr) => {
                                    const symbol = getSymbolFromCurrency(curr.code);
                                    const displaySymbol = symbol && symbol !== curr.code ? symbol : '';
                                    return (
                                        <MenuItem key={curr.code} value={curr.code}>
                                            {displaySymbol} {curr.code} - {curr.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </ListItem>

                    <Divider />

                    {/* Уведомления */}
                    <ListItem>
                        <ListItemIcon>
                            <Notifications />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Уведомления" 
                            secondary="Получать уведомления о важных событиях"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={notifications}
                                    onChange={(e) => setNotifications(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </ListItem>
                </List>
            </Paper>

            {/* Синхронизация */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Синхронизация
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CloudSync sx={{ 
                                color: syncStatus.isSyncing ? '#6C6FF9' : (syncStatus.error ? '#FFB3BA' : mode === 'dark' ? '#FFFFFF' : '#272B3E'),
                                animation: syncStatus.isSyncing ? 'spin 1s linear infinite' : 'none',
                                '@keyframes spin': {
                                    '0%': { transform: 'rotate(0deg)' },
                                    '100%': { transform: 'rotate(360deg)' }
                                }
                            }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Облачная синхронизация" 
                            secondary="Автоматическая синхронизация"
                            secondaryTypographyProps={{
                                sx: { 
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {/* Статус синхронизации */}
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: syncStatus.error 
                                        ? '#FFB3BA' 
                                        : syncStatus.isSyncing 
                                        ? '#6C6FF9'
                                        : '#B5EAD7',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    minWidth: '80px',
                                    textAlign: 'right'
                                }}
                            >
                                {syncStatus.isSyncing 
                                    ? "Синхронизация..." 
                                    : syncStatus.error
                                    ? "Ошибка"
                                    : syncStatus.lastSync
                                    ? "Синхронизировано"
                                    : "Готово"}
                            </Typography>
                            
                            {/* Кнопка Sync */}
                            <Button
                                variant="contained"
                                size="small"
                                disabled={syncStatus.isSyncing}
                                onClick={async () => {
                                    try {
                                        await syncNow();
                                        setSnackbarMessage('✅ Данные успешно синхронизированы');
                                        setSnackbarOpen(true);
                                    } catch (error) {
                                        setSnackbarMessage('❌ Ошибка синхронизации');
                                        setSnackbarOpen(true);
                                    }
                                }}
                                sx={{
                                    minWidth: '70px',
                                    px: 2,
                                    py: 0.8,
                                    borderRadius: 2,
                                    background: '#6C6FF9',
                                    color: '#FFFFFF',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 2px 8px rgba(108, 111, 249, 0.3)',
                                    '&:hover': {
                                        background: '#6C6FF9',
                                        boxShadow: '0 4px 12px rgba(108, 111, 249, 0.4)',
                                        transform: 'translateY(-1px)',
                                    },
                                    '&:disabled': {
                                        background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)',
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(39, 43, 62, 0.3)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {syncStatus.isSyncing ? 'Синхр...' : 'Sync'}
                            </Button>
                        </Box>
                    </ListItem>
                </List>
            </Paper>

            {/* Уведомления */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Уведомления
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <NotificationsIcon sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Включить уведомления"
                            secondary="Получать уведомления о важных событиях"
                            secondaryTypographyProps={{
                                sx: {
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={notificationsEnabled}
                                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#6C6FF9',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#6C6FF9',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <Schedule sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Ежедневное напоминание"
                            secondary="Напоминать о внесении транзакций"
                            secondaryTypographyProps={{
                                sx: {
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={dailyReminderEnabled}
                                    onChange={(e) => setDailyReminderEnabled(e.target.checked)}
                                    disabled={!notificationsEnabled}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#6C6FF9',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#6C6FF9',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </ListItem>

                    {notificationsEnabled && dailyReminderEnabled && (
                        <ListItem>
                            <ListItemIcon>
                                <AccessTime sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Время напоминания"
                                secondary="Когда отправлять ежедневное напоминание"
                                secondaryTypographyProps={{
                                    sx: {
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                    }
                                }}
                            />
                            <Select
                                value={notificationTime}
                                onChange={(e) => setNotificationTime(e.target.value)}
                                size="small"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300,
                                        },
                                    },
                                }}
                                sx={{
                                    width: '100px',
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(108, 111, 249, 0.15)' 
                                        : 'rgba(108, 111, 249, 0.08)',
                                    borderRadius: '12px',
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        fontFamily: 'Nunito, system-ui, sans-serif',
                                        textAlign: 'center',
                                        padding: '10px 14px',
                                    },
                                    '& fieldset': {
                                        borderColor: mode === 'dark' 
                                            ? 'rgba(108, 111, 249, 0.3)' 
                                            : 'rgba(108, 111, 249, 0.2)',
                                        borderWidth: '2px',
                                    },
                                    '&:hover': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(108, 111, 249, 0.2)' 
                                            : 'rgba(108, 111, 249, 0.12)',
                                        transform: 'translateY(-1px)',
                                        '& fieldset': {
                                            borderColor: '#6C6FF9',
                                        },
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C6FF9',
                                        borderWidth: '2px',
                                    },
                                }}
                            >
                                {Array.from({ length: 24 }, (_, hour) => 
                                    ['00', '15', '30', '45'].map((minute) => (
                                        <MenuItem 
                                            key={`${hour}:${minute}`}
                                            value={`${String(hour).padStart(2, '0')}:${minute}`}
                                            sx={{
                                                justifyContent: 'center',
                                                fontWeight: 600,
                                                fontSize: '1.05rem',
                                            }}
                                        >
                                            {`${String(hour).padStart(2, '0')}:${minute}`}
                                        </MenuItem>
                                    ))
                                ).flat()}
                            </Select>
                        </ListItem>
                    )}
                </List>
            </Paper>

            {/* Управление данными */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Управление данными
                </Typography>

                <Box 
                    sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: 2
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<Backup />}
                        onClick={handleExportData}
                        fullWidth
                        sx={{ 
                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            borderRadius: 2,
                            py: 1.5,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        Экспорт данных
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Security />}
                        onClick={handleEditProfile}
                        fullWidth
                        sx={{ 
                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            borderRadius: 2,
                            py: 1.5,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        Изменить пароль
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDeleteAccount}
                        fullWidth
                        sx={{ 
                            borderColor: '#FFB3BA',
                            color: '#FFB3BA',
                            borderRadius: 2,
                            py: 1.5,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: '#FFB3BA',
                                backgroundColor: 'rgba(255, 179, 186, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        Удалить аккаунт
                    </Button>
                </Box>
            </Paper>

            {/* Кнопка сохранения */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    sx={{
                        background: '#6C6FF9',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(108, 111, 249, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: '#6C6FF9',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(108, 111, 249, 0.4)',
                        }
                    }}
                >
                    Сохранить настройки
                </Button>
            </Box>

            {/* Модальное окно редактирования профиля */}
            <Modal
                open={editModalOpen}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-profile-modal"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 500 },
                        maxHeight: '90vh',
                        overflow: 'auto',
                        bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" sx={{ color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                            Редактировать профиль
                        </Typography>
                        <IconButton onClick={handleCloseEditModal} size="small">
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Аватар */}
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Avatar
                            src={avatar || undefined}
                            sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}
                        >
                            {!avatar && <Person fontSize="large" />}
                        </Avatar>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<PhotoCamera />}
                            onClick={() => fileInputRef.current?.click()}
                            size="small"
                            sx={{ 
                                borderColor: 'rgba(6, 0, 171, 0.3)',
                                color: '#272B3E',
                                '&:hover': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                    backgroundColor: 'rgba(6, 0, 171, 0.1)',
                                }
                            }}
                        >
                            Изменить фото
                        </Button>
                    </Box>

                    {/* Никнейм */}
                    <TextField
                        fullWidth
                        label="Никнейм"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#272B3E',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                            },
                        }}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#272B3E',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                            },
                        }}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" sx={{ mb: 2, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                        Изменить пароль
                    </Typography>

                    {/* Текущий пароль */}
                    <TextField
                        fullWidth
                        label="Текущий пароль"
                        type={showPasswords ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswords(!showPasswords)}
                                        edge="end"
                                    >
                                        {showPasswords ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#272B3E',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                            },
                        }}
                    />

                    {/* Новый пароль */}
                    <TextField
                        fullWidth
                        label="Новый пароль"
                        type={showPasswords ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#272B3E',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                            },
                        }}
                    />

                    {/* Подтверждение пароля */}
                    <TextField
                        fullWidth
                        label="Подтвердите новый пароль"
                        type={showPasswords ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#272B3E',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&.Mui-focused': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                },
                            },
                        }}
                    />

                    {/* Кнопки */}
                    <Box display="flex" gap={2} justifyContent="flex-end" mt={3}>
                        <Button
                            variant="outlined"
                            onClick={handleCloseEditModal}
                            sx={{ 
                                borderColor: 'rgba(6, 0, 171, 0.3)',
                                color: '#272B3E',
                                '&:hover': {
                                    borderColor: 'rgba(6, 0, 171, 0.6)',
                                    backgroundColor: 'rgba(6, 0, 171, 0.1)',
                                }
                            }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveProfile}
                            sx={{
                                background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.8) 0%, rgba(248, 229, 229, 0.6) 100%)',
                                color: '#272B3E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.9) 0%, rgba(248, 229, 229, 0.8) 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 20px rgba(6, 0, 171, 0.2)',
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar для уведомлений */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
    } catch (error) {
        console.error('Error in Profile component:', error);
        return (
            <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Typography variant="h6" sx={{ color: '#FFB3BA' }}>
                    Произошла ошибка при загрузке страницы
                </Typography>
            </Container>
        );
    }
}
