import { useState } from 'react';
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
    InputLabel,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Chip,
    Alert,
    Snackbar
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
    Edit
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';
import { useSettingsStore } from '../../Budgets/store/useSettingsStore';
import { useAuth } from '../../Budgets/hooks/useAuth';

export default function Profile() {
    const { t } = useTranslation();
    const { mode, toggleTheme } = useThemeMode();
    const { currency, setCurrency } = useSettingsStore();
    const { session } = useAuth();
    const [language, setLanguage] = useState('ru');
    const [iCloudSync, setICloudSync] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [backupEnabled, setBackupEnabled] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const currencies = [
        { code: 'RUB', symbol: '₽', name: 'Российский рубль' },
        { code: 'USD', symbol: '$', name: 'Доллар США' },
        { code: 'EUR', symbol: '€', name: 'Евро' },
        { code: 'GBP', symbol: '£', name: 'Фунт стерлингов' },
        { code: 'CNY', symbol: '¥', name: 'Китайский юань' },
    ];

    const languages = [
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'me', name: 'Crnogorski', flag: '🇲🇪' },
    ];

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

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
                👤 Личный кабинет
            </Typography>

            {/* Профиль пользователя */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}>
                        <Person fontSize="large" />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ color: mode === 'dark' ? '#F5F5DC' : '#654633' }}>
                            {session?.user?.email || 'Пользователь'}
                        </Typography>
                        <Chip 
                            label="Премиум" 
                            color="primary" 
                            size="small" 
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Box>
                
                <Button
                    variant="outlined"
                    startIcon={<Edit />}
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
                    ⚙️ Настройки
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
                                    onChange={toggleTheme}
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
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                    },
                                }}
                            >
                                {languages.map((lang) => (
                                    <MenuItem key={lang.code} value={lang.code}>
                                        {lang.flag} {lang.name}
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
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                    },
                                }}
                            >
                                {currencies.map((curr) => (
                                    <MenuItem key={curr.code} value={curr.code}>
                                        {curr.symbol} {curr.code}
                                    </MenuItem>
                                ))}
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
                    ☁️ Синхронизация
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
                    💾 Управление данными
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
                </Box>
            </Paper>

            {/* Опасная зона */}
            <Paper sx={{ p: 3, borderRadius: 3, border: '2px solid #ff6b6b' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#ff6b6b' }}>
                    ⚠️ Опасная зона
                </Typography>

                <Alert severity="warning" sx={{ mb: 2 }}>
                    Эти действия нельзя отменить. Будьте осторожны!
                </Alert>

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

            {/* Snackbar для уведомлений */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
}
