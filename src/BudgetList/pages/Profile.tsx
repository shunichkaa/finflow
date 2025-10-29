import {useRef, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Modal,
    Paper,
    Select,
    Snackbar,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import {
    AttachMoney,
    Backup,
    Close,
    CloudSync,
    Delete,
    Edit,
    Language,
    Notifications as NotificationsIcon,
    Palette,
    Person,
    PhotoCamera,
    Schedule
} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';
import {useThemeMode} from '../../Budgets/theme/ThemeContext';
import {Currency, useSettingsStore} from '../../Budgets/store/useSettingsStore';
import {useAuth} from '../../Budgets/hooks/useAuth';
import {useCloudSync} from '../../Budgets/hooks/useCloudSync';
import {triggerSync} from '../../Budgets/utils/cloudSyncTrigger';
import {supabase} from '../../lib/supabaseClient';
import getSymbolFromCurrency from 'currency-symbol-map';
import IOSTimePicker from '../../components/ui/IOSTimePicker';

export default function Profile() {
    const {t, i18n} = useTranslation();
    const {mode, toggleTheme} = useThemeMode();
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
    const {session, loading: authLoading} = useAuth();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const {status: syncStatus, syncNow, loadFromCloud} = useCloudSync(true);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [_currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (authLoading) {
        return (
            <Container maxWidth="md"
                       sx={{py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
                <Typography variant="h6" sx={{color: '#272B3E'}}>
                    {t('loading')}
                </Typography>
            </Container>
        );
    }

    const currencies = [
        {code: 'RUB', name: t('currencies.ruble', 'Russian Ruble')},
        {code: 'USD', name: t('currencies.dollar', 'US Dollar')},
        {code: 'EUR', name: t('currencies.euro', 'Euro')},
        {code: 'GBP', name: t('currencies.pound', 'British Pound')},
        {code: 'JPY', name: t('currencies.yen', 'Japanese Yen')},
        {code: 'CAD', name: t('currencies.cad', 'Canadian Dollar')},
        {code: 'AUD', name: t('currencies.aud', 'Australian Dollar')},
        {code: 'CHF', name: t('currencies.franc', 'Swiss Franc')},
        {code: 'CNY', name: t('currencies.yuan', 'Chinese Yuan')},
        {code: 'SEK', name: t('currencies.krona', 'Swedish Krona')},
        {code: 'NOK', name: t('currencies.krone', 'Norwegian Krone')},
        {code: 'DKK', name: t('currencies.kroneDKK', 'Danish Krone')},
        {code: 'PLN', name: t('currencies.zloty', 'Polish Zloty')},
        {code: 'CZK', name: t('currencies.koruna', 'Czech Koruna')},
        {code: 'HUF', name: t('currencies.forint', 'Hungarian Forint')},
        {code: 'BGN', name: t('currencies.lev', 'Bulgarian Lev')},
        {code: 'RON', name: t('currencies.leu', 'Romanian Leu')},
        {code: 'HRK', name: t('currencies.kuna', 'Croatian Kuna')},
        {code: 'TRY', name: t('currencies.lira', 'Turkish Lira')},
        {code: 'UAH', name: t('currencies.hryvnia', 'Ukrainian Hryvnia')},
        {code: 'KZT', name: t('currencies.tenge', 'Kazakhstani Tenge')},
        {code: 'BYN', name: t('currencies.byn', 'Belarusian Ruble')},
        {code: 'MXN', name: t('currencies.peso', 'Mexican Peso')},
        {code: 'BRL', name: t('currencies.real', 'Brazilian Real')},
        {code: 'INR', name: t('currencies.rupee', 'Indian Rupee')},
    ];

    const languages = [
        {code: 'ru', nativeName: 'Русский'},
        {code: 'en', nativeName: 'English'},
        {code: 'fr', nativeName: 'Français'},
        {code: 'de', nativeName: 'Deutsch'},
        {code: 'es', nativeName: 'Español'},
        {code: 'me', nativeName: 'Crnogorski'},
    ];

    const changeLanguage = async (languageCode: string) => {
        if (i18n && i18n.changeLanguage) {
            await i18n.changeLanguage(languageCode);
            setSnackbarMessage(t('languageChanged'));
            setSnackbarOpen(true);
        }
    };

    const handleCurrencyChange = (currencyCode: string) => {
        if (setCurrency) {
            setCurrency(currencyCode as Currency);
            setSnackbarMessage(t('currencyChanged'));
            setSnackbarOpen(true);
        }
    };

    const handleExportData = () => {
        setSnackbarMessage(t('dataExported'));
        setSnackbarOpen(true);
    };

    const handleDeleteAccount = () => {
        if (window.confirm(t('deleteAccountConfirm'))) {
            setSnackbarMessage(t('deleteAccountWip'));
            setSnackbarOpen(true);
        }
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                setAvatar(e.target?.result as string);
                try {
                    await triggerSync();
                    setSnackbarMessage(t('avatarUpdated'));
                    setSnackbarOpen(true);
                } catch (error) {
                    console.error('Avatar sync error:', error);
                    setSnackbarMessage(t('avatarUpdateError'));
                    setSnackbarOpen(true);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditProfile = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setNewEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSaveProfile = async () => {
        try {
            if (newPassword) {
                if (newPassword.length < 6) {
                    setSnackbarMessage(t('passwordTooShort'));
                    setSnackbarOpen(true);
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setSnackbarMessage(t('passwordMismatch'));
                    setSnackbarOpen(true);
                    return;
                }

                const {error: passwordError} = await supabase.auth.updateUser({
                    password: newPassword
                });

                if (passwordError) {
                    setSnackbarMessage(t('passwordChangeErrorPrefix') + passwordError.message);
                    setSnackbarOpen(true);
                    return;
                }

                setSnackbarMessage(t('passwordChanged'));
                setSnackbarOpen(true);
            }

            if (newEmail && newEmail !== session?.user?.email) {
                const {error: emailError} = await supabase.auth.updateUser({
                    email: newEmail
                });

                if (emailError) {
                    setSnackbarMessage(t('emailChangeErrorPrefix') + emailError.message);
                    setSnackbarOpen(true);
                    return;
                }

                setSnackbarMessage(t('emailChangeSent'));
                setSnackbarOpen(true);
            }

            if (!newPassword && !newEmail) {
                setSnackbarMessage(t('changesSaved'));
                setSnackbarOpen(true);
            }

            setTimeout(() => {
                handleCloseEditModal();
            }, 1500);
        } catch (error) {
            console.error('Error saving profile:', error);
            setSnackbarMessage(t('saveError'));
            setSnackbarOpen(true);
        }
    };

    const handleSyncNow = async () => {
        try {
            await syncNow();
            setSnackbarMessage(t('syncCompleted'));
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Sync error:', error);
            setSnackbarMessage(t('syncError'));
            setSnackbarOpen(true);
        }
    };

    const getSyncStatusColor = () => {
        // Безопасное преобразование типа
        const status = String(syncStatus);
        switch (status) {
            case 'syncing':
                return '#6C6FF9';
            case 'error':
                return '#FF3B3B';
            case 'success':
                return '#4CAF50';
            default:
                return mode === 'dark' ? '#FFFFFF' : '#272B3E';
        }
    };

    const getSyncStatusText = () => {
        // Безопасное преобразование типа
        const status = String(syncStatus);
        switch (status) {
            case 'syncing':
                return t('sync.syncing', 'Синхронизация...');
            case 'success':
                return t('sync.upToDate', 'Данные синхронизированы');
            case 'error':
                return t('sync.error', 'Ошибка синхронизации');
            default:
                return t('sync.ready', 'Готов к синхронизации');
        }
    };

    // Безопасная проверка статуса синхронизации
    const isSyncing = String(syncStatus) === 'syncing';

    return (
        <Container maxWidth="md" sx={{py: {xs: 2, sm: 4}, px: {xs: 1, sm: 3}}}>
            <Typography variant="h4" gutterBottom sx={{
                mb: {xs: 2, sm: 4},
                fontSize: {xs: '1.5rem', sm: '2rem'},
                color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
            }}>
                {t('profile')}
            </Typography>

            {/* Профиль пользователя */}
            <Paper sx={{p: {xs: 2, sm: 3}, mb: {xs: 2, sm: 3}, borderRadius: 3}}>
                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{flexWrap: {xs: 'wrap', sm: 'nowrap'}, gap: {xs: 2, sm: 0}}}>
                    <Box display="flex" alignItems="center" sx={{flex: 1, minWidth: 0}}>
                        <Avatar
                            src={avatar || undefined}
                            sx={{width: {xs: 48, sm: 64}, height: {xs: 48, sm: 64}, mr: {xs: 1.5, sm: 2}, backgroundColor: '#6C6FF9', flexShrink: 0}}
                        >
                            {!avatar && <Person sx={{fontSize: {xs: 24, sm: 32}}}/>}
                        </Avatar>
                        <Box sx={{minWidth: 0, flex: 1}}>
                            <Typography variant="h6" sx={{
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {nickname || session?.user?.email || t('user')}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                mt: 0.5,
                                fontSize: {xs: '0.75rem', sm: '0.875rem'},
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {session?.user?.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={handleEditProfile}
                        sx={{
                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            borderRadius: 2,
                            minWidth: {xs: 40, sm: 48},
                            width: {xs: 40, sm: 48},
                            height: {xs: 40, sm: 48},
                            p: 0,
                            flexShrink: 0,
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                            }
                        }}
                    >
                        <Edit sx={{fontSize: {xs: 20, sm: 24}}}/>
                    </Button>
                </Box>
            </Paper>

            {/* Статус синхронизации - ПЕРЕМЕЩЕНО ПОД АВАТАРКУ */}
            <Paper sx={{p: {xs: 2, sm: 3}, mb: {xs: 2, sm: 3}, borderRadius: 3}}>
                <Box display="flex" flexDirection={{xs: 'column', sm: 'row'}} alignItems={{xs: 'flex-start', sm: 'center'}} justifyContent="space-between" sx={{mb: 2, gap: {xs: 2, sm: 0}}}>
                    <Box display="flex" alignItems="center" gap={1} sx={{flex: 1, minWidth: 0}}>
                        <CloudSync sx={{color: getSyncStatusColor(), fontSize: {xs: 20, sm: 24}, flexShrink: 0}}/>
                        <Box sx={{minWidth: 0, flex: 1}}>
                            <Typography variant="h6" sx={{
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                fontSize: {xs: '1rem', sm: '1.25rem'}
                            }}>
                                {t('sync.status', 'Статус синхронизации')}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                fontStyle: 'italic',
                                fontSize: {xs: '0.75rem', sm: '0.875rem'}
                            }}>
                                {getSyncStatusText()}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleSyncNow}
                        disabled={isSyncing}
                        startIcon={<CloudSync sx={{fontSize: {xs: 18, sm: 20}}}/>}
                        sx={{
                            background: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            px: {xs: 2, sm: 3},
                            py: {xs: 1, sm: 1.5},
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            width: {xs: '100%', sm: 'auto'},
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5B5EE8 0%, #5B5EE8 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 20px rgba(108, 111, 249, 0.4)',
                            },
                            '&:disabled': {
                                background: 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)',
                                transform: 'none',
                                boxShadow: 'none',
                            }
                        }}
                    >
                        {isSyncing ? t('sync.syncing', 'Синхронизация...') : t('sync.syncNow', 'Синхронизировать')}
                    </Button>
                </Box>
            </Paper>

            {/* Настройки */}
            <Paper sx={{p: {xs: 2, sm: 3}, mb: {xs: 2, sm: 3}, borderRadius: 3}}>
                <Typography variant="h6" gutterBottom sx={{
                    mb: {xs: 2, sm: 3},
                    fontSize: {xs: '1.125rem', sm: '1.25rem'},
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                }}>
                    {t('settings')}
                </Typography>

                <List>
                    {/* Тема */}
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <Palette
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('theme.dark')}
                            secondary={t('theme.switch')}
                        />
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme || (() => {
                            })}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#6C6FF9',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#6C6FF9',
                                },
                            }}
                        />
                    </ListItem>

                    <Divider/>

                    {/* Язык */}
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <Language
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('settings.language')}
                            secondary={t('settings.languageSelect')}
                        />
                        <FormControl size="small" sx={{minWidth: {xs: 100, sm: 120}, ml: {xs: 1, sm: 0}}}>
                            <Select
                                value={i18n?.language || 'ru'}
                                onChange={(e) => changeLanguage(e.target.value)}
                                sx={{
                                    fontSize: {xs: '0.875rem', sm: '1rem'},
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

                    <Divider/>

                    {/* Валюта */}
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <AttachMoney
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('settings.currency')}
                            secondary={t('settings.currencySelect')}
                        />
                        <FormControl size="small" sx={{minWidth: {xs: 100, sm: 120}, ml: {xs: 1, sm: 0}}}>
                            <Select
                                value={currency || 'EUR'}
                                onChange={(e) => handleCurrencyChange(e.target.value)}
                                sx={{
                                    fontSize: {xs: '0.875rem', sm: '1rem'},
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
            <Paper sx={{p: {xs: 2, sm: 3}, mb: {xs: 2, sm: 3}, borderRadius: 3}}>
                <Typography variant="h6" gutterBottom sx={{
                    mb: {xs: 2, sm: 3},
                    fontSize: {xs: '1.125rem', sm: '1.25rem'},
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                }}>
                    {t('notifications')}
                </Typography>

                <List>
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <NotificationsIcon
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('notifications.enable')}
                            secondary={t('notifications.description')}
                        />
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
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#6C6FF9',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#6C6FF9',
                                },
                            }}
                        />
                    </ListItem>

                    <ListItem sx={{flexDirection: 'column', alignItems: 'stretch', gap: 2, py: 1.5}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <ListItemIcon>
                                <Schedule
                                    sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)'}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary={t('dailyReminder')}
                                secondary={t('dailyReminderDescription')}
                            />
                            <Switch
                                checked={dailyReminderEnabled}
                                onChange={(e) => {
                                    setDailyReminderEnabled(e.target.checked);
                                    setTimeout(() => triggerSync(), 100);
                                }}
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
                        </Box>

                        {notificationsEnabled && dailyReminderEnabled && (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                pl: {xs: 0, sm: 7},
                                pr: {xs: 0, sm: 2},
                                mt: {xs: 1, sm: 0}
                            }}>
                                <Typography sx={{
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                    fontSize: {xs: '0.875rem', sm: '0.9rem'}
                                }}>
                                    {t('reminderTime')}
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
                                                fontFamily: 'system-ui, sans-serif',
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
                                                fontFamily: 'system-ui, sans-serif',
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
            <Paper sx={{p: {xs: 2, sm: 3}, mb: {xs: 2, sm: 3}, borderRadius: 3}}>
                <Typography variant="h6" gutterBottom sx={{
                    mb: {xs: 2, sm: 3},
                    fontSize: {xs: '1.125rem', sm: '1.25rem'},
                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E'
                }}>
                    {t('dataManagement')}
                </Typography>

                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, flexWrap: 'wrap', gap: 2}}>
                    <Button
                        variant="outlined"
                        startIcon={<CloudSync/>}
                        onClick={async () => {
                            try {
                                await loadFromCloud();
                                setSnackbarMessage(t('dataLoadSuccess'));
                                setSnackbarOpen(true);
                            } catch {
                                setSnackbarMessage(t('dataLoadError'));
                                setSnackbarOpen(true);
                            }
                        }}
                        sx={{
                            flex: {xs: '1 1 100%', sm: '1 1 auto'},
                            minWidth: {xs: '100%', sm: '200px'},
                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            borderRadius: 2,
                            py: {xs: 1.25, sm: 1.5},
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        {t('data.loadFromCloud')}
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Backup/>}
                        onClick={handleExportData}
                        sx={{
                            flex: {xs: '1 1 100%', sm: '1 1 auto'},
                            minWidth: {xs: '100%', sm: '200px'},
                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                            borderRadius: 2,
                            py: {xs: 1.25, sm: 1.5},
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        {t('data.exportData')}
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete/>}
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
                        {t('profile.deleteAccount')}
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
                        width: {xs: '90%', sm: 500},
                        maxHeight: '90vh',
                        overflow: 'auto',
                        backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                            {t('profile.editProfile')}
                        </Typography>
                        <IconButton
                            onClick={handleCloseEditModal}
                            size="small"
                            sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                '&:hover': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)',
                                }
                            }}
                        >
                            <Close/>
                        </IconButton>
                    </Box>

                    {/* Аватар */}
                    <Box mb={3} display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                            <Avatar
                                src={avatar || undefined}
                                sx={{width: 80, height: 80, mb: 2, backgroundColor: '#6C6FF9'}}
                            >
                                {!avatar && <Person fontSize="large"/>}
                            </Avatar>
                        </Box>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarUpload}
                            accept="image/*"
                            style={{display: 'none'}}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<PhotoCamera/>}
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
                            {t('profile.changePhoto')}
                        </Button>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="center">
                        {/* Никнейм */}
                        <TextField
                            label={t('profile.nickname')}
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                                setTimeout(() => triggerSync(), 500);
                            }}
                            margin="normal"
                            sx={{
                                maxWidth: 350,
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(108, 111, 249, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(108, 111, 249, 0.6)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C6FF9',
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

                    <Divider sx={{
                        my: 3,
                        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 43, 62, 0.1)'
                    }}>
                        <Typography variant="body2"
                                    sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)'}}>
                            {t('security')}
                        </Typography>
                    </Divider>

                    <Box display="flex" flexDirection="column" alignItems="center">
                        {/* Email */}
                        <TextField
                            label={t('profile.newEmailOptional')}
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder={session?.user?.email}
                            margin="normal"
                            helperText={t('profile.emailHelper')}
                            sx={{
                                maxWidth: 350,
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(108, 111, 249, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(108, 111, 249, 0.6)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C6FF9',
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
                            label={t('profile.newPasswordOptional')}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            margin="normal"
                            helperText={t('profile.passwordHelperMin')}
                            sx={{
                                maxWidth: 350,
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(108, 111, 249, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(108, 111, 249, 0.6)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6C6FF9',
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
                        {newPassword && (
                            <TextField
                                label={t('profile.confirmNewPassword')}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                margin="normal"
                                error={newPassword !== confirmPassword && confirmPassword.length > 0}
                                helperText={newPassword !== confirmPassword && confirmPassword.length > 0 ? t('profile.passwordsMismatch') : ""}
                                sx={{
                                    maxWidth: 350,
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(108, 111, 249, 0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(108, 111, 249, 0.6)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#6C6FF9',
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
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.6)',
                                fontWeight: 'bold',
                                '&:hover': {
                                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(39, 43, 62, 0.5)',
                                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(39, 43, 62, 0.05)',
                                }
                            }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveProfile}
                            sx={{
                                background: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5B5EE8 0%, #5B5EE8 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 20px rgba(108, 111, 249, 0.4)',
                                }
                            }}
                        >
                            {t('profile.saveChanges')}
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
                onChange={(time) => {
                    setNotificationTime(time);
                    setTimeout(() => triggerSync(), 100);
                }}
            />
        </Container>
    );
}