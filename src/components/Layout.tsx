import React, {useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import {
    Brightness4,
    Brightness7,
    ChevronLeft,
    Close,
    CurrencyExchange,
    Language,
    Menu as MenuIcon
} from '@mui/icons-material';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useThemeMode} from '../Budgets/theme/ThemeContext';
import {supabase} from '../lib/supabaseClient';
import getSymbolFromCurrency from 'currency-symbol-map';

const drawerWidth = 240;

interface LayoutProps {
    children?: React.ReactNode;
    defaultSidebarOpen?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({children, defaultSidebarOpen = true}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {mode, toggleTheme} = useThemeMode();
    const {t, i18n} = useTranslation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);
    const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);
    const [currencyAnchor, setCurrencyAnchor] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setLanguageAnchor(event.currentTarget);
    };

    const handleCurrencyClick = (event: React.MouseEvent<HTMLElement>) => {
        setCurrencyAnchor(event.currentTarget);
    };

    const handleLanguageClose = () => {
        setLanguageAnchor(null);
    };

    const handleCurrencyClose = () => {
        setCurrencyAnchor(null);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        handleLanguageClose();
    };

    const languages = [
        {code: 'ru', name: 'Русский', nativeName: 'Русский'},
        {code: 'en', name: 'English', nativeName: 'English'},
        {code: 'fr', name: 'French', nativeName: 'Français'},
        {code: 'de', name: 'German', nativeName: 'Deutsch'},
        {code: 'es', name: 'Spanish', nativeName: 'Español'},
        {code: 'me', name: 'Montenegrin', nativeName: 'Crnogorski'},
    ];

    // Самые популярные валюты мира (USD и EUR наверху)
    const currencies = [
        {code: 'USD', name: 'US Dollar'},
        {code: 'EUR', name: 'Euro'},
        {code: 'GBP', name: 'British Pound'},
        {code: 'JPY', name: 'Japanese Yen'},
        {code: 'CAD', name: 'Canadian Dollar'},
        {code: 'AUD', name: 'Australian Dollar'},
        {code: 'CHF', name: 'Swiss Franc'},
        {code: 'CNY', name: 'Chinese Yuan'},
        {code: 'RUB', name: 'Russian Ruble'},
        {code: 'UAH', name: 'Ukrainian Hryvnia'},
        {code: 'PLN', name: 'Polish Zloty'},
        {code: 'TRY', name: 'Turkish Lira'},
        {code: 'AED', name: 'UAE Dirham'},
        {code: 'SAR', name: 'Saudi Riyal'},
        {code: 'KRW', name: 'South Korean Won'},
        {code: 'SGD', name: 'Singapore Dollar'},
        {code: 'NZD', name: 'New Zealand Dollar'},
        {code: 'MXN', name: 'Mexican Peso'},
        {code: 'BRL', name: 'Brazilian Real'},
        {code: 'INR', name: 'Indian Rupee'},
    ];

    const navItems = [
        {path: '/dashboard', label: t('dashboard')},
        {path: '/analytics', label: t('analytics')},
        {path: '/budgets', label: t('budgets')},
    ];

    const drawer = (
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh', 
            backgroundColor: mode === 'dark' 
                ? '#1A2332'
                : '#f8fafc',
            transition: (theme) => theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.complex,
            }),
        }}>
            {/* AppBar для сайдбара */}
            <AppBar position="static" elevation={0} sx={{
                backgroundColor: mode === 'dark' 
                    ? '#334155'
                    : '#e8f4fd'
            }}>
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            display: {sm: 'none'},
                            color: mode === 'dark' ? '#f1f5f9' : '#475569',
                            '&:hover': {
                                backgroundColor: mode === 'dark' 
                                    ? 'rgba(232, 244, 253, 0.1)' 
                                    : 'rgba(44, 62, 80, 0.1)',
                            }
                        }}
                    >
                        <Close/>
                    </IconButton>
                    
                    {/* Кнопка скрытия для десктопа и название приложения */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 1 }}>
                        <IconButton
                            color="inherit"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            sx={{
                                display: {xs: 'none', sm: 'block'},
                                color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                mr: 2,
                                transition: (theme) => theme.transitions.create(['background-color', 'transform'], {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.standard,
                                }),
                                '&:hover': {
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(232, 244, 253, 0.1)' 
                                        : 'rgba(44, 62, 80, 0.1)',
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            {sidebarOpen ? <ChevronLeft/> : <MenuIcon/>}
                        </IconButton>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                onClick={handleLogoClick}
                                sx={{
                                    cursor: 'pointer',
                                    color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        opacity: 0.8,
                                        transform: 'scale(1.02)',
                                        transition: 'all 0.2s ease'
                                    }
                                }}
                            >
                                💰 {t('appName')}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: mode === 'dark' ? 'rgba(232, 244, 253, 0.7)' : 'rgba(44, 62, 80, 0.7)',
                                    fontSize: '0.7rem',
                                    lineHeight: 1,
                                    mt: 0.5
                                }}
                            >
                                {t('tagline')}
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Навигация */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List sx={{ px: 1 }}>
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{mb: 0.5}}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    borderRadius: 2,
                                    color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                    transition: (theme) => theme.transitions.create(['background-color', 'transform'], {
                                        easing: theme.transitions.easing.easeInOut,
                                        duration: theme.transitions.duration.standard,
                                    }),
                                    '&.Mui-selected': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(123, 167, 209, 0.3)' 
                                            : 'rgba(184, 212, 240, 0.3)',
                                        color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(123, 167, 209, 0.4)' 
                                                : 'rgba(184, 212, 240, 0.4)',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(123, 167, 209, 0.2)' 
                                            : 'rgba(184, 212, 240, 0.2)',
                                        transform: 'translateX(6px)',
                                    }
                                }}
                            >
                                <ListItemText 
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Кнопки смены языка и валюты - в самом низу */}
            <Divider sx={{
                borderColor: mode === 'dark' 
                    ? 'rgba(123, 167, 209, 0.3)' 
                    : 'rgba(184, 212, 240, 0.3)'
            }}/>
            <Box sx={{ p: 2 }}>
                <Button
                    startIcon={<Language/>}
                    onClick={handleLanguageClick}
                    fullWidth
                    variant="outlined"
                    sx={{
                        mb: 1,
                        borderColor: mode === 'dark' 
                            ? 'rgba(123, 167, 209, 0.5)' 
                            : 'rgba(184, 212, 240, 0.5)',
                        color: mode === 'dark' ? '#f1f5f9' : '#475569',
                        transition: (theme) => theme.transitions.create(['border-color', 'background-color', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            borderColor: mode === 'dark' 
                                ? 'rgba(123, 167, 209, 0.8)' 
                                : 'rgba(184, 212, 240, 0.8)',
                            backgroundColor: mode === 'dark' 
                                ? 'rgba(123, 167, 209, 0.1)' 
                                : 'rgba(184, 212, 240, 0.1)',
                            transform: 'translateY(-3px)',
                        }
                    }}
                >
                    {t('settings.language')}
                </Button>
                <Button
                    startIcon={<CurrencyExchange/>}
                    onClick={handleCurrencyClick}
                    fullWidth
                    variant="outlined"
                    sx={{
                        mb: 2,
                        borderColor: mode === 'dark' 
                            ? 'rgba(123, 167, 209, 0.5)' 
                            : 'rgba(184, 212, 240, 0.5)',
                        color: mode === 'dark' ? '#f1f5f9' : '#475569',
                        transition: (theme) => theme.transitions.create(['border-color', 'background-color', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            borderColor: mode === 'dark' 
                                ? 'rgba(123, 167, 209, 0.8)' 
                                : 'rgba(184, 212, 240, 0.8)',
                            backgroundColor: mode === 'dark' 
                                ? 'rgba(123, 167, 209, 0.1)' 
                                : 'rgba(184, 212, 240, 0.1)',
                            transform: 'translateY(-3px)',
                        }
                    }}
                >
                    {t('settings.currency')}
                </Button>

                <Button
                    onClick={handleLogout}
                    fullWidth
                    variant="contained"
                    sx={{
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, #5C93AA 0%, #84AABC 100%)'
                            : 'linear-gradient(135deg, #88AFD6 0%, #5C93AA 100%)',
                        color: mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
                        fontWeight: 'bold',
                        transition: (theme) => theme.transitions.create(['background', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'linear-gradient(135deg, #84AABC 0%, #5C93AA 100%)'
                                : 'linear-gradient(135deg, #5C93AA 0%, #88AFD6 100%)',
                            transform: 'translateY(-3px)',
                        }
                    }}
                >
                    {t('logout', 'Logout')}
                </Button>
            </Box>

            {/* Меню выбора языка */}
            <Menu
                anchorEl={languageAnchor}
                open={Boolean(languageAnchor)}
                onClose={handleLanguageClose}
                PaperProps={{
                    style: {
                        maxHeight: 300,
                    },
                }}
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        selected={i18n.language === language.code}
                    >
                        {language.nativeName}
                    </MenuItem>
                ))}
            </Menu>

            {/* Меню выбора валюты */}
            <Menu
                anchorEl={currencyAnchor}
                open={Boolean(currencyAnchor)}
                onClose={handleCurrencyClose}
                PaperProps={{
                    style: {
                        maxHeight: 400,
                    },
                }}
            >
                {currencies.map((currency) => {
                    const symbol = getSymbolFromCurrency(currency.code);
                    const displaySymbol = symbol && symbol !== currency.code ? symbol : '';
                    return (
                        <MenuItem
                            key={currency.code}
                            onClick={handleCurrencyClose}
                        >
                            {displaySymbol} {currency.code} - {currency.name}
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            {/* Основной AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: {sm: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%'},
                    ml: {sm: sidebarOpen ? `${drawerWidth}px` : 0},
                    backgroundColor: mode === 'dark' 
                        ? '#334155'
                        : '#e8f4fd',
                    color: mode === 'dark' ? '#f1f5f9' : '#475569',
                    boxShadow: mode === 'dark' 
                        ? '0 4px 20px rgba(26, 35, 50, 0.3)'
                        : '0 4px 20px rgba(184, 212, 240, 0.3)',
                    borderBottom: mode === 'dark' 
                        ? '1px solid rgba(123, 167, 209, 0.2)'
                        : '1px solid rgba(184, 212, 240, 0.2)',
                    transition: (theme) => theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.complex,
                    }),
                }}
            >
                <Toolbar>
                    {/* Бургер-меню для мобильных */}
                    <Box sx={{display: 'flex', alignItems: 'center', ml: 1}}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: {sm: 'none'},
                                color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' 
                                        ? 'rgba(232, 244, 253, 0.1)' 
                                        : 'rgba(44, 62, 80, 0.1)',
                                }
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>

                        {/* Показываем название и кнопку только когда сайдбар закрыт */}
                        {!sidebarOpen && (
                            <>
                                <IconButton
                                    color="inherit"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    sx={{
                                        display: {xs: 'none', sm: 'block'},
                                        color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                        mr: 2,
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(232, 244, 253, 0.1)' 
                                                : 'rgba(44, 62, 80, 0.1)',
                                        }
                                    }}
                                >
                                    <MenuIcon/>
                                </IconButton>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        onClick={handleLogoClick}
                                        sx={{
                                            cursor: 'pointer',
                                            color: mode === 'dark' ? '#f1f5f9' : '#475569',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                opacity: 0.8,
                                                transform: 'scale(1.02)',
                                                transition: 'all 0.2s ease'
                                            }
                                        }}
                                    >
                                        💰 {t('appName')}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: mode === 'dark' ? 'rgba(232, 244, 253, 0.7)' : 'rgba(44, 62, 80, 0.7)',
                                            fontSize: '0.7rem',
                                            lineHeight: 1,
                                            mt: 0.5
                                        }}
                                    >
                                        {t('tagline')}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton 
                        onClick={toggleTheme} 
                        sx={{
                            color: mode === 'dark' ? '#f1f5f9' : '#475569',
                            '&:hover': {
                                backgroundColor: mode === 'dark' 
                                    ? 'rgba(232, 244, 253, 0.1)' 
                                    : 'rgba(44, 62, 80, 0.1)',
                            }
                        }}
                    >
                        {mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        transition: (theme) => theme.transitions.create('transform', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.complex,
                        }),
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: sidebarOpen ? drawerWidth : 0,
                        border: 'none',
                        overflow: 'hidden',
                        transition: (theme) => theme.transitions.create('width', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.complex,
                        }),
                    },
                }}
                open={sidebarOpen}
            >
                <Box sx={{
                    opacity: sidebarOpen ? 1 : 0,
                    transition: (theme) => theme.transitions.create('opacity', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.complex,
                    }),
                }}>
                    {drawer}
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: '100%',
                    mt: 8,
                    ml: {sm: sidebarOpen ? `${drawerWidth}px` : 0},
                    transition: (theme) => theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.complex,
                    }),
                }}
            >
                {children ?? <Outlet/>}
            </Box>
        </Box>
    );
};