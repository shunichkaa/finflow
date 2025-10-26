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
    Snackbar,
    Modal,
    TextField,
    IconButton
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
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { useSettingsStore, Currency } from '../../Budgets/store/useSettingsStore';
import { useAuth } from '../../Budgets/hooks/useAuth';
import { useCloudSync } from '../../Budgets/hooks/useCloudSync';
import { triggerSync } from '../../Budgets/utils/cloudSyncTrigger';
import { supabase } from '../../lib/supabaseClient';
import getSymbolFromCurrency from 'currency-symbol-map';
import IOSTimePicker from '../../components/ui/IOSTimePicker';

export default function Profile() {
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
        const [newEmail, setNewEmail] = useState('');
        const [_currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
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

    const _handleSave = () => {
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
                // Синхронизация аватарки с облаком
                setTimeout(() => triggerSync(), 100);
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
        setNewEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSaveProfile = async () => {
        try {
            // Проверка пароля
            if (newPassword) {
                if (newPassword.length < 6) {
                    setSnackbarMessage('Пароль должен содержать минимум 6 символов');
                    setSnackbarOpen(true);
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setSnackbarMessage('Пароли не совпадают');
                    setSnackbarOpen(true);
                    return;
                }
                
                // Обновление пароля через Supabase
                const { error: passwordError } = await supabase.auth.updateUser({
                    password: newPassword
                });
                
                if (passwordError) {
                    setSnackbarMessage(`Ошибка смены пароля: ${passwordError.message}`);
                    setSnackbarOpen(true);
                    return;
                }
                
                setSnackbarMessage('Пароль успешно изменён!');
                setSnackbarOpen(true);
            }

            // Проверка email
            if (newEmail && newEmail !== session?.user?.email) {
                // Обновление email через Supabase
                const { error: emailError } = await supabase.auth.updateUser({
                    email: newEmail
                });
                
                if (emailError) {
                    setSnackbarMessage(`Ошибка смены email: ${emailError.message}`);
                    setSnackbarOpen(true);
                    return;
                }
                
                setSnackbarMessage('Письмо с подтверждением отправлено на новый email!');
                setSnackbarOpen(true);
            }

            // Если никаких изменений не было
            if (!newPassword && !newEmail) {
                setSnackbarMessage('Изменения сохранены');
                setSnackbarOpen(true);
            }

            // Закрываем модальное окно после небольшой задержки
            setTimeout(() => {
                handleCloseEditModal();
            }, 1500);
        } catch (error) {
            console.error('Error saving profile:', error);
            setSnackbarMessage('Произошла ошибка при сохранении');
            setSnackbarOpen(true);
        }
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
                                    } catch (_error) {
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
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, minHeight: 300 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E' }}>
                    Настройки
                </Typography>

                <List>
                    {/* Тема */}
                    <ListItem sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        py: 2,
                        px: 0,
                        flexWrap: 'nowrap'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 }, mr: 1 }}>
                                <Palette sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Темная тема" 
                                secondary="Переключить между светлой и темной темой"
                                primaryTypographyProps={{
                                    sx: { fontSize: { xs: '0.95rem', sm: '1rem' } }
                                }}
                                secondaryTypographyProps={{
                                    sx: { 
                                        display: { xs: 'none', sm: 'block' },
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                    }
                                }}
                                sx={{ flex: 1, minWidth: 0 }}
                            />
                        </Box>
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme || (() => {})}
                            sx={{
                                flexShrink: 0,
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                                },
                            }}
                        />
                    </ListItem>

                    <Divider />

                    {/* Язык */}
                    <ListItem sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        py: 2,
                        px: 0,
                        flexWrap: 'nowrap'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 }, mr: 1 }}>
                                <Language sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Язык" 
                                secondary="Выберите язык приложения"
                                secondaryTypographyProps={{
                                    sx: {
                                        display: { xs: 'none', sm: 'block' },
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                    }
                                }}
                                sx={{ flex: 1, minWidth: 0 }}
                            />
                        </Box>
                        <FormControl size="small" sx={{ minWidth: { xs: 100, sm: 120 }, flexShrink: 0 }}>
                            <Select
                                value={i18n?.language || 'ru'}
                                onChange={(e) => changeLanguage(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                        fontSize: { xs: '0.85rem', sm: '0.9rem' }
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
                    <ListItem sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        py: 2,
                        px: 0,
                        flexWrap: 'nowrap'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 }, mr: 1 }}>
                                <AttachMoney sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Валюта" 
                                secondary="Основная валюта для отображения сумм"
                                secondaryTypographyProps={{
                                    sx: {
                                        display: { xs: 'none', sm: 'block' },
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                    }
                                }}
                                sx={{ flex: 1, minWidth: 0 }}
                            />
                        </Box>
                        <FormControl size="small" sx={{ minWidth: { xs: 100, sm: 120 }, flexShrink: 0 }}>
                            <Select
                                value={currency || 'EUR'}
                                onChange={(e) => handleCurrencyChange(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                        fontSize: { xs: '0.85rem', sm: '0.9rem' }
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
                    <ListItem sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        py: 2,
                        px: 0,
                        flexWrap: 'nowrap'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 }, mr: 1 }}>
                                <NotificationsIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Включить уведомления"
                                secondary="Получать уведомления о важных событиях"
                                primaryTypographyProps={{
                                    sx: { fontSize: { xs: '0.95rem', sm: '1rem' } }
                                }}
                                secondaryTypographyProps={{
                                    sx: {
                                        display: { xs: 'none', sm: 'block' },
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                    }
                                }}
                                sx={{ flex: 1, minWidth: 0 }}
                            />
                        </Box>
                        <Switch
                            checked={notificationsEnabled}
                            onChange={(e) => {
                                const enabled = e.target.checked;
                                setNotificationsEnabled(enabled);
                                if (!enabled) {
                                    setDailyReminderEnabled(false);
                                }
                                setTimeout(() => triggerSync(), 100);
                            }}
                            sx={{
                                flexShrink: 0,
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#6C6FF9',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#6C6FF9',
                                },
                            }}
                        />
                    </ListItem>

                    <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 2, py: 2 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            flexWrap: 'nowrap'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 }, mr: 1 }}>
                                    <Schedule sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Ежедневное напоминание"
                                    secondary="Напоминать о внесении транзакций"
                                    secondaryTypographyProps={{
                                        sx: {
                                            display: { xs: 'none', sm: 'block' },
                                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                        }
                                    }}
                                    sx={{ flex: 1, minWidth: 0 }}
                                />
                            </Box>
                            <Switch
                                checked={dailyReminderEnabled}
                                onChange={(e) => {
                                    setDailyReminderEnabled(e.target.checked);
                                    setTimeout(() => triggerSync(), 100);
                                }}
                                disabled={!notificationsEnabled}
                                sx={{
                                    flexShrink: 0,
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#6C6FF9',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#6C6FF9',
                                    },
                                }}
                            />
                        </Box>

                        {notificationsEnabled && dailyReminderEnabled && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 7, pr: 2 }}>
                                <Typography sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)', fontSize: '0.9rem' }}>
                                    Время напоминания
                                </Typography>
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
                            } catch (_error) {
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
                        <IconButton 
                            onClick={handleCloseEditModal} 
                            size="small"
                            sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                                '&:hover': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)',
                                }
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Аватар */}
                    <Box mb={3} display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <Avatar
                            src={avatar || undefined}
                            sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}
                        >
                            {!avatar && <Person fontSize="large" />}
                        </Avatar>
                        </Box>
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
                            sx={{ 
                                maxWidth: 250,
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                '&:hover': {
                                    borderColor: '#6C6FF9',
                                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                }
                            }}
                        >
                            Изменить фото
                        </Button>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="center">
                    {/* Никнейм */}
                    <TextField
                        label="Никнейм"
                        value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                                // Синхронизация nickname с облаком
                                setTimeout(() => triggerSync(), 500);
                            }}
                        margin="normal"
                        sx={{
                                maxWidth: 350,
                                width: '100%',
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
                    </Box>

                    {/* Divider для визуального разделения */}
                    <Divider sx={{ my: 3, borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)' }}>
                        <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)' }}>
                            Безопасность
                        </Typography>
                    </Divider>

                    <Box display="flex" flexDirection="column" alignItems="center">
                        {/* Email */}
                        <TextField
                            label="Новый Email (опционально)"
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder={session?.user?.email}
                            margin="normal"
                            helperText="Подтверждение будет отправлено на старый email"
                            sx={{
                                maxWidth: 350,
                                width: '100%',
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
                            label="Новый пароль (опционально)"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            margin="normal"
                            helperText="Минимум 6 символов"
                            sx={{
                                maxWidth: 350,
                                width: '100%',
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
                                    color: mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
                                    '&.Mui-focused': {
                                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    },
                                },
                            }}
                        />

                        {/* Подтверждение пароля */}
                        {newPassword && (
                            <TextField
                                label="Подтвердите новый пароль"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                margin="normal"
                                error={newPassword !== confirmPassword && confirmPassword.length > 0}
                                helperText={newPassword !== confirmPassword && confirmPassword.length > 0 ? "Пароли не совпадают" : ""}
                                sx={{
                                    maxWidth: 350,
                                    width: '100%',
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
                        )}
                    </Box>

                    {/* Кнопки */}
                    <Box display="flex" gap={2} justifyContent="flex-end" mt={3}>
                        <Button
                            variant="outlined"
                            onClick={handleCloseEditModal}
                            sx={{
                                borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(39, 43, 62, 0.3)',
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                                fontWeight: 'bold',
                                '&:hover': {
                                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)',
                                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(39, 43, 62, 0.05)',
                                }
                            }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveProfile}
                            sx={{
                                background: 'linear-gradient(135deg, #6C6FF9 0%, #A8A3F6 100%)',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5B5EE8 0%, #9794E5 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 20px rgba(108, 111, 249, 0.4)',
                                }
                            }}
                        >
                            Сохранить изменения
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
}

