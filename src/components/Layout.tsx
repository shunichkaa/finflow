import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Link, useLocation, useNavigate, Outlet} from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useTranslation} from 'react-i18next';
import {SettingsMenu} from './features/SettingsMenu';
import {useThemeMode} from '../Budgets/theme/ThemeContext';
import {ExportMenu} from "./features/ExportMenu.tsx";

export const Layout: React.FC = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const {mode, toggleTheme} = useThemeMode();

    const navItems = [
        {path: '/dashboard', label: t('dashboard')},
        {path: '/analytics', label: t('analytics')},
        {path: '/budgets', label: t('budgets')},
    ];

    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AppBar position="static" elevation={1} color="primary" enableColorOnDark>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 0, mr: 4, cursor: 'pointer', '&:hover': {opacity: 0.8}}}
                        onClick={handleLogoClick}
                    >
                        💰 {t('appName')}
                    </Typography>

                    <Box sx={{flexGrow: 1, display: 'flex', gap: 2}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    borderBottom: location.pathname === item.path ? 2 : 0,
                                    borderRadius: 0,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                    <ExportMenu />
                    <SettingsMenu/>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{flexGrow: 1}}>
                <Outlet />
            </Box>
        </Box>
    );
};