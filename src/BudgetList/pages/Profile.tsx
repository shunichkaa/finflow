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
    Backup,
    Delete,
    Edit,
    PhotoCamera,
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
import IOSTimePicker from '../../components/ui/IOSTimePicker';

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
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
        
        // Cloud sync - always enabled
        const { status: syncStatus, syncNow, loadFromCloud } = useCloudSync(true);
        
        // Состояние для редактирования профиля
        const [editModalOpen, setEditModalOpen] = useState(false);
        const [timePickerOpen, setTimePickerOpen] = useState(false);
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

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                Профиль
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

            {/* Синхронизация */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Синхронизация
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CloudSync sx={{ 
                                color: syncStatus.isSyncing ? '#6C6FF9' : (syncStatus.error ? '#FF3B3B' : mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'),
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

            {/* Настройки */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Настройки
                </Typography>

                <List>
                    {/* Тема */}
                    <ListItem>
                        <ListItemIcon>
                            <Palette sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
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
                            <Language sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
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
                            <AttachMoney sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
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
                            <NotificationsIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
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

                    <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                                <Schedule sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
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
                        </Box>

                        {notificationsEnabled && dailyReminderEnabled && (
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 7 }}>
                                <ListItemText 
                                    primary="Время напоминания"
                                    secondary="Когда отправлять ежедневное напоминание"
                                    secondaryTypographyProps={{
                                        sx: {
                                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                        }
                                    }}
                                />
                            <Box 
                                onClick={() => setTimePickerOpen(true)}
                                sx={{ 
                                    display: 'inline-flex', 
                                    gap: 1, 
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                {/* Визуальное отображение часов */}
                                <Box
                                    sx={{
                                        width: '60px',
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(108, 111, 249, 0.15)' 
                                            : 'rgba(108, 111, 249, 0.08)',
                                        borderRadius: '12px',
                                        border: `2px solid ${mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : 'rgba(108, 111, 249, 0.2)'}`,
                                        padding: '10px 8px',
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(108, 111, 249, 0.2)' 
                                                : 'rgba(108, 111, 249, 0.12)',
                                            transform: 'translateY(-1px)',
                                            borderColor: '#6C6FF9',
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            fontFamily: 'Nunito, system-ui, sans-serif',
                                        }}
                                    >
                                        {notificationTime.split(':')[0]}
                                    </Typography>
                                </Box>

                                {/* Разделитель */}
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                        fontWeight: 600,
                                    }}
                                >
                                    :
                                </Typography>

                                {/* Визуальное отображение минут */}
                                <Box
                                    sx={{
                                        width: '60px',
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(108, 111, 249, 0.15)' 
                                            : 'rgba(108, 111, 249, 0.08)',
                                        borderRadius: '12px',
                                        border: `2px solid ${mode === 'dark' ? 'rgba(108, 111, 249, 0.3)' : 'rgba(108, 111, 249, 0.2)'}`,
                                        padding: '10px 8px',
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(108, 111, 249, 0.2)' 
                                                : 'rgba(108, 111, 249, 0.12)',
                                            transform: 'translateY(-1px)',
                                            borderColor: '#6C6FF9',
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            fontFamily: 'Nunito, system-ui, sans-serif',
                                        }}
                                    >
                                        {notificationTime.split(':')[1]}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        )}
                    </ListItem>
                </List>
            </Paper>

            {/* Управление данными */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Управление данными
                </Typography>

                <Box 
                    sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<CloudSync />}
                        onClick={async () => {
                            try {
                                await loadFromCloud();
                                setSnackbarMessage('✅ Данные успешно загружены из облака');
                                setSnackbarOpen(true);
                            } catch (error) {
                                setSnackbarMessage('❌ Ошибка загрузки данных');
                                setSnackbarOpen(true);
                            }
                        }}
                        sx={{ 
                            flex: '1 1 auto',
                            minWidth: '200px',
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
                        Загрузить из облака
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Backup />}
                        onClick={handleExportData}
                        sx={{ 
                            flex: '1 1 auto',
                            minWidth: '200px',
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
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDeleteAccount}
                        sx={{ 
                            flex: '1 1 auto',
                            minWidth: '200px',
                            borderColor: '#FF3B3B',
                            color: '#FF3B3B',
                            borderRadius: 2,
                            py: 1.5,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: '#FF3B3B',
                                backgroundColor: 'rgba(255, 59, 59, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        Удалить аккаунт
                    </Button>
                </Box>
            </Paper>

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

                    {/* Кнопки */}
                    <Box display="flex" gap={2} justifyContent="flex-end" mt={3}>
                        <Button
                            variant="contained"
                            onClick={handleCloseEditModal}
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
                            Закрыть
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

            {/* iOS Time Picker */}
            <IOSTimePicker
                open={timePickerOpen}
                onClose={() => setTimePickerOpen(false)}
                value={notificationTime}
                onChange={setNotificationTime}
            />
        </Container>
    );
    } catch (error) {
        console.error('Error in Profile component:', error);
        return (
            <Container maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Box sx={{ 
                    textAlign: 'center',
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 59, 59, 0.1)',
                    border: '2px solid #FF3B3B'
                }}>
                    <Typography variant="h3" sx={{ color: '#FF3B3B', mb: 2, fontWeight: 700 }}>
                        ⚠️
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#FF3B3B', fontWeight: 600 }}>
                    Произошла ошибка при загрузке страницы
                </Typography>
                    <Typography variant="body1" sx={{ color: '#FF3B3B', mt: 2, opacity: 0.8 }}>
                        Попробуйте перезагрузить страницу
                    </Typography>
                </Box>
            </Container>
        );
    }
}
