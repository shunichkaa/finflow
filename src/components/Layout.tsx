import React, { useState } from 'react';
import {
    AppBar, Box, Button, CssBaseline, Divider, Drawer,
    IconButton, List, ListItem, ListItemButton, ListItemText,
    Toolbar, Typography, Menu, MenuItem
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon, Close, ChevronLeft, Language, CurrencyExchange } from '@mui/icons-material';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../Budgets/theme/ThemeContext';
import { supabase } from '../lib/supabaseClient';

const drawerWidth = 240;

interface LayoutProps {
    children?: React.ReactNode;
    defaultSidebarOpen?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, defaultSidebarOpen = true }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mode, toggleTheme } = useThemeMode();
    const { t, i18n } = useTranslation();

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
        { code: 'ru', name: 'Русский', nativeName: 'Русский' },
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'fr', name: 'French', nativeName: 'Français' },
        { code: 'de', name: 'German', nativeName: 'Deutsch' },
        { code: 'es', name: 'Spanish', nativeName: 'Español' },
        { code: 'me', name: 'Montenegrin', nativeName: 'Crnogorski' },
    ];

    const currencies = [
        { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
    ];

    const navItems = [
        { path: '/dashboard', label: t('dashboard') },
        { path: '/analytics', label: t('analytics') },
        { path: '/budgets', label: t('budgets') },
    ];

    const drawer = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* AppBar для сайдбара */}
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            display: { sm: 'none' },
                            color: 'inherit'
                        }}
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Divider />

            {/* Навигация */}
            <List sx={{ flexGrow: 1 }}>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => setMobileOpen(false)}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            {/* Кнопки смены языка и валюты */}
            <Box sx={{ p: 2 }}>
                <Button
                    startIcon={<Language />}
                    onClick={handleLanguageClick}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                >
                    {t('settings.language')}
                </Button>
                <Button
                    startIcon={<CurrencyExchange />}
                    onClick={handleCurrencyClick}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    {t('settings.currency')}
                </Button>

                <Button
                    onClick={handleLogout}
                    fullWidth
                    variant="contained"
                    color="secondary"
                >
                    {t('logout', 'Logout')}
                </Button>
            </Box>

            {/* Меню выбора языка */}
            <Menu
                anchorEl={languageAnchor}
                open={Boolean(languageAnchor)}
                onClose={handleLanguageClose}
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
            >
                {currencies.map((currency) => (
                    <MenuItem
                        key={currency.code}
                        onClick={handleCurrencyClose}
                    >
                        {currency.code} {currency.symbol}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Основной AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: { sm: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
                    ml: { sm: sidebarOpen ? `${drawerWidth}px` : 0 },
                    transition: (theme) => theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    {/* Бургер-меню для мобильных и кнопка скрытия для десктопа */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { sm: 'none' }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <IconButton
                            color="inherit"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            {sidebarOpen ? <ChevronLeft /> : <MenuIcon />}
                        </IconButton>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        onClick={handleLogoClick}
                        sx={{
                            flexGrow: 1,
                            ml: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        💰 {t('appName')}
                    </Typography>

                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
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
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop Sidebar */}
            {sidebarOpen && (
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            border: 'none',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: '100%',
                    mt: 8,
                    ml: { sm: sidebarOpen ? `${drawerWidth}px` : 0 },
                    transition: (theme) => theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                {children ?? <Outlet />}
            </Box>
        </Box>
    );
};