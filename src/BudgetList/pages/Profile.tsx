import { useState, useRef } from 'react';
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
    Close
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { useSettingsStore, Currency } from '../../Budgets/store/useSettingsStore';
import { useAuth } from '../../Budgets/hooks/useAuth';
import getSymbolFromCurrency from 'currency-symbol-map';

export default function Profile() {
    try {
        const { i18n } = useTranslation();
        const { mode, toggleTheme } = useThemeMode();
        const { currency, setCurrency } = useSettingsStore();
        const { session, loading: authLoading } = useAuth();
        const [iCloudSync, setICloudSync] = useState(false);
        const [notifications, setNotifications] = useState(true);
        const [backupEnabled, setBackupEnabled] = useState(true);
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
        
        // Состояние для редактирования профиля
        const [editModalOpen, setEditModalOpen] = useState(false);
        const [avatar, setAvatar] = useState<string | null>(null);
        const [nickname, setNickname] = useState(session?.user?.user_metadata?.nickname || '');
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
                    <Typography variant="h6" sx={{ color: '#654633' }}>
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
            <Typography variant="h4" gutterBottom sx={{ mb: 4, color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
                Личный кабинет
            </Typography>

            {/* Профиль пользователя */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar 
                        src={avatar || undefined}
                        sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}
                    >
                        {!avatar && <Person fontSize="large" />}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
                            {nickname || session?.user?.email || 'Пользователь'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: mode === 'dark' ? '#B0B0B0' : '#666', mt: 0.5 }}>
                            {session?.user?.email}
                        </Typography>
                    </Box>
                </Box>
                
                <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEditProfile}
                    sx={{ 
                        borderColor: 'rgba(101, 70, 51, 0.3)',
                        color: '#654633',
                        '&:hover': {
                            borderColor: 'rgba(101, 70, 51, 0.6)',
                            backgroundColor: 'rgba(101, 70, 51, 0.1)',
                        }
                    }}
                >
                    Редактировать профиль
                </Button>
            </Paper>

            {/* Настройки */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
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
                                            color: '#654633',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: 'rgba(101, 70, 51, 0.5)',
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
                            primary="Язык интерфейса" 
                            secondary="Выберите язык приложения"
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={i18n?.language || 'ru'}
                                onChange={(e) => changeLanguage(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                            color: '#654633',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: 'rgba(101, 70, 51, 0.5)',
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
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
                    Синхронизация
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CloudSync />
                        </ListItemIcon>
                        <ListItemText 
                            primary="iCloud синхронизация" 
                            secondary="Синхронизировать данные с iCloud"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={iCloudSync}
                                    onChange={(e) => setICloudSync(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#654633',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: 'rgba(101, 70, 51, 0.5)',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemIcon>
                            <Backup />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Автоматическое резервное копирование" 
                            secondary="Создавать резервные копии данных"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={backupEnabled}
                                    onChange={(e) => setBackupEnabled(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#654633',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: 'rgba(101, 70, 51, 0.5)',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </ListItem>
                </List>
            </Paper>

            {/* Управление данными */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
                    Управление данными
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap">
                    <Button
                        variant="outlined"
                        startIcon={<Backup />}
                        onClick={handleExportData}
                        sx={{ 
                            borderColor: 'rgba(101, 70, 51, 0.3)',
                            color: '#654633',
                            '&:hover': {
                                borderColor: 'rgba(101, 70, 51, 0.6)',
                                backgroundColor: 'rgba(101, 70, 51, 0.1)',
                            }
                        }}
                    >
                        Экспорт данных
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Security />}
                        onClick={handleEditProfile}
                        sx={{ 
                            borderColor: 'rgba(101, 70, 51, 0.3)',
                            color: '#654633',
                            '&:hover': {
                                borderColor: 'rgba(101, 70, 51, 0.6)',
                                backgroundColor: 'rgba(101, 70, 51, 0.1)',
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
                        sx={{ 
                            borderColor: '#ff6b6b',
                            color: '#ff6b6b',
                            '&:hover': {
                                borderColor: '#ff5252',
                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
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
                        background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.8) 0%, rgba(248, 229, 229, 0.6) 100%)',
                        color: '#654633',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.9) 0%, rgba(248, 229, 229, 0.8) 100%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 20px rgba(101, 70, 51, 0.2)',
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
                        bgcolor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" sx={{ color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
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
                                borderColor: 'rgba(101, 70, 51, 0.3)',
                                color: '#654633',
                                '&:hover': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                    backgroundColor: 'rgba(101, 70, 51, 0.1)',
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
                                    borderColor: 'rgba(101, 70, 51, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#654633',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                    borderColor: 'rgba(101, 70, 51, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#654633',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            },
                        }}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" sx={{ mb: 2, color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
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
                                    borderColor: 'rgba(101, 70, 51, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#654633',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                    borderColor: 'rgba(101, 70, 51, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#654633',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                    borderColor: 'rgba(101, 70, 51, 0.3)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#654633',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
                            },
                        }}
                    />

                    {/* Кнопки */}
                    <Box display="flex" gap={2} justifyContent="flex-end" mt={3}>
                        <Button
                            variant="outlined"
                            onClick={handleCloseEditModal}
                            sx={{ 
                                borderColor: 'rgba(101, 70, 51, 0.3)',
                                color: '#654633',
                                '&:hover': {
                                    borderColor: 'rgba(101, 70, 51, 0.6)',
                                    backgroundColor: 'rgba(101, 70, 51, 0.1)',
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
                                color: '#654633',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, rgba(234, 234, 244, 0.9) 0%, rgba(248, 229, 229, 0.8) 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 20px rgba(101, 70, 51, 0.2)',
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
                <Typography variant="h6" sx={{ color: '#ff6b6b' }}>
                    Произошла ошибка при загрузке страницы
                </Typography>
            </Container>
        );
    }
}
