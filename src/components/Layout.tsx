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
import {GradientBackground} from './ui/GradientBackground';

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
        {path: '/profile', label: t('profile', 'Профиль')},
    ];

    const drawer = (
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh', 
            backdropFilter: 'blur(40px) saturate(180%)',
            backgroundColor: mode === 'dark' 
                ? 'rgba(26, 0, 77, 0.25)'
                : 'rgba(255, 255, 255, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transition: (theme) => theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.complex,
            }),
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            },
        }}>
            {/* AppBar для сайдбара */}
            <AppBar position="static" elevation={0} sx={{
                backdropFilter: 'blur(40px) saturate(180%)',
                backgroundColor: mode === 'dark' 
                    ? 'rgba(26, 0, 77, 0.3)'
                    : 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}>
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            display: {sm: 'none'},
                            color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                <List sx={{ px: 0.5, overflow: 'hidden' }}>
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{mb: 0.5}}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    borderRadius: 3,
                                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: (theme) => theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
                                        easing: theme.transitions.easing.easeInOut,
                                        duration: theme.transitions.duration.standard,
                                    }),
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                                        transition: 'left 0.5s',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(99, 102, 241, 0.4)' 
                                            : 'rgba(168, 163, 246, 0.3)',
                                        color: mode === 'dark' ? '#FFFFFF' : '#243168',
                                        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' 
                                                ? 'rgba(99, 102, 241, 0.5)' 
                                                : 'rgba(168, 163, 246, 0.4)',
                                            transform: 'scale(1.02)',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: mode === 'dark' 
                                            ? 'rgba(99, 102, 241, 0.2)' 
                                            : 'rgba(168, 163, 246, 0.2)',
                                        transform: 'scale(1.01)',
                                        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.2)',
                                        '&::before': {
                                            left: '100%',
                                        },
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
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(36, 49, 104, 0.2)'
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
                            ? 'rgba(255, 255, 255, 0.3)'
                            : 'rgba(36, 49, 104, 0.3)',
                                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
                        fontWeight: 'bold',
                        transition: (theme) => theme.transitions.create(['background', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(99, 102, 241, 0.1)'
                                : 'rgba(168, 163, 246, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                                : '0 4px 15px rgba(168, 163, 246, 0.3)',
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
                            ? 'rgba(102, 51, 255, 0.8)'
                            : 'rgba(168, 163, 246, 0.8)',
                                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
                        fontWeight: 'bold',
                        transition: (theme) => theme.transitions.create(['background', 'transform'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(102, 51, 255, 1)'
                                : 'rgba(168, 163, 246, 1)',
                            transform: 'translateY(-3px)',
                            boxShadow: mode === 'dark' 
                                ? '0 6px 20px rgba(102, 51, 255, 0.4)'
                                : '0 6px 20px rgba(168, 163, 246, 0.4)',
                        }
                    }}
                >
                    {t('logout', 'Logout')}
                </Button>
            </Box>

        </Box>
    );

    return (
        <GradientBackground>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>

            {/* Основной AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: {sm: (sidebarOpen && !isLoginPage) ? `calc(100% - ${drawerWidth}px)` : '100%'},
                    ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                    backdropFilter: 'blur(40px) saturate(180%)',
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(26, 0, 77, 0.3)'
                        : 'rgba(255, 255, 255, 0.3)',
                    color: mode === 'dark' ? '#FFFFFF' : '#243168',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
                                color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                                        color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                                            color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(36, 49, 104, 0.7)',
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
                            color: mode === 'dark' ? '#FFFFFF' : '#243168',
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
                    p: {xs: 1.5, sm: 2},
                    width: '100%',
                    mt: {xs: 7, sm: 8},
                    ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                    transition: (theme) => theme.transitions.create(['margin', 'padding'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.complex,
                    }),
                    '& > *': {
                        transition: (theme) => theme.transitions.create(['transform', 'opacity'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.complex,
                        }),
                    },
                }}
            >
                {children ?? <Outlet/>}
            </Box>
        </Box>
        </GradientBackground>
    );
};