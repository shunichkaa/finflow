import React from 'react';
import {useState} from 'react';
import {
    AppBar,
    Avatar,
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
    Toolbar,
    Typography
} from '@mui/material';
import {
    Brightness4,
    Brightness7,
    ChevronLeft,
    Close,
    Menu as MenuIcon,
    Person
} from '@mui/icons-material';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useThemeMode} from '../Budgets/theme/ThemeContext';
import {useSettingsStore} from '../Budgets/store/useSettingsStore';
import {supabase} from '../lib/supabaseClient';

const drawerWidth = 280;

interface LayoutProps {
    children?: React.ReactNode;
    defaultSidebarOpen?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({children, defaultSidebarOpen = true}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {mode, toggleTheme} = useThemeMode();
    const {t} = useTranslation();
    const {avatar, nickname} = useSettingsStore();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);
    
    // Скрываем боковую панель на странице логина
    const isLoginPage = location.pathname === '/login';

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

    const handleProfileClick = () => {
        navigate('/profile');
    };



    const navItems = [
        {path: '/dashboard', label: t('dashboard')},
        {path: '/analytics', label: t('analytics')},
        {path: '/budgets', label: t('budgets')},
        {path: '/goals', label: t('savings', 'Копилка')},
    ];

    const drawer = (
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh', 
            backgroundColor: mode === 'dark' 
                ? 'rgba(60, 55, 50, 0.2)'
                : 'rgba(248, 229, 229, 0.3)',
            transition: (theme) => theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.complex,
            }),
        }}>
            {/* AppBar для сайдбара */}
            <AppBar position="static" elevation={0} sx={{
                backgroundColor: mode === 'dark' 
                    ? 'rgba(60, 55, 50, 0.8)'
                    : 'rgba(234, 234, 244, 0.5)'
            }}>
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            display: {sm: 'none'},
                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                    color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        opacity: 0.8,
                                        transform: 'scale(1.02)',
                                        transition: 'all 0.2s ease'
                                    }
                                }}
                            >
                                {t('appName')}
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
                                    color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                    transition: (theme) => theme.transitions.create(['background-color', 'transform'], {
                                        easing: theme.transitions.easing.easeInOut,
                                        duration: theme.transitions.duration.standard,
                                    }),
                                    '&.Mui-selected': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(80, 75, 70, 0.4)' 
                                            : 'rgba(255, 185, 141, 0.3)',
                                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(100, 95, 90, 0.5)' 
                                                : 'rgba(255, 185, 141, 0.4)',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(80, 75, 70, 0.2)' 
                                            : 'rgba(255, 185, 141, 0.2)',
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

            {/* Кнопки внизу */}
            <Divider sx={{
                borderColor: mode === 'dark' 
                    ? 'rgba(123, 167, 209, 0.3)' 
                    : 'rgba(184, 212, 240, 0.3)'
            }}/>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                    onClick={handleProfileClick}
                    fullWidth
                    variant="outlined"
                    startIcon={
                        <Avatar
                            src={avatar || undefined}
                            sx={{ 
                                width: 24, 
                                height: 24, 
                                bgcolor: 'primary.main',
                                fontSize: '0.875rem'
                            }}
                        >
                            {!avatar && <Person sx={{ fontSize: '1rem' }} />}
                        </Avatar>
                    }
                    sx={{
                        borderColor: mode === 'dark' 
                            ? 'rgba(123, 167, 209, 0.3)'
                            : 'rgba(184, 212, 240, 0.3)',
                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
                        fontWeight: 'bold',
                        transition: (theme) => theme.transitions.create(['background', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(123, 167, 209, 0.1)'
                                : 'rgba(184, 212, 240, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 4px 15px rgba(123, 167, 209, 0.3)'
                                : '0 4px 15px rgba(184, 212, 240, 0.3)',
                        }
                    }}
                >
                    {nickname || 'Личный кабинет'}
                </Button>
                <Button
                    onClick={handleLogout}
                    fullWidth
                    variant="contained"
                    sx={{
                        background: mode === 'dark' 
                            ? 'rgba(80, 75, 70, 0.6)'
                            : 'rgba(255, 185, 141, 0.5)',
                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
                        fontWeight: 'bold',
                        transition: (theme) => theme.transitions.create(['background', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(100, 95, 90, 0.8)'
                                : 'rgba(255, 185, 141, 0.7)',
                            transform: 'translateY(-3px)',
                            boxShadow: mode === 'dark' 
                                ? '0 6px 20px rgba(100, 95, 90, 0.4)'
                                : '0 6px 20px rgba(255, 185, 141, 0.4)',
                        }
                    }}
                >
                    {t('logout', 'Logout')}
                </Button>
            </Box>

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
                    width: {sm: (sidebarOpen && !isLoginPage) ? `calc(100% - ${drawerWidth}px)` : '100%'},
                    ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(60, 55, 50, 0.8)'
                        : 'rgba(234, 234, 244, 0.5)',
                    color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                        color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                opacity: 0.8,
                                                transform: 'scale(1.02)',
                                                transition: 'all 0.2s ease'
                                            }
                                        }}
                                    >
                                        {t('appName')}
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
                            color: mode === 'dark' ? '#F5F5DC' : '#654633',
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
                        width: {xs: '100vw', sm: drawerWidth},
                        maxWidth: drawerWidth,
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
            {!isLoginPage && (
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
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: {xs: 2, sm: 3},
                    width: '100%',
                    mt: {xs: 7, sm: 8},
                    ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
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