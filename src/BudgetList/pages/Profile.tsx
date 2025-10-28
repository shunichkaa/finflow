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

    // Cloud sync - always enabled
    const {status: syncStatus, syncNow, loadFromCloud} = useCloudSync(true);

    // Состояние для редактирования профиля
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [_currentPassword, _setCurrentPassword] = useState('');
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

    const changeLanguage = (languageCode: string) => {
        if (i18n && i18n.changeLanguage) {
            i18n.changeLanguage(languageCode);
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

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target?.result as string);
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
        setNewEmail('');
        _setCurrentPassword('');
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

    return (
        <Container maxWidth="md" sx={{py: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4, color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                {t('Profile')}
            </Typography>

            {/* Профиль пользователя */}
            <Paper sx={{p: 3, mb: 3, borderRadius: 3}}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Avatar
                            src={avatar || undefined}
                            sx={{width: 64, height: 64, mr: 2, bgcolor: 'primary.main'}}
                        >
                            {!avatar && <Person fontSize="large"/>}
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                                {nickname || session?.user?.email || t('user')}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(6, 0, 171, 0.7)',
                                mt: 0.5
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
                            minWidth: 48,
                            width: 48,
                            height: 48,
                            p: 0,
                            '&:hover': {
                                borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.8)' : 'rgba(108, 111, 249, 0.8)',
                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                            }
                        }}
                    >
                        <Edit/>
                    </Button>
                </Box>
            </Paper>

            {/* Настройки */}
            <Paper sx={{p: 3, mb: 3, borderRadius: 3, minHeight: 300}}>
                <Typography variant="h6" gutterBottom sx={{mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                    {t('settings')}
                </Typography>

                <List>
                    {/* Тема */}
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <Palette
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('theme.dark')}
                            secondary={t('theme.switch')}
                            secondaryTypographyProps={{
                                sx: {
                                    display: {xs: 'none', sm: 'block'},
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
                        />
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme || (() => {
                            })}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                                },
                            }}
                        />
                    </ListItem>

                    <Divider/>

                    {/* Язык */}
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <Language
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('settings.language')}
                            secondary={t('settings.languageSelect')}
                            secondaryTypographyProps={{
                                sx: {
                                    display: {xs: 'none', sm: 'block'},
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
                        />
                        <FormControl size="small" sx={{minWidth: 120}}>
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

                    <Divider/>

                    {/* Валюта */}
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <AttachMoney
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('settings.currency')}
                            secondary={t('settings.currencySelect')}
                            secondaryTypographyProps={{
                                sx: {
                                    display: {xs: 'none', sm: 'block'},
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
                        />
                        <FormControl size="small" sx={{minWidth: 120}}>
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
            <Paper sx={{p: 3, mb: 3, borderRadius: 3}}>
                <Typography variant="h6" gutterBottom sx={{mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                    {t('notifications')}
                </Typography>

                <List>
                    <ListItem sx={{py: 1.5}}>
                        <ListItemIcon>
                            <NotificationsIcon
                                sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t('notifications.enable')}
                            secondary={t('notifications.description')}
                            secondaryTypographyProps={{
                                sx: {
                                    display: {xs: 'none', sm: 'block'},
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                }
                            }}
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
                                    sx={{color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary={t('dailyReminder')}
                                secondary={t('dailyReminderDescription')}
                                secondaryTypographyProps={{
                                    sx: {
                                        display: {xs: 'none', sm: 'block'},
                                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)'
                                    }
                                }}
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
                                pl: 7,
                                pr: 2
                            }}>
                                <Typography sx={{
                                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
                                    fontSize: '0.9rem'
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
            <Paper sx={{p: 3, mb: 3, borderRadius: 3}}>
                <Typography variant="h6" gutterBottom sx={{mb: 3, color: mode === 'dark' ? '#FFFFFF' : '#272B3E'}}>
                    {t('dataManagement')}
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
                        startIcon={<CloudSync/>}
                        onClick={async () => {
                            try {
                                await loadFromCloud();
                                setSnackbarMessage(t('dataLoadSuccess'));
                                setSnackbarOpen(true);
                            } catch (_error) {
                                setSnackbarMessage(t('dataLoadError'));
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
                        {t('data.loadFromCloud')}
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Backup/>}
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
                        bgcolor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
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
                                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(39, 43, 62, 0.7)',
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
                                sx={{width: 80, height: 80, mb: 2, bgcolor: 'primary.main'}}
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
                            {t('cancel')}
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
                onChange={setNotificationTime}
            />
        </Container>
    );
}