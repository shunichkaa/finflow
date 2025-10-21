import React, {useState} from 'react';
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
import {ChevronLeft, Close, Menu as MenuIcon, Person} from '@mui/icons-material';
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
    const {mode} = useThemeMode();
    const {t} = useTranslation();
    const {avatar, nickname} = useSettingsStore();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);
    
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
            backdropFilter: 'blur(40px) saturate(180%)',
            backgroundColor: mode === 'dark' 
                ? 'rgba(28, 28, 30, 0.9)'
                : 'rgba(252, 248, 245, 0.85)',
            borderRight: mode === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.08)' 
                : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: mode === 'dark'
                ? '4px 0 24px rgba(0, 0, 0, 0.3)'
                : '4px 0 24px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Sidebar Header */}
            <AppBar position="static" elevation={0} sx={{
                backdropFilter: 'blur(40px) saturate(180%)',
                backgroundColor: 'transparent',
                borderBottom: mode === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.08)' 
                    : '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: 'none',
            }}>
                <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            display: {sm: 'none'},
                            color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                background: mode === 'dark' 
                                    ? 'rgba(10, 132, 255, 0.15)' 
                                    : 'rgba(0, 122, 255, 0.08)',
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                transform: 'scale(0.95)',
                            }
                        }}
                    >
                        <Close/>
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 1 }}>
                        <IconButton
                            color="inherit"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            sx={{
                                display: {xs: 'none', sm: 'block'},
                                color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                                mr: 2,
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: mode === 'dark' 
                                        ? 'rgba(10, 132, 255, 0.15)' 
                                        : 'rgba(0, 122, 255, 0.08)',
                                    transform: 'scale(1.1)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
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
                                    color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        color: '#007AFF',
                                        transform: 'scale(1.02)',
                                    }
                                }}
                            >
                                {t('appName')}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: mode === 'dark' ? '#EBEBF5' : '#3c3c43',
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
            </AppBar>

            {/* Navigation */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2, py: 3 }}>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    borderRadius: 3,
                                    py: 1.5,
                                    px: 2,
                                    color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                                    backdropFilter: 'blur(20px)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&.Mui-selected': {
                                        background: mode === 'dark' 
                                            ? 'rgba(10, 132, 255, 0.25)' 
                                            : 'rgba(0, 122, 255, 0.12)',
                                        color: '#007AFF',
                                        boxShadow: mode === 'dark'
                                            ? '0 4px 12px rgba(10, 132, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                            : '0 4px 12px rgba(0, 122, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                        '&:hover': {
                                            background: mode === 'dark' 
                                                ? 'rgba(10, 132, 255, 0.35)' 
                                                : 'rgba(0, 122, 255, 0.18)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: mode === 'dark'
                                                ? '0 6px 16px rgba(10, 132, 255, 0.4)'
                                                : '0 6px 16px rgba(0, 122, 255, 0.2)',
                                        }
                                    },
                                    '&:hover': {
                                        background: mode === 'dark' 
                                            ? 'rgba(10, 132, 255, 0.15)' 
                                            : 'rgba(0, 122, 255, 0.08)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: mode === 'dark'
                                            ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                                            : '0 4px 12px rgba(0, 0, 0, 0.06)',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                    }
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

            {/* Bottom Buttons */}
            <Divider sx={{
                borderColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)'
            }}/>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
                                bgcolor: '#007AFF',
                                fontSize: '0.875rem',
                                boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)',
                            }}
                        >
                            {!avatar && <Person sx={{ fontSize: '1.1rem' }} />}
                        </Avatar>
                    }
                    sx={{
                        borderRadius: 3,
                        py: 1.5,
                        borderColor: mode === 'dark' 
                            ? 'rgba(10, 132, 255, 0.3)'
                            : 'rgba(0, 122, 255, 0.2)',
                        color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                        fontWeight: 500,
                        backdropFilter: 'blur(20px)',
                        background: mode === 'dark'
                            ? 'rgba(58, 58, 60, 0.4)'
                            : 'rgba(0, 122, 255, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: mode === 'dark' 
                                ? 'rgba(10, 132, 255, 0.15)'
                                : 'rgba(0, 122, 255, 0.1)',
                            borderColor: '#007AFF',
                            transform: 'translateY(-2px)',
                            boxShadow: mode === 'dark' 
                                ? '0 6px 20px rgba(10, 132, 255, 0.3)'
                                : '0 6px 20px rgba(0, 122, 255, 0.15)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
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
                        borderRadius: 3,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #977DFF 0%, #0033FF 100%)',
                        color: '#FFFFFF',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(151, 125, 255, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #7B5EE6 0%, #0028CC 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(151, 125, 255, 0.4)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
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

            {/* Main AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: {sm: (sidebarOpen && !isLoginPage) ? `calc(100% - ${drawerWidth}px)` : '100%'},
                    ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                    backdropFilter: 'blur(40px) saturate(180%)',
                    backgroundColor: mode === 'dark' 
                        ? 'rgba(28, 28, 30, 0.9)'
                        : 'rgba(252, 248, 245, 0.85)',
                    color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                    borderBottom: mode === 'dark' 
                        ? '1px solid rgba(255, 255, 255, 0.08)' 
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: mode === 'dark'
                        ? '0 2px 16px rgba(0, 0, 0, 0.3)'
                        : '0 2px 16px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
                    {/* Mobile Menu */}
                    <Box sx={{display: 'flex', alignItems: 'center', ml: 1}}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: {sm: 'none'},
                                color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: mode === 'dark' 
                                        ? 'rgba(10, 132, 255, 0.15)' 
                                        : 'rgba(0, 122, 255, 0.08)',
                                    transform: 'scale(1.1)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                }
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>

                        {!sidebarOpen && (
                            <>
                                <IconButton
                                    color="inherit"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    sx={{
                                        display: {xs: 'none', sm: 'block'},
                                        color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                                        mr: 2,
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            background: mode === 'dark' 
                                                ? 'rgba(10, 132, 255, 0.15)' 
                                                : 'rgba(0, 122, 255, 0.08)',
                                            transform: 'scale(1.1)',
                                        },
                                        '&:active': {
                                            transform: 'scale(0.95)',
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
                                            color: mode === 'dark' ? '#FFFFFF' : '#1c1c1e',
                                            fontWeight: 700,
                                            letterSpacing: '-0.02em',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                color: '#007AFF',
                                                transform: 'scale(1.02)',
                                            }
                                        }}
                                    >
                                        {t('appName')}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: mode === 'dark' ? '#EBEBF5' : '#3c3c43',
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
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
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
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        },
                    }}
                    open={sidebarOpen}
                >
                <Box sx={{
                    opacity: sidebarOpen ? 1 : 0,
                    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                    mt: {xs: 8, sm: 9},
                    ml: {sm: (sidebarOpen && !isLoginPage) ? `${drawerWidth}px` : 0},
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {children ?? <Outlet/>}
            </Box>
        </Box>
        </GradientBackground>
    );
};
