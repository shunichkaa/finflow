import React, {useEffect, useState} from 'react';
import {
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
import {ChevronLeft, Close, Menu as MenuIcon, Person} from '@mui/icons-material';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useThemeMode} from '../Budgets/theme/ThemeContext';
import {useSettingsStore} from '../Budgets/store/useSettingsStore';
import {supabase} from '../lib/supabaseClient';
import {GradientBackground} from './ui/GradientBackground';
import {NotificationCenter} from './features/notification/NotificationCenter';
import {useNotifications} from '../Budgets/hooks/useNotifications';
import {useDailyReminder} from '../Budgets/hooks/useDailyReminder';
import {useReminderSystem} from '../Budgets/hooks/useReminderSystem';

const drawerWidth = 280;

interface LayoutProps {
    children?: React.ReactNode;
    defaultSidebarOpen?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({children, defaultSidebarOpen = true}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {mode} = useThemeMode();
    const {t} = useTranslation();
    const {avatar, nickname} = useSettingsStore();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);

    const isLoginPage = location.pathname === '/login';

    useNotifications();

    useDailyReminder();
    
    useReminderSystem();

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogoClick = () => {
        navigate('/dashboard');
        setMobileOpen(false);
        setSidebarOpen(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
        setMobileOpen(false);
        setSidebarOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setMobileOpen(false);
        setSidebarOpen(false);
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
            backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
            borderRight: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #EFF0F6',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Box sx={{
                backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                borderBottom: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #EFF0F6',
                position: 'relative',
            }}>
                <Toolbar sx={{minHeight: {xs: 64, sm: 70}}}>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            display: {sm: 'none'},
                            color: '#272B3E',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                background: '#EFF0F6',
                            },
                        }}
                    >
                        <Close/>
                    </IconButton>

                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1, ml: 1}}>
                        <IconButton
                            color="inherit"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            sx={{
                                display: {xs: 'none', sm: 'block'},
                                color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                mr: 2,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(0deg)',
                                '&:hover': {
                                    background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6',
                                    transform: 'scale(1.1)',
                                },
                                '& svg': {
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MenuIcon
                                    sx={{
                                        position: 'absolute',
                                        opacity: sidebarOpen ? 0 : 1,
                                        transform: sidebarOpen ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                                <ChevronLeft
                                    sx={{
                                        position: 'absolute',
                                        opacity: sidebarOpen ? 1 : 0,
                                        transform: sidebarOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                            </Box>
                        </IconButton>

                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Typography
                                variant="h6"
                                noWrap
                                onClick={handleLogoClick}
                                sx={{
                                    cursor: 'pointer',
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                    }
                                }}
                            >
                                {t('appName')}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    opacity: 0.6,
                                    fontSize: '0.7rem',
                                    lineHeight: 1,
                                    mt: 0.5,
                                    fontWeight: 400,
                                    letterSpacing: '-0.01em',
                                }}
                            >
                                {t('tagline')}
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Box>

            <Box sx={{flexGrow: 1, overflow: 'auto', px: 2, py: 3}}>
                <List sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                onClick={(_e) => {
                                    setMobileOpen(false);
                                    setSidebarOpen(false);
                                }}
                                disableRipple
                                sx={{
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 2,
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    transition: 'background-color 0.2s ease, color 0.2s ease',
                                    background: 'transparent',
                                    '&.Mui-selected': {
                                        background: mode === 'dark' ? 'rgba(108, 111, 249, 0.15)' : '#EFF0F6',
                                        color: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                        '&:hover': {
                                            background: mode === 'dark' ? 'rgba(108, 111, 249, 0.15)' : '#EFF0F6',
                                        }
                                    },
                                    '&:hover': {
                                        background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#EFF0F6',
                                    },
                                    '&:focus': {
                                        background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#EFF0F6',
                                    },
                                    '& .MuiTouchRipple-root': {
                                        display: 'none',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: location.pathname === item.path ? 600 : 500,
                                        fontSize: '1rem',
                                        letterSpacing: '-0.01em',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{
                borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6'
            }}/>
            <Box sx={{p: 2, display: 'flex', flexDirection: 'column', gap: 1.5}}>
                <Button
                    onClick={handleProfileClick}
                    fullWidth
                    variant="outlined"
                    startIcon={
                        <Avatar
                            src={avatar || undefined}
                            sx={{
                                width: 28,
                                height: 28,
                                bgcolor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                fontSize: '0.875rem',
                            }}
                        >
                            {!avatar && <Person sx={{fontSize: '1.1rem'}}/>}
                        </Avatar>
                    }
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        fontWeight: 500,
                        background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6',
                            borderColor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                        },
                    }}
                >
                    {nickname || 'Профиль'}
                </Button>
                <Button
                    onClick={handleLogout}
                    fullWidth
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        background: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: mode === 'dark'
                            ? '0 2px 8px rgba(108, 111, 249, 0.2)'
                            : '0 2px 8px rgba(108, 111, 249, 0.2)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            background: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                            boxShadow: mode === 'dark'
                                ? '0 4px 12px rgba(108, 111, 249, 0.3)'
                                : '0 4px 12px rgba(108, 111, 249, 0.3)',
                        },
                    }}
                >
                    {t('logout')}
                </Button>
            </Box>
        </Box>
    );

    return (
        <GradientBackground>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>

                <Box
                    component="header"
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                        right: 0,
                        zIndex: (theme) => theme.zIndex.drawer - 1,
                        backgroundColor: mode === 'dark' ? '#272B3E' : '#FFFFFF',
                        color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                        borderBottom: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #EFF0F6',
                        boxShadow: mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(39, 43, 62, 0.08)',
                        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: {xs: '20px', sm: 0},
                        margin: {xs: '8px', sm: 0},
                    }}
                >
                    <Toolbar sx={{
                        minHeight: {xs: 64, sm: 70},
                        justifyContent: 'space-between',
                        px: {xs: 2, sm: 3}
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{
                                    display: {sm: 'none'},
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    backgroundColor: 'transparent',
                                    borderRadius: '50%',
                                    width: {xs: 36, sm: 40},
                                    height: {xs: 36, sm: 40},
                                    minWidth: {xs: 36, sm: 40},
                                    minHeight: {xs: 36, sm: 40},
                                    padding: 0,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                                        transform: 'scale(1.06)',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                        transition: 'transform 0.1s ease',
                                    },
                                }}
                            >
                                <MenuIcon sx={{ fontSize: 24, fontWeight: 500 }} />
                            </IconButton>

                            <IconButton
                                color="inherit"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                sx={{
                                    display: {xs: 'none', sm: 'block'},
                                    color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                    mr: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#EFF0F6',
                                    },
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <NotificationCenter/>

                            {!sidebarOpen && !isLoginPage && (
                                <>
                                    <IconButton
                                        onClick={handleProfileClick}
                                        sx={{
                                            display: {xs: 'none', lg: 'flex'},
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                background: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={avatar || undefined}
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor: mode === 'dark' ? '#6C6FF9' : '#6C6FF9',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {!avatar && <Person sx={{fontSize: '1.2rem'}}/>}
                                        </Avatar>
                                    </IconButton>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            display: {xs: 'none', lg: 'flex'},
                                            borderRadius: 2,
                                            px: 2,
                                            py: 0.75,
                                            borderColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.5)' : 'rgba(108, 111, 249, 0.5)',
                                            color: mode === 'dark' ? '#FFFFFF' : '#272B3E',
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor: '#6C6FF9',
                                                backgroundColor: mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.1)',
                                            },
                                        }}
                                    >
                                        {t('logout')}
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Box>

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
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: mode === 'dark' 
                                ? '4px 0 24px rgba(0, 0, 0, 0.4)'
                                : '4px 0 24px rgba(39, 43, 62, 0.15)',
                            border: 'none',
                            overflowX: 'hidden',
                        },
                        '& .MuiBackdrop-root': {
                            backgroundColor: 'rgba(39, 43, 62, 0.5)',
                            backdropFilter: 'blur(4px)',
                            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }
                    }}
                >
                    {drawer}
                </Drawer>

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
                                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: sidebarOpen 
                                    ? (mode === 'dark' 
                                        ? '2px 0 12px rgba(0, 0, 0, 0.2)' 
                                        : '2px 0 12px rgba(39, 43, 62, 0.08)')
                                    : 'none',
                            },
                        }}
                        open={sidebarOpen}
                    >
                        <Box sx={{
                            opacity: sidebarOpen ? 1 : 0,
                            visibility: sidebarOpen ? 'visible' : 'hidden',
                            transition: sidebarOpen 
                                ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
                                : 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-10px)',
                            transitionProperty: 'opacity, visibility, transform',
                        }}>
                            {drawer}
                        </Box>
                    </Drawer>
                )}

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: {xs: 2, sm: 3},
                        width: '100%',
                        mt: {xs: 8, sm: 9},
                        ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {children ?? <Outlet/>}
                </Box>
            </Box>
        </GradientBackground>
    );
};